<template>
  <v-main app id="LedgerCreate">
    <v-card dark tile class="LedgerCreateCard" height="100%">
      <v-app-bar dark flat>
        <v-btn icon replace to="/ledger">
          <v-icon large>mdi-chevron-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <span class="text-h5">{{ statusTitle }}</span>
        <v-spacer></v-spacer>
        <v-btn tile @click="addItem">
          儲存
        </v-btn>
      </v-app-bar>
      <div class="d-flex justify-space-around align-center py-3" @click="openComputer = true">
        <span class="text-h4">TWD</span>
        <span class="text-h4">${{ price }}</span>
      </div>
      <v-divider></v-divider>
      <v-btn-toggle class="categoryList" mandatory v-model="category" tile>
        <v-container class="pa-1">
          <v-row class="pa-0 ma-0">
            <v-col col="12" class="ma-0">
              <v-btn
                v-for="(item, index) in categoryList"
                :value="item.name"
                :key="index"
                class="ma-1"
                @click="openComputer = true"
              >
                {{ item.name }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-btn-toggle>
      <v-divider></v-divider>
      <v-text-field solo dark v-model="remark" class="pa-5" label="備註" type="text"></v-text-field>
    </v-card>
    <v-bottom-sheet v-model="openComputer" persistent>
      <Computer :price="price" @price="updatePirce" @close="openComputer = false" />
    </v-bottom-sheet>
  </v-main>
</template>

<script>
import Computer from '@/components/Computer.vue';
import { mapState } from 'vuex';

export default {
  components: { Computer },
  data() {
    return {
      price: '0',
      remark: '',
      carouselIndex: 0,
      openComputer: false,
      category: '',
    };
  },
  computed: {
    ...mapState('ledger', {
      date: (state) => state.date,
      status: (state) => state.status,
      db: (state) => state.db,
      categoryList: (state) => state.categoryList,
    }),
    statusTitle() {
      const status = new Map([
        ['expenditure', '支出'],
        ['income', '收入'],
      ]);
      return status.get(this.status);
    },
  },
  created() {
    this.$store.dispatch('ledger/updateCategoryList');
  },
  methods: {
    updatePirce(price) {
      this.price = price;
    },
    async addItem() {
      const {
        date, price: strPrice, category, remark, status, db,
      } = this;
      const price = Number(strPrice);
      if (price) {
        const createTime = this.$dayjs().format('YYYY-MM-DDTHH:mm:ssZ[Z]');
        const updateTime = createTime;
        const item = {
          date,
          price,
          category,
          remark,
          status,
          createTime,
          updateTime,
        };
        await db.add('expense', item);
        this.$store.dispatch('ledger/updateItemList');
        this.price = '0';
        this.remark = '';
        this.$router.replace('/ledger');
      }
    },
  },
};
</script>

<style lang="scss">
#LedgerCreate {
  height: 100vh;
  .LedgerCreateCard {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 54px 64px 1px auto 1px 96px;
    .categoryList {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      height: 100%;
      overflow-y: scroll;
    }
  }
}
</style>
