<template>
  <v-main app id="LedgerSetting">
    <v-app-bar app dark flat>
      <v-btn icon replace to="/ledger">
        <v-icon large>mdi-chevron-left</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <span class="text-h5">設定</span>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-list class="LedgerSettingList" dark>
      <v-list-item-group>
        <v-list-item replace to="/ledger/setting/category">
          <v-list-item-icon>
            <v-icon>mdi-tag</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>類別設定</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>
      </v-list-item-group>
    </v-list>
  </v-main>
</template>

<style lang="scss">
#LedgerSetting {
  .LedgerSettingList {
    height: calc(100vh - 56px);
  }
}
</style>
