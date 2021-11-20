<template>
  <div id="mapthumb" class="w-full h-full">
    <l-map style="height: 20vh;width:100%;" :center="center" :zoom="zoom">
      <l-geo-json v-if="trackisogeo" :geojson="trackisogeo" :options="optsTrackIso" />
    </l-map>
  </div>
  <!-- /root container div
 -->
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import 'leaflet/dist/leaflet.css';
import { latLngBounds, latLng } from 'leaflet'
import { LMap, LTileLayer, LGeoJson, LMarker, LIcon } from '@vue-leaflet/vue-leaflet';
import * as turf from '@turf/turf'

onMounted(() => {
  console.log(`dashboardmapthumb comp mounted at ${new Date}`);

})

const ROUTE = useRoute(),
  ROUTER = useRouter(),
  zoom = ref(13),
  center = ref([42.35448839591497, -71.14282892527953]),
  PROPS = defineProps({
    trackisogeo: Object,
    styles: Object
  })
  // const bounds = reactive(turf.bbox(PROPS.trackisogeo));
  // const maxBounds = reactive(turf.bbox(PROPS.trackisogeo));
const envelope = reactive(turf.envelope(PROPS.trackisogeo));
// const center = reactive(turf.flip(turf.center(envelope)).geometry.coordinates); //WISH i didn't HAvE to DO ThiS
const area = reactive(turf.area(envelope))

const setCenter = () => {

    let coords = turf.flip(turf.centroid(envelope)).geometry.coordinates
    center.value = coords;
  } //setcenTER
const setZoom = () => {
  switch (true) {
    case (area <= 81500):
      zoom.value = 16;
      break;
    case (area <= 388500):
      zoom.value = 15;
      break;
    case (area <= 1400000):
      zoom.value = 14;
      break;
    default:
      zoom.value = 13;
      break;
  } //SWiTCh.areA
}

const optsTrackIso = {
  style: function(feature) {
    return PROPS.styles.centerlinesIso;
  }
}

watch(() => [PROPS.trackisogeo], (newp, oldp) => {
  setZoom();
  setCenter();
})
</script>

<style>
.leaflet-container {
  background-color: white;
}

.leaflet-control-container {
  display: none;
}
</style>
