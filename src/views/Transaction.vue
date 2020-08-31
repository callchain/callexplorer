<template>
    <v-container class="transaction">
        <div class="header d-flex justify-space-between row no-gutters">
            <div class="summary pr-3 col-md-10 col-sm-12">
                <div class="type"><h2>{{tx.type}}</h2></div>
                <div class="status">
                </div>
                <div class="hash grey--text text-overflow mt-5">{{tx.id}}
                </div>
            </div>
            <div class="dates text-no-wrap text-md-right text-sm-left col-md-2 col-sm-12 mt-4">
                <div class="grey--text">Ledger {{tx.outcome ? tx.outcome.ledgerVersion : ''}}</div>
                <div class="time mt-3 grey--text">
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
            <!-- common -->
            <tr>
                <td>Account</td>
                <td class="text-wrap word-break grey--text"><router-link :to="{name: 'Account', params: {address: tx.address}}">{{tx.address}}</router-link></td>
            </tr>
            <tr>
                <td>Sequence</td>
                <td class="grey--text">{{tx.sequence | numberFormat}}</td>
            </tr>
            <tr>
                <td>Fee</td>
                <td class="grey--text">{{tx.outcome ? tx.outcome.fee : ''}} CALL</td>
            </tr>
            <!-- payment -->
            <tr v-if="tx.type === 'payment'">
                <td>Amount</td>
                <td class="grey--text">
                    <span v-if="!!tx.specification">
                        {{tx.specification.destination.amount.value}} {{tx.specification.destination.amount.currency}}@<router-link :to="{name: 'Account', params: {address: tx.specification.destination.amount.counterparty}}">{{tx.specification.destination.amount.counterparty}}</router-link>
                    </span>
                </td>
            </tr>
            <tr v-if="tx.type === 'payment'">
                <td>Destination</td>
                <td class="grey--text"><router-link :to="{name: 'Account', params: {address: tx.specification.destination.address}}">{{tx.specification.destination.address}}</router-link></td>
            </tr>
            <!-- offer -->
            <tr v-if="tx.type === 'order'">
                <td>Direction</td>
                <td class="grey--text">{{tx.specification ? tx.specification.direction : ''}}</td>
            </tr>
            <tr v-if="tx.type === 'order'">
                <td>Quantity</td>
                <td class="grey--text">{{tx.specification ? tx.specification.quantity : '' | humanAmount}}</td>
            </tr>
            <tr v-if="tx.type === 'order'">
                <td>TotalValue</td>
                <td class="grey--text">{{tx.specification ? tx.specification.totalPrice : '' | humanAmount}}</td>
            </tr>
            <!-- offer cancel -->
            <tr v-if="tx.type === 'orderCancellation'">
                <td>Order Sequence</td>
                <td class="grey--text">{{tx.specification ? tx.specification.orderSequence : '' | numberFormat}}</td>
            </tr>
            <!-- issue set -->
            <tr v-if="tx.type === 'issueSet'">
                <td>Currency</td>
                <td class="grey--text">{{tx.specification ? tx.specification.currency : ''}}</td>
            </tr>
            <tr v-if="tx.type === 'issueSet'">
                <td>Total</td>
                <td class="grey--text">{{tx.specification ? tx.specification.total : '' | numberFormat}}</td>
            </tr>
            <tr v-if="tx.type === 'issueSet'">
                <td>Additional</td>
                <td class="grey--text">{{tx.specification ? tx.specification.additional : ''}}</td>
            </tr>
            <tr v-if="tx.type === 'issueSet'">
                <td>NFT</td>
                <td class="grey--text">{{tx.specification ? tx.specification.invoice : ''}}</td>
            </tr>
            <!-- trustlines -->
            <tr v-if="tx.type === 'trustline'">
                <td>Currency</td>
                <td class="grey--text">{{tx.specification ? tx.specification.currency : ''}}</td>
            </tr>
            <tr v-if="tx.type === 'trustline'">
                <td>Limit</td>
                <td class="grey--text">{{tx.specification ? tx.specification.limit : ''}}</td>
            </tr>
            <tr v-if="tx.type === 'trustline'">
                <td>Counterparty</td>
                <td class="grey--text">
                    <router-link :to="{name: 'Account', params: {address: tx.specification.counterparty}}">
                        {{tx.specification.counterparty}}
                    </router-link>
                </td>
            </tr>
            <!-- settings -->

            </tbody>
        </v-simple-table>
        <div class="mt-4 mb-6">
            <p class="text-h6">Memos</p>
            <ul>
                <li v-for="(item, index) in memos" v-bind:key="index" class="grey--text">{{item.data}}</li>
            </ul>
        </div>
        <div class="Outcome">
            <div class=" d-flex justify-space-between">
                <span class="text-h6">Outcome</span><span class="green--text font-weight-bold">tesSUCCESS</span>
            </div>
            <v-divider class="mb-4"></v-divider>
            <div class="mt-2 mb-3" v-if="tx.outcome && tx.outcome.deliveredAmount ? true : false">
                <p class="text-h7 font-weight-bold">Delivered Amount</p>
                <p class="grey--text">
                    {{tx.outcome.deliveredAmount.value}} {{tx.outcome.deliveredAmount.currency}}
                    <span v-if="tx.outcome.deliveredAmount.counterparty">
                        @<router-link :to="{name: 'Account', params: {address: tx.outcome.deliveredAmount.counterparty}}">{{tx.outcome.deliveredAmount.counterparty}}</router-link>
                    </span>
                </p>
            </div>
            <div class="mt-2 mb-3" v-if="tx.outcome && tx.outcome.balanceChanges ? true : false">
                <p class="text-h7 font-weight-bold">Balance Change</p>
                <BalanceChange :changes="tx.outcome.balanceChanges" :address="tx.address"></BalanceChange>
            </div>
            <div class="mt-2 mb-3" v-if="tx.outcome && tx.outcome.orderbookChanges ? true: false">
                <p class="text-h7 font-weight-bold">Orderbook Changes</p>
                <OrderbookChange :changes="tx.outcome.orderbookChanges" :address="tx.address"></OrderbookChange>
            </div>
        </div>
    </v-container>
</template>
<script>

import CheckNetwork from '../api/network'
import utils from '../api/utils';
import OrderbookChange from '../components/OrderbookChange'
import BalanceChange from '../components/BalanceChange'

export default {
    name: 'Block',
    components: {
        OrderbookChange, BalanceChange
    },
    data: () => ({
        hash: '',
        tx: {}
    }),
    methods: {
        goHome() {
            this.$router.push('/');
        },
        async fetchData() {
            var h = this.$route.params.hash;
            this.hash = h;

            if (!utils.isValidHash(h)) {
                 this.$toast.error("Invalid transaction hash: " + h);
                this.goHome();
                return;
            }
            
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
                this.$toast.error(e.message || e);
                this.goHome();
                return;
            }
        }
    },
    computed: {
        memos() {
            if (this.tx.specification) {
                return this.tx.specification.memos || []
            }
            return [];
        }
    },
    created() {
        this.fetchData();    
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
        width: 60%;
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