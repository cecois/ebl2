<template>
  <div id="template-root p-0 m-0 h-12">
    <!-- component -->
    <!-- follow me on twitter @asad_codes -->
    <div id="header" class="flex flex-wrap place-items-center">
      <section class="relative mx-auto">
        <!-- navbar -->
        <nav id="app-nav" class="flex justify-between text-white w-screen">
          <div class="px-5 xl:px-12 py-6 flex w-full items-center">
            <a class="text-3xl font-bold font-heading" href="#">
              ebl-2.1.2
            </a>
            <!-- Nav Links -->
            <ul class="hidden md:flex px-4 mx-auto font-semibold font-heading space-x-12 ">
              <!-- <li v-for="_region in _REGIONS"><a @click.prevent="region=_region.handle" :class="['nav-button',_region.handle==region?'nav-button-chosen':'']" href="#">{{_region.label}}</a></li> -->
              <!-- <li><a @click.prevent="_GETWEATHER" class="underline" href="">WTHR</a></li> -->
              <li><a @click.prevent="_FAKETRACE" class="underline" href="">faketrxc</a></li>
              <!-- <li><a class="hover:text-gray-200" href="#">Catagory</a></li>
<li><a class="hover:text-gray-200" href="#">Collections</a></li>
<li><a class="hover:text-gray-200" href="#">Contact Us</a></li>
 -->
            </ul>
            <!-- Header Icons -->
            <div class="hidden xl:flex items-center space-x-5 items-center">
              <a @click.prevent="region=_region.handle" :class="['nav-button',_region.handle==region?'nav-button-chosen':'','mr-8']" href="#" v-for="_region in _REGIONS">{{_region.label}}</a>
              <!-- <a class="hover:text-gray-200" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </a>
              <a class="flex items-center hover:text-gray-200" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span class="flex absolute -mt-5 ml-4">
              <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
                </span>
                </span>
              </a>
              <a class="flex items-center hover:text-gray-200" href="#">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </a> -->
            </div>
          </div>
          <!-- Responsive navbar -->
          <!-- <a @click.prevent="_FAKETRACE" class="nav-button underline mr-7 pr-4 border-r-2" href="">FT</a> -->
          <a @click.prevent="region=_region.handle" :class="['nav-button',_region.handle==region?'nav-button-chosen':'','mr-4']" href="#" v-for="_region in _REGIONS">{{_region.label}}</a>
          <p>
            <PauseIcon @click.prevent="_PAUSED=!_PAUSED" v-if="!_PAUSED" class="h-7 w-7 nav-button" />
            <PlayIcon @click.prevent="_PAUSED=!_PAUSED" v-else class="h-7 w-7 nav-button" />
          </p>
          <!-- <a class="xl:hidden flex mr-6 items-center" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span class="flex absolute -mt-5 ml-4">
          <span class="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500">
          </span>
            </span>
          </a>
          <a class="navbar-burger self-center mr-12 xl:hidden" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </a> -->
        </nav>
      </section>
    </div>
    <!-- -------------------------------------------------------------------------------------------------------------------------------
    <div class="fixed z-10 bg-opacity-50 float-right">
      <a href="" @click.prevent="_PAUSED=!_PAUSED">
        <div v-if="_PAUSED">🛑</div>
        <div v-else>🟢</div>
      </a>
      <div v-if="_LOADING">⏰</div>
      <div v-else>🩲</div>
      <div v-for="_region in _REGIONS" :class="_region.handle==region?'font-black':''"><a href="" @click.prevent="region=_region.handle">{{_region.handle}}</a></div>
      <hr/>
      <a @click.prevent="_FAKETRACE" class="underline" href="">faketrxc</a>
      <ol>
        <li>crds: {{_TRACE.length}}</li>
      </ol>
    </div>
 -->
    <Footer @update-basemap="_SETBASEMAP" :basemaps="CONFIG._BASEMAPS
" :basemap="_BASEMAP" />
    <Map @update-center="_CENTERED" @update-zoom="_SETZOOM" :center="_CENTERME()" :basemaps="CONFIG._BASEMAPS" :subs="_SUBS" :basemap="_BASEMAP" :zoom="_ZOOM" :brookline="Brookline" :brighton="Brighton" :brooklinePoly="BrooklinePoly" :brightonPoly="BrightonPoly" :lastActive="_TRACE.at(-1)" :traceActive="_TRACEACTIVEGEOM" :styles="_STYLES" :region="region" :weather="_WEATHER.main" />
  </div>
  <!-- root -->
