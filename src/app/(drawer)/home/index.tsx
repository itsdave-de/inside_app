import { Layout, Text } from '@ui-kitten/components';
import { Drawer } from 'expo-router/drawer';

export default function HomePage() {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Drawer.Screen
                options={{
                    title: "Home",
                    headerShown: true
                }}
            />
            <Text>Home Screen: Wir sollten uns überlegen, was für tolle Sachen wir hier anzeigen.</Text>
        </Layout>
    );
}
