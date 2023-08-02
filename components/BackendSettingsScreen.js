import React, { useState, useEffect } from 'react';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import database from '../database';
import { Q } from '@nozbe/watermelondb'

const BackendSettingsScreen = () => {
  const [apiKey, setApiKey] = useState('');
  const [apiSecret, setApiSecret] = useState('');
  const [frappeURL, setFrappeURL] = useState('');


  useEffect(() => {
    // Load settings from the database when the component mounts
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const settingsCollection = database.collections.get('settings');
      const apiKeySetting = await settingsCollection.query(Q.where('key', 'api_key')).fetch()
      const apiSecretSetting = await settingsCollection.query(Q.where('key', 'api_secret')).fetch()
      const frappeURLSetting = await settingsCollection.query(Q.where('key', 'url')).fetch()
      setApiKey(apiKeySetting[0]?.value || '');
      setApiSecret(apiSecretSetting[0]?.value || '');
      setFrappeURL(frappeURLSetting[0]?.value || '');
    } catch (error) {
      console.log('Error loading settings:', error);
    }
  };

  const saveSettings = async () => {
    try {
      await database.write(async () => {
        const settingsCollection = database.collections.get('settings');

        // Create or update 'api_key' setting
        const apiKeySetting = await settingsCollection.query(Q.where('key', 'api_key')).fetch()
        if (apiKeySetting.length > 0) {
          await apiKeySetting[0].update((record) => {
            console.log("updated")
            record.value = apiKey;
          });
        } else {
          await settingsCollection.create((record) => {
            console.log("created")
            record.key = 'api_key';
            record.value = apiKey;
          });
        }

        // Create or update 'api_secret' setting
        const apiSecretSetting = await settingsCollection.query(Q.where('key', 'api_secret')).fetch()
        if (apiSecretSetting.length > 0) {
          await apiSecretSetting[0].update((record) => {
            record.value = apiSecret;
          });
        } else {
          await settingsCollection.create((record) => {
            record.key = 'api_secret';
            record.value = apiSecret;
          });
        }

        // Create or update 'url' setting
        const frappeURLSetting = await settingsCollection.query(Q.where('key', 'url')).fetch()
        if (frappeURLSetting.length > 0) {
          await frappeURLSetting[0].update((record) => {
            record.value = frappeURL;
          });
        } else {
          await settingsCollection.create((record) => {
            record.key = 'url';
            record.value = frappeURL;
          });
        }
      });
      console.log('Settings saved successfully.');


    } catch (error) {
      console.log('Error saving settings:', error);
    }
  };


  return (
    <Layout style={{ flex: 1, padding: 16 }}>
      <Input
        label="API Key"
        placeholder="Enter API Key"
        value={apiKey}
        onChangeText={text => setApiKey(text)}
        style={{marginBottom: 16,}}
      />
      <Input
        label="API Secret"
        placeholder="Enter API Secret"
        value={apiSecret}
        onChangeText={text => setApiSecret(text)}
        style={{marginBottom: 16,}}
      />
      <Input
        label="Frappe URL"
        placeholder="Enter Frappe URL"
        value={frappeURL}
        onChangeText={text => setFrappeURL(text)}
        style={{marginBottom: 16,}}
      />
      <Button onPress={saveSettings}  style={{marginBottom: 16,}}>Save Settings</Button>
    </Layout>
  );
};

export default BackendSettingsScreen;
