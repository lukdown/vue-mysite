<template>
    <div>
        <div id="wrap">

            <AppHeader />

            <div id="container" class="clearfix">
                <div id="aside">
                    <h2>게시판</h2>
                    <ul>
                        <li><a href="">일반게시판</a></li>
                        <li><a href="">댓글게시판</a></li>
                    </ul>
                </div>
                <!-- //aside -->

                <div id="content">

                    <div id="content-head">
                        <h3>일반게시판</h3>
                        <div id="location">
                            <ul>
                                <li>홈</li>
                                <li>게시판</li>
                                <li class="last">일반게시판</li>
                            </ul>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <!-- //content-head -->

                    <div id="board">
                        <div id="writeForm">
                            <form v-on:submit.prevent="addBoard" action="" method="">
                                <!-- 제목 -->
                                <div class="form-group">
                                    <label class="form-text" for="txt-title">제목</label>
                                    <input type="text" id="txt-title" name="title" v-model="boardVo.title" placeholder="제목을 입력해 주세요">
                                </div>
                            
                                <!-- 내용 -->
                                <div class="form-group">
                                    <textarea id="txt-content" v-model="boardVo.content"></textarea>
                                </div>
                                
                                <router-link id="btn_cancel" to="/board/listform">취소</router-link>
                                <button id="btn_add" type="submit" >등록</button>
                                
                            </form>
                            <!-- //form -->
                        </div>
                        <!-- //writeForm -->
                    </div>
                    <!-- //board -->
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
import axios from 'axios';
import "@/assets/css/board.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";

export default {
    name: "BoardWriteView",
    components: {
        AppFooter,
        AppHeader
    },
    data() {
        return {
            boardList: [],
            boardVo: {
                title: "",
                content: "",
                user_no: ""
            },
            userVo: {
                no: "",
                id: "",
                password: "",
                name: "",
                gender: ""
            }
        };
    },
    methods: {
        getAuthUser() {
        axios({
          method: "get", // put, post, delete
          url: "http://localhost:9000/api/boards/write",
          headers: { "Content-Type": "application/json; charset=utf-8",
                      "Authorization": "Bearer " + this.$store.state.token
          }, //전송타입 + 토큰

          // params: this.userVo, //get방식 파라미터로 값이 전달  // ModelAttribute로 받음
          //data: this.userVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달  // RequestBody로 받음

          responseType: "json", //수신타입
        }).then((response) => {
          // data.apiData > userVo
          // "토큰x, 비로그인, 변조"
          if(response.data.result == "success"){
            console.log(response); //수신데이타
            this.userVo = response.data.apiData;
            this.boardVo.user_no = this.userVo.no;
          }else {
            console.log("토큰x, 비로그인, 변조");
            this.$router.push("/user/loginform");
            alert("로그인해줘");
          }

        }).catch((error) => {
            console.log(error);
        });
      },
      addBoard(){
        // 서버로 전송될 값 찍어보기
        console.log("클릭");
        console.log(this.boardVo);
        console.log(this.userVo);
        console.log(this.no);
        axios({
          method: "post", // put, post, delete
          url: "http://localhost:9000/api/boards/write",
          headers: { "Content-Type": "application/json; charset=utf-8",
                    "Authorization": "Bearer " + this.$store.state.token
          }, //전송타입 + 토큰

          // params: this.userVo, //get방식 파라미터로 값이 전달  // ModelAttribute로 받음
          data: this.boardVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달  // RequestBody로 받음

          responseType: "json", //수신타입
        }).then((response) => {
            console.log("------------------------------");
            console.log(response); //수신데이타
            console.log("------------------------------");
            console.log(response.data.apiData); //수신데이타
            console.log("------------------------------");

            if(response.data.result == "success"){
              console.log("result = success");
              this.boardList.unshift(response.data);
              
              // 메인으로 이동
              //this.$router.push("/");
              this.$router.push({ path: '/board/listform' });
            }else {
              console.log("result = fail");
              console.log(response.data.message);
              //this.$store.commit("setAuthUser", null);
              //this.$store.commit("setToken", null);
              
              //this.$router.push("/user/loginform");
            }

            /*
            if( name != "fail" ){
  
              
              
            }else { // 토큰오류, 로그인되지 않은 상황
              // vuex token, authVo 삭제
              // 메인으로 이동
              
              alert("로그인하세요");
            }
          */


            //현재페이지

        }).catch((error) => {
            console.log(error);
        })



      }
    },
    created() {
    this.getAuthUser();
    }
};
</script>