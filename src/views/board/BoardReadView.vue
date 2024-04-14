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
                        <div id="read">
                            <form action="" method="">
                                <!-- 작성자 -->
                                <div class="form-group">
                                    <span class="form-text">작성자</span>
                                    <span class="form-value">{{boardVo.name}}</span>
                                </div>
                                
                                <!-- 조회수 -->
                                <div class="form-group">
                                    <span class="form-text">조회수</span>
                                    <span class="form-value">{{boardVo.hit}}</span>
                                </div>
                                
                                <!-- 작성일 -->
                                <div class="form-group">
                                    <span class="form-text">작성일</span>
                                    <span class="form-value">{{boardVo.reg_date}}</span>
                                </div>
                                
                                <!-- 제목 -->
                                <div class="form-group">
                                    <span class="form-text">제 목</span>
                                    <span class="form-value">{{boardVo.title}}</span>
                                </div>
                            
                                <!-- 내용 -->
                                <div id="txt-content">
                                    <span class="form-value" >
                                        {{boardVo.content}}
                                    </span>
                                </div>
                                <div v-if="this.$store.state.authUser != null">
                                    <router-link id="btn_modify" v-bind:to="`/board/boardmodify/${boardVo.no}`" v-if="this.userVo.no == boardVo.user_no ">수정</router-link>
                                </div>
                                    <router-link id="btn_modify" to="/board/listform">목록</router-link>
                            </form>
                            <!-- //form -->
                        </div>
                        <!-- //read -->
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
    name: "BoardReadView",
    components: {
        AppFooter,
        AppHeader
    },
    data() {
        return {
            boardVo: {
                title: "",
                content: "",
                hit: "",
                reg_date: "",
                user_no: "",
        },
            userVo: {
                    no: "",
                    id: "",
                    password: "",
                    name: "",
                    gender: ""
                },
            no: this.$route.params.no
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
                }
                else {
                    console.log("토큰x, 비로그인, 변조");
                    //this.$router.push("/user/loginform");
                    //alert("로그인해줘");
                }

            }).catch((error) => {
                console.log(error);
            });
        },
        getOneList(){
            console.log("데이터 가져오기");
            // http://localhost:9000/api/guests

            axios({
                method: 'get', // put, post, delete 
                url: 'http://localhost:9000/api/boards/boardread/' + this.no,
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                //params: {no: this.$route.params.no}, //get방식 파라미터로 값이 전달
                //data: {no: this.$route.params.no}, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타
                this.boardVo = response.data;
                console.log(this.boardVo);

            }).catch(error => {
                console.log(error);

            });
        }
    },
    created(){
        this.getOneList();
        this.getAuthUser();
    }
};
</script>