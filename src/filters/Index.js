const numberFormat = (value) => {
    if (!value) return '';
    var str = '' + value;
    var intPart = parseInt(value) + '';
    var pointPart = str.substring(str.lastIndexOf('.') === -1 ? str.length : str.lastIndexOf('.'));
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
    return intPartFormat + pointPart;
}

import dateFormatLib from 'dateformat'

const dateFormat = (timestamp) => {
    if (!timestamp) return '';
    var date = new Date(timestamp);
    return dateFormatLib(date, "yyyy-mm-dd HH:MM:ss")
}

const humanDate = (timestamp) => {
    var date = new Date(timestamp);
    var now = new Date();
    var seconds = Math.floor((now - date) / 1000);
    if (seconds <= 0) return 'a moment ago';

    var units = [
      {value: 31536000, name: "year"},
      {value: 2592000, name: "month"},
      {value: 604800, name: "week"},
      {value: 86400, name: "day"},
      {value: 3600, name: "hour"},
      {value: 60, name: "minute"},
      {value: 1, name: "second"}
    ];
  
    for (var i = 0; i < units.length; ++i) {
      var unit = units[i];
      var v = Math.floor(seconds / unit.value);
      if (v !== 0) {
        var ret = v + ' ' + (v === 1 ? unit.name : unit.name + 's') + ' ago';
        return ret;
      }
    }
}

import utils from '../api/utils'

// for tx
const txHumanAmount = (item) => {
  var tx = item.transaction;
  switch(tx.TransactionType)
  {
    case 'Payment':
      return utils.toAmount(tx.Amount);
    case 'OfferCreate': 
      return utils.toAmount(tx.TakerPays) + '->' + utils.toAmount(tx.TakerGets)
    case 'IssueSet':
      return utils.toAmount(tx.Total);
    case 'Settings':
      return '0 CALL';
    case 'OfferCancellation':
      return '0 CALL';
    default:
      return '0 CALL';
  }
}

// for getTransaction tx
const toHumanTx = (tx) => {
  switch(tx.type)
  {
    case 'payment':
      return utils.toAmount(tx.outcome.deliveredAmount);
    case 'order':
      return utils.toAmount(tx.specification.quantity) + '->' + utils.toAmount(tx.specification.totalPrice);
    case 'settings':
      break;
    case 'issueSet':
      return tx.specification.total + ' ' + tx.specification.currency;
    default:
        return '0 CALL';
  }
}

const callDateToTimestamp = (longs) => {
  var l = Number(longs) + 946656000;
  var d = new Date(l * 1000);
  return dateFormatLib(d, "yyyy-mm-dd HH:MM:ss")
}

const toTimestamp = (item) => {
  var d = new Date(item);
  return dateFormatLib(d, "yyyy-mm-dd HH:MM:ss")
}

const invoceFeature = (spec) => {
  var ret = '';
  if (spec.additional) {
    ret += 'Additional';
  }
  if (spec.invoice) {
    if (ret.length == 0) {
      ret = 'Invoice';
    } else {
      ret += '/Invoice';
    }
  }
  if (ret.length != 0) return ret;
  return 'Standard';
}

const amountStr = (v) => {
  if (!v) return '';

  if (typeof v === 'string') {
    return (parseInt(v) / 1000000).toFixed(6) + ' CALL';
  }
  return v.value + ' ' + v.currency + '@' + (v.counterparty || v.issuer);
}

// for amount
const humanAmount = (v) => {
  if (!v) return '';
  if (typeof v === 'string') {
    return (parseInt(v) / 1000000).toFixed(6) + ' CALL';
  }
  return v.value + ' ' + v.currency;
}

export {
    numberFormat,
    humanDate,
    dateFormat,
    txHumanAmount,
    humanAmount,
    callDateToTimestamp,
    toTimestamp,
    invoceFeature,
    amountStr,
    toHumanTx
}
