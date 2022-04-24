<template>
  <div id="dashboardmapvueroot" class="v-20">
    <!-- <a href="" @click.prevent="cons()">mpcons</a> -->
    <!-- <a href="" @click.prevent="">{{_BEARING()}}</a> -->
    <!-- <p>tctv.length: {{PROPS.traceActive.features[0].geometry.coordinates.length}}</p>
<p>tctv.length: {{PROPS.traceActive[PROPS.traceActive.features[0].geometry.coordinates.length - 1]}}</p>
 -->
    <div id="map" class="w-full h-full">
      <h3 class="float-left"><ArrowsExpandIcon @click.prevent="resetBbox()" class="h-10 w-10 app-bt" /></h3>
      <div class="text-current text-center align-middle swatch-done pl-2 pr-2 pt-1 pb-1 text-xs font-thin relative mr-2 float-right border-2 border-teal-500 rounded-lg">done</div>
      <div class="text-current text-center align-middle swatch-not-done pl-2 pr-2 pt-1 pb-1 text-xs font-thin relative mr-2 float-right border-2 border-teal-500 rounded-lg">not done</div>
      <div class="text-current text-center align-middle swatch-isolated pl-2 pr-2 pt-1 pb-1 text-xs font-thin relative mr-2 float-right border-2 border-teal-500 rounded-lg">isolated centerline</div>
      <div class="text-current text-center align-middle swatch-track pl-2 pr-2 pt-1 pb-1 text-xs font-thin relative mr-2 float-right border-2 border-teal-500 rounded-lg">isolated track</div>
      <!-- <p>_bearings.sw: {{_bearings.sw.length}}:_bearings.se: {{_bearings.se.length}}:_bearings.ne: {{_bearings.ne.length}}:_bearings.nw: {{_bearings.nw.length}}</p> -->
      <l-map ref="MAP" @ready="setInitialBbox()" style="height: 100%;width:100%;" @update:bounds="$emit('update-bounds',$event)">
        <l-tile-layer v-if="basemaps.length>0" v-for="baseMap in basemaps" :key="baseMap.handle" :name="baseMap.name" :visible="baseMap.handle==basemap?true:false" :url="baseMap.urii" :attribution="baseMap.attribution" layer-type="base" />
        <l-geo-json v-if="join" :geojson="join" :options="optsCenterlines">
        </l-geo-json>
        <l-geo-json v-if="trackisogeo" :geojson="trackisogeo" :options="optsTrackIso" />
        <l-geo-json v-if="PROPS.solocenterlineobject" :geojson="PROPS.solocenterlineobject.geom" :options="optsSoloCenterline" />
      </l-map>
      <div v-if="PROPS.solocenterlinestring" class="flex font-light">
        <XCircleIcon @click="$emit('set-centerline-name',null)" class="h-4 w-4 app-bt mr-1" /> <span class="font-bold">{{PROPS.solocenterlinestring}}</span>&nbsp;•&nbsp;<span class="font-bold">{{PROPS.solocenterlineobject.meta.members_done}}</span>&nbsp;done&nbsp;of&nbsp;<span class="font-bold">{{PROPS.solocenterlineobject.meta.members_total}}</span>&nbsp;total&nbsp;members&nbsp;(<span class="font-bold">{{Math.round((PROPS.solocenterlineobject.meta.members_done_length*100)/PROPS.solocenterlineobject.meta.length )}}%&nbsp;</span> completed distance of <span class="font-bold">&nbsp;~{{PROPS.solocenterlineobject.meta.length.toFixed(1)}}{{PROPS.solocenterlineobject.meta.unit}}</span>&nbsp;total)
      </div>
    </div>
  </div>
  <!-- /root container div
 -->
</template>

<script setup>
import { ref, onMounted, watch, defineEmits } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LGeoJson, LMarker, LIcon, LPopup } from '@vue-leaflet/vue-leaflet';
import { latLngBounds } from 'leaflet'

import { ArrowsExpandIcon } from '@heroicons/vue/outline'
import { XCircleIcon } from "@heroicons/vue/outline"

const MAP = ref(null);

const emit = defineEmits(['set-centerline-name', 'update-bounds'])

const leafletFitBounds = (bndsarray) => {
  MAP.value.leafletObject.fitBounds(bndsarray)
}

// THE :BoUNDS biNd DoeSn'T woRk AS oF ThIS wRiTInG - thIs IS as WORKAROuND we UsE VIa the @rEADy evenT
const setInitialBbox = () => leafletFitBounds(_BBOXARRAYTOBOUNDSARRAY(PROPS.bbox))
const resetBbox = () => leafletFitBounds(_BBOXARRAYTOBOUNDSARRAY(bboxog))

