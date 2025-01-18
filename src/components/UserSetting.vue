<template>
  <v-dialog v-model="dialog" persistent max-width="344">
    <v-card dark>
      <v-card-title>
        更改名稱
      </v-card-title>
      <v-card-text class="text-center">
        <span class="text-h5">
          {{ userName }} ({{ userAccount }})
        </span>
        <div class="d-flex align-center">
          <v-text-field v-model="name" label="請輸入暱稱" required></v-text-field>
          <v-btn text :loading="changeLoading" color="teal accent-4" @click="changeName">
            更改名稱
          </v-btn>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn block color="teal accent-4" @click="$emit('close')">
          關閉
        </v-btn>
      </v-card-actions>
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
      name: null,
      changeLoading: false,
    };
  },
  computed: {
    userName() {
      return this.$store.getters.getUserName;
    },
    userAccount() {
      return this.$store.state.account;
    },
  },
  methods: {
    changeName() {
      const vm = this;
      vm.changeLoading = true;
      vm.axios
        .put('/UpdateUserName', { name: vm.name })
        .then(({ data }) => {
          if (data.success) {
            vm.$store.commit('updateUserName', vm.name);
            vm.name = null;
          }
        })
        .finally(() => {
          vm.changeLoading = false;
        });
    },
  },
};
</script>
