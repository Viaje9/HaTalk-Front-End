<template>
  <v-main class="scroll" app>
    <v-card dark tile>
      <v-app-bar>
        <v-spacer></v-spacer>
        <v-btn icon to="/Search">
          <v-icon>mdi-account-multiple-plus</v-icon>
        </v-btn>
        <v-btn icon to="/User">
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-app-bar>
      <v-simple-table>
        <template v-slot:default>
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
        </template>
      </v-simple-table>
    </v-card>
  </v-main>
</template>

<script>
import avatarImg from '@/assets/images/avatar.svg';

export default {
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
};
</script>

<style lang="scss" scoped>
.scroll {
  max-height: 100vh;
  overflow-y: auto;
}
@media (max-width: 960px) {
  .scroll {
    max-height: calc(100vh - 64px);
  }
}
</style>
