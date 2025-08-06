<script setup>
import Swal from 'sweetalert2'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const api = 'https://todolist-api.hexschool.io'
const router = useRouter()

// 登入用資料
const loginForm = ref({
  email: '',
  password: '',
  nickname: '',
})

const todoToken = ref('')

const signIn = async () => {
  const { email, password } = loginForm.value

  if (!email.trim() || !password.trim()) {
    Swal.fire({
      icon: 'warning',
      title: '欄位未填寫',
      text: '請確實填寫所有欄位後再送出',
      confirmButtonText: '確定',
    })
    return
  }
  try {
    const res = await axios.post(`${api}/users/sign_in`, loginForm.value)

    todoToken.value = res.data.token
    const expireDate = new Date(res.data.exp * 1000)
    document.cookie = `todoToken=${todoToken.value}; expires=${expireDate.toUTCString()}; path=/`

    loginForm.value = {}
    await Swal.fire({
      icon: 'success',
      title: '登入成功',
      text: `您好，${res.data.nickname}！`,
      confirmButtonText: '進入待辦頁面',
    })

    router.push('/final/todo')
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    Swal.fire({
      icon: 'error',
      title: '登入失敗',
      text: msg,
      confirmButtonText: '請重新登入',
    })
  }
}
</script>

<template>
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
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
        <form @submit.prevent="signIn" class="formControls" action="index.html">
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            v-model="loginForm.email"
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
          />
          <span>此欄位不可留空</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            v-model="loginForm.password"
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            required
          />
          <span>此欄位不可留空</span>
          <input class="formControls_btnSubmit" type="submit" value="登入" />
          <RouterLink class="formControls_btnLink" to="signup">註冊帳號</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>
