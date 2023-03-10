import {getOfflineDB} from '../instance';
import {Checklist} from '../../interfaces/interfaces';

const data = [
  {
    _id: 9,
    type: 'teste',
    amount_of_milk_produced: '200',
    number_of_cows_head: '10',
    had_supervision: true,
    farmer: {
      name: 'teste',
      city: 'teste',
    },
    from: {
      name: 'teste',
    },
    to: {
      name: 'teste',
    },
    location: {
      latitude: 23,
      longitude: 23,
    },
    created_at: 'teste',
    updated_at: 'teste',
  },
  {
    _id: 10,
    type: 'teste',
    amount_of_milk_produced: '200',
    number_of_cows_head: '10',
    had_supervision: true,
    farmer: {
      name: 'teste',
      city: 'teste',
    },
    from: {
      name: 'teste',
    },
    to: {
      name: 'teste',
    },
    location: {
      latitude: 23,
      longitude: 23,
    },
    created_at: 'teste',
    updated_at: 'teste',
  },
  {
    _id: 11,
    type: 'teste',
    amount_of_milk_produced: '200',
    number_of_cows_head: '10',
    had_supervision: true,
    farmer: {
      name: 'teste',
      city: 'teste',
    },
    from: {
      name: 'teste',
    },
    to: {
      name: 'teste',
    },
    location: {
      latitude: 23,
      longitude: 23,
    },
    created_at: 'teste',
    updated_at: 'teste',
  },
  {
    _id: 12,
    type: 'teste',
    amount_of_milk_produced: '200',
    number_of_cows_head: '10',
    had_supervision: true,
    farmer: {
      name: 'teste',
      city: 'teste',
    },
    from: {
      name: 'teste',
    },
    to: {
      name: 'teste',
    },
    location: {
      latitude: 23,
      longitude: 23,
    },
    created_at: 'teste',
    updated_at: 'teste',
  },
];
export async function createItemOfflineDB(items: any) {
  const realm = await getOfflineDB();
  items.forEach((item: any) => {
    realm.write(() => {
      realm.create('checklist', item);
    });
  });
}

export async function getItems() {
  const realm = await getOfflineDB();

  const checklist = realm.objects('checklist');
  return checklist;
}
