import { Layout, Text } from '@ui-kitten/components';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function SettingsPage() {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Drawer.Screen
                options={{
                    title: "Settings",
                    headerShown: true,
                    headerLeft: () => <DrawerToggleButton />,
                }}
            />
            <Text>Settings page</Text>
        </Layout>
    );
}
