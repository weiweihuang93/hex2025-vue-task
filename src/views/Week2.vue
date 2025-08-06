<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const api = 'https://todolist-api.hexschool.io'

// 註冊用資料
const registerForm = ref({
  email: '',
  password: '',
  nickname: '',
})

const signUp = async () => {
  const { email, password, nickname } = registerForm.value

  if (!email.trim() || !password.trim() || !nickname.trim()) {
    alert('請填寫所有欄位')
    return
  }
  try {
    const res = await axios.post(`${api}/users/sign_up`, registerForm.value)
    registerForm.value = {
  email: '',
  password: '',
  nickname: '',
}
    alert(`註冊成功`)
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    alert(`註冊失敗，${msg}`)
  }
}

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
    alert('請填寫所有欄位')
    return
  }
  try {
    const res = await axios.post(`${api}/users/sign_in`, loginForm.value)

    todoToken.value = res.data.token
    const expireDate = new Date(res.data.exp * 1000)
    document.cookie = `todoToken=${todoToken.value}; expires=${expireDate.toUTCString()}; path=/`

    loginForm.value = {
  email: '',
  password: '',
  nickname: '',
}
    alert(`登入成功，您好：${res.data.nickname}！`)
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    alert(`登入失敗，原因：${msg}`)
  }
}

const checkStatus = ref(false)

const checkout = async () => {
  todoToken.value = document.cookie.replace(
    /(?:(?:^|.*;\s*)todoToken\s*\=\s*([^;]*).*$)|^.*$/,
    '$1',
  )

  try {
    const res = await axios.get(`${api}/users/checkout`, {
      headers: { Authorization: todoToken.value },
    })
    checkStatus.value = true
    await getTodos()
    alert(`驗證成功，您好：${res.data.nickname}，UID：${res.data.uid}`)
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    alert(`驗證失敗，原因：${msg}`)
  }
}

onMounted(async () => {
  const cookieToken = document.cookie.replace(
    /(?:(?:^|.*;\s*)todoToken\s*\=\s*([^;]*).*$)|^.*$/,
    '$1',
  )
  if (!cookieToken) return
  todoToken.value = cookieToken

  try {
    const res = await axios.get(`${api}/users/checkout`, {
      headers: { Authorization: todoToken.value },
    })
    checkStatus.value = true
    alert(`驗證成功，您好：${res.data.nickname}，UID：${res.data.uid}`)
    await getTodos()
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    alert(`驗證失敗，原因：${msg}`)
  }
})

