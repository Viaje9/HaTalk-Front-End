<template>
  <v-main app id="Ledger">
    <v-app-bar dark flat>
      <v-btn icon @click="dialogData = true">
        <v-icon large>mdi-calendar-month</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <span class="text-h5">{{ date }}</span>
      <v-spacer></v-spacer>
      <v-btn icon to="/ledger/create">
        <v-icon large>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <v-card id="LedgerCotent" dark tile elevation="0">
      <div class="d-flex justify-space-around align-center">
        <span class="text-h4">TWD</span>
        <span class="text-h4">{{ price }}</span>
      </div>
      <v-divider></v-divider>
      <v-simple-table class="LedgerTable" fixed-header>
        <template #default>
          <thead>
            <tr>
              <th class="text-center">
                類別
              </th>
              <th class="text-center">
                金額
              </th>
              <th class="text-center">
                備註
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in 20" :key="i">
              <td class="text-center">食物</td>
              <td class="text-center">90</td>
              <td class="text-center">185156</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-card>
    <div id="LedgerBottomBar">
      <v-btn
        dark
        color="grey darken-2"
        elevation="0"
        :class="{ 'v-btn--active': status === 'expenditure' }"
        class="LedgerBtn"
        tile
        @click="changeStatus('expenditure')"
      >
        支出
      </v-btn>
      <v-btn
        dark
        color="grey darken-2"
        elevation="0"
        :class="{ 'v-btn--active': status === 'income' }"
        class="LedgerBtn"
        tile
        @click="changeStatus('income')"
      >
        收入
      </v-btn>
      <v-btn dark color="grey darken-2" elevation="0" class="LedgerBtn" tile>
        統計
      </v-btn>
      <v-btn dark color="grey darken-2" elevation="0" class="LedgerBtn" tile>
        設定
      </v-btn>
    </div>
    <v-bottom-sheet v-model="dialogData">
      <v-date-picker
        @change="changeDate"
        :value="date"
        dark
        header-color="grey darken-2"
        width="100%"
      ></v-date-picker>
      <v-sheet class="text-center pa-2" dark>
        <v-btn block @click="dialogData = false">
          確定
        </v-btn>
      </v-sheet>
    </v-bottom-sheet>
    <BottomMenu />
  </v-main>
</template>

<script>
import BottomMenu from '@/components/BottomMenu.vue';
import { mapState } from 'vuex';

export default {
  components: { BottomMenu },
  data() {
    return {
      price: 0,
      dialogData: false,
      ledgerStatusIndex: 0,
    };
  },
  computed: {
    ...mapState('ledger', {
      date: (state) => state.date,
      status: (state) => state.status,
      dataBase: (state) => state.dataBase,
      db: (state) => state.db,
    }),
  },
  created() {
    this.$store.dispatch('ledger/openDB');
  },
  methods: {
    changeStatus(data) {
      this.$store.commit('ledger/changeStatus', data);
    },
    changeDate(date) {
      this.$store.commit('ledger/changeDate', date);
    },
  },
};
</script>
<style lang="scss">
#Ledger {
  height: 100vh;
  .v-main__wrap {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 56px auto 108px;
    height: 100%;
    #LedgerCotent {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 56px 1px auto;
      overflow: hidden;
      .LedgerTable {
        height: 100%;
        overflow: auto;
        .v-data-table__wrapper {
          height: 100%;
          th,
          td {
            vertical-align: middle;
          }
        }
      }
    }
  }
  #LedgerBottomBar {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    .LedgerBtn {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
