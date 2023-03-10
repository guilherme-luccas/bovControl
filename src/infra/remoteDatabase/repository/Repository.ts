import {Checklist} from './../../interfaces/interfaces';
import {api} from './../../../services/api';
export async function getChecklistsRemoteDB() {
  try {
    const response = await api.get('/checkList');

    const itemsFormatted = response.data.map((item: any) => {
      delete item.__v;
      return {
        ...item,
        _id: String(item._id),
        amount_of_milk_produced: Number(item.amount_of_milk_produced),
        number_of_cows_head: Number(item.number_of_cows_head),
      };
    });
    return itemsFormatted;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getItemByIdRemoteDB() {}

export async function createItemRemoteDB(items: any) {
  try {
    await api.post('/checkList', {checklists: items});
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteItemRemoteDB() {}

export async function updateItemRemoteDB() {}
