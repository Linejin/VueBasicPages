<template>
  <div id="popup-wrapper">
    <button @click="showPopup = true">Show Popup</button>
    
    <PopupBaseComponent v-if="showPopup" :isVisible="showPopup" @close="showPopup = false">
      <h2>Popup Title</h2>
      <p>This is a popup message.</p>
      <button @click="showPopup = false">Close Popup</button>
    </PopupBaseComponent>
  </div>
</template>

<script>
import PopupBaseComponent from '../components/PopupBaseComponent.vue';

export default {
  name: 'PopupTest',
  components: {
    PopupBaseComponent
  },
  data() {
    return {
      showPopup: false
    };
  }
};
</script>

<style>
#popup-wrapper {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
