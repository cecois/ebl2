<template>
  <div class="container">
    <a href="" @click.prevent="_PAUSED=!_PAUSED">
      <div v-if="_PAUSED">🛑</div>
      <div v-else>🟢</div>
    </a>
    <div v-if="_LOADING">⏰</div>
    <div v-else>🩲</div>
    <div v-for="_region in _REGIONS" :class="_region.handle==region?'font-black':''"><a href="" @click.prevent="region=_region.handle">{{_region.handle}}</a></div>
    <hr/>
    <!-- <a @click.prevent="_REGIONAUDIT()" class="underline" href="">regnaudit</a> 🦋 -->
    <!-- <a class="underline" href="http://localhost:3000/brighton/$/ocm/-92,42/12">http://localhost:3000/brighton/$/ocm/-91.55,41.6,-91.45,41.9/12</a> 🦋
    <a class="underline" href="http://localhost:3000/brighton/$/ocm/-92,42/5">http://localhost:3000/brighton/$/ocm/-91.55,41.6,-91.45,41.9/5</a> -->
    <!-- <a @click.prevent="_FAKETRACE" class="underline" href="">faketrxc</a> -->
    <a @click.prevent="_FAKETRACE" class="underline" href="">faketrxc</a>
    <ol>
      <li>crds: {{_TRACE.length}}</li>
      <!-- <li>trkv: {{_TRACEARKIVE().length}}</li> -->
      <!-- <li>trac: {{_TRACEACTIVE().length}} (mstrcnt:{{_TRACEACTIVE()[0]}})</li>
 -->
    </ol>
    <!-- <ol>
      <li v-for="coord in _TRACEACTIVEGEOM.features[0].geometry.coordinates">{{coord}}</li>
    </ol> -->
    <Map @update-center="_CENTERED" @update-zoom="_SETZOOM" :center="_CENTERME()" :basemaps="_BASEMAPS" :subs="Subs" :basemap="_BASEMAP" :zoom="_ZOOM" :brookline="Brookline" :brighton="Brighton" :brooklinePoly="BrooklinePoly" :brightonPoly="BrightonPoly" :lastActive="_TRACE[_TRACE.length-1]" :traceActive="_TRACEACTIVEGEOM" :styles="_STYLES" :region="region" />
    <Footer @update-basemap="_SETBASEMAP" :basemaps="_BASEMAPS" :basemap="_BASEMAP" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { latLngBounds, latLng } from 'leaflet'
import Map from '/src/components/Map.vue'
import Footer from '/src/components/Footer.vue'
import Brookline from '../assets/join_brookline.json'
import Brighton from '../assets/join_brighton.json'
import BrooklinePoly from '../assets/brooklinePoly.json'
import BrightonPoly from '../assets/brightonPoly.json'
import Subs from '../assets/subs.json'

const ROUTE = useRoute(),
  ROUTER = useRouter(),
  _LOADING = ref(false),
  PROPS = defineProps({ region: String, card: String, basemap: String, center: String, zoom: String }),
  //A coupLe WE goNNA PurTuRb coNSTAntly
  _ZOOM = ref(PROPS.zoom),
  _BASEMAP = ref(PROPS.basemap),
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

const _CREDITS = [
  "bicycling by Samy Menai from the Noun Project"
]

