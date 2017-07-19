import { LOG_LEVEL, LOG } from "./utils/log";
import { main } from "./main";

LOG.level = LOG_LEVEL.ERROR | LOG_LEVEL.WARN | LOG_LEVEL.INFO;

main();