<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="container py-2">
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/week1">第一週 - 餐點管理工具</RouterLink> |
      <RouterLink to="/week2">第二週 - 串接 Todo List API</RouterLink> |
      <RouterLink to="/week3">第三週 - 餐點管理工具</RouterLink> |
      <RouterLink to="/final-todo">最終任務 Todo</RouterLink> |
      <RouterLink to="/final/signup">最終任務 Todo List API</RouterLink>
    </nav>
  </div>
  <RouterView />
</template>
