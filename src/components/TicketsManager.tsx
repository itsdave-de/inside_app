import { useCallback } from 'react';
import { View, StyleSheet, Switch, Text } from 'react-native';
import { Icon, Layout } from '@ui-kitten/components';

import { Ticket } from '@src/models/Ticket';
import TicketList from './TicketList';

import { useRealm } from '@realm/react';
import { BSON } from 'realm';

export const TicketManager: React.FC<{
  tickets: Realm.Results<Ticket>;
  refreshControl?: React.ReactElement;
}> = ({ tickets, refreshControl }) => {
  const realm = useRealm();

  const handleAddTicket = useCallback(
    (
      subject: string,
      ticketType: string,
      description: string,
      status: string,
      priority: string,
      agentGroup: string
    ): void => {
      realm.write(() => {
        return realm.create(
          Ticket,
          {
            name: `local-${new BSON.UUID().toString()}`,
            subject: subject,
            ticket_type: ticketType,
            description: description,
            status: status,
            priority: priority,
            agent_group: agentGroup,
            __lastEdit: new Date(),
          },
          Realm.UpdateMode.Modified
        );
      });
    },
    [realm],
  );

  // const handleToggleTaskStatus = useCallback(
  //   (task: Ticket & Realm.Object): void => {
  //     realm.write(() => {
  //       // Normally when updating a record in a NoSQL or SQL database, we have to type
  //       // a statement that will later be interpreted and used as instructions for how
  //       // to update the record. But in RealmDB, the objects are "live" because they are
  //       // actually referencing the object's location in memory on the device (memory mapping).
  //       // So rather than typing a statement, we modify the object directly by changing
  //       // the property values. If the changes adhere to the schema, Realm will accept
  //       // this new version of the object and wherever this object is being referenced
  //       // locally will also see the changes "live".
  //       task.isComplete = !task.isComplete;
  //     });

  //     // Alternatively if passing the ID as the argument to handleToggleTaskStatus:
  //     // realm?.write(() => {
  //     //   const task = realm?.objectForPrimaryKey('Task', id); // If the ID is passed as an ObjectId
  //     //   const task = realm?.objectForPrimaryKey('Task', Realm.BSON.ObjectId(id));  // If the ID is passed as a string
  //     //   task.isComplete = !task.isComplete;
  //     // });
  //   },
  //   [realm],
  // );

  const handleDeleteTask = useCallback(
    (ticket: Ticket & Realm.Object): void => {
      realm.write(() => {
        realm.delete(ticket);

        // Alternatively if passing the ID as the argument to handleDeleteTask:
        // realm?.delete(realm?.objectForPrimaryKey('Task', id));
      });
    },
    [realm],
  );

  return (
    <>
      <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <TicketList
          tickets={tickets}
          handleAddTicket={handleAddTicket}
          onDeleteTask={handleDeleteTask}
          refreshControl={refreshControl}
        />
      </Layout>
    </>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
});
