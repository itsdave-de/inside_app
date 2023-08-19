import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import {Realm} from '@realm/react';

import {Ticket} from '@src/models/Ticket';
import {TicketItem} from './TicketItem';
import { Icon, Layout, useTheme } from '@ui-kitten/components';

type TicketListProps = {
  tickets: Realm.Results<Ticket>;
  onToggleTaskStatus: (ticket: Ticket & Realm.Object) => void;
  onDeleteTask: (ticket: Ticket & Realm.Object) => void;
  refreshControl?: React.ReactElement;
};

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  onToggleTaskStatus,
  onDeleteTask,
  refreshControl,
}) => {
  const theme = useTheme();

  return (
    <Layout style={styles.layoutContainer}>
        <FlatList
          style={styles.listContainer}
          data={tickets}
          keyExtractor={ticket => ticket.name}
          showsVerticalScrollIndicator={false}
          refreshControl={refreshControl}
          renderItem={({item}) => (
            <TicketItem
              ticket={item}
              // Don't spread the Realm item as such: {...item}
            />
          )}
        />
        <TouchableOpacity
                style={styles.floatingIcon}
                onPress={() => console.log(`I'm being clicked!`)}
              >
                <Icon
                  name="plus-circle"
                  style={[styles.icon, { tintColor: theme["color-primary-default"]}]} />

            </TouchableOpacity>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layoutContainer: {
    position: 'relative',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    width: '100%' 
  },
  listContainer: {
    flex: 1,
    width: '100%'
  },
  icon: {
    width: 60,
    height: 60,
  },
  floatingIcon: {
    position: 'absolute',
    flex: 1,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 25,
    bottom: 25,
    elevation: 8,
  },
});

export default TicketList;
