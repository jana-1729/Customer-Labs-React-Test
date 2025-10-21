import { SchemaOption } from './types';

export const SCHEMA_OPTIONS: SchemaOption[] = [
  { label: 'First Name', value: 'first_name', trait: 'user' },
  { label: 'Last Name', value: 'last_name', trait: 'user' },
  { label: 'Gender', value: 'gender', trait: 'user' },
  { label: 'Age', value: 'age', trait: 'user' },
  { label: 'Account Name', value: 'account_name', trait: 'group' },
  { label: 'City', value: 'city', trait: 'user' },
  { label: 'State', value: 'state', trait: 'user' },
];

export const WEBHOOK_URL = 'https://webhook.site/your-unique-id'; // Replace with your actual webhook URL

