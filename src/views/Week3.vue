<script setup>
import CartList from '@/components/CartList.vue'
import OrderForm from '@/components/OrderForm.vue'
import ProductList from '@/components/ProductList.vue'
import { computed, ref } from 'vue'

const products = [
  {
    id: 1,
    name: '珍珠奶茶',
    description: '香濃奶茶搭配QQ珍珠',
    price: 50,
  },
  {
    id: 2,
    name: '冬瓜檸檬',
    description: '清新冬瓜配上新鮮檸檬',
    price: 45,
  },
  {
    id: 3,
    name: '翡翠檸檬',
    description: '綠茶與檸檬的完美結合',
    price: 55,
  },
  {
    id: 4,
    name: '四季春茶',
    description: '香醇四季春茶，回甘無比',
    price: 45,
  },
  {
    id: 5,
    name: '阿薩姆奶茶',
    description: '阿薩姆紅茶搭配香醇鮮奶',
    price: 50,
  },
  {
    id: 6,
    name: '檸檬冰茶',
    description: '檸檬與冰茶的清新組合',
    price: 45,
  },
  {
    id: 7,
    name: '芒果綠茶',
    description: '芒果與綠茶的獨特風味',
    price: 55,
  },
  {
    id: 8,
    name: '抹茶拿鐵',
    description: '抹茶與鮮奶的絕配',
    price: 60,
  },
]

const cart = ref([])

const addToCart = (product) => {
  const index = cart.value.findIndex((cartItem) => cartItem.id === product.id)
  if (index === -1) {
    cart.value.push({
      product: { ...product },
      quantity: 1,
    })
  }
}

const removeToCart = (item_product_id) => {
  const index = cart.value.findIndex((cartItem) => cartItem.product.id === item_product_id)
  if (index !== -1) {
    cart.value.splice(index, 1)
  }
}

const totalCost = computed(() => {
  return cart.value.reduce((sum, cur) => {
    return sum + cur.product.price * cur.quantity
  }, 0)
})

const order = ref({})
const note = ref('')

const sendOrder = () => {
  order.value = {
    cart: cart.value.map((item) => ({ ...item })), // 深層複製，避免後續同步錯誤
    note: note.value,
    totalCost: totalCost.value,
  }
  cart.value = []
  note.value = ''
}
</script>

<template>
  <div id="root">
    <div class="container py-5">
      <div class="row">
        <div class="col-md-4">
          <ProductList v-for="product in products" :product="product" @add-to-cart="addToCart" />
        </div>
        <div class="col-md-8">
          <template v-if="cart.length > 0">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col" width="50">操作</th>
                  <th scope="col">品項</th>
                  <th scope="col">描述</th>
                  <th scope="col" width="90">數量</th>
                  <th scope="col">單價</th>
                  <th scope="col">小計</th>
                </tr>
              </thead>
              <tbody>
                <CartList
                  v-for="cartItem in cart"
                  :cartItem="cartItem"
                  @remove-to-cart="removeToCart"
                />
              </tbody>
            </table>

            <div class="text-end mb-3">
              <h5>
                總計: <span>${{ totalCost }}</span>
              </h5>
            </div>
            <textarea
              v-model="note"
              class="form-control mb-3"
              rows="3"
              placeholder="備註"
            ></textarea>
            <div class="text-end">
              <button @click="sendOrder" class="btn btn-primary">送出</button>
            </div>
          </template>
          <template v-else>
            <div class="alert alert-primary text-center mb-0">
              購物車內還沒有任何商品，點擊左側選單加入商品吧！
            </div>
          </template>
        </div>
      </div>
      <hr />
      <div class="row justify-content-center">
        <div class="col-8">
          <div v-if="order.cart" class="card">
            <OrderForm :order="order" />
          </div>
          <div v-else class="alert alert-secondary text-center mb-0">尚未建立訂單</div>
        </div>
      </div>
    </div>
  </div>
</template>
