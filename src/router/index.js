import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import ChatList from '../views/ChatList.vue';
import Chat from '../views/Chat.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import User from '../views/User.vue';
import Search from '../views/Search.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: ChatList,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/register',
    component: Register,
  },
  {
    path: '/chat/:id',
    component: Chat,
    meta: {
      requiresAuth: true,
      DisableBottomMenu: true,
    },
  },
  {
    path: '/user',
    component: User,
    meta: { requiresAuth: true },
  },
  {
    path: '/search',
    component: Search,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  const toAuthPage = to.matched.some((record) => record.meta.requiresAuth);
  if (!from.matched.length) {
    await store.dispatch('getUser');
  }
  const { auth } = store.state;

  if (toAuthPage) {
    store.commit('setMenuDisplay', true);
    if (auth) {
      next();
    } else {
      next({
        path: '/login',
      });
    }
  } else {
    store.commit('setMenuDisplay', false);
    next();
  }
});

export default router;
