<template>
  <div class="font-sans leading-normal tracking-normal mt-12">
    <!--Nav-->
    <nav class="pt-2 md:pt-1 pb-1 px-1 mt-0 h-auto fixed w-full z-20 top-0">
      <div class="flex flex-wrap items-center">
        <div class="flex flex-shrink md:w-1/3 justify-center md:justify-start text-white">
          <a href="#">
            <span class="text-xl pl-2"><i class="em em-grinning"></i></span>
          </a>
        </div>
        <div class="flex flex-1 md:w-1/3 justify-center md:justify-start text-white px-2">
          <span class="relative w-full">
                    <input type="search" placeholder="Search" class="w-full bg-gray-900 text-white transition border border-transparent focus:outline-none focus:border-gray-400 rounded py-3 px-2 pl-10 appearance-none leading-normal">
                    <div class="absolute search-icon" style="top: 1rem; left: .8rem;">
                        <svg class="fill-current pointer-events-none text-white w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
  <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
</svg>

                    </div>
                </span>
        </div>
        <div class="flex w-full pt-2 content-center justify-between md:w-1/3 md:justify-end">
          <ul class="list-reset flex justify-between flex-1 md:flex-none items-center">
            <li class="flex-1 md:flex-none md:mr-3">
              <a class="inline-block py-2 px-4 text-white no-underline" href="#">Active</a>
            </li>
            <li class="flex-1 md:flex-none md:mr-3">
              <a class="inline-block text-gray-600 no-underline hover:text-gray-200 hover:text-underline py-2 px-4" href="#">link</a>
            </li>
            <li class="flex-1 md:flex-none md:mr-3">
              <div class="relative inline-block">
                <a class="text-black" href="" @click.prevent="_COLLAPSED=!_COLLAPSED">{{_COLLAPSED}}</a>
                <div id="myDropdown" class="dropdownlist absolute text-white right-0 mt-3 p-3 overflow-auto z-30 invisible">
                  <input type="text" class="drop-search p-2 text-gray-600" placeholder="Search.." id="myInput" onkeyup="filterDD('myDropdown','myInput')">
                  <a href="#" class="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i class="fa fa-user fa-fw"></i> Profile</a>
                  <a href="#" class="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i class="fa fa-cog fa-fw"></i> Settings</a>
                  <div class="border border-gray-800"></div>
                  <a href="#" class="p-2 hover:bg-gray-800 text-white text-sm no-underline hover:no-underline block"><i class="fas fa-sign-out-alt fa-fw"></i> Log Out</a>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div class="flex flex-col md:flex-row">
      <div class="shadow-xl h-16 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-48">
        <div class="md:mt-12 md:w-48 md:fixed md:left-0 md:top-0 content-center md:content-start text-left justify-between">
          <ul class="list-reset flex flex-row md:flex-col py-0 md:py-3 px-1 md:px-2 text-center md:text-left">
            <li v-for="_region in CONFIG._REGIONS" class="mr-3 flex-1">
              <a @click.prevent="region=_region.handle" :class="['nav-button',_region.handle==region?'nav-button-chosen':'','mr-8']" href="#">{{_region.label}}</a>
              <!-- <a href="#" class="block py-1 md:py-3 pl-1 align-middle text-white no-underline hover:text-white border-b-2 border-gray-800 hover:border-pink-500">
  <i class="fas fa-tasks pr-0 md:pr-3"></i><span class="pb-1 md:pb-0 text-xs md:text-base text-gray-600 md:text-gray-400 block md:inline-block">{{region.label}}</span>
