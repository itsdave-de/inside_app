import { DrawerToggleButton } from '@react-navigation/drawer';
import { Button, Icon, Input, Layout, List, ListItem, Spinner, Text } from '@ui-kitten/components';
import Drawer from 'expo-router/drawer';
import { useFrappeGetCall } from 'frappe-react-sdk';
import { useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

export default function SuperSearchPage(): React.ReactElement {
    const [searchValue, setSearchValue] = useState('');
    const [loading, setLoading] = useState(false);
    const searchValueRef = useRef(searchValue);

    const setSearchValueRef = (data) => {
        searchValueRef.current = data;
        setSearchValue(data);
    };

    const frappeGetCall = useFrappeGetCall(
        'ssc_camp_management.tools.personen_suche',
        {
            "value": searchValueRef.current,
            "exact_match": 0,
            "reservierung_beruecksichtigen": 1,
            "mitreisende_vorname_beruecksichtigen": 1,
            "mitreisende_nachname_beruecksichtigen": 1,
            "past": 0,
            "present": 1,
            "future": 0
        }
    );

    const search = () => {
        setLoading(true);
        setSearchValueRef(searchValue);
    }

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
                    label=''
                    placeholder='Place your Text'
                    accessoryRight={(props) => {
                        return (
                                <Icon
                                    {...props}
                                    name={'search'}
                                />
                        )
                    }}
                    onChangeText={(nextValue) => {
                        setSearchValue(nextValue);
                        setLoading(false);
                    }}
                />
                <Button
                    style={styles.button}
                    onPress={() => { search() }}
                >
                    Search
                </Button>

                <View style={styles.results}>
                    {loading && !frappeGetCall.data
                        ? <Spinner size='giant' />
                        : <Text>{JSON.stringify(frappeGetCall.data)}</Text>
                    }
                </View>
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
    inputContainer: {
        margin: 20
    },
    button: {
        alignSelf: 'center',
        marginBottom: 20
    },
    results: {
        flex: 1,
        alignSelf: 'center',
    }
});
