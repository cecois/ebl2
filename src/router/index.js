import {
    createRouter,
    createWebHistory
} from 'vue-router'
import Home from '/src/components/Home.vue'

const rfunc = (route) => {
    return {
        region: !route.params.region ? 'brighton' : route.params.region,
        card: !route.params.card ? '$' : route.params.card,
        basemap: !route.params.basemap ? 'carto_darkmatter' : route.params.basemap,
        center: !route.params.center ? '-71.1354446411133,42.32504712815144' : route.params.center,
        zoom: !route.params.zoom ? "13" : route.params.zoom
    }
}

const routes = [{
    path: '/:region?/:card?/:basemap?/:center?/:zoom?',
    name: 'Home',
    component: Home,
    props: rfunc
}]

const router = createRouter({
    history: createWebHistory(),
    routes
})
export default router