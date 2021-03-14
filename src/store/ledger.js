import { openDB } from 'idb';
import dayjs from 'dayjs';

export default {
  namespaced: true,
  state: {
    status: 'expenditure',
    date: dayjs().format('YYYY-MM-DD'),
    dataBase: {
      name: 'Ledger',
      version: 1,
      storeName: 'expense',
    },
    db: {},
  },
  mutations: {
    changeStatus(state, data) {
      state.status = data;
    },
    changeDate(state, data) {
      state.date = data;
    },
  },
  actions: {
    async openDB({ state }) {
      const {
        dataBase: { name, version },
      } = state;
      function upgrade(db) {
        let objectStore;
        if (!db.objectStoreNames.contains('expense')) {
          objectStore = db.createObjectStore('expense', {
            keyPath: 'id',
            autoIncrement: true,
          });
          objectStore.createIndex('category', 'category', { unique: false });
          objectStore.createIndex('price', 'price', { unique: false });
          objectStore.createIndex('date', 'date', { unique: false });
          objectStore.createIndex('remark', 'remark', { unique: false });
          objectStore.createIndex('status', 'status', { unique: false });
          objectStore.createIndex('createTime', 'createTime', { unique: false });
          objectStore.createIndex('updateTime', 'updateTime', { unique: false });
        }
      }
      state.db = await openDB(name, version, { upgrade });
    },
  },
};
