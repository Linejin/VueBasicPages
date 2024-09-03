<template>
    <div id="comment-wrapper">
        <form>
          <div class="comment-container">
            <div>
              <input class="comment-add-input" @input="handleCommentChange" type="text" placeholder="댓글을 입력해주세요.">
              <button class="comment-add-button" @click="save">댓글추가</button>
            </div>
            <div class="comment-list-container">
              <p v-for="commnet in comment_list" :key="commnet.id" class="comment-list">{{commnet.comment}}</p>
            </div>
          </div>
          <p>{{message}}</p>
        </form>
    </div>
</template>

<script>
export default {
    name: 'CommentPage',
};
</script>

<script setup>
import { ref,onMounted } from 'vue';
import axios from 'axios'

const loading = ref(true)
const comment_list = ref([]);
const current_comment_input = ref("");
const message = ref("");
const error_state = ref(null);

function handleCommentChange(event){
  current_comment_input.value = event.target.value;
}

const save = (event) => {
  event.preventDefault();
  updateData();
};

async function fetchData(){
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/comment/');
    comment_list.value = response.data;
    message.value = "completed get comment_list";
  } catch (error) {
    error_state.value = error;
  } 
}

async function updateData(){
  try {
    const data = {"comment": current_comment_input.value};
    const response = await axios.post('http://127.0.0.1:8000/api/comment/', data);
    fetchData();
    message.value = "completed post comment : " + current_comment_input.value;
    current_comment_input.value = "";
  } catch (error) {
    if(error.response.status == 400)
      message.value = error.response.data.error;
      error_state.value = error;
  } 
}

onMounted(()=>{
  fetchData()
});

</script>

<style scoped>
#comment-wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex; /*Flexbox 레이아웃 사용 */
  justify-content: center; /* 가로로 가운데 정렬 */
}

.comment-container{
  width: 600px;
}

.comment-container .comment-add-input{
  display: inline-block;
  height: 20px;
  padding: 10px 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  width: 60%;
  color: black;
  text-align: end;
}

.comment-container .comment-add-button {
  display: inline-block;
  padding: 10px 20px;
  color: #fff;
  vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  border: hidden;
  font-size: 15px;
  margin-left: 10px;
}

.comment-container .comment-list-container{
  margin: 10px;
}

.comment-container .comment-list {
  display: inline-block;
  height: 20px;
  margin: 5px;
  padding: 10px 10px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  width: 60%;
  color: #999999;
  text-align: end;
}

.comment-container p {
  display: flex;
  align-items: center;      /* 상하 가운데 정렬 */
  justify-content: flex-start; /* 왼쪽 정렬 */
}

</style>