</template>

<script setup>
import CONFIG from '../CONFIG.json'
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { latLngBounds, latLng } from 'leaflet'
import Map from '/src/components/Map.vue'
import Footer from '/src/components/Footer.vue'
import Brookline from '../assets/join_brookline.json'
import Brighton from '../assets/join_brighton.json'
import BrooklinePoly from '../assets/brooklinePoly.json'
import BrightonPoly from '../assets/brightonPoly.json'
import { PauseIcon } from '@heroicons/vue/solid'
import { PlayIcon } from '@heroicons/vue/solid'

const ROUTE = useRoute(),
  ROUTER = useRouter(),
  // _CONFIG = { geoloc: false },
  _SUBS = CONFIG._SUBS,
  _STYLES = CONFIG._STYLES,
  _LOADING = ref(false),
  PROPS = defineProps({ region: String, card: String, basemap: String, center: String, zoom: String }),
  //A coupLe WE goNNA PurTuRb coNSTAntly
  _ZOOM = ref(PROPS.zoom),
  _BASEMAP = ref(PROPS.basemap),
  _META = ref({ log: [] }),
  _CENTER = ref(PROPS.center ? PROPS.center : "-100,50"),
  // _CENTERLINES = { brighton: {}, brookline: {} },
  _TRACKS = null,
  _PAUSED = ref(false),
  _TRACE = reactive([
    [-71.14183902740479,
      42.33044080887696
    ],
    [-71.13952159881592,
      42.33354989703499
    ]
  ]),
  _TRACEACTIVEGEOM = ref({
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": _TRACE.length > 1 ? "LineString" : "Point",
        "coordinates": _TRACE
      }
    }]
  }),
  _TRACEARKIVEGEOM = ref({
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": [
          [-71.14183902740479,
            42.33044080887696
          ],
          [-71.13952159881592,
            42.33354989703499
          ]
        ]
      }
    }]
  })

const _WEATHER = reactive({
  "coord": {
    "lon": null,
    "lat": null
  },
  "weather": [],
  "base": null,
  "main": {
    "temp": null,
    "feels_like": null,
    "temp_min": null,
    "temp_max": null,
    "pressure": null,
    "humidity": null,
  },
  "visibility": null,
  "wind": {
    "speed": null,
    "deg": null,
    "gust": null
  },
  "clouds": {
    "all": null
  },
  "dt": null,
  "sys": {
    "type": null,
    "id": null,
    "country": null,
    "sunrise": null,
    "sunset": null
  },
  "timezone": null,
  "id": null,
  "name": null,
  "cod": null
})

const _CREDITS = [
  "bicycling by Samy Menai from the Noun Project"
]

const _REGIONS = CONFIG._REGIONS
const _CARDS = ['$', 'dashboard']

watch(() => [PROPS.region, PROPS.card, _ZOOM.value, _CENTER.value, _BASEMAP.value], (newp, oldp) => {
  // _REGIONAUDIT();
  _SETROUTE();
})

onMounted(() => {

  if (CONFIG._GEOLOC) {
    navigator.geolocation.watchPosition((watchedPosition => {

        _TRACE.push([watchedPosition.coords.longitude, watchedPosition.coords.latitude])
        let o = {
          "type": "FeatureCollection",
          "features": [{
            "type": "Feature",
            "properties": {},
            "geometry": {
              "type": "LineString",
              "coordinates": _TRACE
            }
          }]
        };

        let zoomer =

          _TRACEACTIVEGEOM.value = o;

        if (_TRACE.length % 25 === 0) { _GETWEATHER(); }

        let c = _TRACE.at(-1);
        !_PAUSED.value && (_CENTER.value = `${c[0]},${c[1]}`);
        !_PAUSED.value && (_SETZOOM("18"))

      }), (err) => {
        _META.value.log.push({ timeout: 20, klass: 'has-text-error', msg: `nav.geo failed: ${err.message} (${err.code})`, sender: "if.geolocation.error" })
      }) //.watchposition
  }

  _GETWEATHER();
  _SETROUTE();
})

const _GETWEATHER = async() => {

  _WEATHER.main.feels_like = '⏱'

  await fetch("https://api.openweathermap.org/data/2.5/weather?q=Boston,usa&APPID=0d9f83b0f1264e2355537aafcaa8a660&units=imperial", {
      "method": "GET"
    }).then(response => response.json())
    .then(data => _WEATHER.main = data.main)

}


