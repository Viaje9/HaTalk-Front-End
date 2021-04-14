<template>
  <v-dialog v-model="dialog" persistent max-width="344">
    <v-card dark>
      <v-card-title>
        搜索好友
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="account" :error="notFind" label="請輸入帳號" required></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn :loading="searchLoading" text color="teal accent-4" @click="search">
          搜索
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" @click="close">
          取消
        </v-btn>
      </v-card-actions>
      <v-expand-transition>
        <v-card
          v-if="reveal"
          class="transition-fast-in-fast-out v-card--reveal"
          style="height: 100%;"
        >
          <v-divider></v-divider>
          <v-card-title class="justify-center">
            {{ user.name }}
          </v-card-title>
          <v-card-actions class="pt-0 pb-3 justify-center">
            <template v-if="user.account === userAccount">
              <h3 class="teal--text text--accent-4">長得帥也不能跟自己聊天！</h3>
            </template>
            <template v-else-if="hasFriend">
              <v-btn color="teal accent-4" text :to="'/Chat/' + user.account">
                開始聊天
              </v-btn>
            </template>
            <template v-else>
              <v-btn :loading="addLoading" color="teal darken-2" @click="addFriend">
                加入好友
              </v-btn>
            </template>
          </v-card-actions>
        </v-card>
      </v-expand-transition>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      reveal: false,
      account: null,
      user: {
        account: null,
        name: null,
      },
      notFind: false,
      searchLoading: false,
      addLoading: false,
    };
  },
  computed: {
    userAccount() {
      return this.$store.state.account;
    },
    hasFriend() {
      const vm = this;
      const friends = vm.$store.state.friends.map((e) => e.account);
      return friends.includes(vm.user.account);
    },
  },
  methods: {
    search() {
      const vm = this;
      vm.searchLoading = true;
      vm.axios
        .get('/SearchUser', { params: { account: vm.account } })
        .then((res) => {
          vm.account = null;
          if (!res.data.success) {
            vm.notFind = true;
            vm.reveal = false;
            vm.user = {
              account: null,
              name: null,
            };
          } else {
            vm.user = res.data.user;
            vm.notFind = false;
            vm.reveal = true;
          }
        })
        .finally(() => {
          vm.searchLoading = false;
        });
    },
    addFriend() {
      const vm = this;
      vm.addLoading = true;
      vm.axios
        .post('/AddFriend', { account: vm.user.account })
        .then(async (res) => {
          // 需要判斷重複好友
          if (res.data.success) {
            await vm.$store.dispatch('getUser');
          }
        })
        .finally(() => {
          vm.addLoading = false;
        });
    },
    close() {
      const vm = this;
      vm.$emit('close');
      vm.reveal = false;
      vm.user = {
        account: null,
        name: null,
      };
    },
  },
};
</script>
