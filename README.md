# @teamreflex/cosmo-ts

[![npm version](https://badgen.net/npm/v/@teamreflex/cosmo-ts)](https://npm.im/@teamreflex/cosmo-ts) [![npm downloads](https://badgen.net/npm/dm/@teamreflex/cosmo-ts)](https://npm.im/@teamreflex/cosmo-ts)

Unofficial TypeScript package for interfacing with [MODHAUS](https://www.mod-haus.com/)' **[Cosmo: the Gate](https://play.google.com/store/apps/details?id=com.modhaus.cosmo)** mobile application API.

## Install

```bash
npm install @teamreflex/cosmo-ts
pnpm install  @teamreflex/cosmo-ts
bun install @teamreflex/cosmo-ts
```

## Usage

```ts
import { createClient } from "@teamreflex/cosmo-ts";

const client = createClient({
  accessToken: "your-access-token",
});

const artist = await client.artists.get("ARTMS");
console.log(artist.members.length); // 5
```

## Note

Many endpoints are not implemented yet and many endpoints require authentication. Tokens can be obtained by intercepting app traffic or by accessing Ramper endpoints.

## License

MIT &copy; [Reflex](https://github.com/teamreflex)
