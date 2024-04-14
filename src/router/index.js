import { createRouter, createWebHistory } from 'vue-router'
import MainView from '@/views/main/MainView.vue'
import LoginFormView from '@/views/user/LoginFormView.vue'
import JoinFormView from '@/views/user/JoinFormView.vue'
import JoinOkView from '@/views/user/JoinOkView.vue'
import ModifyFormView from '@/views/user/ModifyFormView.vue'
import AddListView from '@/views/guestbook/AddListView.vue'
import DeleteFormView from '@/views/guestbook/DeleteFormView.vue'
import AttachFormView from '@/views/attach/AttachFormView.vue'
import AttachResultView from '@/views/attach/AttachResultView.vue'
import ListFormView from '@/views/board/ListFormView.vue'
import BoardReadView from '@/views/board/BoardReadView.vue'
import BoardModifyView from '@/views/board/BoardModifyView.vue'
import BoardWriteView from '@/views/board/BoardWriteView.vue'
import GalleryListView from '@/views/gallery/GalleryListView.vue'

const routes = [
  {
    path: '/',
    name: '/',
    component: MainView
  },
  {
    path: '/user/loginform',
    name: '/user/loginform',
    component: LoginFormView
  },
  {
    path: '/user/joinform',
    name: '/user/joinform',
    component: JoinFormView
  },
  {
    path: '/user/joinokform',
    name: '/user/joinokform',
    component: JoinOkView
  },
  {
    path: '/user/modifyform',
    name: '/user/modifyform',
    component: ModifyFormView
  },
  {
    path: '/guestbook/addlist',
    name: '/guestbook/addlist',
    component: AddListView
  },
  {
    path: '/guestbook/delete/:no',
    name: '/guestbook/deleteform',
    component: DeleteFormView
  },
  {
    path: '/attach/form',
    name: '/attach/form',
    component: AttachFormView
  },
  {
    path: '/attach/result',
    name: '/attach/result',
    component: AttachResultView
  },
  {
    path: '/board/listform',
    name: '/board/listform',
    component: ListFormView
  },
  {
    path: '/board/boardread/:no',
    name: '/board/boardread',
    component: BoardReadView
  },
  {
    path: '/board/boardmodify/:no',
    name: '/board/boardmodify',
    component: BoardModifyView
  },
  {
    path: '/board/writeform',
    name: '/board/writeform',
    component: BoardWriteView
  },
  {
    path: '/gallery/listform',
    name: '/gallery/listform',
    component: GalleryListView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
