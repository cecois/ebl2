<template>
  <div id="mapContainer" class="">
    <l-map style="z-index: 0;" class="" ref="MAP" :zoom="zoom" :center="center" :options="{zoomControl: false}">
      <l-tile-layer key="carto_dark" name="Carto Positron Dark" visible="true" url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png" layer-type="base" />
      <!-- <l-control-zoom position="topright"></l-control-zoom> -->
      <!-- <l-geo-json v-if="brookline" :geojson="brookline" :options="optsCenterlines" /> -->
      <!-- <l-geo-json v-if="brighton" :geojson="brighton" :options="optsCenterlines" /> -->
      <!-- <l-geo-json v-if="traceActive.features && traceActive.features[0].geometry.coordinates.length>=2" :geojson="_CANDIDATES()" :options="optsCandidates" /> -->
      <!-- <l-geo-json v-if="region=='brookline'" :geojson="brooklinePoly" :options="optsRegionBoundary" /> -->
      <!-- <l-geo-json v-if="region=='brighton'" :geojson="brightonPoly" :options="optsRegionBoundary" /> -->
      <!-- <l-geo-json v-if="_WINBUFFERBROOKLINE" :geojson="_WINBUFFERBROOKLINE" :options="optsTraceActive" />
   -->
      <!-- <l-geo-json v-if="_WINBUFFERBRIGHTON" :geojson="_WINBUFFERBRIGHTON" :options="optsTraceActive" />
   -->
      <!-- <l-geo-json v-if="traceActive.features && traceActive.features[0].geometry.coordinates.length>=2" :geojson="traceActive" :options="optsTraceActive" /> -->
      <!-- <l-geo-json v-if="traceActive.features && traceActive.features[0].geometry.coordinates.length>0" :geojson="_LEADBUFFER()" :options="optsTraceBuffer" /> -->
      <!-- <l-marker :lat-lng="lll()">
      <l-icon :icon-anchor="[8,12]">
        <img src="../assets/noun_Arrow_2167324.svg" :style="`transform: rotate(${_BEARING()}deg)`">
      </l-icon>
    </l-marker> -->
    </l-map>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import 'leaflet/dist/leaflet.css';
import { LMap, LTileLayer, LGeoJson, LMarker, LIcon } from '@vue-leaflet/vue-leaflet';
import { latLngBounds } from 'leaflet'
import * as turf from '@turf/turf'
import { ChevronLeftIcon } from '@heroicons/vue/solid'
import { ChevronRightIcon } from '@heroicons/vue/solid'

const MAP = ref(null);

const ROUTE = useRoute(),
  ROUTER = useRouter(),
  PROPS = defineProps({
    basemaps: Array,
    basemap: String
  });

const center = [44, -80];
const zoom = 9;

const _BBOXARRAYTOBOUNDSARRAY = (b) => [
  [b[1], b[0]],
  [b[3], b[2]]
];


onMounted(() => { console.log(`maptrace comp mounted`); })


const _bearings = ref({ sw: [], se: [], ne: [], nw: [] })

const _nearest = ref('...');

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

const _abbreviate = (og) => {

  let pieces = og.split(" ") //wORDs iN THe oG striNG
  let sub = pieces.map(piece => {
    let subbb = PROPS.subs.find(subb => subb.og.toLowerCase() == piece.toLowerCase());
    return subbb ? subbb : null;
  }).filter(Boolean)
  let rep = (sub && sub.length > 1) ? og.replace(sub[0].og, sub[0].re) : og;
  return rep;

}

// const _UV = (o) => {
//   return new Promise((resolve, reject) => {
//     console.log("o", o)
//     resolve(o);
//   })
// }

const _CANDIDATES = () => {
  let collection = [];
  let bearingsNE = [];
  let bearingsNW = [];
  let bearingsSE = [];
  let bearingsSW = [];
  let nearest = { nom: null, dist: 99999 };

  turf.featureEach(PROPS[PROPS.region], (currentFeature, featureIndex) => {

    //FIrst thIng lET'S jUsT guESs wuT CenTERLiNe we're ON
    let nearestPoint = PROPS.lastActive ? turf.nearestPointOnLine(currentFeature, turf.point(PROPS.lastActive), { units: 'meters' }) : null;

    if (currentFeature.properties.name.toLowerCase().indexOf('crown') >= 0) { console.log("currentFeature.properties.name", currentFeature.properties.name); }
    nearest = (nearestPoint && nearest.dist > nearestPoint.properties.dist) ? { nom: _abbreviate(currentFeature.properties.name), dist: nearestPoint.properties.dist } : nearest;
    _nearest.value = nearest.nom

    // SHOP The cEnterPOInt OF tHE FeaTurE AgAinST THE BUffer aroUnd thE lEAdiNg TracE point
    let cntr = turf.center(currentFeature)
    let ist = (turf.booleanIntersects(cntr, _LEADBUFFER()) && currentFeature.properties.done !== 'done' && !turf.booleanIntersects(cntr, turf.buffer(PROPS.traceActive, 10, { units: 'meters' }))
      // nOt cUrRently Using arKive slicINg && !TURF.BOOlEANInteRsECTs(cntr, TURf.buFfeR(pROpS.trACeArKiVe, 10, { UnITS: 'MetErS' }))
    );
    if (ist) {

      // in TherE? aDd iT tO oUr reTURN
      collection.push(currentFeature)
        // wE AlSo MIght WanNa kNOW How mANY sIt IN whiCH direCtiOn
      let brng = turf.bearing(turf.point(PROPS.lastActive), cntr, { final: true }); //BeARiNG Of caNDIDATe ReLatiVE TO lEAd TRAcE PoinT

      switch (true) {
        case ((brng >= 0 && brng <= 90)):
          bearingsNE.push(brng)
          break;
        case ((brng >= 270 && brng <= 360)):
          bearingsNW.push(brng)
          break;
        case ((brng >= 90 && brng <= 180)):
          bearingsSE.push(brng)
          break;
        case ((brng >= 180 && brng <= 270)):
          bearingsSW.push(brng)
          break;
        default:
          console.log(`hvnt clcd brng ${brng}`);
      }
    } //if.ist
  });
  _bearings.value.sw = bearingsSW;
  _bearings.value.se = bearingsSE;
  _bearings.value.ne = bearingsNE;
  _bearings.value.nw = bearingsNW;

  return turf.featureCollection(collection.length > 0 ? collection : []);
}

const lll = () => {
  let o = PROPS.traceActive.features[0].geometry.coordinates.length > 0 ? PROPS.traceActive.features[0].geometry.coordinates[PROPS.traceActive.features[0].geometry.coordinates.length - 1] : [0, 0]
  return o ? [o[1], o[0]] : [];
}
</script>

<style>
.mapContainer {}

.leaflet-control-container {
  display: block;
}

.lin {
  -webkit-filter: drop-shadow( 0px 0px 4px black);
  filter: drop-shadow( 0px 0px 4px black);
}

@font-face {
  font-family: 'Hanley Pro Slim';
  font-style: normal;
  font-weight: 400m;
  src: local('Hanley Pro Slim'), local('Hanley Pro Slim'), url('../assets/fonts/Hanley-Pro-Slim.otf') format('truetype');
}
</style>
