import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';
import PopupParent from '@/views/PopupParent'
import CountingView from '@/views/CountingView'
import HomeView from '@/views/HomeView'
import InputBoxesView from '@/views/InputBoxesView'
import FileuploadView from '@/views/FileuploadView'
import RegisterView from '@/views/RegisterView'
import ImageuploadView from '@/views/ImageuploadView'
import CommentView from '@/views/CommentView'
import MapView from '@/views/MapView'
import LifecycleView from '@/views/LifecycleView'
import LogoutComponent from '@/components/LogoutComponent';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/popup',
    name: 'popup',
    component: PopupParent,
  },
  {
    path: '/counting',
    name: 'counting',
    component: CountingView,
  },
  {
    path: '/inputBoxes',
    name: 'inputBoxes',
    component: InputBoxesView,
  },
  {
    path: '/Fileupload',
    name: 'Fileupload',
    component: FileuploadView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutComponent,
    meta:{
      requestAuth: true
    }
  },
  {
    path: '/imageupload',
    name: 'imageupload',
    component: ImageuploadView,
  },
  {
    path: '/comment',
    name: 'comment',
    component: CommentView,
  },
  {
    path: '/map',
    name: 'map',
    component: MapView,
  },
  {
    path: '/lifecycle',
    name: 'lifecycle',
    component: LifecycleView,
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
