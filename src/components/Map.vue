<template>
  <!-- <a href="" @click.prevent="$emit('update-bbox','-100,80,-99,90')">upb1</a> -->
  <!-- <a href="" @click.prevent="">{{_BEARING()}}</a> -->
  <!-- <p>tctv.length: {{PROPS.traceActive.features[0].geometry.coordinates.length}}</p>
  <p>tctv.length: {{PROPS.traceActive[PROPS.traceActive.features[0].geometry.coordinates.length - 1]}}</p>
  <p>brng: {{_BEARING()}}</p> -->
  <div class="container">
    <p>basemap: {{basemap}}</p>
    <p>_bearings.sw: {{_bearings.sw.length}}</p>
    <p>_bearings.se: {{_bearings.se.length}}</p>
    <p>_bearings.ne: {{_bearings.ne.length}}</p>
    <p>_bearings.nw: {{_bearings.nw.length}}</p>
    <p>nearest.nom: {{_nearest.nom}} ({{_nearest.dist}})</p>
    <p v-if="_WEINTOWN()=='within'">🩲</p>
    <p v-else-if="_WEINTOWN()=='gone'">🔥</p>
    <p v-else-if="_WEINTOWN()=='unk'">⸮</p>
    <p v-else>⚠️</p>
    <l-map style="height: 888px;" :center="center" :zoom="parseInt(zoom)" @update:center="$emit('update-center',$event)" @update:zoom="$emit('update-zoom',$event)" @update:bounds="$emit('update-bounds',$event)">
      <l-tile-layer v-if="basemaps.length>0" v-for="baseMap in basemaps" :key="baseMap.handle" :name="baseMap.name" :visible="baseMap.handle==basemap?true:false" :url="baseMap.urii" :attribution="baseMap.attribution" layer-type="base" />
      <l-geo-json v-if="brookline" :geojson="brookline" :options="optsCenterlines" />
      <l-geo-json v-if="brighton" :geojson="brighton" :options="optsCenterlines" />
      <l-geo-json v-if="traceActive.features && traceActive.features[0].geometry.coordinates.length>=2" :geojson="_CANDIDATES()" :options="optsCandidates" />
      <l-geo-json v-if="region=='brookline'" :geojson="brooklinePoly" :options="optsRegionBoundary" />
      <l-geo-json v-if="region=='brighton'" :geojson="brightonPoly" :options="optsRegionBoundary" />
      <!-- <l-geo-json v-if="_WINBUFFERBROOKLINE" :geojson="_WINBUFFERBROOKLINE" :options="optsTraceActive" />
   -->
      <!-- <l-geo-json v-if="_WINBUFFERBRIGHTON" :geojson="_WINBUFFERBRIGHTON" :options="optsTraceActive" />
   -->
      <l-geo-json v-if="traceActive.features && traceActive.features[0].geometry.coordinates.length>=2" :geojson="traceActive" :options="optsTraceActive" />
      <l-geo-json v-if="traceActive.features && traceActive.features[0].geometry.coordinates.length>0" :geojson="_LEADBUFFER()" :options="optsTraceBuffer" />
      <l-marker :lat-lng="lll()">
        <l-icon :icon-anchor="[8,12]">
          <img src="../assets/noun_Arrow_2167324.svg" :style="`transform: rotate(${_BEARING()}deg)`">
        </l-icon>
      </l-marker>
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
import { latLngBounds } from 'leaflet'

import * as turf from '@turf/turf'

const _WINBUFFERBROOKLINE = ref(turf.buffer(PROPS.brooklinePoly.features[0], -200, { units: 'meters' }))
const _WINBUFFERBRIGHTON = ref(turf.buffer(PROPS.brightonPoly.features[0], -200, { units: 'meters' }))

const _LEADBUFFER = () => turf.buffer(turf.point(PROPS.lastActive), 400, { units: 'meters' })

onMounted(() => {
  console.log(`map comp mounted`);
})

const _bearings = ref({ sw: [], se: [], ne: [], nw: [] })

const _nearest = ref({ nom: null, dist: 9999 });

