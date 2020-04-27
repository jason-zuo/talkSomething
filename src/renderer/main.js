import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/common/styles/reset.css';
Vue.config.productionTip = true;

Vue.use(ElementUI);

new Vue({
    el: '#app',
    router,
    components: {App},
    template: '<App/>'
});
