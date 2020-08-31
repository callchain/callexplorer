<template>
  <div class="home">
    <v-row class="index-main row">
      <v-col cols="12" lg="3" sm="12" xs="12">
        <v-card class="coins-top elevation-3" outlined>
          <p>{{status.feePool}}</p>
          <p>Fee Pool</p>
          <img src="@/assets/6.png" alt="">
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" sm="12" xs="12">
        <v-card class="coins-top elevation-3" outlined style="border-color:#5C9BD1;">
          <p style="color:#5C9BD1;">{{status.reserveBaseCALL}}</p>
          <p>Reserved CALL</p>
          <img src="@/assets/5.png" alt="">
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" sm="12" xs="12">
        <v-card class="coins-top elevation-3" outlined style="border-color:#F36A5A;">
          <p style="color:#F36A5A;" class="ng-binding">{{status.reserveIncrementCALL}}</p>
          <p>Increment Reserve</p>
          <img src="@/assets/8.png" alt="">
        </v-card>
      </v-col>
      <v-col cols="12" lg="3" sm="12" xs="12">
        <v-card class="coins-top elevation-3" outlined style="border-color:#5C9BD1;" >
          <p style="color:#5C9BD1;">{{status.baseFeeCALL}}</p>
          <p>Base Fee</p>
          <img src="@/assets/7.png" alt="">
        </v-card>
      </v-col>
    </v-row>
    <v-row class="cont-banner">
      <v-col md=6 sm=12>
        <v-simple-table class="table tb-lft" >
          <template v-slot:default>
            <thead>
            <tr class="row no-gutters">
              <th class="col-6 d-inline-flex align-center pl-0" id="block">
                <img src="@/assets/2.png" class="imgs" style="width:27px;" alt=""> BLOCKS
              </th>
              <th class="col-6" id="block-pedding"></th>
            </tr>
            </thead>
            <tbody>
            <tr class="tab-tr row no-gutters" v-for="(item,index) in blocks" v-bind:key="index">
              <td class="col-4">
                <p class="text-no-wrap d-flex align-center">
                  <img class="flex-grow-0 flex-shrink-0 mr-2 " src="@/assets/3.png" width="16" height="16" alt="">
                  <span>{{item.ledgerVersion | numberFormat}}</span>
                </p>
                <p class="text-no-wrap d-flex align-center">
                  <img class="flex-grow-0 flex-shrink-0 mr-2" src="@/assets/4.png" width="16" height="16" alt="">
                  <span>{{item.ledgerTimestamp | dateFormat}}</span>
                </p>
              </td>
              <td class="col-8">
                <router-link :to="{name: 'Block', params: {height: item.ledgerVersion}}" class="word-break d-block mb-2 text-overflow">{{item.ledgerHash}}</router-link>
                <div class="text-md-left text-sm-right">{{item.transactionCount}} txns</div>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
      <v-col md=6 sm=12>
        <v-simple-table class="table">
          <thead>
          <tr class="row no-gutters">
            <th class="col-6 d-inline-flex align-center pl-0" id="txns">
              <img src="@/assets/1.png" class="imgs" style="width:20px;" alt="">
              TRANSACTIONS
            </th>
            <th class="col-6" id="txns-pedding"></th>
          </tr>
          </thead>
          <tbody>
          <tr class="tab-td row no-gutters" v-for="item in transactions" v-bind:key="item.hash">
            <td class="col-8">
              <router-link :to="{name: 'Transaction', params: {hash: item.transaction.hash}}" class="d-block font-weight-bold mb-2 text-overflow">{{item.transaction.hash}}</router-link>
              <router-link :to="{name: 'Account', params: {address: item.transaction.Account}}" class="d-block mb-2 text-overflow">{{item.transaction.Account}}</router-link>
              <p class="font-weight-bold">{{item.transaction.TransactionType}}</p>
            </td>
            <td class="col-4 text-no-wrap">
              <p class="text-right">{{item.transaction.date | callDateToTimestamp}}</p>
              <p class="text-right">{{item | txHumanAmount}}</p>
            </td>
          </tr>
          </tbody>
        </v-simple-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
// @ is an alias to /src
import CheckNetwork from '../api/network'

export default {
  name: 'Home',
  components: {
  },
  computed: {
    status() {
      return this.$store.state.status
    },
    blocks() {
      return this.$store.state.blocks
    },
    transactions() {
      return this.$store.state.transactions
    }
  },

  methods: {
  },

  async created() {
    var status = await CheckNetwork();
    if (!status) {
      this.$toast.error("fail to connect callchain");
      return;
    }
  }
}
</script>

<style lang="scss" scoped>
  .index-main {
    margin: 15px 0 25px;
  }
  .coins-top {
    height: 100px;
    border: 1px solid #c91c46;
    border-radius: 5px;
    position: relative;
    padding: 0;
    p {
      margin-top: 10px;
      margin-left: 15px;
      height: 31px;
    }
    p:nth-child(1) {
      color: #c91c46;
      font-size: 30px;
    }
    p:nth-child(2) {
      color: #222;
      font-size: 16px;
    }
    img {
      width: 23px;
      position: absolute;
      top: 65%;
      right: 15px;
    }
  }

  .cont-banner {
    display: flex;
    .table {

      &.tb-lft {
        .tab-tr td { border-bottom: none!important;}
        .tab-tr:nth-of-type(odd) {
          background-color: lighten(#FFC0CB, 10%);
        }
      }
      th {
        color: #C91C46!important;
        font-size: 18px;
        font-weight: bold;
        img {
          margin-right: 8px;
        }
      }
      tr td {
        padding: 16px;
        min-height: 100px;

        p {margin-bottom: 10px;
          &:last-of-type {margin-bottom: 0;}
        }
        .imgs {
          display: inline-flex;
        }
      }
      /*.tab-tr {*/
        /*color: #5C9BD1;*/
      /*}*/
      .time {
        vertical-align: top;
      }
    }
  }

  .text-overflow {
    max-width: 300px;
  }

  @media screen and (max-width: 1000px) {

  }

</style>