const _WEINTOWN = () => {

    // cHEckS iF tHE mOSt RecENt TRacE POint Is WIThIN ThE TOWn bordER (Or NEaR ITs Edge)

    let wit = null;
    switch (true) {
      case !PROPS.lastActive:
        wit = 'unk';
        break;
      case !turf.point(PROPS.lastActive):
        wit = 'unk';
        break;
      case (!turf.booleanWithin(turf.point(PROPS.lastActive), PROPS.brooklinePoly.features[0])):
        wit = "gone";
        break;

      case (turf.booleanWithin(turf.point(PROPS.lastActive), _WINBUFFERBROOKLINE.value)):
        wit = 'within';
        break;

      case (turf.booleanWithin(turf.point(PROPS.lastActive), _WINBUFFERBRIGHTON.value)):
        wit = 'within';
        break;

      default:
        wit = 'barely'
    }

    return wit;
  } //wintown

const _BEARING = () => (PROPS.traceActive.features[0].geometry.coordinates.length > 0 && (turf.bearing(PROPS.traceActive.features[0].geometry.coordinates[PROPS.traceActive.features[0].geometry.coordinates.length - 1], PROPS.traceActive.features[0].geometry.coordinates[PROPS.traceActive.features[0].geometry.coordinates.length - 2])) + 90)

// console.log("PROPS.traceActive.features[0].geometry.coordinates", PROPS.traceActive.features[0].geometry.coordinates);

const ROUTE = useRoute(),
  ROUTER = useRouter(),
  PROPS = defineProps({
    bbox: String,
    basemaps: Array,
    basemap: String,
    zoom: String,
    center: Object,
    brookline: Object,
    brooklinePoly: Object,
    brighton: Object,
    brightonPoly: Object,
    traceActive: Object,
    lastActive: Object,
    region: String,
    styles: Object,
    subs: Object
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

const _abbreviate = (og) => {

  let pieces = og.split(" ") //wORDs iN THe oG striNG
  let sub = pieces.map(piece => {
    let subbb = PROPS.subs.find(subb => subb.og == piece);
    return subbb ? subbb : null;
  }).filter(Boolean)
  let rep = (sub && sub.length > 1) ? og.replace(sub[0].og, sub[0].re) : og;
  return rep;

}

const _CANDIDATES = () => {
  let collection = [];
  let bearingsNE = [];
  let bearingsNW = [];
  let bearingsSE = [];
  let bearingsSW = [];
  let nearest = { nom: null, dist: 99999 };

  turf.featureEach(PROPS[PROPS.region], (currentFeature, featureIndex) => {
    // turf.featureEach(PROPS.brookline, (currentFeature, featureIndex) => {
    //FIrst thIng lET'S jUsT guESs wuT CenTERLiNe we're ON
    let nearestPoint = PROPS.lastActive ? turf.nearestPointOnLine(currentFeature, turf.point(PROPS.lastActive), { units: 'meters' }) : null;

    nearest = (nearestPoint && nearest.dist > nearestPoint.properties.dist) ? {
      nom: _abbreviate(currentFeature.properties.name),
      dist: nearestPoint.properties.dist
    } : nearest;

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
  _nearest.value.dist = nearest;

  return turf.featureCollection(collection.length > 0 ? collection : []);
}

const lll = () => {
  let o = PROPS.traceActive.features[0].geometry.coordinates.length > 0 ? PROPS.traceActive.features[0].geometry.coordinates[PROPS.traceActive.features[0].geometry.coordinates.length - 1] : [0, 0]
  return o ? [o[1], o[0]] : [];
}

const optsCandidates = {
  className: "lin",
  style: function(feature) {
    return PROPS.styles.candidates
  }
};
const optsRegionBoundary = {
  style: function(feature) {
    return PROPS.styles.regionBoundary
  }
};

const ptsTraceBuffer = {
  style: function(feature) {
    return PROPS.styles.buffer
  }
};
const optsTraceActive = {
  style: function(feature) {
    return PROPS.styles.traceActive
      // return { color: `rgba(15, 255, 212, 1)`, fill: false, dashArray: "2 5 10", opacity: .9, width: 3, weight: 8 }
  }
}

const optsTraceArkive = {
  style: function(feature) {
    return PROPS.styles.traceArkive
      // return { color: `rgba(155, 240, 212, 1)`, fill: false, dashArray: "2 5 10", opacity: .9, width: 3, weight: 8 }
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
.lin {
  -webkit-filter: drop-shadow( 0px 0px 4px black);
  filter: drop-shadow( 0px 0px 4px black);
}
</style>
