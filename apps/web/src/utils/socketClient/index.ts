export class SocketClient {
  private socket: WebSocket;

  constructor(socket: WebSocket) {
    this.socket = socket;
  }
}
