<template>
    <v-container class="block">
        <div class="ledger-header">
            <div class="ledger-nav d-flex justify-space-between">
                
                    <div class="previous d-inline-flex align-center">
                        <v-img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAcCAYAAABoMT8aAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADsSURBVHgBpdUxDoIwFAbg97cX8AIaF3dnXZgMIzcAj+DoxhG8gRzD0clZdweMiyM3eBYSDQLF1/YNpLzm/9KSlIIcax1tUgIdiFARI4d7GEWrVamAcAOIVmAJEzO2f4Gx8OV8KhASrscICVsBaXgQcAn3ANfwD+AT/gK+4QYICdelGMh9ww0A4km3afbFJCzFrHa9LrhYR3FKgtLP8n6dzhcPgJLOMpLZfFGa+dsoUD9CEP0Z+CK6/eKD6G7DFekBrsgg4IJYASki+qmuojgD+NibYGTie8GCVFoKWLbzEgNtxHyDpTmE5tSq/Rs7UsE7QglKTAAAAABJRU5ErkJggg=="
                                alt=""
                                width="6"
                                height="10"
                                class="mr-2"
                        />
                        <router-link :to="{name: 'Block', params: {height: height - 1}}">
                        {{height - 1}}
                        </router-link>
                    </div>
                
                
                    <div class="next d-inline-flex align-center">
                        <router-link :to="{name: 'Block', params: {height: height + 1}}">
                        {{height + 1}}
                        </router-link>
                        <v-img
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAcCAYAAABoMT8aAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADySURBVHgBpdW9EYJAEAXgfdCADeiQ0IQkRA4hHYAl2AEl2IHYBSGJxpob4NgAFbgeoI78entswCx787655Gbh+ZuIQHsilMRITnl2JEFZDCQqvFC9Q+DU84NIBIB40ZoIEYvZ2vWmAsR+FLfL0nHvAIVthMKV4xbq/DoJVJ85iP1pTBH798cEsbsDKdIDpMggIEFGAV0EpFFrP4gBPvQOGLEWMIGUFmkW6MkD41LrBs2TR9qdM2P7F5gKn/MsxZxw1WNOeBTQDQ8CknAPkIZbgEn4C5iGa2BOuKr3XjAL10B3L0jCzQ3UXlCvpFDRUhqu6gU1EMtbrTCbnAAAAABJRU5ErkJggg=="
                                alt=""
                                width="6"
                                height="10"
                                class="ml-2"
                        />
                    </div>
                
            </div>
            <div class="ledger-info">
                <div class="summary">
                    <div class="ledger-cols d-flex row">
                        <div class="ledger-col col-5">
                            <div class="text-caption">HEIGHT</div>
                            <div class="value font-28 font-weight-bold">{{height | numberFormat}}</div>
                        </div>
                        <div class="ledger-col col-2 text-right">
                            <div class="text-caption">TXNS</div>
                            <div class="value font-28 font-weight-bold">{{ledger.transactionHashes ? ledger.transactionHashes.length : 0}}</div>
                        </div>
                        <div class="ledger-col col-5 text-right">
                            <div class="text-caption">TOTAL FEES</div>
                            <div class="value font-28 font-weight-bold text-no-wrap text-overflow fee-righ">{{fee}}</div>
                        </div>
                    </div>
                </div>
                <div class="other d-flex justify-space-between">
                    <div class="grey--text txt1 mt-2">{{ledger.ledgerHash}}</div>
                    <div class="grey--text mt-4">{{ledger.closeTime | dateFormat}}</div>
                </div>
            </div>
        </div>
        <div class="table mt-4" id="block-table-md">
            <v-row class="thead font-weight-bold">
                <v-col class="th col-sm-3">Type</v-col>
                <v-col class="th col-sm-3 col-md-5">Account</v-col>
                <v-col class="th col-sm-3 col-md-2">Sequence</v-col>
                <v-col class="th col-sm-3 col-md-2 text-right">Txn. Cost</v-col>
            </v-row>
            <div class="tbody">
                <v-row class="tr" v-for="item in tData.tList" v-bind:key="item.id">
                    <v-col class="td col-sm-3 col-md-3 blue--text text-h6">{{item.type}}</v-col>
                    <v-col class="td col-sm-3 col-md-5 text-overflow">
                         <router-link :to="{name: 'Account', params: {address: item.address}}">{{item.address}}</router-link>
                    </v-col>
                    <v-col class="td col-sm-3 col-md-2">{{item.sequence | numberFormat}}</v-col>
                    <v-col class="td col-sm-3 col-md-2 text-right">{{item.outcome.fee}}</v-col>
                    <v-col class="col-12 pt-0 other d-flex justify-space-between">
                        <span class="txt1">
                            <router-link :to="{name: 'Transaction', params: {hash: item.id}}">{{item.id}}</router-link>
                        </span>
                        <span :class="item.outcome.result !== 'tesSUCCESS' ? 'red--text' : 'green--text'">{{item.outcome.result}}</span>
                    </v-col>
                </v-row>
            </div>
        </div>
        <v-data-table
                :headers="tData.theadData"
                :items="tData.tList"
                hide-default-footer
                class="smtable word-break mt-4"
                :disable-sort=true
                id="block-table-sm"
        >
        </v-data-table>
    </v-container>
