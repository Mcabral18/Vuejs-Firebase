import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// // Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "your_apiKey",
  authDomain: "your_Domain",
  projectId: "your_id",
  storageBucket: "your_storage",
  messagingSenderId: "your_Sender",
  appId: "your_appId"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

Vue.config.productionTip = false;

let app;

// eslint-disable-next-line no-unused-vars
firebase.auth().onAuthStateChanged((user) => {
  // console.log("user", user);
  if (!app) {
    app = new Vue({
      router,
      render: (h) => h(App),
    }).$mount("#app");
  }
});