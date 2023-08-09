import React from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {Realm} from '@realm/react';

import {Ticket} from '@src/models/Ticket';
import {TicketItem} from './TicketItem';
import { Layout } from '@ui-kitten/components';

type TicketListProps = {
  tickets: Realm.Results<Ticket & Realm.Object>;
  onToggleTaskStatus: (ticket: Ticket & Realm.Object) => void;
  onDeleteTask: (ticket: Ticket & Realm.Object) => void;
};

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  onToggleTaskStatus,
  onDeleteTask,
}) => {
  return (
    <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FlatList
          data={tickets}
          keyExtractor={ticket => ticket.__id.toString()}
          renderItem={({item}) => (
            <TicketItem
              ticket={item}
              onToggleStatus={() => onToggleTaskStatus(item)}
              onDelete={() => onDeleteTask(item)}
              // Don't spread the Realm item as such: {...item}
            />
          )}
        />
    </Layout>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default TicketList;
