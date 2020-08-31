<template>
    <div>
        <ul>
            <li v-for="(item,index) in orderbookChanges" v-bind:key="index">
                <span v-if="item.change.status === 'created'">
                    You created an offer to {{item.change.direction === 'sell' ? 'buy' : 'sell'}} {{item.change.totalPrice.value}} {{item.change.totalPrice.currency}}
                    for 
                    {{item.change.quantity.value}} {{item.change.quantity.currency}}
                    at price {{item.change.makerExchangeRate}}
                </span>
                <span v-else-if="item.change.status === 'filled'">
                    You {{item.change.direction === 'sell' ? 'bought' : 'sold'}} 
                    <span v-if="item.change.direction === 'sell'" class="green--text">{{item.change.quantity.value}} {{item.change.quantity.currency}}</span>
                    <span v-else class="red--text">{{item.change.quantity.value}} {{item.change.quantity.currency}}</span>
                    {{item.change.direction === 'sell' ? 'from' : 'to'}}
                    <router-link :to="{name: 'Account', params: {address: item.change.account}}">{{item.change.account}}</router-link>
                    with full filled at price {{item.change.makerExchangeRate}}
                </span>
                <span v-else-if="item.change.status === 'partially-filled'">
                    You {{item.change.direction === 'sell' ? 'bought' : 'sold'}}
                    <span v-if="item.change.direction === 'sell'" class="green--text">{{item.change.quantity.value}} {{item.change.quantity.currency}}</span>
                    <span v-else class="red--text">{{item.change.quantity.value}} {{item.change.quantity.currency}}</span>
                    {{item.change.direction === 'sell' ? 'from' : 'to'}}
                    <router-link :to="{name: 'Account', params: {address: item.change.account}}">{{item.change.account}}</router-link>
                    with partialy filled at price {{item.change.makerExchangeRate}}
                </span>
                <span v-else-if="item.change.status === 'cancelled'">
                    You cancelled to {{item.change.direction}} {{item.change.quantity.value}} {{item.change.quantity.currency}}
                    at price {{item.change.makerExchangeRate}} for offer sequence {{item.change.sequence | numberFormat }}
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "orderbook-change-desc",
        props: {
            changes: {},
            address: ''
        },
        methods: {
        },
        computed: {
            orderbookChanges() {
                var ret = [];
                for (var addr in this.changes) {
                    var items = this.changes[addr];
                    for (var i = 0; i < items.length; ++i) {
                        var change = items[i];
                        ret.push({for: addr, change: change});
                    }
                }
                return ret;
            }
        }
    }
</script>

<style scoped>

</style>