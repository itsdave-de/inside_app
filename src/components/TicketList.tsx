import { useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { Realm } from '@realm/react';
import { Layout, useTheme, Input, Button, Text } from '@ui-kitten/components';
import { BottomSheetModal, BottomSheetModalProvider, useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';

import { Ticket } from '@src/models/Ticket';
import { TicketItem } from './TicketItem';
import { Icon } from '@ui-kitten/components';
import { Easing } from 'react-native-reanimated';

type TicketListProps = {
  tickets: Realm.Results<Ticket>;
  handleAddTicket: (
    subject: string,
    ticketType: string,
    description: string,
    status: string,
    priority: string,
    agentGroup: string
  ) => void;
  onDeleteTask: (ticket: Ticket & Realm.Object) => void;
  refreshControl?: React.ReactElement;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  handleAddTicket,
  onDeleteTask,
  refreshControl,
}) => {
  const theme = useTheme();

  // ###> Form
  const [subject, setSubject] = useState<string>('');
  const [ticketType, setTicketType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [agentGroup, setAgentGroup] = useState<string>('');

  const resetFormValues = (): void => {
    setSubject('');
    setTicketType('');
    setDescription('');
    setStatus('');
    setPriority('');
    setAgentGroup('');
  };

  const handleAddTicketPress = (): void => {
    closeBottomSheet();
    setTimeout(() => {
      handleAddTicket(
        subject,
        ticketType,
        description,
        status,
        priority,
        agentGroup
      );
      resetFormValues();
    }, 700); // Wait for the bottom sheet to close before adding the task
  };
  // ###< Form

  // ###> Bottom Sheet configurations and functions
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 550,
    easing: Easing.elastic(0.9),
  });

  const openBottomSheet = () => {
    bottomSheetModalRef.current?.present();
  };

  const closeBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
  };
  // ###< Bottom Sheet configurations and functions

  return (
    <Layout style={styles.layoutContainer}>
      {
        tickets.length === 0
          ? (
            <FlatList
              style={styles.listContainer}
              data={tickets}
              keyExtractor={() => 'No tickets'}
              showsVerticalScrollIndicator={false}
              refreshControl={refreshControl}
              renderItem={({ item }) => (
                <Text>No tickets</Text>
              )}
            />
          )
          : (
            <FlatList
              style={styles.listContainer}
              data={tickets}
              keyExtractor={ticket => ticket.name}
              showsVerticalScrollIndicator={false}
              refreshControl={refreshControl}
              renderItem={({ item }) => (
                <TicketItem
                  ticket={item}
                // Don't spread the Realm item as such: {...item}
                />
              )}
            />
          )
      }

      <TouchableOpacity
        style={styles.floatingIcon}
        onPress={openBottomSheet}
      >
        <Icon
          name="plus-circle"
          style={[styles.icon, { tintColor: theme['color-primary-default'] }]}
        />
      </TouchableOpacity>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          snapPoints={['25%', '50%', '95%']}
          index={2}
          backgroundComponent={({ style }) => (
            <View style={[style, styles.bottomSheetBackground]} />
          )}
          animationConfigs={animationConfigs}
        >
          <Layout style={styles.bottomSheetContainer}>

            <Layout style={styles.formContainer}>
              <Input
                style={styles.inputContainer}
                size='medium'
                label='Subject'
                placeholder='Place your Text'
                onChangeText={nextValue => setSubject(nextValue)}
              />
              <Input
                style={styles.inputContainer}
                size='medium'
                label='Ticket Type'
                placeholder='Place your Text'
                onChangeText={nextValue => setTicketType(nextValue)}
              />
              <Input
                style={styles.inputContainer}
                size='medium'
                label='Description'
                placeholder='Place your Text'
                onChangeText={nextValue => setDescription(nextValue)}
              />
              <Input
                style={styles.inputContainer}
                size='medium'
                label='Status'
                placeholder='Place your Text'
                onChangeText={nextValue => setStatus(nextValue)}
              />
              <Input
                style={styles.inputContainer}
                size='medium'
                label='Priority'
                placeholder='Place your Text'
                onChangeText={nextValue => setPriority(nextValue)}
              />
              <Input
                style={styles.inputContainer}
                size='medium'
                label='Agent Group'
                placeholder='Place your Text'
                onChangeText={nextValue => setAgentGroup(nextValue)}
              />

              <Button
                style={styles.addTicketButton}
                onPress={() => handleAddTicketPress()}
              >
                Add Ticket
              </Button>
            </Layout>
          </Layout>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Layout>
  );
};

const styles = StyleSheet.create({
  layoutContainer: {
    position: 'relative',
    height: windowHeight,
    flex: 1,
    justifyContent: 'center',
    width: windowWidth,
  },
  listContainer: {
    flex: 1,
    width: windowWidth,
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
  bottomSheetBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bottomSheetContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '95%',
    height: windowHeight,
    alignSelf: 'center',
  },
  formContainer: {
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
  },
  inputContainer: {
    margin: 10
  },
  addTicketButton: {
    alignSelf: 'center',
    width: '95%',
    margin: 10
  },
});

export default TicketList;
