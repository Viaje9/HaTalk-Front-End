<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>
<script>

export default {
  created() {
    this.$store.dispatch('ledger/openDB');
  },
};
</script>
<style lang="scss">
* {
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  font-family: 'Noto Sans TC';
  text-decoration: none;
}
#app {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
