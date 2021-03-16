<template>
  <v-main id="LedgerSettingCategory" app>
    <v-app-bar app dark flat>
      <v-btn icon replace to="/ledger/setting">
        <v-icon large>mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <span class="text-h5">類別設定</span>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-tabs dark grow v-model="statusIndex">
      <v-tab>支出</v-tab>
      <v-tab>收入</v-tab>
    </v-tabs>
    <div class="d-flex px-4 grey darken-4 align-center">
      <v-text-field
        class="SettingCategoryInput"
        dark
        background-color="grey darken-4"
        filled
        height="56px"
        label="新增類別"
        hide-details
        placeholder="請輸入類別"
        v-model="category"
      ></v-text-field>
      <v-btn tile dark class="blue-grey darken-4" @click="addCategory">
        新增
      </v-btn>
    </div>
    <v-divider></v-divider>
    <v-list class="LedgerSettingCategoryList" dark>
      <template v-for="(item, index) in thisCategoryList">
        <v-list-item :key="index">
          <v-list-item-content>
            <v-list-item-title class="pl-3">{{ item.name }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn tile class="red darken-4" @click="deleteCategory(item.id)">
              刪除
            </v-btn>
          </v-list-item-action>
        </v-list-item>
        <v-divider :key="index + 'divider'"></v-divider>
      </template>
    </v-list>
    <v-snackbar content-class="d-flex" timeout="3000" top v-model="categoryRepeat">
      <v-spacer></v-spacer>
      類別已重複
      <v-spacer></v-spacer>
      <v-icon color="red darken-4">mdi-alert</v-icon>
    </v-snackbar>
  </v-main>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      statusIndex: 0,
      category: '',
      categoryRepeat: false,
    };
  },
  computed: {
    ...mapState('ledger', {
      db: (state) => state.db,
      categoryList: (state) => state.categoryList,
    }),
    status() {
      return ['expenditure', 'income'][this.statusIndex];
    },
    thisCategoryList() {
      const { status } = this;
      return this.categoryList.filter((e) => e.status === status);
    },
  },
  created() {
    this.$store.dispatch('ledger/updateCategoryList');
  },
  methods: {
    async addCategory() {
      const { db, category, status } = this;
      const vm = this;
      const item = {
        name: category,
        status,
      };
      await db.add('category', item).catch(() => {
        vm.categoryRepeat = true;
      });
      // this.category = '';
      this.$store.dispatch('ledger/updateCategoryList');
    },
    async deleteCategory(id) {
      const { db } = this;
      await db.delete('category', id);
      this.$store.dispatch('ledger/updateCategoryList');
    },
  },
};
</script>

<style lang="scss">
#LedgerSettingCategory {
  .SettingCategoryInput {
    border-radius: 0;
  }
  .LedgerSettingCategoryList {
    height: calc(100vh - 160px);
    overflow: auto;
  }
}
</style>
