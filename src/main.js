import App from '~/App.vue'
import Vue from 'vue'
import axios from 'axios'
import router from '~/router'
import {store} from '~/store/store.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './scss/styles.scss'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

/**
 *
 * GLOBAL AXIOS DEFAULTS:
 *
 *
 * */
axios.defaults.baseURL = window.location.origin;

/**
 * Create a fresh Vue Application instance
 */

let wueThemeApp = new Vue({
    el: '#app',
    router, //short for router: router
    store,
    render: h => h(App),
    components: {App},
});

window.wueThemeApp = wueThemeApp;
