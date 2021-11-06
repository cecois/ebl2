<template>
  <!-- <a href="" @click.prevent="$emit('update-bbox','-100,80,-99,90')">upb1</a> -->
  <!-- <a href="" @click.prevent="">{{_BEARING()}}</a> -->
  <!-- <p>tctv.length: {{PROPS.traceActive.features[0].geometry.coordinates.length}}</p>
  <p>tctv.length: {{PROPS.traceActive[PROPS.traceActive.features[0].geometry.coordinates.length - 1]}}</p>
  <p>brng: {{_BEARING()}}</p> -->
  <div id="map" class="h-55">
    <!-- <p>_bearings.sw: {{_bearings.sw.length}}:_bearings.se: {{_bearings.se.length}}:_bearings.ne: {{_bearings.ne.length}}:_bearings.nw: {{_bearings.nw.length}}</p> -->
    <div id="streetPlateParent">
      <div id="streetPlateContentWrapper" :class="['pt-0','pb-1',_WEINTOWN()]">
        <div id="number" class="align-middle">
          {{_nearest}}
        </div>
      </div>
    </div>
    <div class=" flex flex-col">
      <div class="bg-gray-100 w-full h-auto flex flex-row ">
        <div class="relative flex-1 flex flex-col gap-1 items-center">
          <label class="text-gray-800 text-base text-center">
            <ChevronLeftIcon class="transform -rotate-45 h-5 w-5 directional-icon" />
          </label>
          <label :class="['text-gray-400','font-thin','text-sm text-center','relative -inset-y-2',_bearings.sw.length<=3 && _bearings.sw.length>0?'lowStreetCountAlert':'']">{{_bearings.sw.length}}</label>
        </div>
        <div class="relative flex-1 flex flex-col gap-1 items-center">
          <label class="text-gray-800 text-base text-center">
            <ChevronRightIcon class="float-right transform rotate-45 justify-self-auto h-5 w-5 directional-icon" />
          </label>
          <label :class="['text-gray-400','font-thin','text-sm text-center','relative -inset-y-2',_bearings.se.length<=3 && _bearings.se.length>0?'lowStreetCountAlert':'']">{{_bearings.se.length}}</label>
        </div>
        <div class="relative flex-1 flex flex-col gap-1 items-center">
          <label class="-inset-y-1 relative text-gray-800 text-base text-center">
            <ChevronRightIcon class="float-right transform -rotate-45 justify-self-auto h-5 w-5 directional-icon" />
          </label>
          <label :class="['text-gray-400','font-thin','text-sm text-center','relative -inset-y-2',_bearings.ne.length<=3 && _bearings.ne.length>0?'lowStreetCountAlert':'']">{{_bearings.ne.length}}</label>
        </div>
        <div class="relative flex-1 flex flex-col gap-1 items-center">
          <label class="-inset-y-1 relative text-gray-800 text-base text-center">
            <ChevronLeftIcon class="float-right transform rotate-45 justify-self-auto h-5 w-5 directional-icon" />
          </label>
          <label :class="['text-gray-400','font-thin','text-sm text-center','relative -inset-y-2',_bearings.nw.length<=3 && _bearings.nw.length>0?'lowStreetCountAlert':'']">{{_bearings.nw.length}}</label>
        </div>
      </div>
    </div>
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
      <div class="inset-x-0">w?</div>
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
import { ChevronLeftIcon } from '@heroicons/vue/solid'
import { ChevronRightIcon } from '@heroicons/vue/solid'

const _WINBUFFERBROOKLINE = ref(turf.buffer(PROPS.brooklinePoly.features[0], -50, { units: 'meters' }))
const _WINBUFFERBRIGHTON = ref(turf.buffer(PROPS.brightonPoly.features[0], -50, { units: 'meters' }))

const _LEADBUFFER = () => turf.buffer(turf.point(PROPS.lastActive), 400, { units: 'meters' })

onMounted(() => {
  console.log(`map comp mounted`);
})

const _bearings = ref({ sw: [], se: [], ne: [], nw: [] })

// const _nearest = ref({ nom: '...', dist: 9999 });
const _nearest = ref('...');

