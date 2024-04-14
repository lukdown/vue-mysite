<template>
    <div>
        <div id="wrap">

            <AppHeader />


            <div id="container" class="clearfix">
                <div id="aside">
                    <h2>갤러리</h2>
                    <ul>
                        <li><a href="">일반갤러리</a></li>
                        <li><a href="">파일첨부연습</a></li>
                    </ul>
                </div>
                <!-- //aside -->
                
                <div id="content">
                    <div id="content-head">
                        <h3>일반갤러리</h3>
                        <div id="location">
                            <ul>
                                <li>홈</li>
                                <li>갤러리</li>
                                <li class="last">일반갤러리</li>
                            </ul>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <!-- //content-head -->

                    
                    <div id="gallery">
                        <div id="list">
                            <ModalView v-if="isModalViewed" @close-modal="isModalViewed = false">
                                <ContentView></ContentView>
                            </ModalView>
                            <button id="btnImgUpload" @click="isModalViewed = true">이미지올리기</button>

                            <div class="clear"></div>
                    
                            <ul id="viewArea">
                                
                                <!-- 이미지반복영역 -->
                                    <li v-bind:key="i" v-for="(galleryVo, i) in galleryList">
                                        <div class="view" >
                                            <ModalView v-if="modifyModalViewed" @close-modal="modifyModalViewed = false" >
                                                <ModalModify v-bind:childVaule="`${galleryVo.no}`" ></ModalModify>
                                            </ModalView>
                                            <img class="imgItem" v-bind:src="`http://localhost:9000/upload/${galleryVo.saveName}`" @click="modifyModalViewed = true">
                                            <div class="imgWriter">작성자: 
                                                <strong>{{ galleryVo.name }} + {{ galleryVo.no }}</strong>
                                            </div>
                                        </div>
                                    </li>

                                <!-- 이미지반복영역 -->
                                
                                
                            </ul>
                        </div>
                        <!-- //list -->
                    </div>
                    <!-- //	gallery -->

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
import "@/assets/css/gallery.css";
import AppFooter from "@/components/AppFooter.vue";
import AppHeader from "@/components/AppHeader.vue";
import ModalView from "@/components/ModalView.vue";
import ContentView from "@/components/ContentView.vue";
import ModalModify from "@/components/ModalModify.vue";

export default {
    name: "GalleryListView",
    components: {
        AppFooter,
        AppHeader,
        ModalView,
        ContentView,
        ModalModify
    },
    data() {
        return {
            gNo: "",
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
            },
            parentVaule: "",
            isModalViewed: false,
            modifyModalViewed: false,
        };
    },
    methods: {
        getList(){
            console.log("데이터 가져오기");
            // http://localhost:9000/api/guests

            axios({
                method: 'get', // put, post, delete 
                url: 'http://localhost:9000/api/gallery',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                // params: guestbookVo, //get방식 파라미터로 값이 전달
                //data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달

                responseType: 'json' //수신타입
            }).then(response => {
                //console.log(response); //수신데이타
                this.galleryList = response.data;
                
            }).catch(error => {
                console.log(error);

            });
        }
    },
    created(){
        this.getList();
    }
};
</script>
<style>

</style>