<template>
  <div>
    <div class="form">
      <img class="logo" src="../assets/logo.png" alt="logo">
      <div v-if="mode === 'login'" class="inputs">
        <h3>Sign in to SmartHouse</h3>
        <input placeholder="Home ID" type="text" v-model="homeID" @input="checkID">
        <input placeholder="Code" type="password" v-model="homeCode" @input="checkCode">
        <button style="top: 99px" v-on:click="formBtn" :disabled="btnState"> <i class="fas fa-angle-right"></i></button>
        <p class="text">Don't have an account? <span v-on:click="mode = 'signup'" class="link"> Create account </span></p>
      </div>
      <div v-if="mode === 'signup'" class="inputs">
        <h3>Sign up to SmartHouse</h3>
        <input placeholder="Home name" type="text" v-model="name" @input="checkName" >
        <input placeholder="Home ID" type="text" v-model="homeID" @input="checkID">
        <input placeholder="Code" type="password" v-model="homeCode" @input="checkCode">
        <button style="top: 152px" v-on:click="formBtn" :disabled="btnState"> <i class="fas fa-angle-right"></i></button>
        <p class="text">Do you have an account?<span v-on:click="mode = 'login'"  class="link"> Login </span></p>
      </div>

    </div>
  </div>
</template>

<script>

import axios from "axios";
import router from "@/router";

export default {
  name: "Auth",
  data: () => {
    return {
      currentStep: 1,
      homeID: '',
      homeCode:'',
      name:'',
      btnState: true,
      mode:'login',
    }
  },
  methods:{
    checkID: function (){
      if (this.mode === 'login'){
        this.btnState = !(this.homeID.length > 0 && this.homeCode.length > 0 && this.mode === 'login');
      }else {
        this.btnState = !(this.homeID.length > 0 && this.homeCode.length > 0 && this.name.length > 0 && this.mode ==='signup');
      }
    },
    checkCode: function (){
      if (this.mode === 'login'){
        this.btnState = !(this.homeID.length > 0 && this.homeCode.length > 0 && this.mode === 'login');
      }else {
        this.btnState = !(this.homeID.length > 0 && this.homeCode.length > 0 && this.name.length > 0 && this.mode ==='signup');
      }
    },
    checkName: function (){
      this.btnState = !(this.homeID.length > 0 && this.homeCode.length > 0 && this.name.length > 0 && this.mode === 'signup');
    },
    formBtn: function (){
      if (this.mode === "signup"){
        this.register();
      }else{
        this.login();
      }
    },
    login: async function(){
      await axios.post('http://localhost:5000/login', {
        params: {
          homeID: this.homeID,
          code: this.homeCode,
        }
      }).then((response) => {
        console.log(response);
        if (response.data === 'success'){
          localStorage.setItem('login', 'true');
          localStorage.setItem('homeID', this.homeID);
          router.replace('./')
        }else{
          this.$alert(`Error! ${response.data}`);
        }
      }, (error) => {
        console.log(error);
      });
    },
    register: async function (){
        await axios.post('http://localhost:5000/register', {
          params: {
            homeID: this.homeID,
            code: this.homeCode,
            name: this.name
          }
        }).then((response) => {
          console.log(response);
          if (response.data === 'success'){
            localStorage.setItem('login', 'true');
            localStorage.setItem('homeID', this.homeID);
            router.replace('./')
          }else{
            this.$alert(`Error! ${response.data}`);
          }
        }, (error) => {
          console.log(error);
        });

    }
  }
}
</script>

<style scoped>
  .form{
    text-align: center;
    margin-top: 140px;
    font-family: Avenir, Helvetica, Arial, sans-serif;

  }
  .logo{
    width: 150px;
  }
  h3{
    color: #2c3e50;
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
  }
  .inputs{
    position: relative;
    width: 285px;
    margin: auto;
  }
  input{
    height: 38px;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    padding-left: 15px;
    padding-right: 45px;
    border-radius: 7px;
    border: 2px solid #d6d6d6;
  }
  input:focus{
    border: 2px solid #0070c9;
    outline: none;
  }
  button{
    position: absolute;
    right: 8px;
    top: 99px;
    width: 27px;
    height: 27px;
    background: transparent;
    border-radius: 50%;
    font-size: 22px;
    color: #000;
    padding-left: 7px;
    padding-top: 0px;
    border: 2px solid #000;
    z-index: 1;
    cursor: pointer;
  }
  button:focus{
    outline: none;
  }
  button:disabled,
  button[disabled]{
    border: 2px solid #d6d6d6;
    color: #d6d6d6;
    cursor: default;
  }
  .text{
    color: #545454;
  }
  .link{
    color: blue !important;
    cursor: pointer;
  }
  .link:hover{
   opacity: 0.85;
    cursor: pointer;
  }
  svg{
    margin-bottom: 5px;
  }
</style>