import { DrawerToggleButton } from '@react-navigation/drawer';
import { Layout, Text } from '@ui-kitten/components';
import Drawer from 'expo-router/drawer';

export default function SuperSearchPage(): React.ReactElement {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Drawer.Screen
                options={{
                    title: "Super Search",
                    headerShown: true,
                    headerLeft: () => <DrawerToggleButton />,
                }}
            />
            <Text>SuperSearch</Text>
        </Layout>
    );
}