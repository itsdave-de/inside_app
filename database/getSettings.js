import database from './index';
import { Q } from '@nozbe/watermelondb'


export async function getSettings() {
    try {
      const settingsCollection = database.collections.get('settings');
      const apiKeySetting = await settingsCollection.query(Q.where('key', 'api_key')).fetch()
      const apiSecretSetting = await settingsCollection.query(Q.where('key', 'api_secret')).fetch()
      const frappeURLSetting = await settingsCollection.query(Q.where('key', 'url')).fetch()
      let settings = {
        apiKey: apiKeySetting[0].value || '',
        apiSecret: apiSecretSetting[0].value || '',
        url: frappeURLSetting[0].value || '',
      }
      console.log("Settings retrieved: ", settings); // Add this line
      return settings

    } catch (error) {
      console.log('Error loading settings:', error);
      return null;
    }
  };