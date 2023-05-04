<script setup>
import { CelestialBody } from '../core/CelestialBody/CelestialBody'
import { onMounted } from 'vue'
onMounted(() => {
  const canvas = document.getElementById('web3d-container')
  const cb = new CelestialBody(canvas)
  cb.animate()
})
</script>

<template>
  <canvas id="web3d-container"></canvas>
</template>

<style scoped>
#web3d-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
