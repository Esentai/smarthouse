<template>
  <div class="container">
    <div class="content">
      <b-button class="addBtn" variant="primary" v-b-modal.modal-prevent-closing>Add new light device</b-button>
      <b-modal id="modal-prevent-closing" ref="modal" title="Add new light device" @show="resetModal" @hidden="resetModal" @ok="handleOk">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group label="Device ID" label-for="id-input" invalid-feedback="ID is required" :state="idState">
            <b-form-input id="id-input" v-model="id" :state="idState" required></b-form-input>
          </b-form-group>
          <b-form-group label="Device name" label-for="name-input" invalid-feedback="Name is required" :state="nameState">
            <b-form-input id="name-input" v-model="name" :state="nameState" required></b-form-input>
          </b-form-group>
        </form>
      </b-modal>
      <h2 class="title">Lighting devices</h2>
      <div class="item" v-for="device in devices" :key="device.deviceID">
        <h3 class="itemText">{{device.name}}</h3>
        <toggle-button
            class="itemBtn"
            @change="onChangeEventHandler(device.deviceID,device.state)"
            :value="Boolean(device.state)"
            :labels="{checked: 'on', unchecked: 'off'}"
            :width=56
            :height=26
            :font-size=14
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Light",
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
            value: 0
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

    async onChangeEventHandler(id, state){
      console.log(id, " " , !state);
      await axios.put('http://localhost:5000/update', {
        params: {
          deviceID: id,
          state: !state,
        }
      }).then((response) => {
        this.getDevice();
        console.log(response.data);
      });
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
  .itemBtn{
    margin: 3px 30px;
  }
  .itemText{
    font-size: 24px;
  }
</style>