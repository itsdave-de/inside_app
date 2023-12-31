import { Layout, Text, Card } from '@ui-kitten/components';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from "@react-navigation/drawer";
import { useFrappeGetCall } from 'frappe-react-sdk';
import React, { useState, useEffect } from 'react';
import { ScrollView, RefreshControl, Dimensions, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import HTML from 'react-native-render-html';
import useSWR, { mutate } from 'swr';

export default function HomePage() {
    const contentWidth = Dimensions.get('window').width;
    const [response, setResponse] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    const { data, isLoading, error } = useFrappeGetCall(
        "ssc_camp_management.inside_app_api.get_notes_for_homescreen",
        undefined, // If no params are used
        refreshKey.toString(),
    );

    const [isLoadingRefresh, setIsLoadingRefresh] = useState(false); // Add this state

    useEffect(() => {
        if (error) {
            console.error("Ein Fehler ist aufgetreten:", error);
            setIsLoadingRefresh(false);  // Update state when there's an error
            setRefreshing(false);       // Stop the refresh indicator
        }
        if (data && !isLoading) {
            setResponse(data);
            console.log(data);
            setIsLoadingRefresh(false);  // Update state when data is loaded
            setRefreshing(false);       // Stop the refresh indicator
        }
    }, [data, error, refreshKey]);

    const handleRefresh = () => {
        setRefreshing(true);
        setIsLoadingRefresh(true); // Set refresh to loading
        setRefreshKey(prevKey => prevKey + 1);
        setRefreshing(false);    // This stops the refresh indicator, but because of isLoadingRefresh, you continue showing the old data until new data loads
    };

    function renderNoteCard(note) {
        return (
            <Card style={styles.card} key={note.title}>
                <Text category="h5">{note.title}</Text>
                <HTML source={{ html: note.content }} contentWidth={contentWidth} />
            </Card>
        );
    }

    return (
        <Layout style={{ flex: 1 }}>
            <Drawer.Screen
                options={{
                    title: "Home",
                    headerShown: true,
                    headerLeft: () => <DrawerToggleButton />,
                }}
            />

            <ScrollView
                contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center' }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
            >
                {error && <Text>Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.</Text>}

                {
                    response
                        ? (
                            <>
                                <Text style={styles.greetingText}>
                                    Hallo, <Text style={styles.userName}>{response.message.user}</Text>! 👋
                                </Text>
                                {
                                    (response.message && response.message?.notes?.length > 0)
                                        ? response.message.notes.map(renderNoteCard)
                                        : <Text style={styles.greetingText}>Zur Zeit sind keine öffentlichen Notizen vorhanden. 🤓</Text>
                                }
                            </>
                          )
                        : <Text style={styles.sadText}>:-(</Text>
                }
            </ScrollView>
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
        width: '90%',
        alignSelf: 'center',
        marginVertical: 8,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#F5F5F5',
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        }
    },
    greetingText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 15,

    },
    userName: {
        color: '#007AFF',  // Ein ansprechendes Blau
        fontSize: 24,
    },
    sadText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#666',
        textAlign: 'center',
        marginVertical: 15,
    }
});
