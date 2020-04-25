import Vue from 'vue';
import App from './App.vue';
import router from './router';
import '@/common/styles/normalize.css';
Vue.config.productionTip = true;

new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
});
