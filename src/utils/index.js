import _ from 'lodash';

const {isBefore} = require('date-fns');

export function returnNewestItemByDate(item, item2) {
  if (isBefore(item.updated_at, item2.updated_at)) {
    return item;
  }
  return item2;
}

export function returnOddObjectFromTwoArrays(array1, array2) {
  return _.differenceWith(array1, array2, _.isEqual);
}