</template>

<script>
  // @ is an alias to /src
import CheckNetwork from '../api/network'

  export default {
    name: 'Block',
    components: {},
    data: () => ({
        height: 0,
        ledger: {},
        fee: 0,
        tData: {
          theadData: [{
            text: 'Type',
            value: 'type',
          }, {
            text: 'Account',
            value: 'address',
          }, {
            text: 'Sequence',
            value: 'sequence',
          }, {
            text: 'Txn. Cost',
            value: 'outcome.fee',
          },{
            text: 'Hash',
            value: 'id',
          },{
            text: 'Result',
            value: 'outcome.result',
          }],
          tList: []
        },
    }),
    methods: {
        goHome() {
            this.$router.push('/');
        },
        async fetchData() {
            var h = this.$route.params.height;
            if (isNaN(Number(h))) {
                this.$toast.error("Invalid ledger version: " + h);
                this.goHome();
                return;
            }
            this.height = Number(h);
            
            // check network status
            var status = await CheckNetwork();
            if (!status) {
                this.$toast.error("fail to connect callchain");
                return;
            }

            var api = this.$store.state.api;
            this.tData.tList = [];
            try {
                this.ledger = await api.getLedger({ledgerVersion: this.height, includeTransactions: true});
                console.dir(this.ledger);

                if (this.ledger.transactionHashes) {
                    for (var i = 0; i < this.ledger.transactionHashes.length; ++i) {
                        var hash = this.ledger.transactionHashes[i];
                        var tx = await api.getTransaction(hash);
                        this.tData.tList.push(tx);
                        this.fee += Number(tx.outcome.fee);
                    }
                }
            } catch (e) {
                this.$toast.error(e.message || e);
                console.dir(e);
                this.goHome();
                return;
            }
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

<style lang="scss" scoped>

    .color1 {color: #0076FF!important;}
    .color2 {color: #1AAD19!important;}
    .color3 {color: #EA4C88!important;}
    .color4 {color: #00FF33!important;}
    .color5 {color: #000066!important;}

    a {
        color: inherit;
        text-decoration: none;
    }

    .ledger-nav {
        padding: 8px 4px;
        border-bottom: 1px solid #3b4147;
        color: #3b4147;
        font-size: 14px;
        letter-spacing: 0;
        line-height: 22px;
        font-weight: 500;
    }

    .tr, .th {
        border-bottom: 1px solid #ccc;
    }

    .tr {
        font-size: 14px;
    }

    @media screen and (max-width: 1000px) {
        .other {
            flex-direction: column;
            text-align: center;
            .txt1 {
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
        }
        .value {
            font-size: 20px;
        }
        .table {
            .th {
                font-size: 14px;
            }
            .tbody {
                .tr {
                    font-size: 12px;
                    .td:first-of-type {
                        font-size: 14px !important;
                    }
                }
            }
        }
    }

    #block-table-sm {
        display: none;
    }
    #block-table-md {
        display: block;
    }
    @media screen and (max-width: 600px) {
        #block-table-sm {
            display: block;
        }
        #block-table-md {
            display: none;
        }
    }

</style>
