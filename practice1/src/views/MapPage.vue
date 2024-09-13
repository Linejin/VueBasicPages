<template>
    <div id="mapPage-wrapper">
        <form>
          <div class="map-container">
            <div>
              <button class="map-add-button" @click="homeTab">Home</button>
              <button class="map-add-button" @click="mapTab">Map</button>
            </div>
          </div>
        </form>
        <div>
          <kakaoMap v-if="state_home"></kakaoMap>
          <div v-else >wellcome!</div>
        </div>
    </div>
</template>

<script>
import KakaoMap from "../components/KakaoMap copy.vue"
export default {
  name: 'MapPage',
  components: {
    KakaoMap
  },
  computed: {
    currentTabComponent() {
      return this.currentTab
    }
  }
};
</script>

<script setup>
import { ref,onMounted } from 'vue';
const kakaoMap = ref(null);
const state_home = ref(false);

const homeTab = (event) => {
  event.preventDefault();
  // updateData();
  state_home.value = false;
};
const mapTab = (event) => {
  event.preventDefault();
  // updateData();
  state_home.value = true;
};


onMounted(()=>{
  // initKakaoMap(kakaoMap.value); // Kakao Map 초기화
});

</script>

<style scoped>
#mapPage-wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.map-container{
  width: 600px;
  justify-content: start;
}

.map-container .map-add-button {
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

.map-container .map-list-container{
  margin: 10px;
}

.map-container .upload-name {
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

.map-container p {
  display: flex;
  align-items: center;      /* 상하 가운데 정렬 */
  justify-content: flex-start; /* 왼쪽 정렬 */
}

.map-container label {
  display: inline-block;
  color: #fff;
  vertical-align: middle;
  background-color: #999999;
  cursor: pointer;
  height: 20px;
  font-size: 15px;
  margin-left: 10px;
}

.map-container input[type="file"] {
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
}

.upload_download button{
  display: inline-block;
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
