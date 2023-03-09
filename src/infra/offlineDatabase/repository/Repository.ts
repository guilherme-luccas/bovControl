import {getRealm} from '../instance';
import {Tasks} from '../interfaces/interfaces';

export async function createItem(item: Tasks) {
  const realm = await getRealm();

  realm.write(() => {
    const task1 = realm.create<Tasks>('Task', item);
  });
}

export async function getItems() {
  const realm = await getRealm();
  const tasks = realm.objects<Tasks>('Task');
  console.log('tasks', tasks);
}
