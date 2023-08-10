import { Layout, Text } from '@ui-kitten/components';
import { Drawer } from 'expo-router/drawer';
import { DrawerToggleButton } from "@react-navigation/drawer";

export default function HomePage() {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Drawer.Screen
                options={{
                    title: "Home",
                    headerShown: true,
                    headerLeft: () => <DrawerToggleButton />,
                }}
            />
            <Text>Home Screen: Wir sollten uns überlegen, was für tolle Sachen wir hier anzeigen.</Text>
        </Layout>
    );
}
