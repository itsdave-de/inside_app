import Realm, { BSON } from 'realm';

export class Settings extends Realm.Object {
  _id: string = process.env.EXPO_PUBLIC_SETTINGS_ID;
  apiKey: string = '';
  apiSecret: string = '';
  apiUrl: string = '';

  static primaryKey = '_id';
}
