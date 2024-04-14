<template>
    <div>
        <div id="header" class="clearfix">
        <h1>
          <router-link to="/">MySite</router-link>
        </h1>

        
        <ul v-if="this.$store.state.authUser != null">
            <li>{{ this.$store.state.authUser.name}} 님 안녕하세요^^</li>
            <li><button v-on:click="logout" type="button" class="btn_s">로그아웃</button></li>
            <li><router-link class="btn_s" to="/user/modifyform">회원정보수정</router-link></li>
        </ul>
        
        <ul v-if="this.$store.state.authUser == null">
          <li><router-link class="btn_s" to="/user/loginform">로그인</router-link></li>
          <li><router-link class="btn_s" to="">회원가입</router-link></li>

        </ul>
      </div>
      <!-- //header -->

      <div id="nav">
        <ul class="clearfix">
          <li><router-link to="">입사지원서</router-link></li>
          <li><router-link to="/board/listform">게시판</router-link></li>
          <li><router-link to="/gallery/listform">갤러리</router-link></li>
          <li><router-link to="/guestbook/addlist">방명록</router-link></li>
        </ul>
      </div>
      <!-- //nav -->
    </div>
</template>

<script>
export default {
    name: "AppHeader",
    components: {},
    data() {
        return {};
    },
    methods: {
        logout() {
        console.log("로그아웃이다 임마!!!");
        this.$store.commit("setAuthUser", null);
        this.$store.commit("setToken", null);
      }
    },
};
</script>

<style>

</style>