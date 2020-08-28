const numberFormat = (value) => {
    if (!value) return '';
    var str = '' + value;
    var intPart = Number(value).toFixed(0);
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

import Parser from '../api/transaction-parser';

const txDesc = (tx, address) => {
    var type = tx.type;
    var parser = Parser[type] ? Parser[type] : Parser['default'];
    return parser(tx, address);
}

const blockHashLimit = (value) => {
  var s = value + '';
  return s.substring(0, 32) + '...';
}

const txHumanAmount = (item) => {
  var tx = item.transaction;
  switch(tx.TransactionType)
  {
    case 'Payment':
      return 'P CALL';
    case 'OfferCreate': 
      return 'C CALL';
    case 'IssueSet':
      return 'I CALL';
    case 'Settings':
      return 'S CALL';
    case 'OfferCancellation':
      return 'A CALL';
    default:
      return '0 CALL';
  }
}

const callDateToTimestamp = (longs) => {
  var l = Number(longs) + 946656000;
  var d = new Date(l * 1000);
  return dateFormatLib(d, "yyyy-mm-dd HH:MM:ss")
}

export {
    numberFormat,
    humanDate,
    dateFormat,
    txDesc,
    blockHashLimit,
    txHumanAmount,
    callDateToTimestamp
}
