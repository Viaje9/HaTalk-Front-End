import Vue from 'vue';
import Dayjs from 'dayjs';

/* eslint-disable */
const dayjsPlugin = {
  install(Vue) {
    Vue.prototype.$dayjs = Dayjs;
  },
};

Vue.use(dayjsPlugin);

export default new Dayjs();
