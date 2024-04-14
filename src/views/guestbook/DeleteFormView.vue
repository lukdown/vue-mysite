<template>
  <div>
    <div id="wrap">
      <AppHeader />

      <div id="container" class="clearfix">
        <div id="aside">
          <h2>방명록</h2>
          <ul>
            <li>일반방명록</li>
            <li>ajax방명록</li>
          </ul>
        </div>
        <!-- //aside -->

        <div id="content">
          <div id="content-head">
            <h3>일반방명록</h3>
            <div id="location">
              <ul>
                <li>홈</li>
                <li>방명록</li>
                <li class="last">일반방명록</li>
              </ul>
            </div>
            <div class="clear"></div>
          </div>
          <!-- //content-head -->

          <div id="guestbook">

            <form v-on:submit.prevent="removeGuest" action="" method="">
                
              <table id="guestDelete">
                <colgroup>
                  <col style="width: 10%" />
                  <col style="width: 40%" />
                  <col style="width: 25%" />
                  <col style="width: 25%" />
                </colgroup>

                <tr>
                  <td>비밀번호</td>
                  <td>
                    <input type="password" name="password" v-model="password" />
                  </td>
                  <td class="text-left">
                    <button type="submit">삭제</button>
                  </td>
                  <td>
                    <router-link to="/">메인리스트 이동</router-link>
                  </td>
                </tr>
              </table>

            </form>

          </div>
          <!-- //guestbook -->
        </div>
        <!-- //content  -->
      </div>
      <!-- //container  -->

      <AppFooter />
      <!-- //footer -->
    </div>
    <!-- //wrap -->
  </div>
</template>


<script>
import "@/assets/css/guestbook.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import axios from "axios";

export default {
  name: "DelFormView",
  components: {
    AppFooter,
    AppHeader,
  },
  data() {
    return {
      password: "",
      no: this.$route.params.no,
    };
  },
  methods: {
    removeGuest() {
      console.log(this.password);
      console.log(this.no);
      axios({
        method: "delete", // put, post, delete
        url: "http://localhost:9000/api/guestbooks/" + this.no,
        headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
        // params: guestbookVo, //get방식 파라미터로 값이 전달
        data: { password: this.password }, //put, post, delete 방식 자동으로 JSON으로 변환 전달

        responseType: "json", //수신타입
      })
        .then((response) => {
          console.log(response.data); //수신데이타

          if (response.data.count > 0) {
            this.$router.push({ path: "/" });
          } else {
            alert("패스워드를 확인해 주세요");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {},
};
</script>


<style></style>