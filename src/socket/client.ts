import * as net from "net";

import { LOG } from "../utils/log";

export class TcpClient {
  tag = 'TcpClient';

  // Singleton ==================================
  private static _instance: TcpClient = null;

  static getInstance() {
    if (TcpClient._instance == null) {
      TcpClient._instance = new TcpClient();
    }
    return TcpClient._instance;
  }
  // ============================================
  
  private _client: net.Socket;
  private _port: number;
  private _host: string;

  private _id: any;

  init(port: number, host: string, id: any) {
    let client:any = net.createConnection(port, host, () => {
      LOG.d(this.tag, id, 'connected to server');
    });

    client.on('data', (data) => {
      LOG.i(this.tag, 'recieved data:', data.toString('hex'));
    });

    client.on('error', (err) => {
      LOG.d(this.tag, id, err.toString());
    });

    client.on('end', () => {
      LOG.d(this.tag, id, 'disconnected from server.');
    });

    this._client = client;
    this._port = port;
    this._host = host;
    this._id = id;
  }

  periodSendingTest(ms: number) {
    setInterval(() => {
      let buf = Buffer.alloc(4);
      buf.writeUInt8(0x01, 0);
      buf.writeUInt8(0x02, 1);
      buf.writeUInt8(0x34, 2);
      buf.writeUInt8(0x56, 3);

      LOG.d(this.tag, this._id, 'sent data:', buf.toString('hex'));
      this._client.write(buf);
    }, ms);
  }
}