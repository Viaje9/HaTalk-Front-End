<template>
  <div id="Computer">
    <div class="computerSymbol">
      <v-btn dark class="ComputerBtn" tile>
        <v-icon large>mdi-division</v-icon>
      </v-btn>
      <v-btn dark class="ComputerBtn" tile>
        <v-icon large>mdi-window-close</v-icon>
      </v-btn>
      <v-btn dark class="ComputerBtn" tile>
        <v-icon large>mdi-minus</v-icon>
      </v-btn>
      <v-btn dark class="ComputerBtn" tile>
        <v-icon large>mdi-plus</v-icon>
      </v-btn>
    </div>
    <div class="computerNumber">
      <v-btn dark class="ComputerBtn" tile v-for="i in 9" :key="i" @click="addNumber(i)">
        <v-icon large>mdi-numeric-{{ i }}</v-icon>
      </v-btn>
      <v-btn dark class="ComputerBtn" tile @click="addDot">
        <v-icon large>mdi-circle-small</v-icon>
      </v-btn>
      <v-btn dark class="ComputerBtn" tile @click="addNumber(0)">
        <v-icon large>mdi-numeric-0</v-icon>
      </v-btn>
      <v-btn dark class="ComputerBtn" tile @click="backspace">
        <v-icon large>mdi-backspace-outline</v-icon>
      </v-btn>
    </div>
    <div class="ComputerBtnTop">
      <v-btn dark class="ComputerBtn text-h4" tile @click="AC">
        AC
      </v-btn>
    </div>
    <div class="ComputerBtnBtm">
      <template v-if="calculationStatus">
        <v-btn dark class="ComputerBtn text-h4" tile>
          <v-icon large>mdi-equal</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-btn dark class="ComputerBtn text-h4" tile @click="$emit('close')">
          OK
        </v-btn>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    price: {
      type: String,
      default: '0',
    },
  },
  data() {
    return {
      tempPrice: '',
      calculationStatus: null,
    };
  },
  methods: {
    addNumber(i) {
      let newPrice = this.price;
      newPrice += String(i);
      // 只能加到小數點兩位
      if (/^\d{0,10}(\.?)\d{0,2}$/.test(newPrice)) {
        if (/^0\d/.test(newPrice)) {
          newPrice = String(Number(newPrice));
        }
        this.$emit('price', newPrice);
      }
    },
    backspace() {
      let newPrice = this.price;
      if (newPrice.length > 1) {
        newPrice = newPrice.substring(0, newPrice.length - 1);
        this.$emit('price', newPrice);
      } else {
        this.$emit('price', '0');
      }
    },
    addDot() {
      let newPrice = this.price;
      if (!/\./.test(newPrice)) {
        this.$emit('price', (newPrice += '.'));
      }
    },
    AC() {
      this.calculationStatus = null;
      this.$emit('price', '0');
    },
  },
};
</script>

<style lang="scss">
#Computer {
  width: 100%;
  height: 60vh;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
  grid-template-areas:
    'symbol symbol symbol symbol'
    'number number number btnTop'
    'number number number btnTop'
    'number number number btnBtm'
    'number number number btnBtm';
  .ComputerBtn {
    width: 100%;
    height: 100%;
  }
  .computerSymbol {
    grid-area: symbol;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
  .ComputerBtnTop {
    grid-area: btnTop;
  }
  .ComputerBtnBtm {
    grid-area: btnBtm;
  }
  .computerNumber {
    grid-area: number;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }
}
</style>
