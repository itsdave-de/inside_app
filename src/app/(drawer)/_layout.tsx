import { Icon, useTheme } from '@ui-kitten/components';
import { Drawer } from 'expo-router/drawer';
import { StyleSheet } from 'react-native';

export default function DrawerLayout() {
    const theme = useTheme();

    return (
        <Drawer screenOptions={{ headerShown: false }}>
            <Drawer.Screen
                name="home"
                options={{
                    drawerLabel: "Home",
                    title: "Home",
                    drawerIcon: () => {
                        return (
                            <Icon
                                name='home'
                                style={[styles.icon, { tintColor: theme["color-primary-default"]} ]}
                            />
                        );
                    }
                }}
            >
            </Drawer.Screen>
            <Drawer.Screen
                name="(tabs)"
                options={{
                    drawerLabel: "Tickets",
                    title: "Tickets",
                    drawerIcon: () => {
                        return (
                            <Icon
                                name='inbox'
                                style={[styles.icon, { tintColor: theme["color-primary-default"]} ]}
                            />
                        );
                    }
                }}
            >
            </Drawer.Screen>
            <Drawer.Screen
                name="settings"
                options={{
                    drawerLabel: "Settings",
                    title: "Settings",
                    drawerIcon: () => {
                        return (
                            <Icon
                                name='settings-2'
                                style={[styles.icon, { tintColor: theme["color-primary-default"]} ]}
                            />
                        );
                    }
                }}
            >
            </Drawer.Screen>
        </Drawer>
    );
}

const styles = StyleSheet.create({
    icon: {
      width: 25,
      height: 25
    },
  });
