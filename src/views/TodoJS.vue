<script setup>
import Swal from 'sweetalert2'
import { computed, onMounted, ref } from 'vue'

const username = ref('')
// 登入登出狀態顯示
const signStatus = ref(false)

// 初始化載入
onMounted(async () => {
  const { value: name } = await Swal.fire({
    title: '歡迎使用待辦清單',
    input: 'text',
    inputLabel: '請輸入你的名字',
    inputPlaceholder: '例如：王小明',
    confirmButtonText: '開始使用',
    allowOutsideClick: false,
    inputValidator: (value) => {
      if (!value.trim()) {
        return '名字不能為空！'
      }
    },
  })

  signStatus.value = true
  username.value = name
})

const sign = async () => {
  if (!signStatus.value) {
    const { value: name } = await Swal.fire({
      title: '歡迎使用待辦清單',
      input: 'text',
      inputLabel: '請輸入你的名字',
      inputPlaceholder: '例如：王小明',
      confirmButtonText: '開始使用',
      allowOutsideClick: false,
      inputValidator: (value) => {
        if (!value.trim()) {
          return '名字不能為空！'
        }
      },
    })

    signStatus.value = true
    username.value = name
  } else {
    Swal.fire({
      icon: 'success',
      title: '登出成功',
      text: '再見!',
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    })
    signStatus.value = false
    username.value = ''
    todos.value = []
  }
}

// 新增代辦事項
const newTodo = ref({
  content: '',
})

const todos = ref([])

let todoIdIndex = 1

const addTodo = () => {
  if (!newTodo.value.content.trim()) {
    Swal.fire({
      icon: 'warning',
      title: '欄位未填寫',
      text: '請確實填寫後再送出',
      confirmButtonText: '確定',
    })
    return
  }
  const todoItem = {
    id: todoIdIndex++,
    content: newTodo.value.content,
    status: false,
  }
  todos.value.push(todoItem)
  newTodo.value.content = ''
}

const removeTodo = (todo_id) => {
  todos.value = todos.value.filter((todo) => todo.id !== todo_id)
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
        <li v-if="signStatus" class="todo_sm">
          <a href="#"
            ><span>{{ username }}的代辦</span>
          </a>
        </li>
        <li v-else class="todo_sm">
          <a href="#"><span>○○○的代辦</span> </a>
        </li>
        <li>
          <a @click.prevent="sign" href="#">{{ signStatus ? '登出' : '登入' }}</a>
        </li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input v-model="newTodo.content" type="text" placeholder="請輸入待辦事項" />
          <a @click.prevent="addTodo" href="#">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <div v-if="todos.length > 0" class="todoList_list">
          <ul class="todoList_tab">
            <li>
              <a
                @click.prevent="currentFilter = 'all'"
                href="#"
                :class="{ active: currentFilter === 'all' }"
                >全部</a
              >
            </li>
            <li>
              <a
                @click.prevent="currentFilter = 'undone'"
                href="#"
                :class="{ active: currentFilter === 'undone' }"
                >待完成</a
              >
            </li>
            <li>
              <a
                @click.prevent="currentFilter = 'done'"
                href="#"
                :class="{ active: currentFilter === 'done' }"
                >已完成</a
              >
            </li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="todo in filteredTodos" :key="todo.id">
                <label class="todoList_label">
                  <input v-model="todo.status" class="todoList_input" type="checkbox" />
                  <span>{{ todo.content }}</span>
                </label>
                <a @click.prevent="removeTodo(todo.id)" href="#">
                  <i class="fa fa-times"></i>
                </a>
              </li>
            </ul>
            <div class="todoList_statistics">
              <p>{{ totalUndoneTodo }} 個待完成項目</p>
            </div>
          </div>
        </div>
        <div v-else class="py-3">
          <p>目前尚無待辦事項</p>
        </div>
      </div>
    </div>
  </div>
</template>
