import { Layout } from '@ui-kitten/components';
import { Drawer } from 'expo-router/drawer';


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
            <Drawer.Screen
                options={{
                    title: "Tickets",
                    headerShown: true
                }}
            />
            <TicketManager tickets={tickets} setShowDone={setShowDone} showDone={showDone} />
        </Layout>
    );
}
