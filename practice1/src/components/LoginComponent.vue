<template>
  <div id="register-wrapper">
    <form>
        <div :class="{'activate_border': idFocused}" class="login_info_container">
          <div class="login_info_label">
            <label :class="{'activate_label': idFocused}">ID</label>
          </div>
          <div class="login_info_input" >
            <input v-model="id" type="text" @focus="idFocused=true" @blur="idFocused=false" placeholder="아이디를 입력해 주세요.">
          </div>
        </div>
        <div :class="{'activate_border': pwFocused}" class="login_info_container">
          <div class="login_info_label">
            <label :class="{'activate_label': pwFocused}">PASS</label>
          </div>
          <div class="login_info_input">
            <input v-model="password" type="password" @focus="pwFocused=true" @blur="pwFocused=false" placeholder="비밀번호를 입력해 주세요.">
          </div>
        </div>
        <div>
            <button class="save_load_Btn" @click="resigerBtn">Sign Up</button>
            <button class="save_load_Btn" @click="longinBtn">Login</button>
        </div>
        <div>
            <p>{{message}}</p>
        </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios'
import { useAuthStore } from '@/utils/store';

const authStore = useAuthStore();
const error_state = ref(null);
const id = ref("");
const password = ref("");
const message = ref("");
const loading = ref(true);
const idFocused = ref(false);
const pwFocused = ref(false);

const resigerBtn = (event) => {
    event.preventDefault();
    register()
};

const longinBtn = (event) => {
    event.preventDefault();
    authStore.login(id, password)
};

async function register(){
      try {
        const info = {"username": id.value, "password": btoa(password.value)};
        const response = await axios.post('http://localhost:8000/api/signup/', info, 
          {withCredentials: true}
        );
        message.value = response.data.detail
      } catch (error) {
        message.value = error.response.data.detail;
        error_state.value = error;
      } finally {
        loading.value = false;
      }
}



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
