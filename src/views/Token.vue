<template>
    <v-container class="Token">
        <p class="font-weight-bold font-20 word-break">WEB@r4zaMHE5GG4zuD3CaqjNbfgo3yuFoKG37Q</p>
        <div class="text-h6 mt-4">Specification</div>
        <v-divider></v-divider>
        <v-simple-table class="table">
            <tbody>
            <tr>
                <td>Total</td>
                <td>199,000,000</td>
            </tr>
            <tr>
                <td>Issued</td>
                <td>200,000</td>
            </tr>
            <tr>
                <td>Fans</td>
                <td>100,000</td>
            </tr>
            <tr>
                <td>Invoice</td>
                <td>True</td>
            </tr>
            <tr>
                <td>Additional</td>
                <td>False</td>
            </tr>
            </tbody>
        </v-simple-table>
        <div class="text-h6 mt-4">Fans</div>
        <v-divider></v-divider>
        <v-data-table
                :headers="tData.theadData"
                :items="tData.tableData"
                hide-default-footer
                class="data-table word-break"
                id="table-sm"
        >
        </v-data-table>
        <!--<v-simple-table class="table1">-->
            <!--<thead>-->
            <!--<tr class="font-weight-bold">-->
                <!--<th>Account</th>-->
                <!--<th>Limit</th>-->
                <!--<th>Balance</th>-->
                <!--<th class="text-right">Percent</th>-->
            <!--</tr>-->
            <!--</thead>-->
            <!--<tbody>-->
            <!--<tr v-for="item in 3">-->
                <!--<td class="text-wrap word-break"><router-link to="/account">r4zaMHE5GG4zuD3CaqjNbfgo3yuFoKG37Q</router-link></td>-->
                <!--<td>100,000,000</td>-->
                <!--<td>3,000</td>-->
                <!--<td class="text-right">25%</td>-->
            <!--</tr>-->
            <!--</tbody>-->
        <!--</v-simple-table>-->
    </v-container>
</template>
<script>
  export default {
    name: 'token',
    components: {},
    data() {
      return {
        tData: {
          theadData: [
            {text: 'Account', value: 'col1'},
            {text: 'Limit', value: 'col2'},
            {text: 'Balance', value: 'col3'},
            {text: 'Percent', value: 'col4'},
          ],
          tableData: [
            {col1: 'r4zaMHE5GG4zuD3CaqjNbfgo3yuFoKG37Q', col2: '100,000,000', col3: '3,000', col4: '25%'},
            {col1: 'r4zaMHE5GG4zuD3CaqjNbfgo3yuFoKG37Q', col2: '100,000,000', col3: '3,000', col4: '25%'},
            {col1: 'r4zaMHE5GG4zuD3CaqjNbfgo3yuFoKG37Q', col2: '100,000,000', col3: '3,000', col4: '25%'},
          ],
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    .table {
        width: 50%;
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        td {
            font-size: 14px !important;
            &:first-of-type {
                font-weight: bold;
                padding-left: 0!important;
            }
        }
    }
    @media screen and (max-width: 1000px) {
        .table {
            width: 100%;
        }
    }
    .table1 {
        border-bottom: 1px solid rgba(0, 0, 0, 0.12);
        td, th {
            font-size: 14px !important;
            &:first-of-type {
                padding-left: 0!important;
            }
        }
    }
</style>