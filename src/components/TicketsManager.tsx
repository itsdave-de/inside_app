import {useCallback} from 'react';
import {View, StyleSheet, Switch, Text} from 'react-native';
import { Layout } from '@ui-kitten/components';

import {Ticket} from '@src/models/Ticket';
import {IntroText} from './IntroText';
import {AddTaskForm} from './AddTaskForm';
import TicketList from './TicketList';

import {useRealm} from '@realm/react';
import {shadows} from '../styles/shadows';

export const TicketManager: React.FC<{
  tickets: Realm.Results<Ticket>;
  userId?: string;
}> = ({tickets, userId}) => {
  const realm = useRealm();

  const handleAddTask = useCallback(
    (name: string): void => {
      if (!name) {
        return;
      }

      // Everything in the function passed to "realm.write" is a transaction and will
      // hence succeed or fail together. A transcation is the smallest unit of transfer
      // in Realm so we want to be mindful of how much we put into one single transaction
      // and split them up if appropriate (more commonly seen server side). Since clients
      // may occasionally be online during short time spans we want to increase the probability
      // of sync participants to successfully sync everything in the transaction, otherwise
      // no changes propagate and the transaction needs to start over when connectivity allows.
      realm.write(() => {
        return realm.create(Ticket, {
          name
        });
      });
    },
    [realm, userId],
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
        {tickets.length === 0 ? (
          <IntroText />
        ) : (
          <TicketList
            tickets={tickets}
            onToggleTaskStatus={() => {}}
            onDeleteTask={handleDeleteTask}
          />
        )}
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
