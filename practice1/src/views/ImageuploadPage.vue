<template>
    <div id="imageupload-wrapper">
        <form v-if="loading">
          <div class="image-container">
              <img :src="imageURL">
          </div>
          <div class="imageuploader-container">
            <label for="file">파일찾기</label> 
            <input type="file" id="file" @input="handleFileChange">
          </div>
          <p>{{message}}</p>
        </form>
    </div>
</template>

<script>
export default {
    name: 'ImageuploadPage',
};
</script>

<script setup>
import { ref,onMounted } from 'vue';
import axios from 'axios'

const error_state = ref(null);
const loading = ref(false);
const file = ref(null);
const BaseImageURL = 'assets/images.jpg';
const imageURL = ref(BaseImageURL);
const message = ref("");

function handleFileChange(event){
  file.value = event.target.files[0];
  save()
}

const save = () => {
  updateData()
};

async function fetchData(){
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/image/recent/');
    message.value = "최근 업로드된 이미지 이름 : " + response.data.name;
    imageURL.value = 'http://127.0.0.1:8000/media/' + response.data.name;
  } catch (error) {
    imageURL.value = BaseImageURL;
    error_state.value = error;
  } finally {
    loading.value = true;
    file.value = null;
  }
}

async function updateData(){
  try {
    const formData = new FormData();
    formData.append('file', file.value)
    const response = await axios.post('http://127.0.0.1:8000/api/image/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    message.value = "업로드된 이미지 파일 이름 : " + response.data.name;
    imageURL.value = 'http://127.0.0.1:8000/media/' + response.data.name;
  } catch (error) {
    imageURL.value = BaseImageURL;
  } finally {
    file.value = null;
  }
}

onMounted(()=>{
  fetchData()
});

</script>

<style scoped>
#imageupload-wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex; /*Flexbox 레이아웃 사용 */
  justify-content: center; /* 가로로 가운데 정렬 */
}
.imageuploader-container p {
  display: flex;
  align-items: center;      /* 상하 가운데 정렬 */
  justify-content: flex-start; /* 왼쪽 정렬 */
}
.imageuploader-container label {
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  height: 20px;
  margin-left: 10px;
}
.imageuploader-container input[type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}
</style>
