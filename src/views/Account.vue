<template>
  <v-container class="account">
    <div class="border-bottom tit mt-6 text-wrap word-break"><h2>{{address}}</h2></div>
    <v-divider></v-divider>
    <div class="cost d-flex justify-space-between pt-6 pb-6">
      <div class="d-inline-flex flex-column font-weight-bold">
        <span>CALL Balance</span>
        <span class="mt-2 mb-2 font-32">{{info.callBalance | numberFormat}}</span>
        <span class="green--text">{{info.code ? 'Contract Code' : 'Normal Account'}}</span>
      </div>
      <div class="d-inline-flex flex-column font-weight text-right">
        <span class="font-weight-bold">Account Info</span>
        <span class="mt-2 mb-2">RESERVE: <span>{{reservedCALL}}</span></span>
        <span>Sequence: <span>{{info.sequence | numberFormat}}</span></span>
      </div>
    </div>
    <div class="tab-container">
      <v-tabs v-model="tab"  class="mtab" show-arrows>
        <v-tab @click="getBalances(0)">Balances</v-tab>
        <v-tab @click="getTransactions(0)">Transactions</v-tab>
        <v-tab @click="getIssues(0)">Issue List</v-tab>
        <v-tab @click="getTrustlines(0)">Trustlines</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <!-- balance -->
        <v-tab-item>
          <v-data-table
                  :headers="balances.theadData"
                  :items="balances.data"
                  hide-default-footer
                  :disable-sort=true
                  class="smtable word-break"
          >
            <!-- <template v-slot:item.currency="{item}">
              <router-link :to="{name: 'Token', params: {issuer: item.counterparty, currency: item.currency}}">{{item.currency}}</router-link>
            </template> -->
            <template v-slot:item.counterparty="{item}">
              <router-link :to="{name: 'Account', params: {address: item.counterparty}}">{{item.counterparty}}</router-link>
            </template>
            <template v-slot:item.value="{item}">
              {{item.value | numberFormat}}
            </template>
          </v-data-table>
        </v-tab-item>
        
        <!-- transactions -->
        <v-tab-item>
          <!--针对手机端表格-->
          <v-data-table
            :headers="transactions.theadData"
            :items="transactions.data"
            hide-default-footer
            class="smtable word-break"
            :disable-sort=true
            id="table-sm"
          >
            <template v-slot:item.address="{item}">
              <router-link :to="{name: 'Account', params: {address: item.address}}">{{item.address}}</router-link>
            </template>
             <template v-slot:item.id="{item}">
              <router-link :to="{name: 'Transaction', params: {hash: item.id}}">{{item.id}}</router-link>
            </template>
             <template v-slot:item.outcome="{item}">
               <TxDesc :tx="item" :address="address"></TxDesc>
            </template>
          </v-data-table>
          <!--针对pc端表格-->
          <v-simple-table id="table-md" class="mtable">
            <thead>
            <tr class="row no-gutters">
              <th :class="`col-${item.col}`" v-for="(item, idx) in transactions.theadData.slice(0,4)" :key="idx" id="t_header">{{item.text}}</th>
            </tr>
            </thead>
            <tbody>
            <tr class="row no-gutters" v-for="tx in transactions.data" :key="tx.id">
              <td class="col-3 font-weight-bold">{{tx.type}}</td>
              <td class="col-4 text-overflow"><router-link :to="{name: 'Account', params: {address: tx.address}}">{{tx.address}}</router-link></td>
              <td class="col-2">{{tx.sequence | numberFormat}}</td>
              <td class="col-3">{{(tx.outcome ? tx.outcome.timestamp : '') | dateFormat}}</td>
              <td class="col-8 text-wrap word-break"><TxDesc :tx="tx" :address="address"></TxDesc></td>
              <td class="col-4 text-right text-wrap word-break"><router-link :to="{name: 'Transaction', params: {hash: tx.id}}">{{tx.id}}</router-link></td>
            </tr>
            </tbody>
          </v-simple-table>
        </v-tab-item>
        
        <!-- issue list -->
        <v-tab-item>
          <v-data-table
                  :headers="issues.theadData"
                  :items="issues.data"
                  hide-default-footer
                  :disable-sort=true
                  class="smtable word-break"
          >
            <!-- <template v-slot:item.specification.currency="{item}">
              <router-link :to="{name: 'Token', params: {issuer: address, currency: item.specification.currency}}">{{item.specification.currency}}</router-link>
            </template> -->
            <template v-slot:item.specification.value="{item}">
              {{item.specification.value | numberFormat}}
            </template>
            <template v-slot:item.state.issued="{item}">
              {{item.state.issued | numberFormat}}
            </template>
            <template v-slot:item.state.fans="{item}">
              {{item.state.fans | numberFormat}}
            </template>
            <template v-slot:item.specification="{item}">
              {{item.specification | invoceFeature}}
            </template>
          </v-data-table>
        </v-tab-item>
        
        <!-- trustlines -->
        <v-tab-item>
          <v-data-table
                  :headers="trustlines.theadData"
                  :items="trustlines.data"
                  hide-default-footer
                  :disable-sort=true
                  class="smtable word-break"
          >
            <!-- <template v-slot:item.specification.currency="{item}">
              <router-link :to="{name: 'Token', params: {issuer: item.specification.counterparty, currency: item.specification.currency}}">{{item.specification.currency}}</router-link>
            </template> -->
            <template v-slot:item.specification.counterparty="{item}">
              <router-link :to="{name: 'Account', params: {address: item.specification.counterparty}}">{{item.specification.counterparty}}</router-link>
            </template>
            <template v-slot:item.specification.limit="{item}">
              {{item.specification.limit | numberFormat}}
            </template>
            <template v-slot:item.state.balance="{item}">
              {{item.state.balance | numberFormat}}
            </template>
          </v-data-table>
        </v-tab-item>
      </v-tabs-items>
    </div>
    <div class="text-center padding" v-if="showMore">
      <v-btn color="#c91c46" class="ml-3 white--text" @click="loadMore()">Load More</v-btn>
    </div>
  </v-container>
