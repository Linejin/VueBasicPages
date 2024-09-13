<template>
  <div id="navbar_container">
    <div id="navbar_main">
      <router-link class="router-link-style" v-for="link in routing_links" :key="link.to" :to="link.to">
        {{link.text}}
      </router-link>
    </div>
    <router-view class="router-view-style">

    </router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>
<script setup>

const routing_links = [
  {to:"/", text:"Home"},
  {to:"/popup", text:"Popup"},
  {to:"/counting", text:"CountingBtn"},
  {to:"/inputBoxes", text:"InputBoxes"},
  {to:"/fileupload", text:"FileuploadPage"},
  {to:"/register", text:"RegisterPage"},
  {to:"/imageupload", text:"ImageuploadPage"},
  {to:"/comment", text:"CommentPage"},
  {to:"/map", text:"MapPage"},
  {to:"/lifecycle", text:"LifecyclePage"},
];


</script>

<style>
#navbar_container{
  display: flex;
  justify-items: center;
}
#navbar_main{
  width: 200px;
  display: flex;
  justify-items: center;
  flex-direction: column;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.router-link-style {
  margin-trim: 10px;
  margin: 10px;
  width: 100%;

}
.router-view-style {
  margin-trim: 10px;
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;
  text-align: center;
}
</style>
