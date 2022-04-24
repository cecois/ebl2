import {
    createRouter,
    createWebHistory
} from 'vue-router'
import Trace from '/src/components/Trace.vue'
import Dashboard from '/src/components/Dashboard.vue'

const rfunc = (route) => {
    return {
        region: !route.params.region ? 'brighton' : route.params.region,
        // card: !route.params.card ? '$' : route.params.card,
        // basemap: !route.params.basemap ? 'carto_darkmatter' : route.params.basemap,
        // center: !route.params.center ? '-71.1354446411133,42.32504712815144' : route.params.center,
        // zoom: !route.params.zoom ? "13" : route.params.zoom
    }
}
const rfuncd = (route) => {
    return {
        region: !route.params.region ? 'brighton' : route.params.region,
        collapsed: !route.params.collapsed ? '$' : route.params.collapsed,
        trackiso: !route.params.trackiso ? '$' : route.params.trackiso,
        panel: !route.params.panel ? 'home' : route.params.panel,
        basemap: !route.params.basemap ? 'carto_darkmatter' : route.params.basemap,
        bbox: !route.params.bbox ? '$' : route.params.bbox
            // center: !route.params.center ? '-71.1354446411133,42.32504712815144' : route.params.center,
            // zoom: !route.params.zoom ? "13" : route.params.zoom
    }
}

const routes = [{
    path: '/trace/:region?/:card?/:basemap?/:center?/:zoom?',
    // path: '/:region?/:card?/:basemap?/:center?/:zoom?',
    name: 'Trace',
    component: Trace,
    props: rfunc
}, {
    path: '/:region?/:trackiso?/:collapsed?/:panel?/:basemap?/:bbox?',
    // path: '/admin/:region?/:trackiso?/:collapsed?/:panel?/:basemap?/:bbox?',
    name: 'Dashboard',
    component: Dashboard,
    props: rfuncd
}]

const router = createRouter({
    history: createWebHistory(),
    mode: 'history',
    routes
})
export default router