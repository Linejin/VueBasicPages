<template>
  <div id="lifecycle-wrapper">
    <div class="image-container">
        <img :src="imagePath">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const imagePath = ref('@\\assets\\lifecycle.MuZLBFAS.png');

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
</style>
