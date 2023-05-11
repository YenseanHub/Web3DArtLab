<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <el-config-provider namespace="ep" class="el-container">
    <!-- <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/roadmap">RoadMap</RouterLink>
    </nav> -->
    <RouterView />
  </el-config-provider>
</template>

<style scoped>
.el-container {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
}
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
