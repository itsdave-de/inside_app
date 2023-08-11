import { Button, Icon, Input, Layout, Text } from '@ui-kitten/components';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useQuery, useRealm } from '@realm/react';
import { Settings } from '@src/models/Settings';
import { FlatList, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import { ReactElement, useState } from 'react';
import { UpdateMode } from 'realm';

export default function SettingsPage(): ReactElement {
    const settings = useQuery(Settings);

    const [apiKey, setApiKey] = useState('');
    const [apiSecret, setApiSecret] = useState('');
    const [apiUrl, setApiUrl] = useState('');
    const [secureTextEntryApiKey, setSecureTextEntryApiKey] = useState(true);
    const [secureTextEntryApiSecret, setSecureTextEntryApiSecret] = useState(true);

    // TODO: extract to service
    const realm = useRealm();

    const saveSettings = (apiKey: string, apiSecret: string, apiUrl: string): void => {
        realm.write(() => {
            return realm.create(
                Settings,
                {
                    "apiKey": apiKey,
                    "apiSecret": apiSecret,
                    "apiUrl": apiUrl
                },
                UpdateMode.Modified
            );
        });
    };

    // TODO: separate layout in components
    const renderCaption = (): React.ReactElement => {
        return (
            <View style={styles.captionContainer}>
                <Text style={styles.captionText}>
                    Should contain at least 8 symbols
                </Text>
            </View>
        );
    };

    return (
        <Layout style={styles.layoutContainer}>
            <Drawer.Screen
                options={{
                    title: "Settings",
                    headerShown: true,
                    headerLeft: () => <DrawerToggleButton />,
                }}
            />
            {settings.length === 0
                ? <Layout style={styles.formContainer}>
                    <Input
                        style={styles.inputContainer}
                        size='medium'
                        value={apiKey}
                        label='API Key'
                        placeholder='Place your Text'
                        caption={renderCaption}
                        accessoryRight={(props) => {
                            return (
                                <TouchableWithoutFeedback onPress={() => setSecureTextEntryApiKey(!secureTextEntryApiKey)}>
                                    <Icon
                                        {...props}
                                        name={secureTextEntryApiKey ? 'eye-off' : 'eye'}
                                    />
                                </TouchableWithoutFeedback>
                            )
                        }}
                        secureTextEntry={secureTextEntryApiKey}
                        onChangeText={nextValue => setApiKey(nextValue)}
                    />
                    <Input
                        style={styles.inputContainer}
                        size='medium'
                        value={apiSecret}
                        label='API Secret'
                        placeholder='Place your Text'
                        caption={renderCaption}
                        accessoryRight={(props) => {
                            return (
                                <TouchableWithoutFeedback onPress={() => setSecureTextEntryApiSecret(!secureTextEntryApiSecret)}>
                                    <Icon
                                        {...props}
                                        name={secureTextEntryApiSecret ? 'eye-off' : 'eye'}
                                    />
                                </TouchableWithoutFeedback>
                            )
                        }}
                        secureTextEntry={secureTextEntryApiSecret}
                        onChangeText={nextValue => setApiSecret(nextValue)}
                    />
                    <Input
                        style={styles.inputContainer}
                        size='medium'
                        value={apiUrl}
                        label='API URL'
                        placeholder='Place your Text'
                        caption={renderCaption}
                        onChangeText={nextValue => setApiUrl(nextValue)}
                    />
                    <Button style={styles.button} onPress={() => saveSettings(apiKey, apiSecret, apiUrl)}>
                        Save
                    </Button>
                    <Text>sense settings</Text>
                </Layout>
                : <FlatList
                    style={styles.listContainer}
                    data={settings}
                    keyExtractor={settings => settings._id.toString()}
                    renderItem={({ item }) => (
                        <Layout style={styles.formContainer}>
                            <Input
                                style={styles.inputContainer}
                                size='medium'
                                value={
                                    item.apiKey === apiKey || apiKey === ''
                                        ? item.apiKey
                                        : apiKey
                                }
                                label='API Key'
                                placeholder='Place your Text'
                                caption={renderCaption}
                                accessoryRight={(props) => {
                                    return (
                                        <TouchableWithoutFeedback onPress={() => setSecureTextEntryApiKey(!secureTextEntryApiKey)}>
                                            <Icon
                                                {...props}
                                                name={secureTextEntryApiKey ? 'eye-off' : 'eye'}
                                            />
                                        </TouchableWithoutFeedback>
                                    )
                                }}
                                secureTextEntry={secureTextEntryApiKey}
                                onChangeText={nextValue => setApiKey(nextValue)}
                            />
                            <Input
                                style={styles.inputContainer}
                                size='medium'
                                value={
                                    item.apiSecret === apiSecret || apiSecret === ''
                                        ? item.apiSecret
                                        : apiSecret
                                }
                                label='API Secret'
                                placeholder='Place your Text'
                                caption={renderCaption}
                                accessoryRight={(props) => {
                                    return (
                                        <TouchableWithoutFeedback onPress={() => setSecureTextEntryApiSecret(!secureTextEntryApiSecret)}>
                                            <Icon
                                                {...props}
                                                name={secureTextEntryApiSecret ? 'eye-off' : 'eye'}
                                            />
                                        </TouchableWithoutFeedback>
                                    )
                                }}
                                secureTextEntry={secureTextEntryApiSecret}
                                onChangeText={nextValue => setApiSecret(nextValue)}
                            />
                            <Input
                                style={styles.inputContainer}
                                size='medium'
                                value={
                                    item.apiUrl === apiUrl || apiUrl === ''
                                        ? item.apiUrl
                                        : apiUrl
                                }
                                label='API URL'
                                placeholder='Place your Text'
                                caption={renderCaption}
                                onChangeText={nextValue => setApiUrl(nextValue)}
                            />
                            <Button style={styles.button} onPress={() => saveSettings(
                                apiKey === ''
                                    ? item.apiKey
                                    : apiKey,
                                apiSecret === ''
                                    ? item.apiSecret
                                    : apiSecret,
                                apiUrl === ''
                                    ? item.apiUrl
                                    : apiUrl
                            )}>
                                Save
                            </Button>
                        </Layout>
                    )}
                />
            }
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