const _WEINTOWN = () => {

    // cHEckS iF tHE mOSt RecENt TRacE POint Is WIThIN ThE TOWn bordER (Or NEaR ITs Edge)

    let wit = null;
    switch (true) {
      case !PROPS.lastActive:
        wit = 'streetPlateOk';
        break;
      case !turf.point(PROPS.lastActive):
        wit = 'streetPlateOk';
        break;
      case (!turf.booleanWithin(turf.point(PROPS.lastActive), PROPS[`${PROPS.region}Poly`].features[0])):
        wit = "streetPlateGone";
        break;

      case (turf.booleanWithin(turf.point(PROPS.lastActive), _WINBUFFERBROOKLINE.value)):
        wit = 'streetPlateWarning';
        break;

      case (turf.booleanWithin(turf.point(PROPS.lastActive), _WINBUFFERBRIGHTON.value)):
        wit = 'streetPlateWarning';
        break;

      default:
        wit = 'streetPlateOk'
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
    // console.log("pieces", pieces);
  let sub = pieces.map(piece => {
      let subbb = PROPS.subs.find(subb => subb.og.toLowerCase() == piece.toLowerCase());
      return subbb ? subbb : null;
    }).filter(Boolean)
    // console.log("sub", sub);
  let rep = (sub && sub.length > 1) ? og.replace(sub[0].og, sub[0].re) : og;
  // console.log("rep", rep);
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

    //FIrst thIng lET'S jUsT guESs wuT CenTERLiNe we're ON
    let nearestPoint = PROPS.lastActive ? turf.nearestPointOnLine(currentFeature, turf.point(PROPS.lastActive), { units: 'meters' }) : null;

    if (currentFeature.properties.name.toLowerCase().indexOf('crown') >= 0) { console.log("currentFeature.properties.name", currentFeature.properties.name); }
    nearest = (nearestPoint && nearest.dist > nearestPoint.properties.dist) ? { nom: _abbreviate(currentFeature.properties.name), dist: nearestPoint.properties.dist } : nearest;
    _nearest.value = nearest.nom
      // _nearest.value = nearestPoint ? _abbreviate(currentFeature.properties.name) : '...'
      // _nearest.value = '...'

    // _nearest.dist = nearestPoint ? nearestPoint.properties.dist : 0

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
  // _nearest = nearest;

  return turf.featureCollection(collection.length > 0 ? collection : []);
}

const lll = () => {
  let o = PROPS.traceActive.features[0].geometry.coordinates.length > 0 ? PROPS.traceActive.features[0].geometry.coordinates[PROPS.traceActive.features[0].geometry.coordinates.length - 1] : [0, 0]
  return o ? [o[1], o[0]] : [];
}

const optsCandidates = {
  className: "lin",
  style: function() {
    return PROPS.styles.candidates
  }
};
const optsRegionBoundary = {
  style: function() {
    let style = PROPS.styles.regionBoundary
    style.opacity = .3; //nudge opacity
    return style;
  }
};

const optsTraceBuffer = {
  style: function() {
    let style = PROPS.styles.buffer
    style.opacity = 0;
    style.fillOpacity = 0;
    return style;
  }
};
const optsTraceActive = {
  style: function(feature) {
    let style = PROPS.styles.traceActive
    style.opacity = .8;
    return style;
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

@font-face {
  font-family: 'Hanley Pro Slim';
  font-style: normal;
  font-weight: 400m;
  src: local('Hanley Pro Slim'), local('Hanley Pro Slim'), url('../assets/fonts/Hanley-Pro-Slim.otf') format('truetype');
}

.lowStreetCountAlert {
  font-weight: 800;
  color: v-bind(styles.candidates.color);
}

#streetPlateParent {
  display: block;
  border-radius: 10px;
  line-height: 1.1;
  vertical-align: middle;
}

.streetPlateOk {
  background-color: v-bind(styles.white);
  color: #000000;
}

.streetPlateWarning {
  background-color: v-bind(styles.warning);
  color: white;
}

.streetPlateGone {
  background-color: v-bind(styles.red);
  color: white;
}

#streetPlateContentWrapper {
  text-align: center;
  border: 3px solid;
  border-radius: 10px;
  font-family: "Hanley Pro Slim";
  font-size: 3em;
  font-weight: 800;
}

.directional-icon {
  color: v-bind(styles.red);
}
</style>
