/**
 * Log levels
 */
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  FATAL = 4,
  NONE = 5,
}

/**
 * Log entry interface
 */
export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  data?: unknown;
  error?: Error;
}

/**
 * Log printer interface
 */
export interface LogPrinter {
  print(entry: LogEntry): void;
}

/**
 * Log filter interface
 */
export interface LogFilter {
  shouldLog(entry: LogEntry): boolean;
}

/**
 * Default console log printer
 */
export class ConsoleLogPrinter implements LogPrinter {
  print(entry: LogEntry): void {
    const levelName = LogLevel[entry.level];
    const timestamp = entry.timestamp.toISOString();
    const message = `[${timestamp}] [${levelName}] ${entry.message}`;

    switch (entry.level) {
      case LogLevel.DEBUG:
        // eslint-disable-next-line no-console
        console.debug(message, entry.data);
        break;
      case LogLevel.INFO:
        // eslint-disable-next-line no-console
        console.info(message, entry.data);
        break;
      case LogLevel.WARN:
        // eslint-disable-next-line no-console
        console.warn(message, entry.data);
        break;
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        // eslint-disable-next-line no-console
        console.error(message, entry.error || entry.data);
        break;
    }
  }
}

/**
 * Production log filter
 * Filters out debug logs in production
 */
export class ProductionLogFilter implements LogFilter {
  constructor(private minLevel: LogLevel = LogLevel.INFO) {}

  shouldLog(entry: LogEntry): boolean {
    return entry.level >= this.minLevel;
  }
}

/**
 * Main logger class
 */
export class Logger {
  private static instance: Logger;
  private printer: LogPrinter;
  private filter: LogFilter;
  private enabled = true;

  private constructor(
    printer: LogPrinter = new ConsoleLogPrinter(),
    filter: LogFilter = new ProductionLogFilter()
  ) {
    this.printer = printer;
    this.filter = filter;
  }

  /**
   * Gets the singleton logger instance
   */
  static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Configures the logger
   */
  configure(options: { printer?: LogPrinter; filter?: LogFilter; enabled?: boolean }): void {
    if (options.printer) {
      this.printer = options.printer;
    }
    if (options.filter) {
      this.filter = options.filter;
    }
    if (options.enabled !== undefined) {
      this.enabled = options.enabled;
    }
  }

  /**
   * Logs a debug message
   */
  debug(message: string, data?: unknown): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  /**
   * Logs an info message
   */
  info(message: string, data?: unknown): void {
    this.log(LogLevel.INFO, message, data);
  }

  /**
   * Logs a warning message
   */
  warn(message: string, data?: unknown): void {
    this.log(LogLevel.WARN, message, data);
  }

  /**
   * Logs an error message
   */
  error(message: string, error?: unknown): void {
    const err = error instanceof Error ? error : undefined;
    const data = error instanceof Error ? undefined : error;
    this.log(LogLevel.ERROR, message, data, err);
  }

  /**
   * Logs a fatal error message
   */
  fatal(message: string, error?: unknown): void {
    const err = error instanceof Error ? error : undefined;
    const data = error instanceof Error ? undefined : error;
    this.log(LogLevel.FATAL, message, data, err);
  }

  /**
   * Internal log method
   */
  private log(level: LogLevel, message: string, data?: unknown, error?: Error): void {
    if (!this.enabled) {
      return;
    }

    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      data,
      error,
    };

    if (this.filter.shouldLog(entry)) {
      this.printer.print(entry);
    }
  }

  /**
   * Enables logging
   */
  enable(): void {
    this.enabled = true;
  }

  /**
   * Disables logging
   */
  disable(): void {
    this.enabled = false;
  }
}

/**
 * Helper function to get the logger instance
 */
export function getLogger(): Logger {
  return Logger.getInstance();
}
