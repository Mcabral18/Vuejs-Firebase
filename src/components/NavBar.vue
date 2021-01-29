<template>
  <nav>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand>NavBar</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form>
            <a v-if="!loggedIn">{{ currentUser }}</a>
          </b-nav-form>
          <b-nav-form>
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
            <router-link to="/upload">Upload</router-link>
          </b-nav-form>
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item v-if="loggedIn"
              ><router-link to="/login">Login</router-link></b-dropdown-item
            >
            <b-dropdown-item v-if="loggedIn"
              ><router-link to="/register"
                >Register</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item v-if="!loggedIn">Profile</b-dropdown-item>
            <b-dropdown-item v-if="!loggedIn" @click="signOut"
              >Sign Out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </nav>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      loggedIn: false,
      currentUser: "Unknow",
    };
  },
  created() {
    this.firebaseAuthentication();
    this.AuthUser();
  },
  methods: {
    signOut() {
      try {
        firebase.auth().signOut();
        this.$router.replace("login");
        // this.loggedIn = true
      } catch (err) {
        console.log(err);
      }
    },
    firebaseAuthentication() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.loggedIn = false;
        } else {
          this.loggedIn = true;
        }
      });
    },
    AuthUser() {
      if (firebase.auth().currentUser) {
        this.currentUser = firebase.auth().currentUser.email;
      }
    },
  },
};
</script>

<style>
</style>