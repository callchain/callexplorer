<template>
  <v-app class="max-main" id="app">
    <div class="app-bar d-flex justify-space-between pt-3 pb-3 shades" id="nav">
      <router-link to="/">
        <img
          alt="Logo"
          class="shrink"
          src="@/assets/logo.png"
          width="80"
        />
      </router-link>
      <div class="d-flex align-center pr-4">
        <div style="height: 40px;">
          <v-text-field
            placeholder="account address or transaction hash"
            single-line
            dense
            width="800"
            height="40"
            color="#ced4da"
            class="center search-input"
          ></v-text-field>
        </div>
        <v-btn
          x-small
          color="#c91c46"
          height="35"
          class="ml-3 white--text"
        >
          <span>Search</span>
        </v-btn>
      </div>
    </div>
    <v-main id="main">
      <router-view/>
    </v-main>
    <footer class="container">
      <p class="footer-text">© 2018-2020 Callchain Foundation</p>
    </footer>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
  created() {
    if (sessionStorage.getItem("call-state") ) {
        // restore state data
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("call-state"))))
    }
    window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("call-state", JSON.stringify(this.$store.state))
    })
  }
};
</script>

<style lang="scss">
  html {
    font-size:14px;
    color: #333;
  }
  .max-main { max-width: 73%; margin: 0 auto;}
  @media screen and (max-width: 1000px) {
    .max-main { max-width: 100%;}
    .app-bar {
      padding-right: 0;
      padding-left: 0;
    }
  }

  @media screen and (min-width: 1000px) {
    .search-input { width: 400px;}
    .data-table {
      th, td {
        &:first-of-type {
          padding-left: 0!important;
        }
      }
    }
  }

  .footer-text {
    margin-top: 5%;
    text-align: center;
  }

  .word-break {
    word-break: break-all;
  }

  #app {
    a {
      text-decoration: none;
      color: #333;
      &:hover {
        text-decoration: underline!important;
        background-color: #c91c46;
        color: white;
      }
    }

    #nav {
      a {
        text-decoration: none;
        color: #333;
        &:hover {
          text-decoration: underline!important;
          background-color: white;
          color: #c91c46;
      }
      }
    }

    .smtable {
      .v-data-table__mobile-row__header {
        white-space: nowrap!important;
        margin-right: 30px;
      }
    }
  }


  .font-28 {
    font-size: 28px;
  }
  .font-32 {
    font-size: 32px;
  }
  .font-20 {
    font-size: 20px;
  }
  .text-overflow {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .darken-green {
    color: #00FF33;
  }
  .darken-purple {
    color: #000066;
  }

</style>
