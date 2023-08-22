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
  handleAddOrEditTicket: (
    name: string | null,
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

type BottomSheetAction = 'add' | 'edit' | 'view';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const TicketList: React.FC<TicketListProps> = ({
  tickets,
  handleAddOrEditTicket,
  onDeleteTask,
  refreshControl,
  onFilterChange,
  filter,
}) => {
  const theme = useTheme();

  // ###> Form
  const [bottomSheetTitle, setBottomSheetTitle] = useState<string>('Add a new Ticket');
  const [bottomSheetCTA, setBottomSheetCTA] = useState<string>('Add Ticket');
  const [bottomSheetAction, setBottomSheetAction] = useState<BottomSheetAction>('add');

  const [selectedTicket, setSelectedTicket] = useState<Ticket & Realm.Object | null>(null);
  const [subject, setSubject] = useState<string>('');
  const [ticketType, setTicketType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [priority, setPriority] = useState<string>('');
  const [agentGroup, setAgentGroup] = useState<string>('');

  const resetFormValues = (): void => {
    setSelectedTicket(null);
    setSubject('');
    setTicketType('');
    setDescription('');
    setStatus('');
    setPriority('');
    setAgentGroup('');
  };

  const handleAddOrEditTicketPress = (): void => {
    closeBottomSheet();
    setTimeout(() => {
      handleAddOrEditTicket(
        selectedTicket?.name,
        subject !== ''
          ? subject
          : selectedTicket?.subject,
        ticketType !== ''
          ? ticketType
          : selectedTicket?.ticket_type,
        description !== ''
          ? description
          : selectedTicket?.description,
        status !== ''
          ? status
          : selectedTicket?.status,
        priority !== ''
          ? priority
          : selectedTicket?.priority,
        agentGroup !== ''
          ? agentGroup
          : selectedTicket?.agent_group,
      );
      resetFormValues();
    }, 700); // Wait for the bottom sheet to close before adding the task
  };
  // ###< Form

  // ###> Bottom Sheet configurations and functions to add, view or edit a new ticket
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const animationConfigs = useBottomSheetTimingConfigs({
    duration: 550,
    easing: Easing.elastic(0.9),
  });

  const openAddTicketBottomSheet = () => {
    resetFormValues();
    setBottomSheetTitle('Add a new Ticket');
    setBottomSheetCTA('Add Ticket');
    setBottomSheetAction('add');
    bottomSheetModalRef.current?.present();
  };

  const openViewTicketBottomSheet = () => {
    setBottomSheetTitle('View Ticket');
    setBottomSheetCTA('Close');
    setBottomSheetAction('view');
    bottomSheetModalRef.current?.present();
  };

  const openEditTicketBottomSheet = () => {
    setBottomSheetTitle('Edit Ticket');
    setBottomSheetCTA('Save');
    setBottomSheetAction('edit');
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
                    // Don't spread the Realm item as such: {...item}
                    ticket={item}
                    openViewTicketBottomSheet={openViewTicketBottomSheet}
                    openEditTicketBottomSheet={openEditTicketBottomSheet}
                    setSelectedTicket={setSelectedTicket}
                  />
                )}
              />
            </>
          )
      }

      <TouchableOpacity
        style={styles.floatingIcon}
        onPress={openAddTicketBottomSheet}
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
                {bottomSheetTitle}
              </Text>
              {(bottomSheetAction === 'view' || bottomSheetAction === 'edit') && selectedTicket &&
                <Input
                  style={styles.formElements}
                  size='medium'
                  label='Name'
                  value={selectedTicket?.name}
                  disabled={true}
                />
              }
              <Input
                style={styles.formElements}
                size='medium'
                label='Subject'
                value={selectedTicket?.subject}
                placeholder='Place your Text'
                onChangeText={nextValue => setSubject(nextValue)}
              />
              <Input
                style={styles.formElements}
                size='medium'
                label='Ticket Type'
                value={selectedTicket?.ticket_type}
                placeholder='Place your Text'
                onChangeText={nextValue => setTicketType(nextValue)}
              />
              <Input
                style={styles.formElements}
                size='medium'
                label='Description'
                value={selectedTicket?.description}
                placeholder='Place your Text'
                onChangeText={nextValue => setDescription(nextValue)}
              />
              <Input
                style={styles.formElements}
                size='medium'
                label='Status'
                value={selectedTicket?.status}
                placeholder='Place your Text'
                onChangeText={nextValue => setStatus(nextValue)}
              />
              <Input
                style={styles.formElements}
                size='medium'
                label='Priority'
                value={selectedTicket?.priority}
                placeholder='Place your Text'
                onChangeText={nextValue => setPriority(nextValue)}
              />
              <Input
                style={styles.formElements}
                size='medium'
                label='Agent Group'
                value={selectedTicket?.agent_group}
                placeholder='Place your Text'
                onChangeText={nextValue => setAgentGroup(nextValue)}
              />

              <Button
                style={styles.bottomSheetButton}
                onPress={() => {
                  (bottomSheetAction === 'add') || (bottomSheetAction === 'edit')
                    ? handleAddOrEditTicketPress()
                    : closeBottomSheet();
                }}
              >
                {bottomSheetCTA}
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
