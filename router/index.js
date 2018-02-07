import Vue from 'vue'
import Router from 'vue-router'
import App from '@/components/App'
import VueResource from 'vue-resource'

const routes = [
    { path: '/', component: App }
]

Vue.use(Router)
Vue.use(VueResource)

export default new Router({
    routes: routes
})