</a>
 -->
            </li>
          </ul>
          <ul v-if="META[PROPS.region]">
            <li v-for="track in META[PROPS.region].tracks">
              <a :class="[_TRACKISO==track.track?'text-grey-900':'text-gray-300']" href="" @click.prevent="_TRACKISO=track.track">{{track.track}}</a>
              <div>({{track.timestamp}})</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="main-content flex-1 bg-gray-100 mt-12 md:mt-2 pb-24 md:pb-5">
        <div class="pt-3">
          <div class="bg-gradient-to-r from-blue-900 to-gray-800 p-4 shadow text-2xl text-white">
            <!-- <h3 class="font-bold pl-2">{{region}}</h3> -->
            <h3 v-for="_region in CONFIG._REGIONS.filter(r=>r.handle==region)" class="font-bold pl-2">{{_region.handle}}</h3>
          </div>
        </div>
        <DashboardMap :trackisogeo="trackIsoGeo()" :trackiso="_TRACKISO" :join="getActiveJoin()" v-if="_COLLAPSED" :center="_CENTERME()" :zoom="_ZOOM" @update-center="_CENTERED" @update-zoom="_SETZOOM" :basemaps="CONFIG._BASEMAPS" :basemap="_BASEMAP" :styles="_STYLES" />
        <div v-if="!_COLLAPSED" class="flex flex-wrap">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8 m-5">
            <div class="border p-4 text-center col-span-1 lg:col-span-1">
              <div v-if="Object.keys(META).length>0" v-for="_region in CONFIG._REGIONS.filter(r=>r.handle==region)" class="grid grid-cols-1 gap-4">
                <div class="border">totallength, {{_region.handle}}: {{Math.round(META[_region.handle].totalLength )}}km
                </div>
                <!-- ... -->
                <div class="border">doneLength, {{_region.handle}}:{{META[_region.handle].doneLength}}</div>
                <div class="border">donecount, {{_region.handle}}:{{META[_region.handle].doneCount}}</div>
                <div class="border">notDoneCount, {{_region.handle}}:{{META[_region.handle].notDoneCount}}</div>
                <div class="border">notDonelength, {{_region.handle}}:{{META[_region.handle].notDoneLength}}</div>
                <div class="border">
                  <span v-for="(uniq,uniqi) in META[_region.handle].aheadUnique">{{uniq}} <span v-if="uniqi!==META[_region.handle].aheadUnique.length-1">•</span> </span>
                </div>
              </div>
            </div>
            <div v-if="_TRACKISO" class="border p-4 text-center">
              <div>{{_TRACKISO}}</div>
              <div>{{trackIsoMeta()}}</div>
              <DashboardTrackThumb :trackisogeo="trackIsoGeo()" :styles="_STYLES" />
            </div>
            <!-- <div class="border p-4 text-center">One of three columns</div> -->
          </div>
        </div>
        <!-- /dashboard area -->
      </div>
    </div>
  </div>
  <!-- root -->
</template>

<script setup>
import CONFIG from '../CONFIG.json'
import { ref, reactive, onMounted, watch } from 'vue'
import { latLngBounds, latLng } from 'leaflet'
import * as turf from '@turf/turf'

import { useRoute, useRouter } from 'vue-router'
import DashboardMap from '/src/components/DashboardMap.vue'
import DashboardTrackThumb from '/src/components/DashboardTrackThumb.vue'
import Brookline from '../assets/join_brookline.json'
import Brighton from '../assets/join_brighton.json'


const META = {},
  PROPS = defineProps({ trackiso: String, region: String, basemap: String, center: String, collapsed: Boolean, zoom: String }),
  _COLLAPSED = PROPS.collapsed == '$' ? ref(false) : ref(true),
  _STYLES = CONFIG._STYLES,
  _BASEMAP = ref(PROPS.basemap),
  _ZOOM = ref(PROPS.zoom),
  _TRACKISO = PROPS.trackiso !== '$' ? ref(decodeURI(PROPS.trackiso)) : ref(false),
  _CENTER = ref(PROPS.center ? PROPS.center : "-100,50"),
  ROUTE = useRoute(),
  ROUTER = useRouter()


/*                   __  __              __
   ____ ___  ___  / /_/ /_  ____  ____/ /____
  / __ `__ \/ _ \/ __/ __ \/ __ \/ __  / ___/
 / / / / / /  __/ /_/ / / / /_/ / /_/ (__  )
/_/ /_/ /_/\___/\__/_/ /_/\____/\__,_/____/
*/

const _pluck = (arr, key) => arr.map(o => o.properties[key])
const _unique = (value, index, self) => self.indexOf(value) === index;

/*const currentRegionTracks = () => { let tracks = null; switch (PROPS.region) { case 'brookline': tracks = _pluck(Brookline.features, 'ride').filter(_unique) } //swiTcH return tracks } //CUrRENtReGiONTraCks
 */

const trackIsoMeta = () => {
    let track = trackIsoGeo();
    let time = META[PROPS.region] ? META[PROPS.region].tracks.find(t => t.track == _TRACKISO.value).timestamp : null
    return { timestamp: time, length: turf.length(track, { units: 'kilometers' }) }
  } //trACKIsOMEta

const trackIsoGeo = () => {

    let iso = {
      "type": "FeatureCollection",
      "features": null
    };

    switch (PROPS.region) {
      case 'brookline':
        iso.features = Brookline.features.filter(fea => (fea.properties.ride == _TRACKISO.value && fea.properties.done == 'done'))
        break;
      case 'brighton':
        iso.features = Brighton.features.filter(fea => (fea.properties.ride == _TRACKISO.value && fea.properties.done == 'done'))
        break;
    }
    return iso;
  } //TrACKISogeO

const getActiveJoin = () => {
    let join = null;
    switch (PROPS.region) {
      case 'brookline':
        join = Brookline;
        join.region = 'brookline'
        break;
      case 'brighton':
        join = Brighton;
        join.region = 'brighton'
        break;
    } //switch
    return join;
  } //gEtacTiVEjSoIn
