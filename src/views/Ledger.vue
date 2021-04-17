<template>
  <v-main app id="Ledger">
    <Menu :click-menu="drawerMenu" />
    <v-app-bar dark flat>
      <v-app-bar-nav-icon
        v-if="$vuetify.breakpoint.mobile"
        @click.stop="drawerMenu = !drawerMenu"
      ></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <span class="text-h5" @click="dialogDate = true">{{ date }}</span>
      <v-spacer></v-spacer>
      <v-btn icon replace to="/ledger/create">
        <v-icon large>mdi-plus</v-icon>
      </v-btn>
    </v-app-bar>
    <v-card id="LedgerCotent" dark tile elevation="0">
      <div class="d-flex justify-space-around align-center">
        <span class="text-h4">TWD</span>
        <span class="text-h4">{{ todayTotal }}</span>
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
            <tr v-for="(item, index) in thisDateData" :key="index">
              <td class="text-center">{{ item.category }}</td>
              <td class="text-center">{{ item.price }}</td>
              <td class="text-center">{{ item.remark }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <v-card-actions class="pa-0">
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
        </div>
      </v-card-actions>
    </v-card>

    <v-bottom-navigation absolute dark class="justify-space-around">
      <v-btn elevation="0">
        <span>統計</span>
        <v-icon>mdi-chart-bar</v-icon>
      </v-btn>
      <v-btn elevation="0" replace to="/ledger/setting">
        <span>
          設定
        </span>
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-bottom-sheet v-model="dialogDate" width="384px">
      <v-date-picker
        @change="changeDate"
        :value="date"
        dark
        header-color="grey darken-2"
        width="100%"
      ></v-date-picker>
      <v-sheet class="text-center pa-2" dark>
        <v-btn block @click="dialogDate = false">
          確定
        </v-btn>
      </v-sheet>
    </v-bottom-sheet>
  </v-main>
</template>

<script>
import Menu from '@/components/Menu.vue';
import { mapState } from 'vuex';

export default {
  components: { Menu },
  data() {
    return {
      dialogDate: false,
      drawerMenu: false,
    };
  },
  computed: {
    ...mapState('ledger', {
      date: (state) => state.date,
      status: (state) => state.status,
      data: (state) => state.itemList,
    }),
    thisDateData() {
      const {
        status, data, date, $dayjs,
      } = this;
      const today = $dayjs(date).format('YYYY-MM-DD');
      return data.filter((e) => {
        const thisDate = $dayjs(today).isSame($dayjs(e.date));
        return thisDate && e.status === status;
      });
    },
    todayTotal() {
      return this.thisDateData.reduce((acc, curr) => {
        const total = acc + Number(curr.price);
        return total;
      }, 0);
    },
  },
  created() {
    this.$store.dispatch('ledger/updateItemList');
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
    grid-template-rows: 56px auto 54px;
    height: 100%;
    #LedgerCotent {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 56px 1px auto 54px;
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
