<template>
  <div class="relative z-20 w-full h-24 px-8 pt-2 bg-white">
    <div id="home" class="container flex items-center justify-between h-full max-w-6xl mx-auto">
      <div id="nav" class="absolute top-0 left-0 hidden block w-full mt-20 border-b border-gray-200 sm:border-none sm:px-5 sm:block sm:relative sm:mt-0 sm:px-0 sm:w-auto">
        <nav class="flex flex-col items-center py-3 bg-white border border-gray-100 sm:flex-row sm:bg-transparent sm:border-none sm:py-0">
          6
        </nav>
      </div>
      <div id="nav-mobile-btn" class="absolute top-0 right-0 z-50 block w-6 mt-8 mr-10 cursor-pointer select-none sm:hidden sm:mt-10">
        <span class="block w-full h-1 mt-2 duration-200 transform bg-gray-800 rounded-full sm:mt-1"></span>
        <span class="block w-full h-1 mt-1 duration-200 transform bg-gray-800 rounded-full"></span>
      </div>
    </div>
  </div>
  <!-- /hERo -->
  <!-- 

   ___      ___       __         _______
  |"  \    /"  |     /""\       |   __ "\
   \   \  //   |    /    \      (. |__) :)
   /\\  \/.    |   /' /\  \     |:  ____/
  |: \.        |  //  __'  \    (|  /
  |.  \    /:  | /   /  \\  \  /|__/ \
  |___|\__/|___|(___/    \___)(_______)
  

   -->
  <div id="map" :class="['relative','items-center','justify-center','w-full','w-screen','h-screen']">
    <div class="container flex flex-col items-center justify-center h-full max-w-6xl pl-0 mx-auto
 -mt-24 sm:pl-8 xl:pl-0 md:flex-row md:justify-between">
      <div class="flex h-screen">
      </div>
    </div>
  </div>
  <!-- /map -->
  <!--
   _                               _
  | |_      _ _   __ _     __     | |__    ___
  |  _|    | '_| / _` |   / _|    | / /   (_-<
  _\__|   _|_|_  \__,_|   \__|_   |_\_\   /__/_
_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|_|"""""|
"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-'"`-0-0-' 

-->
  <div id="tracks" class="relative w-full py-20 pb-20 overflow-hidden bg-white md:pt-40 md:pb-64">
    <!-- CURVED SVG BORDER INVERT -->
    <svg class="absolute top-0 w-full text-yellow-400 fill-current" viewBox="0 0 1400 50" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 50C309.151 16.667 542.484 0 700 0c157.516 0 390.849 16.667 700 50V0H0v50z" />
    </svg>
    <div class="container relative flex flex-col justify-between h-full max-w-6xl px-8 mx-auto xl:px-0">
      <h2 class="relative flex items-center self-start inline-block w-auto mb-20 text-4xl font-black">
                52
            </h2>
      <div class="flex w-full h-full">
        <div class="w-full lg:w-1/3">
          <!-- Feature blocks first column -->
          <div class="flex flex-col w-full mb-10 sm:flex-row">
            179
          </div>
        </div>
        <div class="hidden w-1/3 lg:block">
          <div class="absolute w-full w-screen max-w-3xl pl-12 -mt-56">
            <!-- <div class="absolute top-0 left-0 w-full h-full mt-2 ml-10 bg-gray-900 rounded-lg"></div> -->
            <div class="relative overflow-hidden ">
              <!-- <img src="https://cdn.devdojo.com/images/october2020/screenshot2.png" alt="Screen shot of Flare's hero component" class="object-cover w-full h-full"> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Blob SVG Border -->
    <svg class="absolute bottom-0 w-full text-gray-200 fill-current" viewBox="0 0 1400 74" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 24C87.243 11.422 173.12 5.133 257.633 5.133 468.305 5.133 578.027 74 700 74c136.015 0 290.882-96.208 481.234-68.867C1268.807 17.71 1341.73 24 1400 24v50H0V24z" />
    </svg>
  </div>
  <!-- CURVED SVG BORDER -->
  <svg class="absolute bottom-0 w-full text-black-400 fill-current" viewBox="0 0 1400 50" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0c309.151 33.333 542.484 50 700 50 157.516 0 390.849-16.667 700-50v50H0V0z" />
  </svg>
  <!-- root -->
</template>

<script setup>
import CONFIG from '../CONFIG.json'
import { ref, reactive, onMounted, watch } from 'vue'
import { latLngBounds, latLng } from 'leaflet'
import * as turf from '@turf/turf'

import {
  LightningBoltIcon
} from '@heroicons/vue/outline'

import { useRoute, useRouter } from 'vue-router'

/*

 oo
 
 dP .d8888b. .d8888b. 88d888b. .d8888b.
 88 88'  `"" 88'  `88 88'  `88 Y8ooooo.
 88 88.  ... 88.  .88 88    88       88
 dP `88888P' `88888P' dP    dP `88888P'

*/

import { PauseIcon } from '@heroicons/vue/solid'
import { MapIcon } from '@heroicons/vue/outline'
import { ArrowsExpandIcon } from '@heroicons/vue/outline'

// ofT-calLeD ROute SetTINg
const _SETROUTE = () => {
  let r = {
    title: "Dashboard",
    params: {
      query: "iowa2"
    }
  };
  ROUTER.push(r);
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
    console.log("onmounted")
  })
  // watch(() => [PROPS.region], (newp, oldp) => {
  //   _TRACKISO.value = false;
  // })
</script>
<!-- @import url("https://overpass-30e2.kxcdn.com/overpass.css");
body {
  font-family: 'overpass';
  font-weight: 800;
} -->

<style lang="scss">
/* SCSS HEX */

$brand-primary: #fbbf24ff;
$map-iso: #ff720eff;
$track-iso:hsla(202, 66%, 39%, 1);
$brand-grey: #595959ff;
$magic-mint: #b4edd2ff;
$powder-blue: #a0cfd3ff;
.app-link {
  &:hover {
    color: $track-iso;
  }
}

.bg-app-primary {
  background-color: $brand-primary;
}

.copy-app-primary {
  color: $brand-primary;
}

.bg-app-map-iso {
  background-color: $map-iso;
}

.bg-app-track-iso {
  background-color: $track-iso;
}

.app-bt {
  color: black;
  &:hover {
    cursor: pointer;
    color: rgba($brand-grey, .5)
  }
  &:active {
    color: $brand-primary;
  }
}

.app-bt-disabled {
  color: $brand-grey;
}

.track-iso-copy {
  color: $track-iso;
}
</style>
