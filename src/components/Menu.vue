<template>
  <v-navigation-drawer touchless v-model="menuDialog" app dark>
    <v-sheet dark class="pa-4">
      <v-avatar class="mb-4" size="64">
        <img :src="avatarImg" alt="" />
      </v-avatar>
      <div>{{ name }}</div>
    </v-sheet>
    <v-divider></v-divider>
    <v-list>
      <v-list-item link to="/">
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>聊天室</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link to="/ledger">
        <v-list-item-icon>
          <v-icon>mdi-cash-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>帳本</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template #append>
      <div class="pa-2 ">
        <v-btn block @click="logoutDialog = true">
          登出
        </v-btn>
      </div>
      <div class="text-center pb-5">
        <span class="white--text">Copyright © 2021 Viaje9 Design.</span>
      </div>
    </template>
    <v-dialog v-model="logoutDialog" max-width="290">
      <v-card dark>
        <v-card-title class="headline">
          確定要登出?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="logout">
            確定
          </v-btn>
          <v-btn color="red darken-1" @click="logoutDialog = false">
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-navigation-drawer>
</template>

<script>
import avatarImg from '@/assets/images/avatar.svg';

export default {
  props: {
    clickMenu: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      avatarImg,
      menuDialog: true,
      logoutDialog: false,
    };
  },
  computed: {
    name() {
      return this.$store.state.name;
    },
  },
  watch: {
    clickMenu() {
      this.menuDialog = !this.menuDialog;
    },
  },
  created() {
    this.menuDialog = !this.$vuetify.breakpoint.mobile;
  },
  methods: {
    logout() {
      const { axios, $router, $store } = this;
      axios.get('/Logout').then(({ data }) => {
        if (data.success) {
          $store.commit('clearAuth');
          $router.push('/Login');
        }
      });
    },
  },
};
</script>
