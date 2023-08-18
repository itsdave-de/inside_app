import { Layout } from '@ui-kitten/components';
import { Stack } from 'expo-router';
import { Ticket } from '@src/models/Ticket';
import { useQuery, useRealm } from '@realm/react';
import { TicketManager } from '@src/components/TicketsManager';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { useFrappeGetCall } from 'frappe-react-sdk';

export default function TicketsPage() {
    const realm = useRealm();

    const { data, isLoading, error } = useFrappeGetCall(
        "ssc_camp_management.inside_app_api.get_all_tickets_for_agent",
    );

    // const fetchTickets = useCallback(
    //     (data: Array<any>): void => {

    //         // Everything in the function passed to "realm.write" is a transaction and will
    //         // hence succeed or fail together. A transcation is the smallest unit of transfer
    //         // in Realm so we want to be mindful of how much we put into one single transaction
    //         // and split them up if appropriate (more commonly seen server side). Since clients
    //         // may occasionally be online during short time spans we want to increase the probability
    //         // of sync participants to successfully sync everything in the transaction, otherwise
    //         // no changes propagate and the transaction needs to start over when connectivity allows.

    //         data.forEach((ticket) => {
    //             realm.write(() => {                    
    //                 return realm.create(Ticket, {
    //                     name: ticket.name,
    //                     subject: ticket.subject,
    //                     ticket_type: ticket.ticket_type,
    //                     description: ticket.description,
    //                     status: ticket.status,
    //                     priority: ticket.priority,
    //                     agent_group: ticket.agent_group
    //                 });
    //             });
    //         });
    //     },
    //     [data],
    // );

    if (typeof data !== "undefined") {
        console.log(data);

        // realm.write(() => {                    
        //     return realm.create(Ticket, {
        //         name: "21",
        //         subject: "There is a problem with the light in camping 20",
        //         ticket_type: "Issue",
        //         description: "",
        //         status: "Open",
        //         priority: "TOP",
        //         agent_group: "ticket.agent_group"
        //     });
        // });
        
    //     data.message.forEach((ticket) => {
    //         realm.write(() => {                    
    //             return realm.create(Ticket, {
    //                 name: ticket.name.toString(),
    //                 subject: ticket.subject,
    //                 ticket_type: ticket.ticket_type,
    //                 description: ticket.description,
    //                 status: ticket.status,
    //                 priority: ticket.priority,
    //                 agent_group: ticket.agent_group
    //             });
    //         });
    //     });
    }

    // fetchTickets(data);

    const tickets = useQuery(
        Ticket,
        collection => collection.sorted('creation')
    );

    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Stack.Screen options={{
                headerShown: true,
                title: "My Tickets",
                headerLeft: () => <DrawerToggleButton />,
            }}
            />
            <TicketManager tickets={tickets} />
        </Layout>
    );
}
