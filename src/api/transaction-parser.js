function kMark(value) {
    if (!value) return '';
    var str = '' + value;
    var intPart = Number(value).toFixed(0);
    var pointPart = str.substring(str.lastIndexOf('.') === -1 ? str.length : str.lastIndexOf('.'));
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return intPartFormat + pointPart;
}

function humanAmount(amount) {
    if (amount.currency === 'CALL')
        return kMark(amount.value) + ' CALL';
    else
        return kMark(amount.value) + ' ' + amount.currency;
}

function processPayment(tx, address) {
    var outcome = tx.outcome;
    var result;
    if (tx.address === address)
    {
        result = 'You sent ' + tx.specification.destination.address
            + ' ' + humanAmount(outcome.deliveredAmount);
    }
    else
    {
        result = tx.address + ' sent you ' + humanAmount(outcome.deliveredAmount);
        return result;
    }

    return result;
}

function pastAction(act) {
    if (act === 'sell') return 'sold';
    else return 'bought';
}

function processOrder(tx, address) {
    var changes = tx.outcome.orderbookChanges;
    var spec = tx.specification;

    var items, result, item, i;
    if (tx.address === address)
    {
        result = "You created an offer to " + spec.direction + ' '
            + humanAmount(spec.quantity) + ' for ' + humanAmount(spec.totalPrice);
        var filled = 0;
        for (var key in changes) {
            items = changes[key];
            for (i = 0; i < items.length; ++i)
            {
                item = items[i];
                if (item.type === 'filled' || item.type === 'partially-filled')
                    filled += Number(item.quantity.value);
            }
        }

        if (filled !== 0)
        {
            if (filled < Number(spec.quantity))
            {
                result += ', partially filled ' + filled + ' ' + spec.quantity.currency;
            }
            else
            {
                result += ', total filled'
            }
        }
    }
    else
    {
        items = changes[address];
        if (!items) return 'Passive affected order transaction';
        result = '';
        for (i = 0; i < items.length; ++i) {
            if (i !== 0) result += ';';
            item = items[i];
            result += 'You ' + pastAction(item.direction) + ' ' + humanAmount(item.quantity) + ' at price ' + item.makerExchangeRate;
        }
    }

    return result;
}

function processOrderCancellation(tx, address) {
    var changes = tx.outcome.orderbookChanges[address];
    if (!changes) {
        return 'Passive affected order cancellation transaction';
    }
    var change = changes[0];
    var result = 'You cancelled to ' + change.direction + ' ' + humanAmount(change.quantity) + ' for ' + humanAmount(change.totalPrice);
    return result;
}

function processTrustline(tx, address) {
    var spec = tx.specification;
    var result;
    if (tx.address === address)
    {
        result = 'You are trusting ' + spec.counterparty + ' for ' + spec.limit + ' ' + spec.currency;
        return result;
    }

    result = 'You have been trust by ' + tx.address + ' for ' + spec.limit + ' ' + spec.currency;
    return result;
}

function processSettings(tx, address) {
    return 'todo: account setting tx';
}

function processIssueSet(tx, address) {
    var spec = tx.specification;
    if (spec.issuer !== address) return 'Passive affected issue set transaction';
    return 'You are issuing ' + spec.total + ' ' + spec.currency;
}

function processDefault(tx, address) {
    return 'unknown transaction';
}

/**
 * return transaction description
 */
var Parser = {
    'payment': processPayment,
    'order': processOrder,
    'orderCancellation': processOrderCancellation,
    'trustline': processTrustline,
    'settings': processSettings,
    'issueSet': processIssueSet,
    'default': processDefault
};

export default Parser;