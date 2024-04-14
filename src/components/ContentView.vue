<template>
  <div class="content">
    <!-- 이미지등록 팝업(모달)창 -->
    <form v-on:submit.prevent="uploadFile" action="" method="" enctype="multipart/form-data">

        <div id="closeBtn" class="closeBtn">×</div>

        <div class="m-header">간단한 타이틀</div>
        
        <div class="m-body">
            <div>
                <label class="form-text">글작성</label>
                <input id="addModalContent" type="text" name="content" v-model="content" />
            </div>
            <div class="form-group">
                <label class="form-text">이미지선택</label>
                <input v-on:change="selectFile" type="file" name="file" />
            </div>
        </div>

        <div class="m-footer">
            <button type="submit">저장</button>
        </div>
        
    </form>
  </div>
</template>


<script>
import "@/assets/css/gallery.css";
import axios from 'axios';

export default {
    name: "ContentView",
    components: {},
    data() {
        return {
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
            }else {
                console.log("토큰x, 비로그인, 변조");
                this.$router.push("/user/loginform");
                alert("로그인해줘");
            }

            }).catch((error) => {
                console.log(error);
            });
        },
        selectFile(event) {
            console.log("파일선택");
            this.file = event.target.files[0];
        },
        uploadFile() {
            console.log("파일업로드");

            // 데이터 서버전송용 전용박스
            let formData = new FormData();
            formData.append("file", this.file);
            formData.append("user_no", this.userVo.no);
            formData.append("name", this.userVo.name);
            formData.append("gender", this.userVo.gender);
            formData.append("content", this.content);

            console.log(this.file);
            console.log(this.userVo.no);
            console.log(this.userVo.name);
            console.log(this.userVo.gender);
            console.log(this.content);
            // -> data로 보낸다(json 방식이 아니다)

            axios({
                method: "post", // put, post, delete
                url: "http://localhost:9000/api/gallery",
                headers: { "Content-Type": "multipart/form-data" }, // ** 멀티파트로 변경
                //params: guestbookVo, //get방식 파라미터로 값이 전달
                data: formData, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: "json", //수신타입
            }).then((response) => {
                console.log(response); //수신데이타
                console.log(response.data.apiData); //수신데이타
                //this.guestbookList.unshift(response.data);
                //let saveName = response.data.apiData;
                
                this.$router.push( 
                    { 
                        path: "/gallery/listform",
                        //query: {saveName: saveName}
                    }
                );
                
            }).catch((error) => {
                console.log(error);

            });
        }
    },
    created() {
        this.getAuthUser();
    }
};
</script>
