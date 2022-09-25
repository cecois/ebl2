<template>
  <div id="template-root p-0 m-0" class="h-screen">
    <!-- <p class="z-50 absolute text-black">3:{{query}}</p>
     -->
    <!-- <div class="z-50 absolute w-48 h-48 rounded-lg bg-green-500">z-50 absolute w-48 h-48 rounded-lg bg-green-500</div> -->
    <section id="queryMenu" class="absolute z-50 h-96 w-screen flex bg-gray-100 justify-center items-center">
      <input v-model="query" type="text" id="queryInput" class="block p-4 w-full h-full rounded-sm sm:text-lg focus:ring-blue-500 focus:border-blue-500 text-center">
    </section>
    <Map class="h-full" />
  </div>
  <!-- root -->
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref, reactive, onMounted, watch } from 'vue'
import { latLngBounds, latLng } from 'leaflet'

import Map from '/src/components/Map.vue'

const ROUTE = useRoute(),
  ROUTER = useRouter(),
  PROPS = defineProps({
    query: String
  })


onMounted(() => {
  console.log(`jeakodr comp mounted`);
  PROPS.query && console.info(`incoming query is ${PROPS.query} so we wanna fire the geocode here`);
})
</script>

<style>
body {
  font-family: 'overpass';
  font-weight: 800;
}

#queryMenu {
  background-color: rgba(244, 244, 244, .5);
  height: 25vh;
  top: 50%;
}

#queryInput {
  font-size: 3em;
}
</style>
