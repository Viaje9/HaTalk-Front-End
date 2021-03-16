import { openDB } from 'idb';
import dayjs from 'dayjs';

export default {
  namespaced: true,
  state: {
    status: 'expenditure',
    date: dayjs().format('YYYY-MM-DD'),
    dataBase: {
      name: 'Ledger',
      version: 2,
      expenseStore: 'expense',
      categoryStore: 'category',
    },
    db: {},
    itemList: [],
    categoryList: [],
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

        if (!db.objectStoreNames.contains('category')) {
          objectStore = db.createObjectStore('category', {
            keyPath: 'id',
            autoIncrement: true,
          });
          objectStore.createIndex('name', 'name', { unique: true });
          objectStore.createIndex('status', 'status', { unique: false });
        }
      }
      state.db = await openDB(name, version, { upgrade });
    },
    async updateItemList({ state }) {
      const { db, dataBase: { expenseStore } } = state;
      state.itemList = await db.getAll(expenseStore);
    },
    async updateCategoryList({ state }) {
      const { db, dataBase: { categoryStore } } = state;
      state.categoryList = await db.getAll(categoryStore);
    },
  },
};
