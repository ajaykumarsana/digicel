import { Message } from './message';

export interface UnreadMessages {
  [userId: string]: Message[];
}
