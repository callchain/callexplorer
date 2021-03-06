function isValidAddr(addr) {
    return /^c[1-9A-HJ-NP-Za-km-z]{25,34}$/.test(addr);
}

const cutils = call.CallAPI._PRIVATE;


function isValidSec(seed) {
    return cutils.schemaValidator.isValidSecret(seed);
}

function isValidDomain(domain) {
    return /^(?:(?:(?:[a-zA-z\-]+)\:\/{1,3})?(?:[a-zA-Z0-9])(?:[a-zA-Z0-9\-\.]){1,61}(?:\.[a-zA-Z]{2,})+|\[(?:(?:(?:[a-fA-F0-9]){1,4})(?::(?:[a-fA-F0-9]){1,4}){7}|::1|::)\]|(?:(?:[0-9]{1,3})(?:\.[0-9]{1,3}){3}))(?:\:[0-9]{1,5})?$/.test(domain);
}

function isValidPort(port) {
    return port && (parseInt(port) + '') === (port + '')
        && Number(port) > 0 && Number(port) < 65535;
}

function isValidHash(hash) {
    return /^[A-F0-9]{64}$/.test(hash);
}

function toDrops(v) {
    return (Number(v) * 1000000)
}

function toAmount(v) {
    if (!v) return '';

    if (typeof v === 'string') {
        return (parseInt(v) / 1000000).toFixed(6) + ' CALL';
    }
    return v.value + ' ' + v.currency
}

function amountStr(v) {
    if (!v) return '';
    
    if (typeof v === 'string') {
        return (parseInt(v) / 1000000).toFixed(6) + ' CALL';
    }
    if (v.counterparty || v.issuer)
        return v.value + ' ' + v.currency + '@' + (v.counterparty || v.issuer);
    else 
        return v.value + ' ' + v.currency;
}

export default {
    isValidAddr, isValidSec, isValidDomain, isValidPort, toDrops, toAmount, amountStr,isValidHash
}
