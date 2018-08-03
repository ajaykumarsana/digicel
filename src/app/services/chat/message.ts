export interface Message {
  msgid?: string;
  to?: string;
  from?: string;
  type?: 'chat' | 'groupalias' | 'groupbroadcast' | 'groupalert';
  lang?: string;
  body: string;
  isSender: boolean;
  read?: boolean;
  // If this interface gets converted to a class, parse the timestamp into a date
  stamp?: number;
}
