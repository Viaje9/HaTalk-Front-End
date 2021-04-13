import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
import ChatList from '../views/ChatList.vue';
import Ledger from '../views/Ledger.vue';
import LedgerCreate from '../views/LedgerComponent/Create.vue';
import LedgerSetting from '../views/LedgerComponent/Setting.vue';
import LedgerSettingCategory from '../views/LedgerComponent/Setting/Category.vue';
import Chat from '../views/Chat.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import User from '../views/User.vue';

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
    path: '/ledger',
    component: Ledger,
    meta: { requiresAuth: true },
  },
  {
    path: '/ledger/create',
    component: LedgerCreate,
    meta: { requiresAuth: true },
  },
  {
    path: '/ledger/setting',
    component: LedgerSetting,
    meta: { requiresAuth: true },
  },
  {
    path: '/ledger/setting/category',
    component: LedgerSettingCategory,
    meta: { requiresAuth: true },
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