onMounted(() => {
  console.log(`dashboardmap comp mounted`);
  // temp0.value.leafletObject.fitBounds
})

// <DashboardMap @update-bounds="updateBounds" :bbox="PROPS.bbox" :trackisogeo="trackIsoGeo()" :trackiso="_TRACKISO" :join="getActiveJoin()" v-if="_COLLAPSED" :basemaps="CONFIG._BASEMAPS" :basemap="_BASEMAP" :styles="_STYLES" />
const ROUTE = useRoute(),
  ROUTER = useRouter(),
  PROPS = defineProps({
    basemaps: Array,
    basemap: String,
    // zoom: String,
    trackisogeo: Object,
    solocenterlinestring: String,
    solocenterlineobject: Object,
    // solocenterlinemeta: Object,
    trackiso: String,
    join: Object,
    // center: Object,
    bbox: Array,
    region: String,
    styles: Object
  }),
  bboxog = PROPS.bbox;

// const regionBbox = () => PROPS.bbox?: turf.bbox(join) //if theres an incoming bbox string, use it by converting to array - otherwise just use the join's bbox
// const soloCenterlineGeom = () => PROPS.join.filter(f => f.properties.name == PROPS.solocenterlinename)
// console.log("PROPS.join[55]", PROPS.join[55])
// console.log("soloCenterlineGeom", soloCenterlineGeom)

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
    return PROPS.styles.trackIso;
  },
  onEachFeature: (feature, layer) => {

    /*
    done: "done"
donesrc: "ccm"
name: "Winship ST"
oid: "6934"
ride: "EBL #030"
timestamp: "2021-11-20T07:28:57-05:00"
*/
    let pu = `<div class="flex flex-col justify-start w-full">
<p class="font-light">
<span class="font-semibold">${feature.properties.name}</span> - done <span class="font-semibold">${new Date(feature.properties.timestamp).toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
})}</span> by <span class="font-semibold">${feature.properties.ride}</span>
</p>
</div>`
    layer.bindPopup((l) => pu);
  }
}

const optsSoloCenterline = {
  style: function(feature) {
    return feature.properties.done == 'done' ? PROPS.styles.centerlinesUpDone : PROPS.styles.centerlinesUpNott;
  }
}

const _popupGuts = (l) => {
  return l.feature.properties.name
}

const optsCenterlines = {
  style: function(feature) {
    let styl = null;

    switch (true) {
      case feature.properties.name == PROPS.highlightedcenterline:
        styl = PROPS.styles.centerlinesUp
        break;
      case feature.properties.done == 'done':
        styl = PROPS.styles.centerlinesDone;
        break;
      default:
        styl = PROPS.styles.centerlinesNott
    }
    return styl; // ? PROPS.styles.centerlinesDone : PROPS.styles.centerlinesNott
  },
  onEachFeature: (feature, layer) => {
    layer.bindPopup((l) => _popupGuts(l));
    layer.on("mouseover", () => {
      layer.openPopup();
      layer.setStyle(PROPS.styles.centerlinesUp)
    }).on("mouseout", () => {
      layer.closePopup();
      layer.setStyle(feature.properties.done == 'done' ? PROPS.styles.centerlinesDone : PROPS.styles.centerlinesNott);
    }).on("click", () => {
      emit("set-centerline-name", feature.properties.name);
    })
  }
}

const _BBOX2BOUNDS = (ba) => {
  // w,S,e,N
  let b = !ba ? PROPS.bbox.split(",") : ba.split(",")
  return latLngBounds({ lat: b[1], lng: b[0] }, { lat: b[3], lng: b[2] })
}
const _BBOXARRAYTOBOUNDSARRAY = (b) => {
  // [w,S,e,N]
  // let b = PROPS.join ? turf.bbox(PROPS.join) : PROPS.bbox.split(",");
  // console.log("b", b);
  // let b = !ba ? PROPS.bbox.split(",") : ba.split(",")

  return [
    [b[1], b[0]],
    [b[3], b[2]]
  ]
}
</script>

<style>
#dashboardmapvueroot {
  height: 60vh;
  width: 100vw;
}

@font-face {
  font-family: 'Hanley Pro Slim';
  font-style: normal;
  font-weight: 400m;
  src: local('Hanley Pro Slim'), local('Hanley Pro Slim'), url('../assets/fonts/Hanley-Pro-Slim.otf') format('truetype');
}

.swatch-done {
  background-color: v-bind(PROPS.styles.centerlinesDone.color);
}

.swatch-not-done {
  background-color: v-bind(PROPS.styles.centerlinesNott.color);
}

.swatch-isolated {
  background-color: v-bind(PROPS.styles.centerlinesUpNott.color);
}

.swatch-track {
  background-color: v-bind(PROPS.styles.trackIso.color);
}
</style>
