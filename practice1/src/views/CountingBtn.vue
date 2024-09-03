<template>
    <div id="countingBtn-wrapper">
        <form>
            <input v-model="cnt" type="number" @input="filterInput" :style="{ textAlign: 'right' }" >
            <button @click="inc">Counting Button</button>
            <div >
                <button class="save_load_Btn" @click="load">load</button>
                <button class="save_load_Btn" @click="save">save</button>
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

const cnt = ref(1)
const error_state = ref(null)
const loading = ref(true)
function inc(event){
    event.preventDefault();
    cnt.value *= 2;
}

const filterInput = (event) => {
  const value = event.target.value;
  // 숫자만 남기고 나머지는 제거
  cnt.value = value.replace(/\D/g, '');
};

const load = (event) => {
    event.preventDefault();
    fetchData()
};
const save = (event) => {
    event.preventDefault();
    updateData()
};

async function fetchData(){
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/posts/1/');
        cnt.value = response.data.count;
      } catch (error) {
        error_state.value = error
      } finally {
        loading.value = false;
      }
}

async function updateData(){
      try {
        const updatedData = {count: cnt.value}
        const response = await axios.put('http://127.0.0.1:8000/api/posts/1/', updatedData);
      } catch (error) {
        error_state.value = error
      } finally {
        loading.value = false;
      }
}


</script>

<style scoped>
#countingBtn-wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.save_load_Btn{
    margin-top: 10px;
    margin-left: 5px;
    margin-right: 5px;
}
</style>
