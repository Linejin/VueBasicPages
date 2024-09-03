<template>
  <div id="register-wrapper">
    <form>
        <div class="login_info_container">
          <label>ID</label>
          <input v-model="id" type="text" :style="{ textAlign: 'right', width: '300px'}" >
        </div>
        <div class="login_info_container">
          <label>PASS</label>
          <input v-model="password" type="password" :style="{ textAlign: 'right', width: '300px' }" >
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

<script>
export default {
    name: 'CountingBtn'
};
</script>

<script setup>
import { ref } from 'vue';
import axios from 'axios'

const error_state = ref(null)
const id = ref("")
const password = ref("")
const message = ref("")
const loading = ref(true)

const resigerBtn = (event) => {
    event.preventDefault();
    register()
};
const longinBtn = (event) => {
    event.preventDefault();
    login()
};

async function register(){
      try {
        const info = {"name": id.value, "password": btoa(password.value)};
        const response = await axios.post('http://127.0.0.1:8000/api/signup/', info);
        message.value = response.data.detail
      } catch (error) {
        message.value = error.response.data.detail;
        error_state.value = error;
      } finally {
        loading.value = false;
      }
}

async function login(){
      try {
        const info = {"name": id.value, "password": btoa(password.value)};
        const response = await axios.post('http://127.0.0.1:8000/api/login/', info);
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
#countingBtn {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  width: 400px;
}
.save_load_Btn{
    margin-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
}
.login_info_container{
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
}
</style>
