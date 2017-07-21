import * as net from "net";
import * as shortid from "shortid";
import * as _ from "lodash";

import { LOG }      from "../utils/log";
import { Session }  from "./session";

export class SessionMgr {
  tag = 'SessionMgr';

  private _sessions: Session[] = [];

  createSession(socket: net.Socket) {
    let id = shortid.generate();
    let session = new Session(id, socket);
    this._sessions.push(session);
    LOG.i(this.tag, 'session created:', id, 'for:', session.ip);
  }

  getSession(id: string) {
    return _(this._sessions).find({id: id});
  }
}