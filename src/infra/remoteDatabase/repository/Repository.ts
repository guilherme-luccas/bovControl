import {Checklist} from './../../interfaces/interfaces';
import {api} from './../../../services/api';
export async function getChecklistsRemoteDB() {
  try {
    const response = await api.get('/checkList');

    const itemsFormatted = response.data.map((item: Checklist) => {
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

export async function createItemRemoteDB(items: Checklist[]) {
  try {
    await api.post('/checkList', {checklists: items});
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteItemRemoteDB(item: Checklist) {
  try {
    await api.delete(`/checkList/${item._id}`);
  } catch (error) {}
}

export async function updateItemRemoteDB(items: Checklist[]) {
  try {
    items.forEach(async (item: Checklist) => {
      const itemFormated = {
        amount_of_milk_produced: item.amount_of_milk_produced,
        created_at: item.created_at,
        farmer: {
          city: item.farmer.city,
          name: item.farmer.name,
        },
        from: {
          name: item.from.name,
        },
        had_supervision: item.had_supervision,
        location: {
          latitude: item.location.latitude,
          longitude: item.location.longitude,
        },
        number_of_cows_head: item.number_of_cows_head,
        to: {
          name: item.to.name,
        },
        type: item.type,
        updated_at: item.updated_at,
      };
      await api.put(`/checkList/${item._id}`, itemFormated);
    });
  } catch (error: any) {
    console.log('update online');
    throw new Error(error.message);
  }
}
