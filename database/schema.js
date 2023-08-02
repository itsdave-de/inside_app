// ./src/database/schema.js

import { appSchema, tableSchema } from '@nozbe/watermelondb';

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'tabHD_Ticket',
      columns: [
        { name: 'name', type: 'number' },
        { name: 'creation', type: 'number' },
        { name: 'modified', type: 'number' },
        { name: 'modified_by', type: 'string' },
        { name: 'owner', type: 'string' },
        { name: 'docstatus', type: 'number' },
        { name: 'idx', type: 'number' },
        { name: 'subject', type: 'string' },
        { name: 'raised_by', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'priority', type: 'string' },
        { name: 'ticket_type', type: 'string' },
        { name: 'agent_group', type: 'string' },
        { name: 'ticket_split_from', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'template', type: 'string' },
        { name: 'sla', type: 'string' },
        { name: 'response_by', type: 'number' },
        { name: 'response_by_variance', type: 'number' },
        { name: 'agreement_status', type: 'string' },
        { name: 'resolution_by', type: 'number' },
        { name: 'resolution_by_variance', type: 'number' },
        { name: 'service_level_agreement_creation', type: 'number' },
        { name: 'on_hold_since', type: 'number' },
        { name: 'total_hold_time', type: 'number' },
        { name: 'first_response_time', type: 'number' },
        { name: 'first_responded_on', type: 'number' },
        { name: 'avg_response_time', type: 'number' },
        { name: 'resolution_details', type: 'string' },
        { name: 'opening_date', type: 'number' },
        { name: 'opening_time', type: 'number' },
        { name: 'resolution_date', type: 'number' },
        { name: 'resolution_time', type: 'number' },
        { name: 'user_resolution_time', type: 'number' },
        { name: 'contact', type: 'string' },
        { name: 'customer', type: 'string' },
        { name: 'email_account', type: 'string' },
        { name: 'via_customer_portal', type: 'number' },
        { name: 'attachment', type: 'string' },
        { name: 'content_type', type: 'string' },
        { name: 'feedback_submitted', type: 'number' },
        { name: 'satisfaction_rating', type: 'number' },
        { name: 'customer_feedback', type: 'string' },
        { name: 'feedback_status', type: 'string' },
        { name: '_user_tags', type: 'string' },
        { name: '_comments', type: 'string' },
        { name: '_assign', type: 'string' },
        { name: '_liked_by', type: 'string' },
        { name: '_seen', type: 'string' },
      ],
    }),

    tableSchema({
        name: 'settings',
        columns: [
            { name: 'key', type: 'string', isIndexed: true },
            { name: 'value', type: 'string' },
        ]
    }),  
  ],
});
