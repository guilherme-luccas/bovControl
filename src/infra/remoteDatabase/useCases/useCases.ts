import {Checklist} from './../../interfaces/interfaces';
import {
  createItemRemoteDB,
  getChecklistsRemoteDB,
  updateItemRemoteDB,
} from '../repository/Repository';
import {
  createItemOfflineDB,
  getItemsOfflineDB,
  updateItemsOfflineDB,
} from '../../offlineDatabase/repository/Repository';
import _ from 'lodash';
import {
  returnNewestItemByDate,
  returnOddObjectFromTwoArrays,
} from '../../../utils';

export async function syncAllDataBases(list: Checklist[]) {
  try {
    const remoteDB = await getChecklistsRemoteDB();

    const missingItemsRemoteDB = list.filter(
      (item: Checklist) =>
        !remoteDB?.find((obj: Checklist) => obj._id === item._id),
    );

    if (missingItemsRemoteDB.length > 0) {
      createItemRemoteDB(missingItemsRemoteDB);
    }

    const missingItemsOfflineDB = remoteDB.filter(
      (item: Checklist) => !list.find((obj: any) => obj._id === item._id),
    );

    if (missingItemsOfflineDB.length > 0) {
      createItemOfflineDB(missingItemsOfflineDB);
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

    const checklist = await getItemsOfflineDB();

    return {
      checklist,
      missingItemsOfflineDB,
      itemsToUpdate:
        itemsToUpdate !== itemsToCompareFromRemoteDB ? itemsToUpdate : [],
    };
  } catch (error: any) {
    console.log('syncalldatabase', error.message);
  }
}
