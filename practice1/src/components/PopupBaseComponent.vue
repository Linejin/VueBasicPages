<template>
    <div v-if="isVisible" class="popup-overlay">
      <div class="popup-content">
        <div class="close-button" @click="closePopup">×</div>
        <slot></slot> <!-- 팝업 내용은 부모 컴포넌트에서 전달 가능 -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: {
        type: Boolean,
        required: true
      }
    },
    methods: {
      closePopup() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .popup-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
    max-width: 90%;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  }
  
  .close-button {
    justify-content: flex-end;
    top: 10px;
    right: 10px;
    cursor: pointer;
    font-size: 20px;
    display: flex;
  }
  </style>
  