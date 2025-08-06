<script setup>
defineProps(['cartItem'])
const emit = defineEmits(['remove-to-cart'])

const handleRemove = (item_product_id) => {
  emit('remove-to-cart', item_product_id)
}
</script>

<template>
  <tr :key="cartItem.product.id">
    <td>
      <button @click="handleRemove(cartItem.product.id)" type="button" class="btn btn-sm">x</button>
    </td>
    <td>{{ cartItem.product.name }}</td>
    <td>
      <small>{{ cartItem.product.description }}</small>
    </td>
    <td>
      <select class="form-select" v-model="cartItem.quantity">
        <option v-for="n in 10" :key="n" :value="n">
          {{ n }}
        </option>
      </select>
    </td>
    <td>{{ cartItem.product.price }}</td>
    <td>{{ cartItem.product.price * cartItem.quantity }}</td>
  </tr>
</template>
