import { Layout } from '@ui-kitten/components';
import { Stack } from 'expo-router';
import { DrawerToggleButton } from "@react-navigation/drawer";

import { Ticket } from '@src/models/Ticket';
import { useQuery, useRealm } from '@realm/react';
import { TicketManager } from '@src/components/TicketsManager';
import { useFrappeGetCall } from 'frappe-react-sdk';
import { useState } from 'react';
import { RefreshControl } from 'react-native-gesture-handler';

export default function AllTicketsPage() {
    const [refreshKeyAllTickets, setRefreshKeyAllTickets] = useState(0);
    const [refreshingAllTickets, setRefreshingAllTickets] = useState(false);
    const realm = useRealm();

    const { data } = useFrappeGetCall(
        "ssc_camp_management.inside_app_api.get_all_tickets_for_agent",
        {},
        `ssc_camp_management.inside_app_api.get_all_tickets_for_agent${refreshKeyAllTickets.toString()}`,
        {
            revalidateOnMount: true
        }
    );

    if (data && Array.isArray(data.message)) {
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

    const tickets: Realm.Results<Ticket> = useQuery(
        Ticket,
        (collection) => collection.sorted('creation')
    );

    const refreshAllTicketsData = (): void => {
        setRefreshingAllTickets(true);
        setRefreshKeyAllTickets(oldKey => oldKey + 1);
        setRefreshingAllTickets(false);
    };

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Stack.Screen options={{
                headerShown: true,
                title: "All Tickets",
                headerLeft: () => <DrawerToggleButton />,
            }}
            />
            <TicketManager
                tickets={tickets}
                refreshControl={
                    <RefreshControl refreshing={refreshingAllTickets} onRefresh={refreshAllTicketsData} />
                }
            />
        </Layout>
    );
}
