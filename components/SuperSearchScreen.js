import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text, Layout, Icon } from '@ui-kitten/components';
import EvaIconsPack from '@ui-kitten/eva-icons';
import AppContext from './AppContext';

const SuperSearchScreen = () => {
  const [name, setName] = useState('');
  const [result, setResult] = useState('');
  const {apiKey, apiSecret, url} = useContext(AppContext);
  console.log(apiKey, apiSecret, url)


  const handleSearch = () => {
    
    console.log(apiKey, apiSecret, url)
    const baseUrl = url + '/api/method/ssc_camp_management.tools.personen_suche?value=' + name + '&exact_match=0&reservierung_beruecksichtigen=1&mitreisende_vorname_beruecksichtigen=1&mitreisende_nachname_beruecksichtigen=1';

    
    const authToken = `${apiKey}:${apiSecret}`;

    fetch(baseUrl, {
      headers: {
        Authorization: `token ${authToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Assuming the API returns a JSON object with a key "result"
        if (data.message) {
            setResult(JSON.stringify(data.message));
        }
        else {
            setResult(data.exc);
        }
        console.log(data.message)
        console.log(data.exc)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        console.log(error)

      });
  };

  return (
    <Layout style={styles.container}>
      <Input
        placeholder="Suchbegriff eingeben"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

        <Button
          onPress={handleSearch}
          accessoryLeft={(props) => (
            <Icon {...props} name="search-outline" pack="eva" />
          )}
          style={{marginBottom: 16,}}
        >
          Search
        </Button>


      <View style={styles.resultBox}>
        <Text>{result}</Text>
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  resultBox: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
  },
});

export default SuperSearchScreen;
