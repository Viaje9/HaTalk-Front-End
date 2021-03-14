<template>
  <v-main app id="Ledger">
    <v-card dark tile height="100%">
      <v-app-bar>
        <v-btn icon @click="dialogData = true">
          <v-icon large>mdi-calendar-month</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <span class="text-h5">{{ selectDate }}</span>
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card-text>
        <v-card tile elevation="5">
          <v-card-title class="d-flex justify-space-around">
            <span class="text-h5">TWD</span>
            <span class="text-h5">{{ deviceSize }}</span>
          </v-card-title>
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
              <tbody class="LedgerTbody">
                <tr v-for="i in 10" :key="i">
                  <td class="text-center">食物</td>
                  <td class="text-center">$90</td>
                  <td class="text-center"></td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-card-text>
      <v-toolbar id="LedgerToolbar" absolute bottom flat width="100%">
        <v-btn-toggle class="LedgerBtnToggle" tile group borderless v-model="ledgerStatusIndex">
          <v-btn class="LedgerBtn" text tile>
            支出
          </v-btn>
          <v-btn class="LedgerBtn" text tile>
            收入
          </v-btn>
        </v-btn-toggle>
      </v-toolbar>
    </v-card>
    <v-bottom-sheet v-model="dialogData">
      <v-date-picker v-model="selectDate" dark header-color="grey darken-2"></v-date-picker>
      <v-sheet class="text-center pa-2" dark>
        <v-btn block @click="dialogData = false">
          確定
        </v-btn>
      </v-sheet>
    </v-bottom-sheet>
  </v-main>
</template>

<script>
// import { openDB } from 'idb';

export default {
  data() {
    return {
      dialogData: false,
      ledgerStatusIndex: 0,
      selectDate: this.$dayjs().format('YYYY-MM-DD'),
      dataBase: {
        name: 'Ledger',
        version: 1,
        storeName: 'expense',
      },
      db: {},
    };
  },
  computed: {
    deviceSize() {
      const { innerHeight, innerWidth } = window;
      return `寬: ${innerWidth} 高:${innerHeight}`;
    },
  },
  async created() {
    // console.log(this.$store.state.ledger);
    // const {
    //   dataBase: { name, version },
    //   upgrade,
    // } = this;
    // this.db = await openDB(name, version, { upgrade });
  },
  methods: {
    upgrade(db) {
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
    },
  },
};
</script>
<style lang="scss">
#Ledger {
  --tbodyHeight: 300px;
  @media (min-height: 570px) {
    --tbodyHeight: 400px;
  }
  @media (min-height: 900px) {
    --tbodyHeight: 700px;
  }
  .LedgerTable {
    .v-data-table__wrapper,
    .LedgerTbody {
      height: var(--tbodyHeight);
      th,
      td {
        vertical-align: middle;
      }
    }
  }
  #LedgerToolbar .v-toolbar__content {
    padding: 0;
    .LedgerBtnToggle {
      width: 100%;
      height: 100%;
      .LedgerBtn {
        width: 50%;
        height: 100%;
        margin: 0;
      }
    }
  }
}
</style>
