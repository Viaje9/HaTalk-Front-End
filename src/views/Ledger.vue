<template>
  <v-main app id="Ledger">
    <v-card dark tile height="100%">
      <v-app-bar>
        <v-btn icon @click="dialogData = true">
          <v-icon large>mdi-calendar-month</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        {{ selectDate }}
        <v-spacer></v-spacer>
        <v-btn icon>
          <v-icon large>mdi-plus</v-icon>
        </v-btn>
      </v-app-bar>
      <v-card-text>
        <v-card tile elevation="5">
          <v-card-title class="d-flex justify-space-around">
            <span>TWD</span>
            <span>123123</span>
          </v-card-title>
          <v-divider></v-divider>
          <v-simple-table class="LedgerTable" fixed-header>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">
                    類別
                  </th>
                  <th class="text-center">
                    金額
                  </th>
                </tr>
              </thead>
              <tbody class="LedgerTbody">
                <tr v-for="i in 10" :key="i">
                  <td class="text-center">食物</td>
                  <td class="text-center">$90</td>
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
export default {
  data() {
    return {
      dialogData: false,
      ledgerStatusIndex: 0,
      selectDate: null,
    };
  },
};
</script>
<style lang="scss">
#Ledger {
  --tbodyHeight: 400px;
  @media screen and (min-height: 813px) {
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
