export interface CallEvent {
  type: 'incoming' | 'ended' | 'connected' | 'initiate' | 'ringing';
  sipEvent?: any;
}
