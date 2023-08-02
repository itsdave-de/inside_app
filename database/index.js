import { Database, Q } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import schema from './schema';
import tabHD_Ticket from './TabHD_Ticket';
import SettingModel from './Settings';

const adapter = new SQLiteAdapter({
  dbName: 'inside.db',
  schema,
//   shemaMigrations: [
//     {
//       toVersion: 2,
//       steps: [
//         database => database.batch(
//           database.unsafeResetDatabase(),
//           database.write(async () => {
//             const settingsCollection = database.collections.get('settings');
//             await settingsCollection.create((record) => {
//               record.key = 'api_key';
//               record.value = '';
//             });
//             await settingsCollection.create((record) => {
//               record.key = 'api_secret';
//               record.value = '';
//             });
//             await settingsCollection.create((record) => {
//               record.key = 'url';
//               record.value = '';
//             });
//           }),
//         ),
//       ],
//     },
//   ],
});

const database = new Database({
  adapter,
  modelClasses: [tabHD_Ticket, SettingModel],
  actionsEnabled: true,
});

export default database;