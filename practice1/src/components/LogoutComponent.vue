<template>
    <div id="popup-wrapper">
        <button @click="authStore.logout"> Logout </button>
        <div>
            <p>{{message}}</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {useAuthStore} from '@/utils/store'

const message = ref("");
const authStore = useAuthStore()

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
