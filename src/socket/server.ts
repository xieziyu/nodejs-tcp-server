import * as net from "net";
import * as shortid from "shortid";

import { LOG }          from "../utils/log";
import { SessionMgr }   from "./session-mgr";

export class TcpServer {
  tag = 'TcpServer';

  // Singleton ==================================
  private static _instance: TcpServer = null;

  static getInstance() {
    if (TcpServer._instance == null) {
      TcpServer._instance = new TcpServer();
    }
    return TcpServer._instance;
  }

  constructor() {
    this._server = null;
    this._port = 0;
    this._host = '';
  }
  // ============================================
  
  private _sessionMgr = new SessionMgr();
  private _server: net.Server;
  private _port: number;
  private _host: string;

  init(port: number, host: string) {
    let server = net.createServer((socket: net.Socket) => {
      // on socket connection:
      this._sessionMgr.createSession(socket);
    });

    this._server = server;
    this._port = port;
    this._host = host;    
    this._bindServerEvents(server);
  }

  private _bindServerEvents(server: net.Server) {
    server.on('error', (err: any) => {
      if (err.code == 'EADDRINUSE') {
        LOG.e(this.tag, 'Address in use, retrying...');
        this._retry();
      } else {
        LOG.e(this.tag, err.toString());
      }
    });

    server.listen(this._port, this._host, () => {
      LOG.i(this.tag, 'bind to', this._host, ':', this._port);
    });
  }

  private _retry() {
    if (this._server && this._port && this._host) {
      setTimeout(() => {
        let server = this._server;
        server.close();
        server.listen(this._port, this._host, () => {
          LOG.i(this.tag, 'bind to', this._host, ':', this._port);
        });
      }, 1000);
    }
  }
}