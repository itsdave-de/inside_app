// ./src/database/TabHD_Ticket.js

import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class TabHD_Ticket extends Model {
  static table = 'tabHD_Ticket';

  @field('name') name;
  @field('creation') creation;
  @field('modified') modified;
  @field('modified_by') modifiedBy;
  @field('owner') owner;
  @field('docstatus') docStatus;
  @field('idx') idx;
  @field('subject') subject;
  @field('raised_by') raisedBy;
  @field('status') status;
  @field('priority') priority;
  @field('ticket_type') ticketType;
  @field('agent_group') agentGroup;
  @field('ticket_split_from') ticketSplitFrom;
  @field('description') description;
  @field('template') template;
  @field('sla') sla;
  @field('response_by') responseBy;
  @field('response_by_variance') responseByVariance;
  @field('agreement_status') agreementStatus;
  @field('resolution_by') resolutionBy;
  @field('resolution_by_variance') resolutionByVariance;
  @field('service_level_agreement_creation') serviceLevelAgreementCreation;
  @field('on_hold_since') onHoldSince;
  @field('total_hold_time') totalHoldTime;
  @field('first_response_time') firstResponseTime;
  @field('first_responded_on') firstRespondedOn;
  @field('avg_response_time') avgResponseTime;
  @field('resolution_details') resolutionDetails;
  @field('opening_date') openingDate;
  @field('opening_time') openingTime;
  @field('resolution_date') resolutionDate;
  @field('resolution_time') resolutionTime;
  @field('user_resolution_time') userResolutionTime;
  @field('contact') contact;
  @field('customer') customer;
  @field('email_account') emailAccount;
  @field('via_customer_portal') viaCustomerPortal;
  @field('attachment') attachment;
  @field('content_type') contentType;
  @field('feedback_submitted') feedbackSubmitted;
  @field('satisfaction_rating') satisfactionRating;
  @field('customer_feedback') customerFeedback;
  @field('feedback_status') feedbackStatus;
  @field('_user_tags') userTags;
  @field('_comments') comments;
  @field('_assign') assign;
  @field('_liked_by') likedBy;
  @field('_seen') seen;
}
