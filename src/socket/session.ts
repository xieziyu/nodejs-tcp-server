import * as net from "net";
import { LOG } from "../utils/log";

export class Session {
  tag = 'Session';

  private _socket: net.Socket;

  constructor(public id: string, socket: net.Socket) {
    this._socket = socket;
    this._bindSocketEvents(socket);
  }

  get socket() {
    return this._socket;
  }

  get ip() {
    return (this._socket && this._socket.remoteAddress) || '';
  }

  dispose() {
    this._socket = null;
  }

  private _bindSocketEvents(socket: net.Socket) {
    // binding listeners:
    socket.on('data', (data: Buffer) => {
      LOG.d(this.tag, this.id, this.ip, 'recieved data:', data.toString('hex'));
      
      // TODO: data decoder
    });

    socket.on('error', (err: any) => {
      // Socket Error handler:
      LOG.e(this.tag, err.toString());
    });

    socket.on('close', () => {
      LOG.i(this.tag, this.id, this.ip, 'socket disconnected');
    });
  }
}