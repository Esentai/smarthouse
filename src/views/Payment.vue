<template>
  <div>
    <Header/>
    <div class="container">
      <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    </div>
    <h2>Payment</h2>
    <div class="container">
      <div class="form">
        <div class="form-group">
          <label>Select month</label>
          <b-form-select v-model="selected" :options="options"></b-form-select>
        </div>
        <div class="form-group">
          <label>Card number</label>
          <input class="form-control" v-model="card.number" v-cardformat:formatCardNumber>
        </div>
        <div class="form-group">
          <label>Card Expiry</label>
          <input class="form-control" v-model="card.expiry" v-cardformat:formatCardExpiry>
        </div>
        <div class="form-group">
          <label>Card CVC</label>
          <input class="form-control" v-model="card.cvc" v-cardformat:formatCardCVC>
        </div>
        <div class="form-group">
          <label>Required amount for payment</label>
          <input class="form-control" readonly v-model="selected.value" v-cardformat:restrictNumeric>
        </div>
        <button type="button" @click="pay" :disabled="!this.card.number || !this.card.expiry || !this.card.cvc || !this.selected" class="btn btn-primary">Pay</button>
      </div>
    </div>

  </div>
</template>

<script>
import Header from "@/components/Header";

import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

export default {
  name: "Payment",
  components:{
    Header
  },

  data:() => {
    return{
      items: [
        {
          text: 'Home',
          to: { name: 'Home' }
        },
        {
          text: 'Payment',
          active: true
        }
      ],
      card:{
        number:'',
        expiry:'',
        cvc:''
      },
      selected: 0,
      options: [
        { value: null, text: 'Please select an option' },
        { value: { name: 'January', value:4900 }, text: 'January' },
        { value:{ name: 'February', value:4900 }, text: 'February' },
        { value:{ name: 'March', value:4900 }, text: 'March' },
        { value: { name: 'April', value:4900 }, text: 'April'},
        { value: { name: 'May', value:4900 }, text: 'May'},
        { value: { name: 'June', value:4900 }, text: 'June'},
        { value: { name: 'July', value:4900 }, text: 'July'},
        { value: { name: 'August', value:4900 }, text: 'August '},
        { value: { name: 'September', value:4900 }, text: 'September'},
        { value: { name: 'October', value:4900 }, text: 'October'},
        { value: { name: 'November', value:4900 }, text: 'November'},
        { value: { name: 'December', value:4900 }, text: 'December'},

      ]
    }
  },
  methods:{
    pay() {
      Swal.fire({
        title: 'Success!',
        text: `You have successfully paid for your ${this.selected.name} subscription`,
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    }
  }
}
</script>

<style scoped>
  .breadcrumb{
    margin-top: 25px;
  }
  h2{
    margin: 20px 0 10px;
  }
  .form{
    text-align: left;
    width: 500px;
    border: 2px solid #000000;
    padding: 40px 30px 20px;
    margin: auto;
  }
</style>