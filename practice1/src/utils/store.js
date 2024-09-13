// store.js
import { defineStore } from 'pinia';
import axios from 'axios';
import VueCookies from 'vue-cookies';  // CSRF 토큰을 읽기 위해 사용

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    // 로그인 상태 체크
    async checkAuth() {
      try {
        // Django로 API 요청
        const response = await axios.get('http://localhost:8000/api/check-auth/', {
          withCredentials: true, // 쿠키 포함
        });
        // 서버 응답을 기반으로 상태 업데이트
        this.isAuthenticated = true;
        this.user = response.data.user;
      } catch (error) {
        this.isAuthenticated = false;
        this.user = null;
      }
    },

    // 로그인 액션
    async login(id, password) {
      try {
        const info = {"username": id.value, "password": btoa(password.value)};
        const response = await axios.post('http://localhost:8000/api/login/', info, {
          withCredentials: true, // 쿠키 포함
        });

        this.isAuthenticated = true;
        this.user = response.data.user;
      } catch (error) {
        this.isAuthenticated = false;
      }
    },

    // 로그아웃 액션
    async logout() {
      try {
        const csrftoken = VueCookies.get('csrftoken');
        const response = await axios.post('http://localhost:8000/api/logout/', {}, {
            withCredentials: true,  // 쿠키와 함께 요청을 보냄
            headers: {
              'X-CSRFToken': csrftoken,  // 헤더에 CSRF 토큰 추가
            },
          });

        // 로그아웃 후 상태 업데이트
        this.isAuthenticated = false;
        this.user = null;
      } catch (error) {
        console.error('Logout failed', error);
      }
    },
  },
});
