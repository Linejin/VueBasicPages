import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import PopupParent from '../views/PopupParent.vue'
import CountingBtn from '../views/CountingBtn.vue'
import HomePage from '../views/HomePage.vue'
import InputBoxes from '../views/InputBoxes.vue'
import FileuploadPage from '../views/FileuploadPage.vue'
import RegisterPage from '../views/RegisterPage.vue'
import ImageuploadPage from '../views/ImageuploadPage.vue'
import CommentPage from '../views/CommentPage.vue'
import MapPage from '../views/MapPage.vue'
import LoginComponent from '@/components/LoginComponent.vue';
import LogoutComponent from '@/components/LogoutComponent.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/popup',
    name: 'popup',
    component: PopupParent,
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
    path: '/logoutPage',
    name: 'logoutPage',
    component: LogoutComponent,
    meta:{
      requestAuth: true
    }
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
router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    try {
      // 인증 확인 요청을 보내기 위한 API 호출
      await axios.get('http://localhost:8000/api/check-auth/', { withCredentials: true });
      next();  // 인증이 되면 페이지 이동
    } catch (error) {
      // 인증되지 않은 사용자 처리
      next('/registerPage');  // 인증이 되지 않으면 홈으로 리다이렉트
    }
  } else {
    next();  // 인증이 필요하지 않은 페이지는 그대로 이동
  }
});

export default router;
