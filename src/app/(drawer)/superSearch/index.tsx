import { DrawerToggleButton } from '@react-navigation/drawer';
import {
  Icon,
  Input,
  Layout,
  List,
  ListItem,
  Text,
  Card,
} from '@ui-kitten/components';
import Drawer from 'expo-router/drawer';
import { useFrappeGetCall } from 'frappe-react-sdk';
import React, { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

export default function SuperSearchPage(): React.ReactElement {
  const [searchValue, setSearchValue] = useState('');
  const [response, setResponse] = useState(null);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

const formatToGermanDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 because months are 0-indexed
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};

  const { data, isLoading } = useFrappeGetCall(
    shouldSearch ? 'ssc_camp_management.tools.personen_suche' : null,
    shouldSearch ? {
      "value": searchValue,
      "exact_match": 0,
      "reservierung_beruecksichtigen": 1,
      "mitreisende_vorname_beruecksichtigen": 1,
      "mitreisende_nachname_beruecksichtigen": 1,
      "past": 0,
      "present": 1,
      "future": 0
    } : null
  );

  if (data && !isLoading) {
    setResponse(data.message.reser_name);
    setShouldSearch(false);
    setIsSearching(false);  // Set isSearching to false when the search results are back
}

  const renderCardItem = ({ item }) => {
    return (
        <Card style={styles.card}>
            <Text category="h6">{item.name1} ({item.kundennummer})</Text>
            <Text>Anreise: {formatToGermanDate(item.anreise)}</Text>
            <Text>Abreise: {formatToGermanDate(item.abreise)}</Text>
            <Text>Platz: {item.platz}</Text>
        </Card>
    );
};

return (
    <Layout style={styles.layoutContainer}>
      <Drawer.Screen
        options={{
          title: "Super Search",
          headerShown: true,
          headerLeft: () => <DrawerToggleButton />,
        }}
      />
      <Layout style={styles.formContainer}>
      <Input
    style={styles.inputContainer}
    size='medium'
    value={searchValue}
    label='Super-Search'
    placeholder='Suchbegriff eingeben'
    accessoryRight={(props) => (
        <TouchableWithoutFeedback onPress={() => {
            if (searchValue.trim() !== '') {  // Check to ensure the search value isn't empty
                setShouldSearch(true);
                setHasSearched(true);
                setIsSearching(true);  // Set isSearching to true when the search button is pressed
            }
        }}>
            <Icon {...props} name={'search'} />
        </TouchableWithoutFeedback>
    )}
    onChangeText={nextValue => {
        setSearchValue(nextValue);
        setResponse(null);
        setHasSearched(false);  // Reset the hasSearched state here
    }}
/>

        
        {isSearching && (
            <Layout style={[styles.alertContainer, styles.baseAlert, styles.warningAlert]}>
                <Text style={styles.warningText}>Suche...</Text>
            </Layout>
        )}

  
        {response === null && !hasSearched && (
          <Layout style={[styles.alertContainer, styles.baseAlert, styles.infoAlert]}>
            <Text style={styles.infoText}>Drücke auf die Lupe zum Suchen.</Text>
          </Layout>
        )}
  
        {response && response.length === 0 && hasSearched && (
          <Layout style={[styles.alertContainer, styles.baseAlert, styles.errorAlert]}>
            <Text style={styles.errorText}>Keine Ergebnisse gefunden.</Text>
          </Layout>
        )}
  
        {response && response.length > 0 && (
          <List
            style={styles.listContainer}
            data={response}
            renderItem={renderCardItem}
          />
        )}
      </Layout>
    </Layout>
  );
  
}

const styles = StyleSheet.create({
  layoutContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  formContainer: {
    flex: 1,
    alignItems: 'flex-start',
    width: '90%',
  },
  listContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: 'white'
  },
  inputContainer: {
    margin: 20
  },
  card: {
    marginVertical: 8,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',  // A soft grey background
    shadowColor: "#000",        // For the shadow
    shadowOffset: {
        width: 5,
        height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,               // This is for Android shadow
  },
  alertContainer: {
    width: '100%',
    alignItems: 'center', // To center the alert horizontally
},
baseAlert: {
    width: '100%',             // Take full width of the container
    maxWidth: '100%',          // Don't exceed the container's width
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',      // To center the text inside the alert
},
warningAlert: {
    backgroundColor: '#FFEEBA',
},
warningText: {
    color: '#856404',
},
infoAlert: {
    backgroundColor: '#D1E8FF',
},
infoText: {
    color: '#004085',
},
errorAlert: {
    backgroundColor: '#F8D7DA',
},
errorText: {
    color: '#721C24',
},
 
});