const signOut = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_out`, null, {
      headers: { Authorization: todoToken.value },
    })
    checkStatus.value = false
    todoToken.value = ''
    document.cookie = 'todoToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
    alert(`${res.data.message} 再見！`)
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    alert(`登出失敗，原因：${msg}`)
  }
}

// 代辦事項
const todos = ref([])

const getTodos = async () => {
  try {
    const res = await axios.get(`${api}/todos/`, {
      headers: { Authorization: todoToken.value },
    })
    todos.value = res.data.data
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    alert(`登入失敗，原因：${msg}`)
  }
}

// 新增代辦事項
const newTodo = ref({
  content: '',
})

const addTodo = async () => {
  if (!newTodo.value.content.trim()) {
    alert('請輸入代辦事項')
    return
  }
  try {
    const res = await axios.post(`${api}/todos/`, newTodo.value, {
      headers: { Authorization: todoToken.value },
    })
    await getTodos()
    newTodo.value.content = ''
    alert('新增成功')
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    alert(`新增失敗，原因：${msg}`)
  }
}

// 刪除代辦事項
const delTodo = async (todo_id) => {
  try {
    const res = await axios.delete(`${api}/todos/${todo_id}`, {
      headers: { Authorization: todoToken.value },
    })
    await getTodos()
    alert(`${res.data.message}`)
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    alert(`刪除失敗，原因：${msg}`)
  }
}

// 編輯代辦事項
const editingId = ref(null)
const tempContent = ref({
  content: '',
})

const startEdit = (todo) => {
  editingId.value = todo.id
  tempContent.value.content = todo.content
}

const confirmEditTodo = async (todo) => {
  if (!tempContent.value.content.trim()) {
    alert('請輸入代辦事項')
    return
  }

  try {
    const res = await axios.put(`${api}/todos/${todo.id}`, tempContent.value, {
      headers: { Authorization: todoToken.value },
    })
    await getTodos()
    alert(`${res.data.message}`)

    editingId.value = null
    tempContent.value.content = ''
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    alert(`更新失敗，原因：${msg}`)
  }
}

const cancelEditTodo = (todo) => {
  editingId.value = null
  tempContent.value.content = ''
}

const toggleStatus = async (todo_id) => {
  try {
    const res = await axios.patch(`${api}/todos/${todo_id}/toggle`, null, {
      headers: { Authorization: todoToken.value },
    })
    await getTodos()
    alert(`${res.data.message}`)
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    alert(`狀態更新失敗，原因：${msg}`)
  }
}
</script>

<template>
  <div class="container mt-4">
    <section class="mb-4">
      <h2>註冊</h2>
      <input v-model="registerForm.email" type="email" placeholder="Email" />
      <input v-model="registerForm.password" type="password" placeholder="Password" />
      <input v-model="registerForm.nickname" type="text" placeholder="Nickname" />
      <button @click="signUp" class="ms-2 btn btn-primary">註冊</button>
    </section>

    <section class="mb-4">
      <h2>登入</h2>
      <input v-model="loginForm.email" type="email" placeholder="Email" />
      <input v-model="loginForm.password" type="password" placeholder="Password" />
      <button @click="signIn" class="ms-2 btn btn-primary">登入</button>
    </section>

    <section class="mb-4">
      <h2>驗證</h2>
      <input :value="todoToken" type="text" placeholder="Token" readonly />
      <button @click="checkout" class="ms-2 btn btn-primary" :disabled="checkStatus">驗證</button>
    </section>

    <section class="mb-4">
      <h2>登出</h2>
      <input :value="todoToken" type="text" placeholder="Token" readonly />
      <button @click="signOut" class="ms-2 btn btn-primary">登出</button>
    </section>

    <hr />

    <div v-if="checkStatus">
      <h2 class="mb-4">Todo list</h2>
      <section class="mb-4">
        <h3 class="mb-3">新增Todo</h3>
        <div class="input-group">
          <input
            v-model="newTodo.content"
            type="text"
            class="form-control"
            placeholder="請輸入待辦事項"
          />
          <button @click="addTodo" class="btn btn-primary">新增</button>
        </div>
      </section>

      <section>
        <h3 class="mb-3">Todo列表</h3>
        <table class="table table-bordered align-middle">
          <thead class="table-light">
            <tr>
              <th scope="col">代辦事項</th>
              <th scope="col">建立時間</th>
              <th scope="col">狀態</th>
              <th scope="col">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="todo in todos" :key="todo.id">
              <td>
                <template v-if="editingId === todo.id">
                  <input v-model="tempContent.content" type="text" />
                </template>
                <template v-else>
                  {{ todo.content }}
                </template>
              </td>
              <td>{{ new Date(todo.createTime * 1000).toLocaleString('zh-TW') }}</td>
              <td>
                <span
                  @click="toggleStatus(todo.id)"
                  :style="{ color: todo.status ? 'green' : 'gray' }"
                >
                  {{ todo.status ? '已完成' : '未完成' }}
                </span>
              </td>
              <td>
                <template v-if="editingId === todo.id">
                  <div class="d-flex gap-2">
                    <button @click="cancelEditTodo(todo)" type="button" class="btn btn-secondary">
                      取消
                    </button>
                    <button @click="confirmEditTodo(todo)" type="button" class="btn btn-success">
                      確認
                    </button>
                  </div>
                </template>
                <template v-else>
                  <div class="d-flex gap-2">
                    <button @click="startEdit(todo)" type="button" class="btn btn-outline-primary">
                      編輯
                    </button>
                    <button @click="delTodo(todo.id)" type="button" class="btn btn-outline-danger">
                      刪除
                    </button>
                  </div>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
    <div v-else>
      <p>請先登入並完成驗證</p>
    </div v-else>
  </div>
</template>
