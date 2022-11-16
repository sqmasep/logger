# Description

Sq's logger is a way of logging messages with consistency and styles, so you don't have to write everything by hand (the painful way of coloring everything by hand every single time). Written in typescript, that logger provides a highly typed class to have the best autocomplete experience and suggestions

# Installation

```bash
npm i @sqmasep/logger
yarn add @sqmasep/logger
pnpm add @sqmasep/logger
bun add @sqmasep/logger
```

# Initialization

```ts
import Logger from "@sqmasep/logger";

export const log = new Logger({});
```

# Features

## Formats

### `log.raw(...msg: any[])`

`console.log` the arguments. It's just an alias

### `log.init(...msg: any[])`

`console.log` the arguments when you init a service. For example, it fits perfectly when you init a database or a server (it's perceptible from the other log messages).

### `log.success(...msg: any[])`

`console.log` the arguments when your code succeed.

### `log.error(...msg: any[])`

`console.error` the arguments when your code fails. Does **NOT** throw an error

### `log.info(...msg: any[])`

`console.info` the arguments when you just want to provide some informations

### `log.time<T>(cb: () => T): Promise<T>`

Takes a callback function as an argument. It will return the result of the callback, while logging out the time elapsed during the execution of the callback

## `route(path: string)`

Returns `this`.
Helps to identify the path of the function. For instance with tRPC, you could use it as: `log.route("trpc.user.login").success("User logged in!")`.
It will display by default in the console: `[✓] <trpc.user.login> User logged in!`

## `from(provider: string)`

Returns `this`.
Helps to identify the provider of the function. It would more likely to be used for technologies, such as: `log.from('Prisma').info('User was found')`.
It will display by default in the console: `[i] Prisma: User was found`

# Customization

## Colors

You can define your own colors if you want. Just provide it in the constructor of the class:

```ts
export const log = new Logger({
  textColors: {
    success: "green", // default is greenBright from `chalk`, but now it is green
  },
});
```

## Badges

Badges (with the background color) are also customizable. Same process:

```ts
export const log = new Logger({
  badge: {
    error: "X", // default is "‼", but is now "X"
  },
});
```

## Wrappers

Wrappers (around the badge and the route) can be customized as well. It's an array of two strings (a tuple)

```ts
export const log = new Logger({
  badgeWrapper: ["{", "}"], // default is ["[", "]"], but is now ["{", "}"]
  routeWrapper: ["*", "*"], // default is ["<", ">"], but is now ["*", "*"]
});
```

# TODO / IDEAS

- [x] - Add path to see clearly where the message comes from (in <>)
- [ ] - Add winston as a deps to keep some logs in a file
