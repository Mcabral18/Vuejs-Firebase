<template>
  <div>
    <h1>Register</h1>
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
            v-model.trim="email"
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
          <b-form-input
            id="input-2"
            type="password"
            placeholder="Enter password"
            v-model="password"
          ></b-form-input>
        </b-form-group>
        <b-button variant="secondary" @click.prevent="registerUser"
          >Register</b-button
        >
      </b-form>
      <span
        >Already have an acount
        <router-link to="/login">Login</router-link></span
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
    registerUser() {
      // try{
      // const user =  firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      //   this.$router.replace('login')
      //   console.log(user)
      // }
      // catch(err){
      //     console.log(err)
      // }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          (user) => {
            console.log(user);
            this.sendVerificationEmail();
          },
          (err) => {
            alert("Something go wrong" + err.message);
          }
        );
    },
    sendVerificationEmail() {
      firebase
        .auth()
        .currentUser.sendEmailVerification()
        .then(() => {
          alert("Verification Email Sent Successfully !");
          this.$router.replace("login");
        });
    },
  },
};
</script>