<template>
  <v-app>
    <Menu />
    <router-view></router-view>
    <BottomMenu />
  </v-app>
</template>
<script>
import Menu from '@/components/Menu.vue';
import BottomMenu from '@/components/BottomMenu.vue';

export default {
  components: { Menu, BottomMenu },
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
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
</style>
