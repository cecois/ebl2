<template>
  <a href="" @click.prevent="cons()">mpcons</a>
  <!-- <a href="" @click.prevent="">{{_BEARING()}}</a> -->
  <!-- <p>tctv.length: {{PROPS.traceActive.features[0].geometry.coordinates.length}}</p>
  <p>tctv.length: {{PROPS.traceActive[PROPS.traceActive.features[0].geometry.coordinates.length - 1]}}</p>
  <p>brng: {{_BEARING()}}</p> -->
  <div id="map" class="w-full h-full">
    <!-- <p>_bearings.sw: {{_bearings.sw.length}}:_bearings.se: {{_bearings.se.length}}:_bearings.ne: {{_bearings.ne.length}}:_bearings.nw: {{_bearings.nw.length}}</p> -->
    <l-map ref="MAP" style="height: 100%;width:100%;" :center="center" :zoom="parseInt(zoom)" @update:center="$emit('update-center',$event)" @update:zoom="$emit('update-zoom',$event)">
      <l-tile-layer v-if="basemaps.length>0" v-for="baseMap in basemaps" :key="baseMap.handle" :name="baseMap.name" :visible="baseMap.handle==basemap?true:false" :url="baseMap.urii" :attribution="baseMap.attribution" layer-type="base" />
      <l-geo-json v-if="join" :geojson="join" :options="optsCenterlines" />
      <l-geo-json v-if="trackisogeo" :geojson="trackisogeo" :options="optsTrackIso" />
    </l-map>
  </div>
  <!-- /root container div
 -->
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LGeoJson, LMarker, LIcon } from '@vue-leaflet/vue-leaflet';

const MAP = ref(null);

const leafletFitBounds
 = (bndsarray) => {
  MAP.value.leafletObject.fitBounds(bndsarray)
}

onMounted(() => {
  console.log(`dashboardmap comp mounted`);

  // temp0.value.leafletObject.fitBounds
})

const ROUTE = useRoute(),
  ROUTER = useRouter(),
  PROPS = defineProps({
    basemaps: Array,
    basemap: String,
    zoom: String,
    trackisogeo: Object,
    join: Object,
    center: Object,
    region: String,
    styles: Object
  })

const location = [40, -80]
const options = {
  trackId: 123,
  fill: true,
  fillColor: '#00ffff',
  fillOpacity: 1.0,
  stroke: true,
  color: '#000000',
  opacity: 1.0,
  weight: 1.0,
  speed: 30, // meter per second
  course: 1.0, // radians
  heading: 1.0, // radians
  size: 24,
  defaultSymbol: [0.75, 0, 0.5, 0.3, -0.5, 0.3, -0.25, 0, -0.5, -0.3, 0.5, -0.3],
  data: { name: 'Boat 2', custom: 'other info' }
};

const optsRegionBoundary = {
  style: function() {
    let style = PROPS.styles.regionBoundary
    style.opacity = .3; //nudge opacity
    return style;
  }
};

const optsTrackIso = {
  style: function(feature) {
    return PROPS.styles.centerlinesIso;
  }
}

const optsCenterlines = {
  style: function(feature) {
    return feature.properties.done == 'done' ? PROPS.styles.centerlinesDone : PROPS.styles.centerlinesNott
  }
}

const _BBOX2BOUNDS = () => {
  // w,S,e,N
  let b = PROPS.bbox.split(",")
  return latLngBounds({ lat: b[1], lng: b[0] }, { lat: b[3], lng: b[2] })
}
</script>

<style>
@font-face {
  font-family: 'Hanley Pro Slim';
  font-style: normal;
  font-weight: 400m;
  src: local('Hanley Pro Slim'), local('Hanley Pro Slim'), url('../assets/fonts/Hanley-Pro-Slim.otf') format('truetype');
}
</style>
