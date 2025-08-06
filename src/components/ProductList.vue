<script setup>
defineProps(['product'])
const emit = defineEmits(['add-to-cart'])

const handleAdd = (product) => {
  emit('add-to-cart', product)
}
</script>

<template>
  <div class="list-group">
    <a
      :key="product.id"
      @click.prevent="handleAdd(product)"
      href="#"
      class="list-group-item list-group-item-action"
      ><div class="d-flex w-100 justify-content-between">
        <h5 class="mb-1">{{ product.name }}</h5>
        <small>${{ product.price }}</small>
      </div>
      <p class="mb-1">{{ product.description }}</p></a
    >
  </div>
</template>
