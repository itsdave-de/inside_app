import { useRef, useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View, Dimensions, Pressable } from 'react-native';
import { Realm } from '@realm/react';
import { Layout, useTheme, Input, Button, Text, Toggle } from '@ui-kitten/components';
import { BottomSheetModal, BottomSheetModalProvider, useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';

import { Ticket } from '@src/models/Ticket';
import { TicketItem } from './TicketItem';
import { Icon } from '@ui-kitten/components';
import { Easing } from 'react-native-reanimated';
import { TicketsFilters } from '@src/types/TicketsFilterType';

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
  onFilterChange: (filterName: keyof TicketsFilters, value: boolean) => void;
  filter: TicketsFilters;
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  handleAddTicket,
  onDeleteTask,
  refreshControl,
  onFilterChange,
  filter,
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

  // ###> Bottom Sheet configurations and functions to add a new ticket
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

  // ###> Filter
  const filterSheetModalRef = useRef<BottomSheetModal>(null);

  const openFilterSheet = () => {
    filterSheetModalRef.current?.present();
  };

  const closeFilterSheet = () => {
    filterSheetModalRef.current?.dismiss();
  };
  // ###< Filter

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
            <>
              <Pressable onPress={openFilterSheet}>
                <Icon
                  name="funnel"
                  style={[styles.filterIcon, { tintColor: theme['color-primary-default'] }]}
                />
              </Pressable>
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
            </>
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
              <Text category='h5' style={styles.heading}>
                Add a new Ticket
              </Text>
              <Input
                style={styles.formElements}
                size='medium'
                label='Subject'
                placeholder='Place your Text'
                onChangeText={nextValue => setSubject(nextValue)}
              />
              <Input
                style={styles.formElements}
                size='medium'
                label='Ticket Type'
                placeholder='Place your Text'
                onChangeText={nextValue => setTicketType(nextValue)}
              />
              <Input
                style={styles.formElements}
                size='medium'
                label='Description'
                placeholder='Place your Text'
                onChangeText={nextValue => setDescription(nextValue)}
              />
              <Input
                style={styles.formElements}
                size='medium'
                label='Status'
                placeholder='Place your Text'
                onChangeText={nextValue => setStatus(nextValue)}
              />
              <Input
                style={styles.formElements}
                size='medium'
                label='Priority'
                placeholder='Place your Text'
                onChangeText={nextValue => setPriority(nextValue)}
              />
              <Input
                style={styles.formElements}
                size='medium'
                label='Agent Group'
                placeholder='Place your Text'
                onChangeText={nextValue => setAgentGroup(nextValue)}
              />

              <Button
                style={styles.bottomSheetButton}
                onPress={() => handleAddTicketPress()}
              >
                Add Ticket
              </Button>
            </Layout>
          </Layout>
        </BottomSheetModal>
        <BottomSheetModal
          ref={filterSheetModalRef}
          snapPoints={['25%', '50%', '95%']}
          index={2}
          backgroundComponent={({ style }) => (
            <View style={[style, styles.bottomSheetBackground]} />
          )}
          animationConfigs={animationConfigs}
        >
          <Layout style={styles.bottomSheetContainer}>
            <Layout style={styles.formContainer}>
              <Text category='h5' style={styles.heading}>
                Apply filters
              </Text>
              <Toggle
                style={styles.formElements}
                checked={filter.myTickets}
                onChange={(value) => {
                  onFilterChange('myTickets', value);
                }}
              >
                My Tickets
              </Toggle>
              <Toggle
                style={styles.formElements}
                checked={filter.openTickets}
                onChange={(value) => {
                  onFilterChange('openTickets', value);
                }}
              >
                Open Tickets
              </Toggle>
              <Toggle
                style={styles.formElements}
                checked={filter.closedTickets}
                onChange={(value) => {
                  onFilterChange('closedTickets', value);
                }}
              >
                Closed Tickets
              </Toggle>
              <Button
                style={styles.bottomSheetButton}
                onPress={() => {
                  closeFilterSheet();
                }}
              >
                Apply Filters
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
  filterIcon: {
    width: 35,
    height: 35,
    alignSelf: 'flex-end',
    marginTop: 15,
    marginRight: 15,
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
  heading: {
    alignSelf: 'center',
  },
  formContainer: {
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
  },
  formElements: {
    margin: 10
  },
  bottomSheetButton: {
    alignSelf: 'center',
    width: '95%',
    margin: 10
  },
});

export default TicketList;
