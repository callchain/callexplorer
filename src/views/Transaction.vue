<template>
    <v-container class="transaction">
        <div class="header d-flex justify-space-between row no-gutters">
            <div class="summary pr-3 col-md-10 col-sm-12">
                <div class="type"><h2>{{tx.type}}</h2></div>
                <div class="status">
                </div>
                <div class="hash text-overflow mt-5">{{tx.id}}
                </div>
            </div>
            <div class="dates text-no-wrap text-right col-md-2 col-sm-12">
                <div>Ledger {{tx.outcome ? tx.outcome.ledgerVersion : ''}}</div>
                <div class="time mt-5">
                    {{tx.outcome ? tx.outcome.timestamp : '' | dateFormat}}
                </div>
            </div>
        </div>
        <v-divider class="mb-6 mt-6"></v-divider>
        <div class="mt-4">
            <p class="text-h6">Specification</p>
        </div>
        <v-divider></v-divider>
        <v-simple-table class="table">
            <tbody>
            <tr>
                <td>Account</td>
                <td class="text-wrap word-break"><router-link :to="{name: 'Account', params: {address: tx.address}}">{{tx.address}}</router-link></td>
            </tr>
            <tr>
                <td>Sequence</td>
                <td>{{tx.sequence}}</td>
            </tr>
            <tr>
                <td>Fee</td>
                <td>{{tx.outcome ? tx.outcome.fee : ''}} CALL</td>
            </tr>
            <tr>
                <td>Amount</td>
                <td>{{}}</td>
            </tr>
            <tr>
                <td>Destination</td>
                <td class="text-wrap word-break">TODO</td>
            </tr>
            </tbody>
        </v-simple-table>
        <div class="mt-4 mb-6">
            <p class="text-h6">Memos</p>
            <p>发送此次交易消耗 0.000012XRP</p>
            <p>接收 takerPays 此报价的汇率为 rate，pair</p>
        </div>
        <div class="Outcome">
            <div class=" d-flex justify-space-between">
                <span class="text-h6">Outcome</span><span class="darken-green font-weight-bold">tesSUCCESS</span>
            </div>
            <v-divider class="mb-4"></v-divider>
            <div class="mt-2 mb-3">
                <p class="text-h7 font-weight-bold">Effects</p>
                <p>{{tx | txDesc}}</p>
            </div>
            <div class="mt-2 mb-3">
                <p class="text-h7 font-weight-bold">Balance Change</p>
                <p>+100,000 CALL</p>
                <p>-100 CNY@rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh</p>
            </div>
            <div class="mt-2 mb-3">
                <p class="text-h7 font-weight-bold">Orderbook Changes</p>
                <p>+100,000 CALL</p>
                <p>-100 CNY@rEb8TK3gBgk5auZkwc6sHnwrGVJH8DuaLh</p>
            </div>
        </div>
    </v-container>
</template>
<script>

import CheckNetwork from '../api/network'

export default {
    name: 'Block',
    components: {},
    data: () => ({
        hash: '',
        tx: {}
    }),
    methods: {
        goHome() {
            this.$router.push('/');
        }
    },
    async created() {
        var h = this.$route.params.hash;
        this.hash = h;
        
        // check network status
        var status = await CheckNetwork();
        if (!status) {
            this.$toast.error("fail to connect callchain");
            return;
        }

        var api = this.$store.state.api;
        try {
            this.tx = await api.getTransaction(h);
            console.dir(this.tx);
        } catch (e) {
            console.dir(e);
            this.goHome();
            return;
        }
    }
}

</script>

<style lang="scss" scoped>
    .summary {
        .type {
            display: inline-block;
            color: #23292f;
            font-size: 20px;
            font-weight: 700;
        }
        .status {
            display: inline-block;
            margin-left: 8px;
            img {
                position: relative;
                top: 4px;
                width: 16px;
                height: 16px;
                margin-right: 4px;
            }
        }
        .hash {
            overflow: hidden;
            letter-spacing: 0;
            line-height: 20px;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }

    .text-h6 {
        font-size: 18px;
    }

    .table {
        width: 50%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        td {
            font-size: 14px !important;
            &:first-of-type {
                font-weight: bold;
            }
        }
    }
    @media screen and (max-width: 1000px) {
        .table {
            width: 100%;
        }
    }
</style>