import Realm, {BSON} from 'realm';

// To use a class as a Realm object type in Typescript with the `@realm/babel-plugin` plugin,
// simply define the properties on the class with the correct type and the plugin will convert
// it to a Realm schema automatically.
export class Ticket extends Realm.Object<Ticket> {
  __id: BSON.ObjectId = new BSON.ObjectId();
  __lastPull: Date = new Date();
  name: string = '';
  creation: Date = new Date();
  modified: Date = new Date();
  // modified_by?: string = '';
  // owner?: string = '';
  docstatus?: number = 0;
  // idx?: number = 0;
  subject?: string = '';
  // raised_by?: string = '';
  status?: string = '';
  // priority?: string = '';
  // ticket_type?: string = '';
  // agent_group?: string = '';
  // ticket_split_from?: string = '';
  // description?: string = '';
  // template?: string = '';
  // sla?: string = '';
  // response_by?: number = 0;
  // response_by_variance?: number = 0;
  // agreement_status?: string = '';
  // resolution_by?: number = 0;
  // resolution_by_variance?: number = 0;
  // service_level_agreement_creation?: number = 0;
  // on_hold_since?: number = 0;
  // total_hold_time?: number = 0;
  // first_response_time?: number = 0;
  // first_responded_on?: number = 0;
  // avg_response_time?: number = 0;
  // resolution_details?: string = '';
  // opening_date?: number = 0;
  // opening_time?: number = 0;
  // resolution_date?: number = 0;
  // resolution_time?: number = 0;
  // user_resolution_time?: number = 0;
  // contact?: string = '';
  // customer?: string = '';
  // email_account?: string = '';
  // via_customer_portal?: number = 0;
  // attachment?: string = '';
  // content_type?: string = '';
  // feedback_submitted?: number = 0;
  // satisfaction_rating?: number = 0;
  // customer_feedback?: string = '';
  // feedback_status?: string = '';
  // _user_tags?: string = '';
  // _comments?: string = '';
  // _assign?: string = '';
  // _liked_by?: string = '';
  // _seen?: string = '';

  static primaryKey = '__id';
}
