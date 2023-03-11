import {Checklist} from './../../interfaces/interfaces';
import {
  createItemRemoteDB,
  getChecklistsRemoteDB,
  updateItemRemoteDB,
} from '../repository/Repository';
import {
  createItemOfflineDB,
  updateItemsOfflineDB,
} from '../../offlineDatabase/repository/Repository';
import _ from 'lodash';
import {
  returnNewestItemByDate,
  returnOddObjectFromTwoArrays,
} from '../../../utils';

export async function syncAllDataBases(list: any) {
  try {
    const remoteDB = await getChecklistsRemoteDB();
    const missingItemsRemoteDB = list.filter(
      (item: any) => !remoteDB?.find((obj: any) => obj._id === item._id),
    );
    console.log('missingItemsRemoteDB', missingItemsRemoteDB);
    if (missingItemsRemoteDB.length > 0) {
      createItemRemoteDB(missingItemsRemoteDB);
    }
    const missingItemsOffilneDB = remoteDB.filter(
      (item: any) => !list.find((obj: any) => obj._id === item._id),
    );
    if (missingItemsOffilneDB.length > 0) {
      createItemOfflineDB(missingItemsOffilneDB);
    }

    const listToCompare = list.sort((a: any, b: any) => a._id - b._id);

    const remoteToCompare = remoteDB.sort((a: any, b: any) => a._id - b._id);

    const itemsToCompareFromOfflineDB = returnOddObjectFromTwoArrays(
      listToCompare,
      remoteToCompare,
    );

    const itemsToCompareFromRemoteDB = returnOddObjectFromTwoArrays(
      remoteToCompare,
      listToCompare,
    );

    const itemsToUpdate = returnNewestItemByDate(
      itemsToCompareFromOfflineDB,
      itemsToCompareFromRemoteDB,
    );

    if (itemsToUpdate === itemsToCompareFromRemoteDB) {
      //update offline db
      updateItemsOfflineDB(itemsToUpdate);
    } else {
      //update online db
      updateItemRemoteDB(itemsToUpdate);
    }
    console.log('itemsToUpdate', itemsToUpdate);
  } catch (error: any) {
    console.log(error.message);
  }
}