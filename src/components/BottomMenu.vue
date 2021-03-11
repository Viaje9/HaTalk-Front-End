<template>
  <v-bottom-navigation app dark v-if="show">
    <v-btn to="/User">
      <span>更改暱稱</span>
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn to="/Search">
      <span>搜索好友</span>
      <v-icon>mdi-account-multiple-plus</v-icon>
    </v-btn>
    <v-btn to="/">
      <span>好友名單</span>
      <v-icon>mdi-account-multiple</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  data() {
    return {
      show: true,
    };
  },
  watch: {
    $route(to) {
      this.show = true;
      if (to.meta.DisableBottomMenu || !Object.values(to.meta).length) {
        this.show = false;
      }
    },
  },
};
</script>
