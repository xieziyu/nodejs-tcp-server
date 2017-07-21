import { LOG, LOG_LEVEL } from "./utils/log";
import { TcpClient } from "./socket/client";

LOG.level = LOG_LEVEL.ALL;

async function delay(n) {
  return new Promise((resolve) => setTimeout(resolve, n));
}

const MAX_CLIENTS = 1;
const PACKET_PERIOD = 10000;

// multiple connection test
async function main() {
  let clients: TcpClient[] = [];
  for (let i=0; i < MAX_CLIENTS; i++) {
    let client:any = new TcpClient();
    client.init(8888, '127.0.0.1', i+1);
    clients.push(client);
    LOG.i('main', 'client', i+1, 'connected');
    await delay(1);
  }

  for (let client of clients) {
    client.periodSendingTest(PACKET_PERIOD);
  }
}

main();