import Vue from "vue";
import Vuelidate from "vuelidate";
import App from "./App.vue";
import Loader from "@/components/app/Loader.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "materialize-css/dist/js/materialize.min";
import dateFilter from "./filters/date.filter";
import currencyFilter from "./filters/currency.filter";
import messagePlugin from "@/utils/message.plugin";

Vue.config.productionTip = false;

Vue.use(messagePlugin);
Vue.filter("date", dateFilter);
Vue.filter("currency", currencyFilter);
Vue.use(Vuelidate);
Vue.component("Loader", Loader);

// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjiUOqg5IC0YewrPrHmckKXdDgiTLskYU",
  authDomain: "vue-prac-2d35e.firebaseapp.com",
  projectId: "vue-prac-2d35e",
  storageBucket: "vue-prac-2d35e.appspot.com",
  messagingSenderId: "59251750533",
  appId: "1:59251750533:web:cd5b4ba38552af72191bec",
  measurementId: "G-TJNLCRKM6J",
};

firebase.initializeApp(firebaseConfig);

let app;

const auth = firebase.auth();
auth.onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
