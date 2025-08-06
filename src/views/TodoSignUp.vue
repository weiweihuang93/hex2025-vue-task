<script setup>
import Swal from 'sweetalert2'
import axios from 'axios'
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const api = 'https://todolist-api.hexschool.io'
const router = useRouter()

// 註冊用資料
const registerForm = ref({
  email: '',
  password: '',
  nickname: '',
})

const confirmPassword = ref('')

const signUp = async () => {
  if (registerForm.value.password !== confirmPassword.value) {
    Swal.fire({
      icon: 'warning',
      title: '密碼不一致',
      text: '密碼與再次輸入密碼不一致，請重新確認',
      confirmButtonText: '確定',
    })
    return
  }

  const { email, password, nickname } = registerForm.value

  if (!email.trim() || !password.trim() || !nickname.trim()) {
    Swal.fire({
      icon: 'warning',
      title: '欄位未填寫',
      text: '請確實填寫所有欄位後再送出',
      confirmButtonText: '確定',
    })
    return
  }
  try {
    const res = await axios.post(`${api}/users/sign_up`, registerForm.value)
    registerForm.value = {}
    Swal.fire({
      icon: 'success',
      title: '註冊成功',
      text: '歡迎加入，將為你導向登入頁面',
      confirmButtonText: '前往登入',
    })

    router.push('/final/login')
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    Swal.fire({
      icon: 'error',
      title: '註冊失敗',
      text: msg,
      confirmButtonText: '請重新註冊',
    })
  }
}
</script>

<template>
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form @submit.prevent="signUp" class="formControls" action="index.html">
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            v-model="registerForm.email"
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
          />
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            v-model="registerForm.nickname"
            class="formControls_input"
            type="text"
            name="name"
            id="name"
            placeholder="請輸入您的暱稱"
          />
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            v-model="registerForm.password"
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            required
          />
          <label class="formControls_label" for="pwd">再次輸入密碼</label>
          <input
            v-model="confirmPassword"
            class="formControls_input"
            type="password"
            name="confirmPwd"
            id="confirmPwd"
            placeholder="請再次輸入密碼"
            required
          />
          <input class="formControls_btnSubmit" type="submit" value="註冊帳號" />
          <RouterLink class="formControls_btnLink" to="login">登入</RouterLink>
          <!-- <a class="formControls_btnLink" href="final/login">登入</a> -->
        </form>
      </div>
    </div>
  </div>
</template>
