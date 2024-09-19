import { createRouter, createWebHistory } from 'vue-router';
import axios from 'axios';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView'),
  },
  {
    path: '/popup',
    name: 'popup',
    component: () => import('@/views/PopupParent'),
  },
  {
    path: '/counting',
    name: 'counting',
    component: () => import('@/views/CountingView'),
  },
  {
    path: '/inputBoxes',
    name: 'inputBoxes',
    component: () => import('@/views/InputBoxesView'),
  },
  {
    path: '/fileupload',
    name: 'fileupload',
    component: () => import('@/views/FileuploadView'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView'),
  },
  {
    path: '/logout',
    name: 'logout',
    component: () => import('@/components/LogoutComponent'),
    meta:{
      requestAuth: true
    }
  },
  {
    path: '/imageupload',
    name: 'imageupload',
    component: () => import('@/views/ImageuploadView'),
  },
  {
    path: '/comment',
    name: 'comment',
    component: () => import('@/views/CommentView'),
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('@/views/MapView'),
  },
  {
    path: '/lifecycle',
    name: 'lifecycle',
    component: () => import('@/views/LifecycleView'),
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
