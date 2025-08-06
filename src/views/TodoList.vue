<script setup>
import Swal from 'sweetalert2'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const api = 'https://todolist-api.hexschool.io'
const router = useRouter()

const todoToken = ref('')
const nickname = ref('')

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
    nickname.value = res.data.nickname
    await getTodos()
    await Swal.fire({
      icon: 'success',
      title: '驗證成功',
      text: `您好，${res.data.nickname}，載入代辦事項中`,
      timer: 1500,
      showConfirmButton: false,
      timerProgressBar: true,
      allowOutsideClick: false,
    })
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    await Swal.fire({
      icon: 'error',
      title: '驗證失敗',
      text: msg,
      confirmButtonText: '請重新登入',
    })
    router.push('/final/login')
  }
})

const signOut = async () => {
  try {
    const res = await axios.post(`${api}/users/sign_out`, null, {
      headers: { Authorization: todoToken.value },
    })
    todoToken.value = ''
    document.cookie = 'todoToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
    await Swal.fire({
      icon: 'success',
      title: '登出成功',
      text: '再見!',
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    })

    router.push('/final/login')
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    await Swal.fire({
      icon: 'error',
      title: '登出失敗',
      text: msg,
      confirmButtonText: '請重新登出',
    })
  }
}

// 代辦事項
const todos = ref([{}])

const getTodos = async () => {
  try {
    const res = await axios.get(`${api}/todos/`, {
      headers: { Authorization: todoToken.value },
    })
    todos.value = res.data.data
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    await Swal.fire({
      icon: 'error',
      title: '載入失敗',
      text: msg,
      confirmButtonText: '請重新確認',
    })
  }
}

// 新增代辦事項
const newTodo = ref({
  content: '',
})

const addTodo = async () => {
  if (!newTodo.value.content.trim()) {
    Swal.fire({
      icon: 'warning',
      title: '欄位未填寫',
      text: '請確實填寫後再送出',
      confirmButtonText: '確定',
    })
    return
  }
  try {
    const res = await axios.post(`${api}/todos/`, newTodo.value, {
      headers: { Authorization: todoToken.value },
    })
    await getTodos()
    await Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '新增成功',
      showConfirmButton: false,
      timer: 1500,
    })
    newTodo.value.content = ''
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    })
  }
}

// 刪除代辦事項
const delTodo = async (todo_id) => {
  try {
    const res = await axios.delete(`${api}/todos/${todo_id}`, {
      headers: { Authorization: todoToken.value },
    })
    await getTodos()
    await Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '刪除成功',
      showConfirmButton: false,
      timer: 1500,
    })
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    })
  }
}

// 編輯代辦事項
// const editingId = ref(null)
// const tempContent = ref({
//   content: '',
// })

// const startEdit = (todo) => {
//   editingId.value = todo.id
//   tempContent.value.content = todo.content
// }

// const confirmEditTodo = async (todo) => {
//   if (!tempContent.value.content.trim()) {
//     alert('請輸入代辦事項')
//     return
//   }

//   try {
//     const res = await axios.put(`${api}/todos/${todo.id}`, tempContent.value, {
//       headers: { Authorization: todoToken.value },
//     })
//     await getTodos()
//     alert(`${res.data.message}`)

//     editingId.value = null
//     tempContent.value.content = ''
//   } catch (error) {
//     const msg = error.response?.data?.message || '發生未知錯誤'
//     alert(`更新失敗，原因：${msg}`)
//   }
// }

// const cancelEditTodo = (todo) => {
//   editingId.value = null
//   tempContent.value.content = ''
// }

const toggleStatus = async (todo_id) => {
  try {
    const res = await axios.patch(`${api}/todos/${todo_id}/toggle`, null, {
      headers: { Authorization: todoToken.value },
    })
    await getTodos()
    await Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: '狀態更新成功',
      showConfirmButton: false,
      timer: 1500,
    })
  } catch (error) {
    const msg = error.response?.data?.message || '發生未知錯誤'
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      title: msg,
      showConfirmButton: false,
      timer: 1500,
    })
  }
}

const totalUndoneTodo = computed(() => {
  return todos.value.filter((todo) => !todo.status).length
})

// 切換分類
const currentFilter = ref('all') // 'all' | 'undone' | 'done'

const filteredTodos = computed(() => {
  if (currentFilter.value === 'all') return todos.value
  if (currentFilter.value === 'undone') return todos.value.filter((todo) => !todo.status)
  if (currentFilter.value === 'done') return todos.value.filter((todo) => todo.status)
})
</script>

<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <a href="#"
            ><span>{{ nickname }}的代辦</span></a
          >
        </li>
        <li><a @click.prevent="signOut" href="#loginPage">登出</a></li>
      </ul>
    </nav>
    <div class="container todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input v-model="newTodo.content" type="text" placeholder="請輸入待辦事項" />
          <a href="#" @click.prevent="addTodo">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <div class="todoList_list">
          <ul class="todoList_tab">
            <li>
              <a
                href="#"
                :class="{ active: currentFilter === 'all' }"
                @click.prevent="currentFilter = 'all'"
                >全部</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ active: currentFilter === 'undone' }"
                @click.prevent="currentFilter = 'undone'"
                >待完成</a
              >
            </li>
            <li>
              <a
                href="#"
                :class="{ active: currentFilter === 'done' }"
                @click.prevent="currentFilter = 'done'"
                >已完成</a
              >
            </li>
          </ul>
          <div v-if="todos.length > 0" class="todoList_items">
            <ul class="todoList_item">
              <li v-for="todo in filteredTodos" :key="todo.id">
                <label class="todoList_label">
                  <input
                    class="todoList_input"
                    type="checkbox"
                    :checked="todo.status"
                    @change="toggleStatus(todo.id)"
                  />
                  <span>{{ todo.content }}</span>
                </label>
                <a href="#" @click.prevent="delTodo(todo.id)">
                  <i class="fa fa-times"></i>
                </a>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p>{{ totalUndoneTodo }}個未完成項目</p>
            </div>
          </div>
          <div v-else>
            <p class="py-4">目前尚無待辦事項</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
