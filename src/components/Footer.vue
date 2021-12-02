<template>
  <div class="flex flex-row justify-center pr-8 m-0">
    <!-- <a @click.prevent="$emit('update-basemap',basemap)" href="">{{basemap.handle}}</a> -->
    <div @click.prevent="$emit('update-basemap',_basemap)" v-for="_basemap in basemaps" :class="['cursor-pointer','border-2',_basemap.handle==basemap?'border-black':'','w-8','h-8','bg-red-400','rounded-full'
]"><img class="rounded-full" :src="_basemap.thmb"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const PROPS = defineProps({ basemaps: Array, basemap: String })
</script>