const _SETZOOM = (z) => {
    _ZOOM.value = z;
  }
  // const invertCollapse = () => {
  //   _COLLAPSED.value == 'true' && (_COLLAPSED.value = 'false'
  // );
  //   _COLLAPSED.value == 'false' && (_COLLAPSED.value = 'true');
  // }
const _CENTERED = (h) => {
  _CENTER.value = `${h.lng},${h.lat}`
}
const _CENTERME = () => {
  let b = PROPS.center.split(',')
  let clsw = latLng(b[1], b[0])
  return clsw
}


const setRegionMeta = () => {

  CONFIG._REGIONS.forEach(r => {

    let doneAudit = DONEAUDIT(r.handle);
    META[r.handle] = {
      totalLength: TOTALLENGTH(r.handle),
      doneCount: (doneAudit.totalCount - doneAudit.notDones.features.length),
      notDoneCount: doneAudit.notDones.features.length,
      doneLength: doneAudit.doneLength,
      notDoneLength: turf.length(doneAudit.notDones, { units: 'kilometers' }),
      aheadUnique: _pluck(doneAudit.notDones.features, 'name').filter(_unique),
      // tracks: _pluck(doneAudit.dones.features, 'ride').filter(_unique).sort()
      // tracks: doneAudit.dones.features.map(f => `${f.properties.ride}:::${f.properties.timestamp}`).filter(_unique)
      tracks: _pluck(doneAudit.dones.features, 'ride').filter(_unique)
        .map(t => {
          // t is the ride name but we also want a timestamp
          let time = doneAudit.dones.features.find(f => {
            return f.properties.ride == t
          }).properties.timestamp;
          let ttime = new Date(time);
          // console.log("ttime", ttime);
          let timeString = `${ttime.getFullYear()}.${ttime.toLocaleString('default', { month: 'short' })}.${ttime.getDate()}`
            // console.log("tttime", timeString);
          return {
            track: t,
            timestamp: timeString
          }
        }).sort((a, b) => (a.track > b.track) ? 1 : -1)
    }
  })

  /*META.brookline={
    total:TOTALLENGTH('brookline'),
    done: FILTERBYDONE('brookline').features.length,
    ahead:FILTERBYAHEAD('brookline').features.map(o => o[key])
  }
  META.brighton={
    total:TOTALLENGTH('brighton'),
    done: FILTERBYDONE('brighton').features.length,
    ahead:FILTERBYAHEAD('brighton').features.map(o => o[key])
  }*/

}

const DONEAUDIT = (r) => {
    let totalCount = null;
    let notDones = {
      "type": "FeatureCollection",
      "features": null
    };
    let dones = {
      "type": "FeatureCollection",
      "features": null
    };

    switch (r) {
      case 'brookline':
        totalCount = Brookline.features.length
        dones.features = Brookline.features.filter(fea => fea.properties.done == 'done')
        notDones.features = Brookline.features.filter(fea => fea.properties.done !== 'done')
        break;
      case 'brighton':
        totalCount = Brighton.features.length
        dones.features = Brighton.features.filter(fea => fea.properties.done == 'done')
        notDones.features = Brighton.features.filter(fea => fea.properties.done !== 'done')
        break;
    }
    let doneLength = turf.length(dones, { units: 'kilometers' })
    return { dones: dones, notDones: notDones, totalCount: totalCount, doneLength: doneLength }
  } //DONEAUDIT
const TOTALLENGTH = (r) => {

    let length = 0;

    switch (r) {
      case 'brookline':
        length = turf.length(Brookline, { units: 'kilometers' })
        break;
      case 'brighton':
        length = turf.length(Brighton, { units: 'kilometers' })
        break;
    }
    return length;
  } //tOtaLLenGTH

const _SETROUTE = () => {
  ROUTER.push({
    title: "Dashboard",
    params: {
      region: PROPS.region,
      basemap: _BASEMAP.value,
      center: _CENTER.value,
      zoom: _ZOOM.value,
      collapsed: _COLLAPSED.value ? '$$' : '$',
      trackiso: _TRACKISO ? encodeURI(_TRACKISO.value) : '$'
    }
  });
}

/*
                          ______
                         / ____ `.
 _   __  __   _   .---.  `'  __) |
[ \ [  ][  | | | / /__\\ _  |__ '.
 \ \/ /  | \_/ |,| \__.,| \____) |
  \__/   '.__.'_/ '.__.' \______.'
*/
onMounted(() => {
  setRegionMeta();
  _SETROUTE();
})
watch(() => [PROPS.region], (newp, oldp) => {
  _TRACKISO.value = false;
})
watch(() => [PROPS.region, _COLLAPSED.value, _TRACKISO.value], (newp, oldp) => {
  _SETROUTE();
})
</script>

<style>
@import url("https://overpass-30e2.kxcdn.com/overpass.css");
body {
  font-family: 'overpass';
  font-weight: 800;
}
</style>
