import { Layout } from '@ui-kitten/components';
import { Stack } from 'expo-router';
import { DrawerToggleButton } from "@react-navigation/drawer";

import { Ticket } from '@src/models/Ticket';
import { useQuery, useRealm } from '@realm/react';
import { TicketManager } from '@src/components/TicketsManager';
import { useFrappeGetCall } from 'frappe-react-sdk';

export default function TicketsPage() {
    const realm = useRealm();

    const { data } = useFrappeGetCall(
        "ssc_camp_management.inside_app_api.get_all_tickets_for_agent",
        {},
        null,
        {
            revalidateOnMount: true
        }
    );

    if (data) {
        data.message.forEach((ticket) => {
            realm.write(() => {
                return realm.create(
                    Ticket,
                    {
                        name: ticket.name.toString(),
                        subject: ticket.subject,
                        ticket_type: ticket.ticket_type,
                        description: ticket.description,
                        status: ticket.status,
                        priority: ticket.priority,
                        agent_group: ticket.agent_group
                    },
                    Realm.UpdateMode.Modified
                );
            });
        });
    }

    const tickets = useQuery(
        Ticket,
        (collection) => collection.sorted('creation')
    );

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Stack.Screen options={{
                    headerShown: true,
                    title: "All Tickets",
                    headerLeft: () => <DrawerToggleButton />,
                }}
            />
            <TicketManager tickets={tickets} />
        </Layout>
    );
}
