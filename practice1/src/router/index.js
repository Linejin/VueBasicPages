import { createRouter, createWebHistory } from 'vue-router';
import PopupTest from '../views/PopupParent.vue'
import CountingBtn from '../views/CountingBtn.vue'
import HomePage from '../views/HomePage.vue'
import InputBoxes from '../views/InputBoxes.vue'
import FileuploadPage from '../views/FileuploadPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ImageuploadPage from '../views/ImageuploadPage.vue'
import CommentPage from '../views/CommentPage.vue'
import MapPage from '../views/MapPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/popup',
    name: 'popup',
    component: PopupTest,
  },
  {
    path: '/countingBtn',
    name: 'countingBtn',
    component: CountingBtn,
  },
  {
    path: '/inputBoxes',
    name: 'inputBoxes',
    component: InputBoxes,
  },
  {
    path: '/fileuploadPage',
    name: 'fileuploadPage',
    component: FileuploadPage,
  },
  {
    path: '/registerPage',
    name: 'registerPage',
    component: RegisterPage,
  },
  {
    path: '/imageuploadPage',
    name: 'imageuploadPage',
    component: ImageuploadPage,
  },
  {
    path: '/commentPage',
    name: 'commentPage',
    component: CommentPage,
  },
  {
    path: '/mapPage',
    name: 'mapPage',
    component: MapPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.VUE_APP_BASE_URL || '/'),
  routes,
});

export default router;
