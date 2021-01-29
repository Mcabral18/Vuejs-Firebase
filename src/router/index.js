/* eslint-disable */
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About"
import Upload from "../views/Upload.vue"
import firebase from "firebase"
Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    component: About,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import( "../components/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () =>
      import( "../components/Register.vue")
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next)=>{
  const requireAuth = to.matched.some(record=> record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if(requireAuth && !isAuthenticated){
    next('/login')
  }else{
    next();
  }
})

export default router;