const _SPLIT = 5;
const _TRACEARKIVESLICE = () => _TRACE.slice(0, (_TRACE.length - _SPLIT))
const _TRACEACTIVESLICE = () => _TRACE;

const _COUNTER = ref(0)

const _FAKETRACE = () => {

  let to = [
    [-71.14462852478027,
      42.3346919724542
    ],
    [-71.16450, 42.33824],
    [-71.15988, 42.34008],
    [-71.139317, 42.345716],
    [-71.14153861999512,
      42.3397676122846
    ],
    [-71.14175319671631,
      42.34496971794688
    ],
    [-71.1344575881958,
      42.346777666070786
    ],
    [-71.1368179321289,
      42.35064713468417
    ],
    [-71.12823486328125,
      42.347951218602326
    ],
    [-71.12068176269531,
      42.34988594656375
    ],
    [-71.1183214187622,
      42.34728515093512
    ],
    [-71.11196994781494,
      42.35147174474571
    ],
    [-71.11222743988037,
      42.346682512202605
    ],
    [-71.11613273620604,
      42.344589090663916
    ],
    [-71.12214088439941,
      42.34401814541862
    ],
    [-71.11548900604247,
      42.34132194504034
    ],
    [-71.11664772033691,
      42.33849874073358
    ],
    [-71.1231279373169,
      42.33805462964167
    ],
    [-71.12377166748047,
      42.33535817353786
    ],
    [-71.12887859344482,
      42.33814979656826
    ],
    [-71.13428592681885,
      42.33792774018215
    ],
    [-71.13630294799805,
      42.33691261528855
    ],
    [-71.13844871520996,
      42.33629401552115
    ],
    [-71.13578796386719,
      42.33354989703499
    ]
  ]

  _TRACE.push(to[_COUNTER.value])
  let o = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "LineString",
        "coordinates": _TRACE
      }
    }]
  };

  _TRACEACTIVEGEOM.value = o;



  if (_TRACE.length % 25 === 0) { _GETWEATHER(); }


  let c = _TRACE.at(-1);
  !_PAUSED.value && (_CENTER.value = `${c[0]},${c[1]}`);
  !_PAUSED.value && (_SETZOOM("18"))

  _COUNTER.value++

}

const colors = { bg: "green" };

const _REGIONAUDIT = async() => {
  // console.log(`n regionaud: we have ${_CENTERLINES[PROPS.region].length} centerlines for ${PROPS.region}`)
  // If thE CuRrenT reGIoN HAs no cENTErLineS, FeTCH EM
  // if (!_CENTERLINES[PROPS.region]) { // let response = await fetch("https://api.npms.io/v2/search?q=vue"); // _CENTERLINES[PROPS.region] = await response.json(); // }
}
const _SETBASEMAP = (b) => {
  _BASEMAP.value = b.handle
}
const _SETZOOM = (z) => {
  _ZOOM.value = z;
}
const _SETROUTE = () => {
  ROUTER.push({
    title: "Home",
    params: {
      region: PROPS.region,
      card: PROPS.card,
      basemap: _BASEMAP.value,
      center: _CENTER.value,
      zoom: _ZOOM.value
    }
  });
}

const _BBOX2BOUNDS = () => {
  // WE Need a bOuNDs OBJ
  let bb = _BBOX.value.split(',')
  let bbb = { _southWest: { lat: bb[1], lng: bb[0] }, _northEast: { lat: bb[3], lng: bb[2] } }
  return bbb;
}
const _SETBBOX = (b) => {
  // console.log("b in setbbox", b);
  _BBOX.value = b.toBBoxString()
}
const _NOTDONE = (regionOb) => {

  regionOb.features = regionOb.features.filter(f => {
    return f.properties.done == 'not done'
  })
  return regionOb;
}
const _CENTERED = (h) => {
  _CENTER.value = `${h.lng},${h.lat}`
}
const _CENTERME = () => {
  let b = PROPS.center.split(',')
  let clsw = latLng(b[1], b[0])
  return clsw
}


/* CSS HSL https://coolors.co/fffbfe-2274a5-632b30-4b5320-ec5800 */
</script>

<style>
@import url("https://overpass-30e2.kxcdn.com/overpass.css");
body {
  font-family: 'overpass';
  font-weight: 800;
}

#app-nav {
  background-color: v-bind(_STYLES.green);
}

.nav-button:hover {
  color: v-bind(_STYLES.whiteoff);
}

.nav-button-chosen {
  color: v-bind(_STYLES.regionBoundary.color);
}
</style>
