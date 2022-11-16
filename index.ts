import chalk, { Color, ForegroundColor } from "chalk";

namespace Log {
  export type Message = any[];
  export type Types = "info" | "success" | "error" | "time" | "init";
  export interface Config {
    routeWrapper: [string, string];
    badgeWrapper: [string, string];
    badge: Partial<Record<Types, string>>;
    textColors: Partial<Record<Types, typeof ForegroundColor>>;
  }
}

export default class Log {
  private path: string = "";
  private provider: string = "";
  private routeWrapper: [string, string];
  private badgeWrapper: [string, string];
  private BADGE_SYMBOL: Record<Log.Types, string> = {
    info: "i",
    success: "✓",
    error: "‼",
    time: "T",
    init: "*",
  };
  private COLORS: Record<Log.Types, typeof ForegroundColor> = {
    info: "blueBright",
    success: "greenBright",
    time: "yellowBright",
    error: "redBright",
    init: "cyanBright",
  };

  private capitalize(s: typeof Color) {
    return `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
  }

  private builder(type: Log.Types) {
    const bgColor = `bg${this.capitalize(
      this.COLORS[type]
    )}` as typeof ForegroundColor;

    const wrappedBadge = `${this.badgeWrapper[0]}${this.BADGE_SYMBOL[type]}${this.badgeWrapper[1]}`;

    return chalk[this.COLORS[type]](
      `${chalk.bold[bgColor](wrappedBadge)}${
        (this.provider || this.path) && " "
      }${this.provider}${this.path}`
    );
  }
  private reset() {
    (this.path = ""), (this.provider = "");
    return this;
  }

  constructor({
    routeWrapper = ["<", ">"],
    badgeWrapper = ["[", "]"],
    badge,
    textColors,
  }: Partial<Log.Config>) {
    this.routeWrapper = routeWrapper;
    this.badgeWrapper = badgeWrapper;
    this.BADGE_SYMBOL = { ...this.BADGE_SYMBOL, ...badge };
    this.COLORS = { ...this.COLORS, ...textColors };
  }

  /**
   *
   * @param msg Messages to log.
   * Also resets the `from()` variable and the `route()` variable
   */
  raw(...msg: Log.Message) {
    console.log(this.path, ...msg);
    this.reset();
  }

  /**
   *
   * @param r Add a path -> where the call is from
   * @returns
   */
  route(r: string) {
    this.path = `${this.provider && " "}${this.routeWrapper[0]}${r}${
      this.routeWrapper[1]
    }`;
    return this;
  }

  /**
   *
   * @param t Name of the technology causing the log
   * @returns the instance
   */
  from(t: string) {
    this.provider = `${t}:`;
    return this;
  }

  /**
   *
   * @param msg Messages to log.
   * Also resets the `from()` variable and the `route()` variable
   */
  init(...msg: Log.Message) {
    console.log(
      chalk.bold[this.COLORS["init"]](
        this.builder("init"),
        chalk.italic(...msg)
      )
    );
    this.reset();
  }

  /**
   *
   * @param msg Messages to log.
   * Also resets the `from()` variable and the `route()` variable
   */
  info(...msg: Log.Message) {
    console.info(chalk[this.COLORS["info"]](this.builder("info"), ...msg));
    this.reset();
  }

  /**
   *
   * @param msg Messages to log.
   * Also resets the `from()` variable and the `route()` variable
   */
  success(...msg: Log.Message) {
    console.log(chalk[this.COLORS["success"]](this.builder("success"), ...msg));
    this.reset();
  }

  /**
   *
   * @param msg Messages to log.
   * Also resets the `from()` variable and the `route()` variable
   */
  error(...msg: Log.Message) {
    console.error(chalk[this.COLORS["error"]](this.builder("error"), ...msg));
    this.reset();
  }

  /**
   * @param cb Callback function that will be executed and returned. Logs the time difference before and after executing the callback
   * @returns Callback's return
   */
  async time<T>(cb: (...args: any[]) => T): Promise<T> {
    this.reset();
    const dateStart = Date.now();
    const data = await cb();
    const dateEnd = Date.now();
    const diff = dateEnd - dateStart;

    console.log(
      chalk.bold[this.COLORS["time"]](`${this.builder("time")} ${diff}ms`)
    );

    return data;
  }
}
