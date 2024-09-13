<template>
  <div id="lifecycle-wrapper">
    <div class="image-container">
      <img :src="imagePath"  class="responsive-image">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const imagePath = ref(require('@/assets/lifecycle.MuZLBFAS.png'));

</script>

<style scoped>
#lifecycle-wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex; /*Flexbox 레이아웃 사용 */
  justify-content: center; /* 가로로 가운데 정렬 */
}
.image-container{
  width: 800px;
}
.responsive-image {
  width: 100%; /* 부모 요소의 100% 너비 */
  height: auto; /* 이미지의 비율을 유지하면서 높이를 자동 조정 */
}
</style>
