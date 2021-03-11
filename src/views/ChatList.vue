<template>
  <v-main class="scroll" app>
    <v-container class="pa-3" fluid>
      <v-card dark>
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
              <tr
                v-for="(item, index) in firends"
                :key="index + 'a'"
                link
                @click="$router.push('/Chat/' + item.account)"
              >
                <td>{{ item.name }}</td>
              </tr>
              <tr
                v-for="(item, index) in firends"
                :key="index + 'b'"
                link
                @click="$router.push('/Chat/' + item.account)"
              >
                <td>{{ item.name }}</td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </v-container>
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
  overflow-y: scroll;
}
@media (max-width: 960px) {
  .scroll {
    max-height: calc(100vh - 64px);
  }
}
</style>
