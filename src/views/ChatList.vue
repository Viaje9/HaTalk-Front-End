<template>
  <v-main app>
    <v-app-bar app dark>
      <v-spacer></v-spacer>
      <v-btn icon to="/Search">
        <v-icon>mdi-account-multiple-plus</v-icon>
      </v-btn>
      <v-btn icon to="/User">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn icon @click="logout">
        <v-icon>mdi-cog</v-icon>
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
  </v-main>
</template>

<script>
import BottomMenu from '@/components/BottomMenu.vue';
import avatarImg from '@/assets/images/avatar.svg';

export default {
  components: { BottomMenu },
  data() {
    return {
      avatarImg,
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
