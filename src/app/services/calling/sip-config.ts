export class SipConfig {
  public authorization_user: string;
  public password: string;
  public uri: string;
  public ws_servers: { ws_uri: string, weight: number }[];

  constructor(obj: {} = {ws_servers: []}) {
    this.authorization_user = obj['authorization_user'];
    this.password = obj['password'];
    this.uri = obj['uri'];
    this.ws_servers = obj['ws_servers'];
  }

  get host(): string {
    return this.uri.split('@')[1];
  }
}
