<template>
  <div>
    <Header/>
    <div class="container">
      <b-breadcrumb class="breadcrumb" :items="items"></b-breadcrumb>
    </div>
    <Light v-if="componentName === 'light'" :category="componentName"/>
    <Camera v-if="componentName === 'camera'" :category="componentName"/>
    <Music v-if="componentName === 'music'" :category="componentName"/>
    <Temperature v-if="componentName === 'temperature'" :category="componentName"/>
    <Intercom v-if="componentName === 'intercom'" :category="componentName"/>
    <Air v-if="componentName === 'air'" :category="componentName"/>
  </div>
</template>

<script>

import Header from "@/components/Header";
import Light from '@/components/categories/Light'
import Camera from '@/components/categories/Camera'
import Music from "@/components/categories/Music";
import Temperature from "@/components/categories/Temperature";
import Intercom from "@/components/categories/Intercom";
import Air from "@/components/categories/Air";


export default {
  name: "Details",
  components:{
    Header,
    Light,
    Camera,
    Music,
    Temperature,
    Intercom,
    Air
  },
  data:() => {
    return{
        componentName:'',
        items: [
          {
            text: 'Home',
            to: { name: 'Home' }
          },
          {
            text: '',
            active: true
          }
        ]
    }
  },
  created() {
    this.componentName = this.$route.params.id
    console.log(this.componentName)
    this.items[1].text = this.componentName
  },

}
</script>

<style scoped>
  .breadcrumb{
    margin-top: 25px;
  }
</style>