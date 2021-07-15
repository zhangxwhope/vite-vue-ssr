<template>
  <div class="about">
    About
    <span id="page">Page</span>
    <span class="other">hahahaha</span>
  </div>
</template>

<script setup>
import { inject, onMounted } from 'vue'
import { red, applyColor } from '../assets/css/global.module.scss'

const menuVisible = inject('visible')

onMounted(() => {
  document.getElementById('page').className = applyColor
  document.getElementsByClassName('other')[0].className = red
})

</script>

<style lang="scss" scoped>
.about{
  font-size: 20px;
}
</style>