<template>
    <div class="content">

        <!-- 이미지보기 팝업(모달)창 -->	
            <div class="modal-content">
                <div id="closeBtn" class="closeBtn">×</div>
                <div class="m-header">이미지 보기</div>
                <div class="m-body">
                    <div>
                        <img id="viewModelImg" v-bind:src="`http://localhost:9000/upload/${galleryVo.saveName}`">
                        <!-- ajax로 처리 : 이미지출력 위치-->
                    </div>
                    <div>
                        <p id="viewModelContent"></p>
                    </div>
                </div>
                <div class="m-footer">
                    <button class="btnDelete" id="btnDelete">삭제::::: {{ this.childVaule }} : 상위 컴포넌트로부터 받아온 값</button>
                </div>
            </div>

    </div>
</template>
  
  
<script>
import "@/assets/css/gallery.css";
import axios from 'axios';
  
export default {
    name: "ModalModify",
    props: ["childVaule"],
    components: {},
    data() {
        return {
            userVo: {
                no: "",
                id: "",
                password: "",
                name: "",
                gender: ""
            },
            galleryList: [],
            galleryVo: {
                no: "",
                user_no: "",
                content: "",
                filePath: "",
                orgName: "",
                saveName: "",
                fileSize: "",
                name: ""
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
                //console.log(response); //수신데이타
                this.userVo = response.data.apiData;
            }else {
                console.log("토큰x, 비로그인, 변조");
                this.$router.push("/user/loginform");
                alert("로그인해줘");
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
                url: 'http://localhost:9000/api/galleryone',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                // params: guestbookVo, //get방식 파라미터로 값이 전달
                //data: 47, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타
                this.galleryVo = response.data;
                //console.log(this.galleryVo);
                
            }).catch(error => {
                console.log(error);

            });
        }
          
    },
    created() {
        this.getAuthUser();
    }
};
</script>
  