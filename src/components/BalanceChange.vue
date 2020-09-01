<template>
    <div>
        <ul>
            <li v-for="(item,index) in balanceChanges" v-bind:key="index">
                <span v-if="item.positive" class="green--text text-no-wrap">{{item.amount.value}} {{item.amount.currency}}</span>
                <span v-else class="red--text text-no-wrap">{{item.amount.value}} {{item.amount.currency}}</span>
                <span class="text-no-wrap"> for </span>
                <span v-if="item.for === address">You</span>
                <span v-else class="word-break">
                    <router-link :to="{name: 'Account', params: {address: item.for}}">{{item.for}}</router-link>
                </span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "balance-change-desc",
        props: {
            changes: {},
            address: ''
        },
        methods: {
        },
        computed: {
            balanceChanges() {
                var ret = [];
                for (var addr in this.changes) {
                    var items = this.changes[addr];
                    for (var i = 0; i < items.length; ++i) {
                        var amount = items[i];
                        ret.push({for: addr, amount: amount, positive: Number(amount.value) > 0});
                    }
                }
                return ret;
            }
        }
    }
</script>

<style scoped>

</style>