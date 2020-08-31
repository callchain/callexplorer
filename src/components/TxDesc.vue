<template>
    <div>
        <p v-if="tx.type === 'payment'">
            <span v-if="tx.address === address">
                You sent
                <router-link :to="{name: 'Account', params: {address: tx.specification.destination.address}}">{{tx.specification.destination.address}}</router-link>
                {{humanAmount(tx.outcome.deliveredAmount)}}
            </span>
            <span v-else>
                You received {{humanAmount(tx.outcome.deliveredAmount)}} from 
                <router-link :to="{name: 'Account', params: {address: tx.address}}">{{tx.address}}</router-link>
            </span>
        </p>
        <p v-else-if="tx.type === 'order'">
            You are {{tx.specification.direction}}ing {{humanAmount(tx.specification.quantity)}} for {{humanAmount(tx.specification.totalPrice)}}
        </p>
        <p v-else-if="tx.type === 'orderCancellation'">
            You cancelled an offer, its sequnce is {{tx.specification.orderSequence | numberFormat}}
        </p>
        <p v-else-if="tx.type === 'trustline'">
            <span v-if="tx.address === address">
                You are trusting 
                <router-link :to="{name: 'Account', params: {address: tx.specification.counterparty}}">{{tx.specification.counterparty}}</router-link>
                for {{tx.specification.limit}} {{tx.specification.currency}}
            </span>
            <span v-else>
                You are trusted by
                <router-link :to="{name: 'Account', params: {address: tx.address}}">{{tx.address}}</router-link>
                for {{tx.specification.limit}} {{tx.specification.currency}}
            </span>
        </p>
        <p v-else-if="tx.type === 'settings'">
            You are do account settings
        </p>
        <p v-else-if="tx.type === 'issueSet'">
            <span v-if="address === tx.address">
                You are issuing {{tx.specification.total}} {{tx.specification.currency}}
            </span>
            <span v-else>
                Passive affected issue set transaction
            </span>
        </p>
        <p v-else>
            Unknown Transaction Type: {{tx.type}}
        </p>
    </div>
</template>

<script>
    export default {
        name: "tx-desc",
        props: {
            tx: {},
            address: ''
        },
        methods: {
            kMark: function (value) {
                if (!value) return '';
                var str = '' + value;
                var intPart = Number(value).toFixed(0);
                var pointPart = str.substring(str.lastIndexOf('.') === -1 ? str.length : str.lastIndexOf('.'));
                var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
                return intPartFormat + pointPart;
            },
            humanAmount: function (amount) {
                if (amount.currency === 'CALL')
                    return this.kMark(amount.value) + ' CALL';
                else
                    return this.kMark(amount.value) + ' ' + amount.currency;
            }
        }
    }
</script>

<style scoped>

</style>