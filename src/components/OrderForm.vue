<script setup>
const props = defineProps(['order'])
</script>

<template>
  <div class="card-body">
    <div class="card-title">
      <h5>訂單</h5>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">品項</th>
            <th scope="col">數量</th>
            <th scope="col">小計</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.cart" :key="item.product.id">
            <td>{{ item.product.name }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.product.price * item.quantity }}</td>
          </tr>
        </tbody>
      </table>
      <div class="text-end">
        備註: <span>{{ order.note }}</span>
      </div>
      <div class="text-end">
        <h5>
          總計: <span>${{ order.totalCost }}</span>
        </h5>
      </div>
    </div>
  </div>
</template>
