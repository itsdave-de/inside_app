import { Settings } from "@src/models/Settings";
import { ApplicationProvider } from "@ui-kitten/components";
import * as eva from '@eva-design/eva';
import { Slot } from "expo-router";
import { useObject } from "@realm/react";
import { FrappeProvider } from "frappe-react-sdk";
import { useColorScheme } from "react-native";

export default function AppFrappeWrapper(): React.ReactElement {
    const colorScheme = useColorScheme();
    const defaultUrl = '';
    const defaultKey = '';
    const defaultSecret = '';

    const userSettings = useObject(Settings, process.env.EXPO_PUBLIC_SETTINGS_ID);

    const getUserAuthorizationTokensFromSettings = () => {
        return `${userSettings.apiKey}:${userSettings.apiSecret}`;

    };

    return (
        <FrappeProvider
            url={userSettings ? userSettings.apiUrl : defaultUrl}
            tokenParams={{
                useToken: true,
                token: () => { return getUserAuthorizationTokensFromSettings() },
                type: "token"
            }}
        >
            <ApplicationProvider {...eva} theme={eva[colorScheme]}>
                <Slot />
            </ApplicationProvider>
        </FrappeProvider>
    );
}