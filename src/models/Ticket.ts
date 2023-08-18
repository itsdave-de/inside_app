import Realm from 'realm';

// To use a class as a Realm object type in Typescript with the `@realm/babel-plugin` plugin,
// simply define the properties on the class with the correct type and the plugin will convert
// it to a Realm schema automatically.
export class Ticket extends Realm.Object<Ticket> {
  name: string = '';
  modified_by?: string = '';
  owner?: string = '';
  subject?: string = '';
  raised_by?: string = '';
  status?: string = 'Open';
  priority?: string = 'Medium';
  ticket_type?: string = '';
  agent_group?: string = '';
  description?: string = '';
  creation?: Date = new Date();

  __lastPull: Date = new Date();

  static primaryKey = 'name';
}
