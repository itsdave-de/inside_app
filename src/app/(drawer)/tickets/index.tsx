import { Layout } from '@ui-kitten/components';
import { Stack } from 'expo-router';
import { Ticket } from '@src/models/Ticket';
import { Realm, useQuery, useRealm } from '@realm/react';
import { TicketManager } from '@src/components/TicketsManager';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useFrappeGetCall } from 'frappe-react-sdk';
import { useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import { TicketsFilters } from '@src/types/TicketsFilterType';

export default function TicketsPage() {
    const [refreshKeyTickets, setRefreshKeyTickets] = useState(0);
    const [refreshingTickets, setRefreshingTickets] = useState(false);
    const [filter, setFilter] = useState<TicketsFilters>({
        myTickets: false,
        openTickets: false,
        closedTickets: false
    });

    const handleFilterChange = (
        filterName: keyof TicketsFilters,
        value: boolean
    ) => {
        setFilter((prevFilter) => ({
            ...prevFilter,
            [filterName]: value
        }));
    };


    const realm = useRealm();

    const { data } = useFrappeGetCall(
        "ssc_camp_management.inside_app_api.get_all_tickets_for_agent",
        {},
        `ssc_camp_management.inside_app_api.get_all_tickets_for_agent${refreshKeyTickets.toString()}`,
        {
            revalidateOnMount: true
        }
    );

    useEffect(() => {
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
                            agent_group: ticket.agent_group,
                            __lastPull: new Date(),
                        },
                        Realm.UpdateMode.Modified
                    );
                });
            });
        }
    }, [data]); // Only execute the effect when the 'data' changes

    const tickets: Realm.Results<Ticket> = useQuery(
        Ticket,
        (collection) => {
            let query = collection.sorted('creation');

            if (filter.myTickets) {
                query = query.filtered('agent_group = "myTickets"');
            }

            if (filter.openTickets) {
                query = query.filtered('status = "Open"');
            }

            if (filter.closedTickets) {
                query = query.filtered('status = "Closed"');
            }
            return query;
        },
        [filter, data]
    );

    const refreshTicketsData = (): void => {
        setRefreshingTickets(true);
        setRefreshKeyTickets(oldKey => oldKey + 1);
        setRefreshingTickets(false);
    };

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Stack.Screen options={{
                headerShown: true,
                title: "Tickets",
                headerLeft: () => <DrawerToggleButton />,
            }}
            />
            <TicketManager
                tickets={tickets}
                refreshControl={
                    <RefreshControl refreshing={refreshingTickets} onRefresh={refreshTicketsData} />
                }
                onFilterChange={handleFilterChange}
                filter={filter}
            />
        </Layout>
    );
}
