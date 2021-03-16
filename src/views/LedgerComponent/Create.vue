<template>
  <v-main app id="LedgerCreate">
    <v-card dark tile height="100%">
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
      <v-carousel v-model="carouselIndex" hide-delimiters next-icon prev-icon height="400px">
        <v-carousel-item v-for="(carouse ,i) in thisCategoryList" :key="i">
          <v-btn-toggle mandatory v-model="category" tile>
            <v-container class="pa-2">
              <v-row class="pa-0">
                <v-col col="12" class="text-center">
                  <v-btn
                    v-for="(item,index) in carouse"
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
        </v-carousel-item>
      </v-carousel>
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
    thisCategoryList() {
      const { status, categoryList } = this;
      return categoryList
        .filter((e) => e.status === status).reduce((acc, curr, i) => {
          const index = parseInt(i / 20, 10);
          if (!acc[index]) {
            acc[index] = [];
          }
          acc[index].push(curr);
          return acc;
        }, []);
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

<style></style>
