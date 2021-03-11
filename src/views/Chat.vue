<template>
  <v-main app>
    <v-app-bar dark>
      <v-app-bar-nav-icon @click="$router.push('/')">
        <v-icon>mdi-chevron-left</v-icon>
      </v-app-bar-nav-icon>
      <v-toolbar-title>{{ friend }}</v-toolbar-title>
    </v-app-bar>
    <div class="content">
      <div id="text_area">
        <div
          class="msg"
          :class="{ user: account === item.user }"
          v-for="item in message"
          :key="item.time"
        >
          <div class="avatar">
            <img :src="avatarImg" alt="" />
          </div>
          <div class="text">{{ item.text }}</div>
        </div>
      </div>
      <form class="input" @submit.prevent="send">
        <input type="text" v-model="msg" placeholder="輸入訊息" />
        <button v-on:keyup.enter="submit" class="btn">送出</button>
      </form>
    </div>
  </v-main>
</template>

<script>
import avatarImg from '@/assets/images/avatar.svg';

export default {
  data() {
    return {
      message: [],
      msg: null,
      friend: null,
      avatarImg,
    };
  },
  computed: {
    account() {
      return this.$store.state.account;
    },
  },
  mounted() {
    const vm = this;
    const {
      $store: {
        getters: { getFriendName },
      },
      $route: {
        params: { id: account },
      },
      axios,
    } = this;

    vm.friend = getFriendName(account);
    this.$socket.emit('bind room', account);
    this.sockets.subscribe('chat message', (msg) => {
      this.message.push(msg);
    });
    axios.get('/getMsg', { params: { account } }).then((res) => {
      vm.message = res.data;
    });
  },
  methods: {
    send() {
      if (this.msg) {
        this.$socket.emit('chat message', this.msg);
        this.msg = null;
      }
    },
  },
  updated() {
    const scroll = document.getElementById('text_area');
    scroll.scrollTop = scroll.scrollHeight - scroll.offsetHeight;
  },
};
</script>

<style lang="scss" scoped>
$color1: #0b2239;
$color2: #ffffff;
.content {
  height: 100%;
  background-color: $color1;
  position: relative;
  .room {
    position: absolute;
    left: 62px;
    top: 6px;
    font-size: 20px;
    font-weight: 300;
    letter-spacing: 3px;
    color: $color2;
  }
  #text_area::-webkit-scrollbar {
    display: none;
  }
  #text_area {
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 10px;
    box-sizing: border-box;
    height: calc(100% - 120px);
    border-radius: 15px;
    border: 1px solid $color2;
    color: $color2;
    font-weight: 300;
    letter-spacing: 3px;
    line-height: 23px;
    font-size: 18px;
    .msg {
      padding: 10px;
      .avatar {
        width: 45px;
        height: 45px;
        img {
          width: 100%;
          display: flex;
        }
      }
      .text {
        color: $color1;
        display: inline-block;
        border-radius: 5px;
        max-width: 500px;
        word-wrap: break-word;
        padding: 5px;
        margin: 13px 0px 0px 50px;
        position: relative;
        background-color: $color2;
      }
      .text::after {
        position: absolute;
        top: -7px;
        left: -37px;
        width: 41px;
        height: 10px;
        background-color: rgba(0, 0, 0, 0%);
        content: '';
        border-right: 0.5em solid $color2;
        border-top-right-radius: 1em 0.5em;
      }
    }
    .user {
      text-align: right;
      .avatar {
        margin-left: auto;
      }
      .text {
        background-color: #c7c7c7;
        text-align: left;
        margin: 13px 50px 0px 0px;
      }
      .text::after {
        left: unset;
        right: -35px;
        border-left: 0.5em solid #c7c7c7;
        border-top-left-radius: 1em 0.5em;
        border-right: unset;
        border-top-right-radius: unset;
      }
    }
  }
  .input {
    bottom: 1px;
    position: absolute;
    width: 100%;
    height: 50px;
    display: flex;
    input {
      border-radius: 0;
      padding: 0 0 0 50px;
      border-top: 1px solid $color2;
      flex: 1;
      margin-right: 10px;
      background-color: unset;
      font-size: 20px;
      color: $color2;
    }
    .btn {
      margin: 0 2px 2px 0;
      background-color: unset;
      border-radius: 5px;
      color: $color2;
      width: 90px;
      height: 97%;
      border: 1px solid $color2;
    }
  }
}
@media (max-width: 960px) {
  .content {
    position: relative;
    border-top: 1px solid #ffffff;
    z-index: 999;
    width: 100%;
    height: calc(100vh - 56px);
    #text_area {
      height: calc(100% - 70px);
      padding: 10px;
      margin: 10px;
      font-size: 13px;
      letter-spacing: 1px;
      .msg {
        padding: 10px 0;
        .avatar {
          width: 30px;
          height: 30px;
        }
        .text {
          margin: 13px 0px 0px 15px;
        }
        .text::after {
          left: -23px;
        }
      }
      .user {
        .text {
          margin: 13px 15px 0px 0px;
        }
        .text::after {
          left: unset;
          right: -27px;
        }
      }
    }
    .input {
      height: 50px;
      input {
        width: 80%;
        box-sizing: border-box;
        padding: 0 0 0 10%;
        font-size: 16px;
        font-weight: 100;
        &:focus {
          outline: unset;
        }
      }
      .btn {
        width: 20%;
        margin: 0 9px 0;
        height: 70%;
      }
      .btn:focus {
        outline: unset;
      }
    }
  }
}
</style>
