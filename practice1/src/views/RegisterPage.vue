<template>
  <div id="register-wrapper">
    <div v-if="loading">
      <LogoutComponent v-if="authStore.isAuthenticated"></LogoutComponent>
      <LoginComponent v-else></LoginComponent>
    </div>
    <div v-else>
      isn't loading {{loading}}
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import LoginComponent from "@/components/LoginComponent"
import LogoutComponent from "@/components/LogoutComponent"
import { useAuthStore } from '@/utils/store';

const authStore = useAuthStore();
const loading = ref(false);
const isLogin = ref(false);

async function fetchAuth(){
  isLogin.value = await authStore.checkAuth();
  loading.value = true;
}

onMounted(() => {
  fetchAuth()
})


</script>

<style scoped>
#register-wrapper {
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
}
.save_load_Btn{
    margin-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
}
.login_info_container{
  position: relative;
  width: 400px;
  height: 50px;
  border: 1px solid #7A8191;
  border-radius: 10px;
  margin: 5px 0;
}
.activate_border{
  border-color: #000;
}
.login_info_label{
  display: flex;
  width: 95%;
  justify-contents: start;
  margin-bottom: 2px;
  margin-left: 10px;
}
.login_info_label{
  color: #7A8191;
}
.activate_label{
  color: #000;
}
.login_info_input{
  width: 95%;
}
.login_info_input input{
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  font-size: 20px;
  text-align: left;
  margin-left: 10px;
  padding: 0;
}
</style>
