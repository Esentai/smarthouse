<template>
  <b-navbar type="dark" variant="dark">
    <b-navbar-brand>SmartHouse</b-navbar-brand>
    <b-navbar-nav>
      <b-nav-item @click="payment">Payment</b-nav-item>
      <b-nav-item v-on:click="logout">Logout</b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import router from "@/router";

export default {
  name: "Header",
  methods:{
    logout: function (){
      localStorage.setItem('login', 'false');
      router.replace('/auth')
    },
    payment(){
      router.replace('/payment')
    }
  }

}
</script>

<style scoped>

</style>