const _REGIONS = [{ label: "Brighton", handle: "brighton", abbrev: "brhgtn" }, { label: "Brookline", handle: "brookline", abbrev: "brklin" }]
const _CARDS = ['$', 'dashboard']
const _BASEMAPS = [{
  name: 'OpenStreetMap',
  handle: "osm",
  attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  urii: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
}, {
  name: 'OpenTopoMap',
  handle: "opentopo",
  urii: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
  attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
}, {
  name: "Stamen Toner Lite",
  handle: "stamen_toner_lite",
  urii: "http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}@2x.png",
  thmb: "http://c.tile.stamen.com/toner-lite/18/79279/96968@2x.png",
  hue: "light"
}, {
  name: "Google Hybrid",
  handle: "google_hybrid",
  urii: "http://mt3.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
  thmb: "http://mt3.google.com/vt/lyrs=y&x=79279&y=96968&z=18",
  hue: "dark"
}, {
  name: "OpenCycleMap",
  handle: "ocm",
  urii: "https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=4e07c12ddb92435fbaf5d077958a5f43",
  thmb: "https://tile.thunderforest.com/cycle/18/79279/96968.png?apikey=4e07c12ddb92435fbaf5d077958a5f43",
  hue: "dark"
}, {
  name: "Pioneer",
  handle: "ocm_pioneer",
  urii: "https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=4e07c12ddb92435fbaf5d077958a5f43",
  thmb: "https://tile.thunderforest.com/pioneer/18/79279/96968.png?apikey=4e07c12ddb92435fbaf5d077958a5f43",
  hue: "light"
}, {
  name: "Mobile Atlas",
  handle: "ocm_mobile",
  urii: "https://tile.thunderforest.com/mobile-atlas/{z}/{x}/{y}.png?apikey=4e07c12ddb92435fbaf5d077958a5f43",
  thmb: "https://tile.thunderforest.com/mobile-atlas/18/79279/96968.png?apikey=4e07c12ddb92435fbaf5d077958a5f43",
  hue: "light"
}, {
  name: "Carto Positron",
  handle: "carto_positron",
  urii: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
  thmb: "https://cartodb-basemaps-c.global.ssl.fastly.net/light_all/18/79279/96968.png",
  hue: "light"
}, {
  name: "Carto Dark Matter",
  handle: "carto_darkmatter",
  urii: "https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png",
  thmb: "https://cartodb-basemaps-c.global.ssl.fastly.net/dark_all/18/79279/96968.png",
  hue: "light"
}, {
  name: "Spinal Map",
  handle: "ocm_spinal",
  urii: "https://tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey=4e07c12ddb92435fbaf5d077958a5f43",
  thmb: "https://tile.thunderforest.com/spinal-map/18/79279/96968.png?apikey=4e07c12ddb92435fbaf5d077958a5f43",
  hue: "dark"
}]

watch(() => [PROPS.region, PROPS.card, _ZOOM.value, _CENTER.value, _BASEMAP.value], (newp, oldp) => {
  // _REGIONAUDIT();
  _SETROUTE();
})

onMounted(() => {
  _SETROUTE();
})

const _SPLIT = 5;
const _TRACEARKIVESLICE = () => _TRACE.slice(0, (_TRACE.length - _SPLIT))
const _TRACEACTIVESLICE = () => _TRACE;

const _COUNTER = ref(0)

const _FAKETRACE = () => {

  let to = [
    [-71.14462852478027,
      42.3346919724542
    ],
    [-71.15076541900635,
      42.33224917476978
    ],
    [-71.15029335021973,
      42.33957728318422
    ],
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

  let c = _TRACE.at(-1);
  !_PAUSED.value && (_CENTER.value = `${c[0]},${c[1]}`)

  _COUNTER.value++

}

const _REGIONAUDIT = async() => {
  console.log(`n regionaud: we have ${_CENTERLINES[PROPS.region].length} centerlines for ${PROPS.region}`)
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
  console.log("b in setbbox", b);
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

const _STYLES = {
  regionBoundary: { color: `hsla(202, 66%, 39%, .3)`, fill: false, opacity: 1, width: 3, weight: 8 },
  centerlinesDone: { color: `rgba(0, 4, 4, 0)`, fill: false, opacity: 0, width: 3, weight: 8 },
  centerlinesNott: { color: `rgba(125, 120, 122, 0)`, fill: false, opacity: .9, width: 12, weight: 8 },
  traceActive: { color: `#2274A5`, fill: false, dashArray: "2 5 10 ", opacity: .9, width: 3, weight: 8 },
  traceArkive: { color: `rgba(125, 20, 22, 1)`, fill: false, opacity: .5, width: 2, weight: 8 },
  buffer: { color: `rgba(115, 55, 212, 0)`, fill: true, opacity: 0, width: 1, weight: 1 },
  candidates: { color: `rgb(236, 88, 0)`, fill: false, opacity: 1, width: 4, weight: 4 }

}
</script>
