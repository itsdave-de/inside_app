import Realm, { BSON } from 'realm';

export class Settings extends Realm.Object {
  _id: string = 'settings_id';
  apiKey: string = '';
  apiSecret: string = '';
  apiUrl: string = '';

  static primaryKey = '_id';
}
