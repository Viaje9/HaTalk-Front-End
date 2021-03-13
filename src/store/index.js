import Vue from 'vue';
import Vuex from 'vuex';
import axios from '../plugins/axios';
import ledger from './ledger';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: null,
    account: null,
    friends: [],
    auth: false,
    menu: true,
  },
  mutations: {
    setUser(state, data) {
      const { name, account, friends } = data;
      state.name = name;
      state.account = account;
      state.friends = friends;
    },
    updateUserName(state, data) {
      state.name = data;
    },
    setMenuDisplay(state, data) {
      state.menu = data;
    },
  },
  actions: {
    async getUser(context) {
      const { state } = context;
      await axios.get('/GetUser').then((res) => {
        const {
          name, account, friends, success,
        } = res.data;

        if (success) {
          state.name = name;
          state.account = account;
          state.friends = friends;
          state.auth = true;
        }
      });
    },
    // updateUserName(state, data) {
    //   state.name = data;
    // },
  },
  getters: {
    getFriendName: (state) => (account) => {
      const friend = state.friends.find((e) => e.account === account);
      return friend ? friend.name : '';
    },
    userData: (state) => !!state.account,
  },
  modules: {
    ledger,
  },
});
