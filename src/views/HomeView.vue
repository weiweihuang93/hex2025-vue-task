<script setup></script>

<template>
  <div class="container mt-4">
    <div>
      <h1 class="fs-3 mb-4">歡迎來到 Vue 任務總覽</h1>
    </div>
    <ul>
      <li class="py-3"><RouterLink to="/week1">第一週 - 餐點管理工具</RouterLink></li>
      <li class="py-3"><RouterLink to="/week2">第二週 - 串接 Todo List API</RouterLink></li>
      <li class="py-3"><RouterLink to="/week3">第三週 - 餐點管理工具</RouterLink></li>
      <li class="py-3"><RouterLink to="/final-todo">最終任務 Todo</RouterLink></li>
      <li class="py-3"><RouterLink to="/final/signup">最終任務 Todo List API</RouterLink></li>
    </ul>
  </div>
</template>
