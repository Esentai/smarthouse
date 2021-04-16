<template>
  <div class="home">
    <Header />
    <List/>
  </div>
</template>

<script>
// @ is an alias to /src

import Header from '../components/Header'
import List from '../components/List'
export default {
  name: 'Home',
  components: {
    Header,
    List
  }
}
</script>
