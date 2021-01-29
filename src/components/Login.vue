<template>
  <div>
    <h1>Login</h1>
    <b-container>
      <b-form>
        <b-form-group
          id="input-group-1"
          label="Email address:"
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            type="email"
            placeholder="Enter email"
            required
            v-model.trim="email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            placeholder="Enter password"
            required
            v-model="password"
          ></b-form-input>
        </b-form-group>
        <b-button class="m-5" variant="primary" @click="signIn">Login</b-button>

        <b-button class="m-5" variant="success" @click="signGoogle"
          >Google</b-button
        >

        <b-button class="m-5" variant="outline-primary" @click="signFacebook"
          >Facebook</b-button
        >
      </b-form>
      <span
        >Don´t have an account ?
        <router-link to="/register">Register</router-link></span
      >
    </b-container>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    signIn() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            this.$router.replace("about");
            alert(`Welcome, ${user.email}`);
          },
          (err) => {
            alert(`Your account cant be logged in` + err.message);
          }
        );
    },
    signGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          let token = result.credential.accessToken;
          let user = result.user;
          console.log(user);
          console.log(token);
          this.$router.replace("/about");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    signFacebook() {
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {
          /** @type {firebase.auth.OAuthCredential} */
          var credential = result.credential;

          // The signed-in user info.
          // eslint-disable-next-line no-unused-vars
          var user = result.user;

          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          // eslint-disable-next-line no-unused-vars
          var accessToken = credential.accessToken;

          this.$router.replace("/about");

        })
        // eslint-disable-next-line prettier/prettier
        .catch((error) => {
          // Handle Errors here.
          // eslint-disable-next-line no-unused-vars
          var errorCode = error.code;
          // eslint-disable-next-line no-unused-vars
          var errorMessage = error.message;
          // The email of the user's account used.
          // eslint-disable-next-line no-unused-vars
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          // eslint-disable-next-line no-unused-vars
          var credential = error.credential;

          // ...
        });
    },
  },
};
</script>

<style></style>
