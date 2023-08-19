import React, { useRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Realm } from '@realm/react';
import { Layout, useTheme, Input, Button } from '@ui-kitten/components';
import { BottomSheetModal, BottomSheetModalProvider, useBottomSheetSpringConfigs, useBottomSheetTimingConfigs } from '@gorhom/bottom-sheet';

import { Ticket } from '@src/models/Ticket';
import { TicketItem } from './TicketItem';
import { Icon } from '@ui-kitten/components';
import { Easing } from 'react-native-reanimated';

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
              />
              <Input
                style={styles.inputContainer}
                size='medium'
                label='Ticket Type'
                placeholder='Place your Text'
              />
              <Input
                style={styles.inputContainer}
                size='medium'
                label='Description'
                placeholder='Place your Text'
              />
              <Input
                style={styles.inputContainer}
                size='medium'
                label='Status'
                placeholder='Place your Text'
              />
              <Input
                style={styles.inputContainer}
                size='medium'
                label='Priority'
                placeholder='Place your Text'
              />
              <Input
                style={styles.inputContainer}
                size='medium'
                label='Agent Group'
                placeholder='Place your Text'
              />

              <Button style={styles.addTicketButton} onPress={closeBottomSheet}>Add Ticket</Button>
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
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    width: '100%',
  },
  listContainer: {
    flex: 1,
    width: '100%',
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
    height: '100%',
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
