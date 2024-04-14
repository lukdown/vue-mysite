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
                        <div id="list">
                            <form action="" method="">
                                <div class="form-group text-right">
                                    <input type="text">
                                    <button type="submit" id=btn_search>검색</button>
                                </div>
                            </form>
                            <table >
                                <thead>
                                    <tr>
                                        <th>번호</th>
                                        <th>제목</th>
                                        <th>글쓴이</th>
                                        <th>조회수</th>
                                        <th>작성일</th>
                                        <th>관리</th>
                                    </tr>
                                </thead>

                                <tbody v-bind:key="i" v-for="(boardVo, i) in boardList">
                                    <tr>
                                        <td>{{ boardVo.no }}</td>
                                        <td class="text-left">
                                            <router-link v-bind:to="`/board/boardread/${boardVo.no}`">{{ boardVo.content }}</router-link>
                                        </td>
                                        <td>{{ boardVo.name }}</td>
                                        <td>{{ boardVo.hit }}</td>
                                        <td>{{ boardVo.reg_date }}</td>
                                        <td v-if="this.$store.state.authUser != null">
                                            <button v-on:click="removeBoard(boardVo.no)" type="button" v-if="this.$store.state.authUser.no == boardVo.user_no " >
                                                삭제
                                            </button>
                                        </td>
                                        
                                    </tr>
                                </tbody>

                            </table>
                
                            
                            <div v-if="this.$store.state.authUser != null">
                                <router-link id="btn_write" to="/board/writeform">글쓰기</router-link>
                            </div>

                            <div class="clear"></div>
                            <!-- 
                            <div>
                                <button id="btn_moreBoard" type="button">글 가져오기</button>
                            </div>
                             -->
                            
                        </div>
                        <!-- //list -->
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
    name: "ListFormView",
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
        getList(){
            console.log("데이터 가져오기");
            // http://localhost:9000/api/guests

            axios({
                method: 'get', // put, post, delete 
                url: 'http://localhost:9000/api/boards',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                // params: guestbookVo, //get방식 파라미터로 값이 전달
                //data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타
                this.boardList = response.data;

            }).catch(error => {
                console.log(error);

            });
        },
        removeBoard(no) {
            console.log(no);
            axios({
                method: 'delete', // put, post, delete 
                url: 'http://localhost:9000/api/boards',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                // params: guestbookVo, //get방식 파라미터로 값이 전달
                data: {no}, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response.data); //수신데이타
                this.getList();

            }).catch(error => {
                console.log(error);

            });

        }
    },
    created(){
        this.getList();
        this.getAuthUser();
    }
};
</script>