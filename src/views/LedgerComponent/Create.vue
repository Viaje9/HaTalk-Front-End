<template>
  <v-main app id="LedgerCreate">
    <v-card dark tile height="100%">
      <v-app-bar dark flat>
        <v-btn icon to="/ledger">
          <v-icon large>mdi-chevron-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <span class="text-h5">{{ statusTitle }}</span>
        <v-spacer></v-spacer>
        <v-btn tile>
          儲存
        </v-btn>
      </v-app-bar>
      <div class="d-flex justify-space-around align-center py-3" @click="openComputer = true">
        <span class="text-h4">TWD</span>
        <span class="text-h4">${{ price }}</span>
      </div>
      <v-divider></v-divider>
      <v-carousel v-model="carouselIndex" hide-delimiters next-icon prev-icon height="400px">
        <v-carousel-item v-for="i in 10" :key="i">
          <v-btn-toggle v-model="category" tile>
            <v-container class="pa-2">
              <v-row class="pa-0">
                <v-col col="12" class="text-center">
                  <v-btn value="早餐" class="ma-1">
                    早餐
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
      category: '早餐',
    };
  },
  computed: {
    ...mapState('ledger', {
      date: (state) => state.date,
      status: (state) => state.status,
      dataBase: (state) => state.dataBase,
      db: (state) => state.db,
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
    this.$store.dispatch('ledger/openDB');
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
        this.price = '0';
        this.remark = '';
        this.$router.push('/ledger');
      }
    },
  },
};
</script>

<style></style>
