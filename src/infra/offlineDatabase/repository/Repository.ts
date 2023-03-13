import {getOfflineDB} from '../instance';
import {Checklist} from '../../models/Checklist';

export async function createItemOfflineDB(items: Checklist[]) {
  try {
    const realm = await getOfflineDB();
    items.forEach((item: Checklist) => {
      realm.write(() => {
        realm.create('checklist', item);
      });
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function getItemsOfflineDB() {
  try {
    const realm = await getOfflineDB();

    const checklist: any = realm.objects('checklist');
    return checklist;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteItemOfflineDB(item: Checklist) {
  try {
    const realm = await getOfflineDB();

    const itemsToDelete = realm
      .objects('checklist')
      .filtered('_id = $0', item._id);

    realm.write(() => {
      realm.delete(itemsToDelete);
    });
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateItemsOfflineDB(items: Checklist[]) {
  try {
    const realm = await getOfflineDB();

    items.forEach((item: Checklist) => {
      realm.write(() => {
        const itemToUpdate: any = realm.objectForPrimaryKey(
          'checklist',
          item._id,
        );

        itemToUpdate.amount_of_milk_produced = item.amount_of_milk_produced;
        itemToUpdate._id = item._id;
        itemToUpdate.number_of_cows_head = item.number_of_cows_head;
        itemToUpdate.farmer.name = item.farmer.name;
        itemToUpdate.farmer.city = item.farmer.city;
        itemToUpdate.from.name = item.from.name;
        itemToUpdate.to.name = item.to.name;
        itemToUpdate.had_supervision = item.had_supervision;
        itemToUpdate.location.latitude = item.location.latitude;
        itemToUpdate.location.longitude = item.location.longitude;
        itemToUpdate.created_at = item.created_at;
        itemToUpdate.updated_at = item.updated_at;
      });
    });
  } catch (error: any) {
    throw new Error(error);
  }
}
