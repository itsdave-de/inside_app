import { Layout } from '@ui-kitten/components';
import { Stack } from 'expo-router';
import { DrawerToggleButton } from "@react-navigation/drawer";

import { Ticket } from '@src/models/Ticket';
import { useState } from 'react';
import { useQuery } from '@realm/react';
import { TicketManager } from '@src/components/TicketsManager';

export default function TicketsPage() {
    const [showDone, setShowDone] = useState(false);
    // const tickets = useQuery(
    //     Ticket,
    //     collection =>
    //       showDone
    //         ? collection.sorted('creation')
    //         : collection.filtered('status = "done"').sorted('creation'),
    //     [showDone],
    //   );
    const tickets = useQuery(
        Ticket,
        collection => collection.sorted('creation')
      );

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Stack.Screen options={{
                    headerShown: true,
                    title: "All Tickets",
                    headerLeft: () => <DrawerToggleButton />,
                }}
            />
            <TicketManager tickets={tickets} setShowDone={setShowDone} showDone={showDone} />
        </Layout>
    );
}
