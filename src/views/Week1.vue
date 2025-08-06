<script setup>
import { ref } from 'vue'

const datas = ref([
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50,
    stock: 1,
    isEdit: false,
    temp: {
      name: '',
      description: '',
    },
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45,
    stock: 15,
    isEdit: false,
    temp: {
      name: '',
      description: '',
    },
  },
  {
    id: 3,
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: 55,
    stock: 30,
    isEdit: false,
    temp: {
      name: '',
      description: '',
    },
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 45,
    stock: 10,
    isEdit: false,
    temp: {
      name: '',
      description: '',
    },
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
    stock: 25,
    isEdit: false,
    temp: {
      name: '',
      description: '',
    },
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45,
    stock: 20,
    isEdit: false,
    temp: {
      name: '',
      description: '',
    },
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55,
    stock: 18,
    isEdit: false,
    temp: {
      name: '',
      description: '',
    },
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60,
    stock: 20,
    isEdit: false,
    temp: {
      name: '',
      description: '',
    },
  },
])

function decrease(data) {
  if (data.stock > 0) {
    data.stock--
  }
}

function increase(data) {
  data.stock++
}

function startEdit(data) {
  data.isEdit = true
  data.temp = {
    name: data.name,
    description: data.description,
  }
}

function confirmEdit(data) {
  const name = data.temp.name.trim()
  const description = data.temp.description.trim()

  if (!name || !description) {
    alert('名稱與描述都不能為空')
    return
  }

  data.name = name
  data.description = description
  data.isEdit = false
}

function cancelEdit(data) {
  data.isEdit = false
}
</script>

<template>
  <div class="container mt-4">
    <table class="table table-bordered align-middle">
      <thead class="table-light">
        <tr>
          <th scope="col">品項</th>
          <th scope="col">描述</th>
          <th scope="col">價格</th>
          <th scope="col">庫存</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="data in datas" :key="data.id">
          <!-- 品項 -->
          <td>
            <div class="d-flex gap-2 align-items-center">
              <template v-if="data.isEdit">
                <input type="text" v-model="data.temp.name" class="form-control form-control-sm" />
              </template>
              <template v-else>
                <span>{{ data.name }}</span>
              </template>
            </div>
          </td>

          <!-- 描述 -->
          <td>
            <div class="d-flex gap-2 align-items-center">
              <template v-if="data.isEdit">
                <input
                  type="text"
                  v-model="data.temp.description"
                  class="form-control form-control-sm"
                />
              </template>
              <template v-else>
                <span>{{ data.description }}</span>
              </template>
            </div>
          </td>

          <!-- 價格 -->
          <td>{{ data.price }}</td>

          <!-- 庫存 -->
          <td class="d-flex align-items-center gap-2">
            <button
              @click="decrease(data)"
              class="btn btn-outline-danger btn-sm"
              :disabled="data.stock === 0"
            >
              -
            </button>
            <span>{{ data.stock }}</span>
            <button @click="increase(data)" class="btn btn-outline-success btn-sm">+</button>
          </td>

          <!-- 操作 -->
          <td>
            <div class="d-flex gap-2 align-items-center">
              <template v-if="data.isEdit">
                <button @click="cancelEdit(data)" class="btn btn-secondary btn-sm">取消</button>
                <button
                  @click="confirmEdit(data)"
                  class="btn btn-success btn-sm"
                  :disabled="data.temp.name.trim() === ''"
                >
                  確認
                </button>
              </template>
              <template v-else>
                <button @click="startEdit(data)" class="btn btn-outline-primary btn-sm">
                  編輯
                </button>
              </template>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
