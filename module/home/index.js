// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '@/components/App'
import router from '@/router'
import bus from "@/assets/js/eventBus.js";

Vue.config.productionTip = false

/* eslint-disable no-new */
app = new Vue({
    el: '#app',
    data() {
        return {
            appBus: {
                show: false,
                type: '',
                data: {}
            }
        }
    },
    watch: {
        appBus: function(obj) {
            if (obj.show) {
                this.appBus.show = false;
                switch (obj.type) {
                    case "window":
                        bus.$emit("WindowShow", obj);
                        break;
                    case "Search":
                        console.log(obj);
                        bus.$emit("SearchRefresh", obj);
                        break;
                    case "ChartsPanel":
                        bus.$emit("ChartsPanelShow", obj.assets);
                        break;
                }
            }
        }
    },
    router,
    template: '<App/>',
    components: { App }
})