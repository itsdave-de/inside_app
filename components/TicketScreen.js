import React, { useState, useEffect, IconElement } from 'react';
import { View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import database from '../database';
import { Card, Text, Modal, Layout, Input, Icon, Button, ButtonGroup, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';



function TicketScreen() {
  const [tickets, setTickets] = useState([]);
  const [ticketForm, setTicketForm] = useState({
    name: '',
    owner: '',
    subject: '',
    status: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);

  useEffect(() => {
    async function fetchTickets() {
      const allTickets = await database.get('tabHD_Ticket').query().fetch();
      setTickets(allTickets);
    }
    fetchTickets();
  }, []);

  const [initialFormState, setInitialFormState] = useState(null);

  const handleAdd = () => {
    const initialState = {
      name: '',
      owner: '',
      subject: '',
      status: '',
    };
    setTicketForm(initialState);
    setInitialFormState(initialState);
    setModalVisible(true);
  };

  const handleSave = async () => {
    await database.write(async () => {
      if (editingTicket) {
        await editingTicket.update(ticket => {
          ticket.name = ticketForm.name;
          ticket.owner = ticketForm.owner;
          ticket.subject = ticketForm.subject;
          ticket.status = ticketForm.status;
        });
      } else {
        const newEntry = await database.get('tabHD_Ticket').create(ticket => {
          ticket.name = ticketForm.name;
          ticket.owner = ticketForm.owner;
          ticket.subject = ticketForm.subject;
          ticket.status = ticketForm.status;
        });
        setTickets([...tickets, newEntry]);
      }
    });
    setTicketForm({
      name: '',
      owner: '',
      subject: '',
      status: '',
    });
    setEditingTicket(null);
    setModalVisible(false);
  };

  const handleEdit = (ticket) => {
    const initialState = {
      name: ticket.name,
      owner: ticket.owner,
      subject: ticket.subject,
      status: ticket.status,
    };
    setTicketForm(initialState);
    setInitialFormState(initialState);
    setEditingTicket(ticket);
    setModalVisible(true);
  };

  const hasFormChanged = JSON.stringify(ticketForm) !== JSON.stringify(initialFormState);

  const deleteTicket = async () => {
    if (editingTicket) {
      await database.write(async () => {
        await editingTicket.destroyPermanently();
      });
      setTickets(tickets.filter(ticket => ticket.id !== editingTicket.id));
      setEditingTicket(null);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
    <IconRegistry icons={EvaIconsPack} />
      <FlatList
        data={tickets}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Card style={styles.ticketCard}>
            <Text>Name: {item.name}</Text>
            <Text>Owner: {item.owner}</Text>
            <Text>Subject: {item.subject}</Text>
            <Text>Status: {item.status}</Text>
            <Button title="Edit" onPress={() => handleEdit(item)} />
          </Card>
        )}
      />
      <TouchableOpacity 
        style={styles.fab} 
        onPress={handleAdd}
      >
        <Icon 
          name="plus-circle-outline" 
          fill="#fff" 
          style={styles.icon} 
        />

      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        backdropStyle={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
  <Card disabled={true} style={styles.modalCard}>
    <Input
      placeholder='Name'
      value={ticketForm.name}
      onChangeText={text => setTicketForm(prev => ({ ...prev, name: text }))}
    />
    <Input
      placeholder='Owner'
      value={ticketForm.owner}
      onChangeText={text => setTicketForm(prev => ({ ...prev, owner: text }))}
    />
    <Input
      placeholder='Subject'
      value={ticketForm.subject}
      onChangeText={text => setTicketForm(prev => ({ ...prev, subject: text }))}
    />
    <Input
      placeholder='Status'
      value={ticketForm.status}
      onChangeText={text => setTicketForm(prev => ({ ...prev, status: text }))}
    />
   <View style={styles.buttonGroupContainer}>
            <ButtonGroup appearance="filled">
              <Button
                title="Save"
                accessoryLeft={SaveIcon}
                onPress={handleSave}
                disabled={!hasFormChanged}
              />
              <Button
                title="Close"
                accessoryLeft={CloseIcon}
                onPress={() => setModalVisible(false)}
              />
              <Button
                title="Delete"
                accessoryLeft={DeleteIcon}
                onPress={deleteTicket}
                disabled={!editingTicket}
              />
            </ButtonGroup>
          </View>
  </Card>
</Modal>

    </View>
  );
}

const CloseIcon = (props) => (
    <Icon
      {...props}
      name='close-circle-outline'
    />
  );

const SaveIcon = (props) => (
    <Icon
      {...props}
      name='done-all-outline'
    />
  );

const DeleteIcon = (props) => (
    <Icon
      {...props}
      name='trash-outline'
    />
  );

  


  


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  modal: {
    width: '100%',
    height: '100%',
    padding: 30,
  },
  modalCard: {
    flex: 1,
  },
  ticketCard: {
    margin: 10,
    borderRadius: 20,  // Set border radius as needed
  },
  buttonGroupContainer: {
    width: '100%', // Use 100% width of the modal
    paddingHorizontal: 16, // Optional: Add horizontal padding for button spacing
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-between', // Distribute buttons evenly across the container
  },
  
});

export default TicketScreen;
