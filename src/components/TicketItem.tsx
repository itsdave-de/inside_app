import React from 'react';
import { View, StyleSheet, ViewProps, Pressable } from 'react-native';

import { Ticket } from '@src/models/Ticket';
import { Card, Divider, Icon, Layout, Text, useTheme } from '@ui-kitten/components';
import { getFormatedDate } from '@src/services/DateUtils';

type TicketItemProps = {
  ticket: Ticket;
  openViewTicketBottomSheet: () => void;
  openEditTicketBottomSheet: () => void;
  setSelectedTicket: React.Dispatch<React.SetStateAction<Ticket | null>>;
};

export const TicketItem = React.memo<TicketItemProps>(
  ({ ticket, openViewTicketBottomSheet, openEditTicketBottomSheet, setSelectedTicket }) => {
    const theme = useTheme();

    const creationDate: string = getFormatedDate(ticket.creation);

    const cardHeader = (props: ViewProps): React.ReactElement => (
      <View {...props}>
        <Text category='h6' style={styles.description}>
          Ticket {ticket.name}: {ticket.subject}
        </Text>
      </View>
    );

    const cardFooter = (props: ViewProps): React.ReactElement => (
      <View {...props} style={styles.footerContainer}>
        <Text category='c1' style={{ margin: 5 }}>
          Created At {creationDate}
        </Text>
        <View style={styles.actionsContainer}>
          <Pressable onPress={() => {
            setSelectedTicket(ticket);
            openEditTicketBottomSheet();
          }}
          >
            <Icon
              name="edit"
              style={[styles.icon, { tintColor: theme['color-primary-default'] }]}
            />
          </Pressable>
          <Pressable onPress={() => {
            setSelectedTicket(ticket);
            openViewTicketBottomSheet();
          }}>
            <Icon
              name="eye"
              style={[styles.icon, { tintColor: theme['color-primary-default'] }]}
            />
          </Pressable>
        </View>
      </View >
    );

    return (
      <Layout style={styles.descriptionContainer}>
        <Card
          style={styles.card}
          key={ticket.name}
          header={cardHeader}
          footer={cardFooter}
        >
          <Text category='p1' style={styles.description}>Status: {ticket.status}</Text>
          <Divider />
          <Text category='p1' style={styles.description}>Owner: {ticket.owner}</Text>
          <Divider />
          <Text category='p1' style={styles.description}>Type: {ticket.ticket_type}</Text>
        </Card>
      </Layout>
    );
  },
);

const styles = StyleSheet.create({
  card: {
    width: '90%',
    alignSelf: 'center',
    margin: 15,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    }
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignContent: 'center',
    width: '100%'
  },
  description: {
    margin: 5,
    maxWidth: '100%'
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  icon: {
    width: 25,
    height: 25,
    margin: 5,
  },
});
