<template>
  <div class="container">
    <h1 class="title">Welcome to the {{homeName}} house </h1>
    <div class="row">
      <div class="col-md-4" v-for="category in list" :key="category.id">
        <div class="item">
          <router-link class="link"  :to="{ name: 'categories', params: { id: category.id }}">
            <img :src="getImgUrl(category.img)" width="120" height="120" alt="">
            <h1 class="item_text">{{category.name}}</h1>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "List",
  data: () => {
    return{
      homeName:'',
      list:[
        {
          name:'Light',
          img: 'lightbulb',
          id: 'light'
        },
        {
          name:'Video control',
          img: 'video-camera',
          id: 'camera'
        },
        {
          name:'Music',
          img: 'music-note',
          id:'music'
        },
        {
          name:'Temperature',
          img: 'thermometer',
          id:'temperature'
        },
        {
          name:'Intercom',
          img: 'intercom',
          id:'intercom'
        },
        {
          name:'Air conditioning',
          img: 'air-conditioner',
          id:'air'
        },
      ]
    }
  },
  created() {
    this.getHomeName();
  },
  methods:{
    getImgUrl(pet) {
      let images = require.context('../assets/', false, /\.png$/)
      return images('./' + pet + ".png")
    },
    getHomeName: async function (){
      await axios.post('http://localhost:5000/getName', {
        params: {
          homeID: localStorage.getItem("homeID"),
        }
      }).then((response) => {
        this.homeName =  response.data[0].name;
      });

    }
  }
}
</script>

<style scoped>
  .title{
    font-size: 32px;
    margin-top: 15px;
  }
  .item{
    text-align: center;
    background-color: #f5f5f5;
    margin-top: 25px;
    padding: 15px 0;
    border-radius: 25px;
  }
  .link{
    display: block;
    width: 100%;
    height: 200px;
  }
  .item_text{
    font-size: 24px;
    margin-top: 35px;
    color: #000;
  }
  .item:hover{
    opacity: 0.75;
  }
  .link:hover{
    color: #fff;
  }

</style>