</template>
<script>
import CheckNetwork from '../api/network'
import utils from '../api/utils'
import TxDesc from '../components/TxDesc'

const FIRST_FLAG = 1;
const MORE_FLAG = 2;

  export default {
    name: 'Account',
    components: {TxDesc},
    data() {
      return {
        tab: 0,
        address: '',
        info: {},
        balances: {
          theadData: [{
            text: 'Currency',
            value: 'currency',
            col: 2
          }, {
            text: 'Counterparty',
            value: 'counterparty',
            col: 5
          }, {
            text: 'Balance',
            value: 'value',
            col: 3
          }],
          marker: null,
          data: [],
        },
        transactions: {
          theadData: [{
            text: 'Type',
            value: 'type',
            col: 3
          }, {
            text: 'Account',
            value: 'address',
            col: 4
          }, {
            text: 'Sequence',
            value: 'sequence',
            col: 2
          }, {
            text: 'Date',
            value: 'outcome.timestamp',
            col: 3
          },{
            text: 'Effect',
            value: 'outcome',
            col: 4
          },
          {
            text: 'Hash',
            value: 'id',
            col: 5
          }
          ],
          marker: null,
          data: [],
        },
        issues: {
          theadData: [{
            text: 'Currency',
            value: 'specification.currency',
          }, {
            text: 'Total',
            value: 'specification.value',
          }, {
            text: 'Issued',
            value: 'state.issued',
          }, {
            text: 'Fans',
            value: 'state.fans',
          }, {
            text: 'Features',
            value: 'specification',
          }],
          marker: null,
          data: [],
        },
        trustlines: {
          theadData: [{
            text: 'Currency',
            value: 'specification.currency',
          }, {
            text: 'Counterparty',
            value: 'specification.counterparty',
          }, {
            text: 'Limit',
            value: 'specification.limit',
          }, {
            text: 'Balance',
            value: 'state.balance',
          }],
          marker: null,
          data: [],
        },
      }
    },
    methods: {
        goHome() {
            this.$router.push('/');
        },
        initData() {
          this.balances.data = [];
          this.balances.marker = null;
          this.transactions.data = [];
          this.transactions.marker = null;
          this.issues.data = [];
          this.issues.marker = null;
          this.trustlines.data = [];
          this.trustlines.marker = null;
        },
        checkQuery(data, flags) {
          var first = ((flags & FIRST_FLAG) !== 0);
          var more = ((flags & MORE_FLAG) !== 0);

          // first always query
          if (first) return true;
          // not initiative load more and data contains data, just not query
          if (!more && data.data.length !== 0) return false;
          // if more, but marker is null
          if (more && !data.marker) return false;
          // more, mark is not null
          return true;
        },
        dataMap(tab) {
          if (tab === 0) {
            return this.balances;
          }
          else if (tab === 1) {
            return this.transactions;
          }
          else if (this.tab === 2) {
            return this.issues;
          }
          else if (this.tab === 3) {
            return this.trustlines;
          }
          return null;
        },
        funcMap(tab) {
          if (tab === 0) {
            return this.getBalances;
          }
          else if (tab === 1) {
            return this.getTransactions;
          }
          else if (this.tab === 2) {
            return this.getIssues;
          }
          else if (this.tab === 3) {
            return this.getTrustlines;
          }
          return null;
        },
        async getBalances(flags) {
          if (!this.checkQuery(this.balances, flags)) return;

          var api = this.$store.state.api;
          try {
            var sheet = await api.getBalanceSheet(this.address);
            this.balances.data = this.balances.data.concat(sheet.assets || []);
            this.balances.marker = sheet.marker;
          } catch (e) {
            console.dir(e);
            this.goHome();
            return;
          }
        },
        async getTransactions(flags) {
          if (!this.checkQuery(this.transactions, flags)) return;

          var api = this.$store.state.api;
          try {
            var txns = await api.getTransactions(this.address, {limit: 10, marker: this.transactions.marker});
            this.transactions.data = this.transactions.data.concat(txns.results);
            this.transactions.marker = txns.marker;
            console.dir(this.transactions.data);
          } catch (e) {
            console.dir(e);
            this.goHome();
            return;
          }
        },
        async getIssues(flags) {
          if (!this.checkQuery(this.issues, flags)) return;

          var api = this.$store.state.api;
          try {
            var list = await api.getAccountIssues(this.address);
            this.issues.data = this.issues.data.concat(list.results);
            this.issues.marker = list.marker;
          } catch (e) {
            console.dir(e);
            this.goHome();
            return;
          }
        },
        async getTrustlines(flags) {
          if (!this.checkQuery(this.trustlines, flags)) return;

          var api = this.$store.state.api;
          try {
            var list = await api.getTrustlines(this.address, {limit: 10});
            this.trustlines.data = this.trustlines.data.concat(list.results);
            this.trustlines.marker = list.marker;
          } catch (e) {
            console.dir(e);
            this.goHome();
            return;
          }
        },
        loadMore() {
          var func = this.funcMap(this.tab);
          if (func) {
            func(MORE_FLAG);
          }
        },
        async fetchData() {
          var addr = this.$route.params.address;
          if (!utils.isValidAddr(addr)) {
            this.$toast.error("Invalid callchain address: " + addr);
            this.goHome();
            return;
          }
          this.address = addr;

          // check network status
          var status = await CheckNetwork();
          if (!status) {
            this.$toast.error("fail to connect callchain");
            return;
          }

          var api = this.$store.state.api;
          this.initData();
          try {
            this.info = await api.getAccountInfo(this.address);
            console.dir(this.info);
            var func = this.funcMap(this.tab);
            if (func) {
              func(FIRST_FLAG);
            }
          } catch (e) {
            this.$toast.error(e.message || e);
            console.dir(e);
            this.goHome();
            return;
          }
        }
    },
    computed: {
      reservedCALL() {
        var ledger = this.$store.state.blocks[0];
        if (!ledger) return 0;
        var ret = Number(ledger.reserveBaseCALL) + Number(this.info.ownerCount) * Number(ledger.reserveIncrementCALL);
        return ret.toFixed(6);
      },
      showMore() {
        var data = this.dataMap(this.tab);
        return data && !!data.marker;
      }
    },
    created() {      
      this.fetchData();  
    },
    watch: {
      '$route':'fetchData'
    }
  }
</script>
<style lang="scss">
  .account {
    .tit {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .border-bottom {
      // border-bottom: 1px solid #999;
    }

    th, td {
      height: auto!important;
      padding-top: 10px!important;
      padding-bottom: 10px!important;
    }
    .mtable {
      td, th { border: none!important;}
      tr {
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      }
    }
    .mtab {
      .v-tab {
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .v-icon-success {
      position: relative;
      top: 4px;
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
    #table-sm {
      display: none;
    }
    #table-md {
      display: block;
    }

    .padding {
      padding-top: 20px;
    }

    @media screen and (max-width: 600px) {
      #table-sm {
        display: block;
      }
      #table-md {
        display: none;
      }
    }
  }



</style>