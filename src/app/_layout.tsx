import { RealmProvider } from "@realm/react";
import { schemas } from "@src/models";

import { IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import AppFrappeWrapper from '@src/components/AppFrappeWrapper';

export default function RootLayout() {
    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <RealmProvider schema={schemas}>
               <AppFrappeWrapper />
            </RealmProvider>
        </>
    );
} 
