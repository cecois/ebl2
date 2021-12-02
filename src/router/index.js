import {
    createRouter,
    createWebHistory
} from 'vue-router'
import Home from '/src/components/Home.vue'
import Dashboard from '/src/components/Dashboard.vue'

const rfunc = (route) => {
    return {
        region: !route.params.region ? 'brighton' : route.params.region,
        card: !route.params.card ? '$' : route.params.card,
        basemap: !route.params.basemap ? 'carto_darkmatter' : route.params.basemap,
        center: !route.params.center ? '-71.1354446411133,42.32504712815144' : route.params.center,
        zoom: !route.params.zoom ? "13" : route.params.zoom
    }
}
const rfuncd = (route) => {
    return {
        region: !route.params.region ? 'brighton' : route.params.region,
        collapsed: !route.params.collapsed ? true : route.params.collapsed,
        trackiso: !route.params.trackiso ? '$' : route.params.trackiso,
        basemap: !route.params.basemap ? 'carto_darkmatter' : route.params.basemap,
        bbox: !route.params.bbox ? '-71,42.3,-70,44' : route.params.bbox,
        // center: !route.params.center ? '-71.1354446411133,42.32504712815144' : route.params.center,
        // zoom: !route.params.zoom ? "13" : route.params.zoom
    }
}

const routes = [{
    path: '/:region?/:card?/:basemap?/:center?/:zoom?',
    name: 'Home',
    component: Home,
    props: rfunc
}, {
    path: '/admin/:region?/:trackiso?/:collapsed?/:basemap?/:bbox?',
    name: 'Dashboard',
    component: Dashboard,
    props: rfuncd
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router