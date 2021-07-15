<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + Vite" />
  <router-link to="/">Home</router-link>
  |
  <router-link to="/about">About</router-link>
  <router-view />
</template>

<script setup>
import { ref, provide } from 'vue'
import { createRouter } from './router'
import HelloWorld from './components/HelloWorld.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
const menuVisible = ref(false)
provide('visible', menuVisible)

createRouter().afterEach(() => {
  menuVisible.value = !menuVisible.value
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
