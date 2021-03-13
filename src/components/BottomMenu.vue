<template>
  <v-bottom-navigation app dark v-if="show && $vuetify.breakpoint.mobile">
    <v-btn icon to="/">
      <span>好友名單</span>
      <v-icon>mdi-account-multiple</v-icon>
    </v-btn>
    <v-btn icon to="/ledger">
      <span>帳本</span>
      <v-icon>mdi-cash-multiple</v-icon>
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
      this.show = !to.meta.DisableBottomMenu || !!Object.values(to.meta).length;
    },
  },
};
</script>
