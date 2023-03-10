import Realm from 'realm';
import {
  ChecklistSchema,
  FarmerSchema,
  FromSchema,
  LocationSchema,
  ToSchema,
} from './schemas/ChecklistSchema';

export const getOfflineDB = async () =>
  await Realm.open({
    path: 'myrealapp',
    schema: [
      ChecklistSchema,
      FarmerSchema,
      FromSchema,
      ToSchema,
      LocationSchema,
    ],
  });
