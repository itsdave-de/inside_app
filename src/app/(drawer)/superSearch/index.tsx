import { DrawerToggleButton } from '@react-navigation/drawer';
import { Icon, Input, Layout, List, ListItem, Text } from '@ui-kitten/components';
import Drawer from 'expo-router/drawer';
import { useFrappeGetCall } from 'frappe-react-sdk';
import { useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

export default function SuperSearchPage(): React.ReactElement {
    const [searchValue, setSearchValue] = useState('');
    const [response, setResponse] = useState([]);

    const frappeGetCall = useFrappeGetCall(
        'ssc_camp_management.tools.personen_suche',
        {
            "value": searchValue,
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
        setResponse(frappeGetCall.data);
        console.log(response);
        
    }

//     const renderItem = ({ item, index }): React.ReactElement => {
// console.log(item);
// console.log(index);


//         const keys = Object.keys(item);
//         const values = Object.values(item);
        
//         return (<ListItem
//         //   style={styles.item}
//           title={keys[index]}
//           description={values[index]}
//         />
//         )
//     };

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
                    label='Search'
                    placeholder='Place your Text'
                    accessoryRight={(props) => {
                        return (
                            <TouchableWithoutFeedback onPress={() => { search() }}>
                                <Icon
                                    {...props}
                                    name={'search'}
                                />
                            </TouchableWithoutFeedback>
                        )
                    }}
                    onChangeText={nextValue => setSearchValue(nextValue)}
                />
                {/* <Layout style={styles.formContainer}>
                    <List
                        data={response?.message?.reser_name}
                        renderItem={() => { return renderItem(response) }}
                    />
                </Layout> */}
                <Text>Response: {JSON.stringify(response)}</Text>
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
    },
    inputContainer: {
        margin: 20
    },
    button: {
        alignSelf: 'center'
    },
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    captionIcon: {
        width: 10,
        height: 10,
        marginRight: 5,
    },
    captionText: {
        fontSize: 12,
        fontWeight: '400',
        fontFamily: 'opensans-regular',
        color: '#8F9BB3',
    },
});
