<template>
  <div id="mapthumb" class="w-full h-full">
    <l-map ref="MAPTHUMB" style="height: 30vh;width:100%;" @ready="setBbox()">
      <!--   -->
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


/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ mAp HACk  */
// THE :BoUNDS biNd DoeSn'T woRk AS oF ThIS wRiTInG - thIs IS as WORKAROuND we UsE VIa the @rEADy evenT
const MAPTHUMB = ref(null);
const leafletFitBounds = () => {
  let bbox = turf.bbox(PROPS.trackisogeo); // [w,s,e,n]
  let boundsarray = [
    [bbox[3], bbox[0]],
    [bbox[1], bbox[2]]
  ]
  MAPTHUMB.value.leafletObject.fitBounds(boundsarray);
}
const setBbox = () => leafletFitBounds()
  /* +++++++++++++++++++++++++++++++++++++++++++++++++++++++ /mAp HACk  */

onMounted(() => {
  console.log(`dashboardmapthumb comp mounted at ${new Date}`);
})

const ROUTE = useRoute(),
  ROUTER = useRouter(),
  PROPS = defineProps({
    trackisogeo: Object,
    styles: Object
  })

const optsTrackIso = {
  style: function(feature) {
    return PROPS.styles.trackIso;
  }
}

watch(() => [PROPS.trackisogeo], (newp, oldp) => {
  if (typeof MAPTHUMB.value.leafletObject.fitBounds == 'function') { setBbox(); }
  /*setZoom();
  setCenter();*/
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
