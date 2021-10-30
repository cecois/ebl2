<template>
  <div class="container">
    <p v-for="basemap in basemaps">
      <a @click.prevent="$emit('update-basemap',basemap)" href="">{{basemap.handle}}</a></p>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, watch } from 'vue'

const PROPS = defineProps({ basemaps: Array, basemap: String })
</script>
