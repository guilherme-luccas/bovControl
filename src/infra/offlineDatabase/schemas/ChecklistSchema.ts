export const ChecklistSchema = {
  name: 'checklist',
  properties: {
    _id: 'string',
    type: 'string',
    amount_of_milk_produced: 'int',
    number_of_cows_head: 'int',
    had_supervision: 'bool',
    farmer: {type: 'object', objectType: 'farmer'},
    from: {type: 'object', objectType: 'from'},
    to: {type: 'object', objectType: 'to'},
    location: {type: 'object', objectType: 'location'},
    created_at: 'string',
    updated_at: 'string',
  },
  primaryKey: '_id',
};

export const FarmerSchema = {
  name: 'farmer',
  properties: {
    name: 'string',
    city: 'string',
  },
};
export const FromSchema = {
  name: 'from',
  properties: {
    name: 'string',
  },
};
export const ToSchema = {
  name: 'to',
  properties: {
    name: 'string',
  },
};
export const LocationSchema = {
  name: 'location',
  properties: {
    latitude: 'double',
    longitude: 'double',
  },
};
