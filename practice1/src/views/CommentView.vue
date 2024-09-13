<template>
  <div id="comment-wrapper">
    <form>
      <div class="comment-container">
        <div class="comment-add-container">
          <input class="comment-add-input" @input="handleCommentChange" type="text" placeholder="댓글을 입력해주세요.">
          <button class="comment-add-button" @click="handleCreateComment">댓글추가</button>
        </div>
        <div class="comment-list-container">
          <div v-for="comment in comment_list" :key="comment.id" class="comment-item-container">
            <input 
              class="comment-list"
              @input="(event) => handleEditComment(event, comment)" 
              type="text"
              :value="comment.editText"
              :placeholder=comment.comment>
              <button class="comment-item-button" @click="(event) => handleUpdateComment(event, comment)">수정</button>
              <button class="comment-item-button" @click="(event) => handleDeleteComment(event, comment)">삭제</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { fetchComment, createComment, updateComment, deleteComment } from '@/utils/comment'

const comment_list = ref([]);
const current_comment_input = ref("");

function handleCommentChange(event){
  current_comment_input.value = event.target.value;
}

const handleCreateComment = async (event) => {
  event.preventDefault();
  const newComment = await createComment(current_comment_input.value);
  current_comment_input.value = "";
  comment_list.value.push(newComment)
};

async function handleUpdateComment(event, comment){
  event.preventDefault();
  const updatedData = await updateComment(comment.id, comment.editText);
  comment.comment = updatedData.comment;
  comment.editText = null
}

async function handleDeleteComment(event, comment){
  event.preventDefault();
  await deleteComment(comment.id);
  comment_list.value = comment_list.value.filter((element)=>element.id != comment.id)
}

async function handleEditComment(event, comment){
  comment.editText = event.target.value;
}

onMounted(async ()=>{
  comment_list.value = await fetchComment()
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
  text-align: center;
}

.comment-container .comment-add-input{
  display: inline-block;
  height: 20px;
  padding: 10px 10px;
  margin: 5px;
  vertical-align: middle;
  border: 1px solid #dddddd;
  width: 60%;
  color: black;
  text-align: end;
}

.comment-add-button {
  display: inline-block;
  padding: 10px 20px;
  width: 150px;
  color: #fff;
  vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  border: hidden;
  font-size: 15px;
  margin-left: 10px;
}
.comment-container .comment-list-container{
  margin-top: 10px;
  margin-bottom: 10px;
  text-align: center;
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

.comment-add-container .comment-item-container{
  display: flex;
}
.comment-item-button{
  display: inline-block;
  padding: 10px 20px;
  width: 70px;
  color: #fff;
  vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  border: hidden;
  font-size: 15px;
  margin-left: 10px;
}

</style>
