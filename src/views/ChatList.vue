<template>
  <v-main app>
    <v-app-bar app dark>
      <v-spacer></v-spacer>
      <v-btn icon @click="searchDialog = true">
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn icon @click="logoutDialog = true">
        <v-icon>mdi-exit-run</v-icon>
      </v-btn>
    </v-app-bar>
    <v-card dark tile height="100%">
      <v-simple-table dark class="scroll">
        <template #default>
          <tbody>
            <tr
              v-for="(item, index) in firends"
              :key="index"
              link
              @click="$router.push('/Chat/' + item.account)"
            >
              <td>{{ item.name }}</td>
            </tr>
          </tbody>
          <v-divider></v-divider>
        </template>
      </v-simple-table>
    </v-card>
    <BottomMenu />
    <v-row justify="center">
      <SearchFriend :dialog="searchDialog" @close="searchDialog = false" />
    </v-row>
    <v-dialog v-model="logoutDialog" max-width="290">
      <v-card dark>
        <v-card-title class="headline">
          確定要登出?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="logoutDialog = false">
            取消
          </v-btn>
          <v-btn color="green darken-1" text @click="logout">
            確定
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
import BottomMenu from '@/components/BottomMenu.vue';
import SearchFriend from '@/components/SearchFriend.vue';
import avatarImg from '@/assets/images/avatar.svg';

export default {
  components: { BottomMenu, SearchFriend },
  data() {
    return {
      avatarImg,
      logoutDialog: false,
      searchDialog: false,
    };
  },
  computed: {
    firends() {
      return this.$store.state.friends;
    },
  },
  created() {
    this.$store.dispatch('getUser');
  },
  methods: {
    logout() {
      const { axios, $router } = this;
      axios.get('/Logout').then(({ data }) => {
        if (data.success) {
          $router.push('/Login');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.scroll {
  height: calc(100vh - 64px);
  overflow-y: auto;
}
@media (max-width: 960px) {
  .scroll {
    height: calc(100vh - 128px);
  }
}
</style>
