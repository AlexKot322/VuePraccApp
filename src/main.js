import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Paginate from 'vuejs-paginate'
import VueMeta from 'vue-meta'
import App from './App.vue'
import Loader from '@/components/app/Loader.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min'
import dateFilter from './filters/date.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import currencyFilter from './filters/currency.filter'
import localizeFilter from './filters/localize.filter'
import messagePlugin from '@/utils/message.plugin'
import titlePlugin from '@/utils/title.plugin'

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(titlePlugin)
Vue.use(VueMeta)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('localize', localizeFilter)
Vue.use(Vuelidate)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('paginate', Paginate)

// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCjiUOqg5IC0YewrPrHmckKXdDgiTLskYU',
  authDomain: 'vue-prac-2d35e.firebaseapp.com',
  projectId: 'vue-prac-2d35e',
  storageBucket: 'vue-prac-2d35e.appspot.com',
  messagingSenderId: '59251750533',
  appId: '1:59251750533:web:cd5b4ba38552af72191bec',
  measurementId: 'G-TJNLCRKM6J',
}

firebase.initializeApp(firebaseConfig)

let app

const auth = firebase.auth()
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount('#app')
  }
})
