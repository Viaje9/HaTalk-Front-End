<template>
  <v-bottom-navigation app dark v-if="$vuetify.breakpoint.mobile">
    <v-btn icon replace to="/">
      <span>好友名單</span>
      <v-icon>mdi-account-multiple</v-icon>
    </v-btn>
    <v-btn icon replace to="/ledger">
      <span>帳本</span>
      <v-icon>mdi-cash-multiple</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
