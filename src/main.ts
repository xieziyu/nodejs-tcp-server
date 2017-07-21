import { LOG } from "./utils/log";
import { TcpServer } from "./socket/server";

export function main() {
  let version = '0.0.1';

  let tcpServer = TcpServer.getInstance();
  tcpServer.init(8888, '0.0.0.0');
  LOG.i('Main', `TCP server v${version} started`);
}