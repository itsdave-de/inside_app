// SettingModel.js

import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class SettingModel extends Model {
  static table = 'settings';

  @field('key') key;
  @field('value') value;
}
