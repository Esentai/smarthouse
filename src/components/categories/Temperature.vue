<template>
  <div class="container">
    <div class="content">
      <b-button class="addBtn" variant="primary" v-b-modal.modal-prevent-closing>Add new temperature measuring device</b-button>
      <b-modal id="modal-prevent-closing" ref="modal" title="Add new temperature measuring device" @show="resetModal" @hidden="resetModal" @ok="handleOk">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Device ID" label-for="id-input" invalid-feedback="ID is required" :state="idState">
            <b-form-input id="id-input" v-model="id" :state="idState" required></b-form-input>
          </b-form-group>
          <b-form-group label="Device name" label-for="name-input" invalid-feedback="Name is required" :state="nameState">
            <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
      <h1 class="title">Temperature</h1>
      <div class="item" v-for="device in devices" :key="device.deviceID">
        <h3 class="itemText">{{device.name}} <span class="temp">{{device.value}}°C</span> </h3>

      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Music",
  props: ['category'],
  data() {
    return {
      id:'',
      name: '',
      nameState: null,
      idState: null,
      devices:[],
      empty: false,
    }
  },
  created() {
    this.getDevice();
  },
  methods:{
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.nameState = valid
      this.idState = valid
      return valid
    },
    resetModal() {
      this.name = ''
      this.id = ''
      this.idState = null
      this.nameState = null

    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    async handleSubmit() {
      if (!this.checkFormValidity()) {
        return
      }
      await axios.post('http://localhost:5000/device', {
        params: {
          deviceId: this.id,
          homeID: localStorage.getItem("homeID"),
          category: this.category,
          name: this.name,
          state: false,
          value: this.random()
        }
      }).then((response) => {
        console.log(response);
        if (response.data === 'success'){
          console.log("Added")
          this.getDevice();
        }else{
          this.$alert(`Error! ${response.data}`);
          return
        }
      }, (error) => {
        console.log(error);
      });


      this.$nextTick(() => {
        this.$bvModal.hide('modal-prevent-closing')
      })
    },

    async getDevice(){
      await axios.post('http://localhost:5000/getDevice', {
        params: {
          homeID: localStorage.getItem("homeID"),
          category: this.category,
        }
      }).then((response) => {
        console.log(response.data);
        if (response.data === 'empty'){
          this.empty = true
          return;
        }
        this.devices =  response.data;
      });
    },
    random(){
      return Math.floor(Math.random() * (30 - 24 + 1) ) + 24;
    }
  }
}
</script>

<style scoped>
.content{
  text-align: left;
}
.title{
  text-align: center;
  margin-top: 25px;
}
.item{
  display: flex;
  justify-items: center;
  justify-self: center;
  background-color: #f5f5f5;
  padding: 9px 20px 5px 20px;
  border-radius: 15px;
  margin: 20px 0;
}

.itemText{
  font-size: 24px;
}

.temp{
  margin-left: 20px;
  padding: 5px 15px;
  background-color: darkturquoise;
  border-radius: 10px;
}
</style>