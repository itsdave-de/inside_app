import { RealmProvider } from "@realm/react";
import { Slot } from "expo-router";
import { schemas } from "@src/models";
import { useColorScheme } from "react-native";

import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <RealmProvider schema={schemas}>
                <ApplicationProvider {...eva} theme={eva[colorScheme]}>
                    <Slot />
                </ApplicationProvider>
            </RealmProvider>
        </>
    );
}
