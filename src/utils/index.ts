import {Checklist} from '../infra/models/Checklist';
import {format, isBefore} from 'date-fns';
import _ from 'lodash';

export function returnNewestItemByDate(item: any, item2: any) {
  if (isBefore(Number(item.updated_at), Number(item2.updated_at))) {
    return item;
  }
  return item2;
}

export function returnOddObjectFromTwoArrays(
  array1: Checklist[],
  array2: Checklist[],
) {
  return _.differenceWith(array1, array2, _.isEqual);
}

export function formatDate(date: string) {
  const dateFormated = format(new Date(date), 'dd/MM/yyyy');

  return dateFormated;
}
