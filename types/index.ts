export interface User {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  is_bot: boolean;
}

export interface Contact {
  id: number;
  user_id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  phone_number?: string;
}

export interface FetchContactsResponse {
  message: string;
  contacts: Contact[];
}