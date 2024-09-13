<template>
    <div id="fileupload-wrapper">
        <form>
          <div class="fileuploader-container">
              <p class="upload-name">{{file?.name}}</p>
              <label for="file">파일찾기</label> 
              <input type="file" id="file" @input="handleFileChange">
          </div>
          <div class="upload_download">
            <button @click="save">upload</button>
            <button @click="load">download</button>
          </div>
          <p>{{message}}</p>
        </form>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import axios from 'axios'

const loading = ref(true)
const file = ref(null);
const message = ref("");
const error_state = ref(null);

function handleFileChange(event){
  file.value = event.target.files[0];
}

function changeFileName(newFileName){
  if (file.value) {
    const fileExtension = file.value.name.split('.').pop();
    const newFileBlob = new Blob([file.value], { type: file.value.type });
    const newFile = new File([newFileBlob], `${newFileName}.${fileExtension}`, { type: file.value.type });
    file.value = newFile;
  } else {
    error_state.value = null;
  }
}

const load = (event) => {
  event.preventDefault()
  downloadData()
};
const save = (event) => {
  event.preventDefault()
  updateData()
};

async function fetchData(){
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/recent/');
    file.value = response.data;
    message.value = "최근 업로드된 파일 이름 : " + response.data.name;
  } catch (error) {
    error_state.value = error;
  } finally {
    loading.value = false;
  }
}

async function updateData(){
  try {
    const formData = new FormData();
    formData.append('file', file.value)
    const response = await axios.post('http://127.0.0.1:8000/api/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    message.value = "업로드된 파일 이름 : " + response.data.name;
    changeFileName(response.data.name);
  } catch (error) {
    if(error.response.status == 400)
      message.value = error.response.data.error;
      error_state.value = error;
  } finally {
    loading.value = false;
  }
}

async function downloadData(){
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/download/'+file.value.name+'/', {
          responseType: 'blob'
        });
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', file.value.name);
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    message.value = "다운로드 완료"
  } catch (error) {
    error_state.value = error;
  } finally {
    loading.value = false;
  }
}

onMounted(()=>{
  fetchData()
});

</script>

<style scoped>
#fileupload-wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex; /*Flexbox 레이아웃 사용 */
  justify-content: center; /* 가로로 가운데 정렬 */
}
.fileuploader-container{
  width: 600px;
}
.fileuploader-container .upload-name {
  display: inline-block;
  height: 20px;
  padding: 10px 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  width: 60%;
  color: #999999;
  text-align: end;
}
.fileuploader-container p {
  display: flex;
  align-items: center;      /* 상하 가운데 정렬 */
  justify-content: flex-start; /* 왼쪽 정렬 */
}
.fileuploader-container label {
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  height: 20px;
  margin-left: 10px;
}
.fileuploader-container input[type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}
.upload_download button{
  display: inline-block;
  margin: 10px 20px;
  padding: 10px 20px;
  color: #fff;
  vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  height: 40px;
  width: 230px;
  font-size: 20px;
  margin-left: 10px;
  border: hidden;
}
</style>
