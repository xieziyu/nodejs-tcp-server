export const LOG_LEVEL = {
  ERROR: 0x01,   // 0001
  WARN: 0x02,    // 0010
  INFO: 0x04,    // 0100
  DEBUG: 0x08,   // 1000
  ALL: 0xff,     // 1111
};

export class LOG {
  public static level: number = 0;

  public static d(tag: string, ...args: any[]) {
    LOG.log(LOG_LEVEL.DEBUG, 'DEBUG', tag, ...args);
  }

  public static i(tag: string, ...args: any[]) {
    LOG.log(LOG_LEVEL.INFO, 'INFO', tag, ...args);
  }

  public static w(tag: string, ...args: any[]) {
    LOG.log(LOG_LEVEL.WARN, 'WARN', tag, ...args);
  }

  public static e(tag: string, ...args: any[]) {
    LOG.log(LOG_LEVEL.ERROR, 'ERROR', tag, ...args);
  }

  private static log(level: number, type: string, tag: string, ...args: any[]) {
    if (LOG.level & level) {
      let time = new Date();
      console.log(`${time.toISOString()} [${type}] ${tag}:`, ...args);
    }
  }
}