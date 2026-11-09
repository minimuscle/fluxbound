# server

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

Copy `.env.example` to `.env` and configure the environment variables before starting the server. `FRONTEND_URL` controls the single origin allowed to make cross-origin API requests.

Server modules can send typed WebSocket messages without importing the entrypoint
or passing the Bun server through each function:

```ts
import { sendToRoom, sendToPlayer } from "utils/messaging";

sendToRoom(roomId, { type: "lobby/error", error: "Room is closing" });
sendToPlayer(playerId, { type: "lobby/error", error: "Please rejoin" });
```

The entrypoint calls `initializeMessaging(server)` once after creating the server.
Calls before initialization throw an error. The helpers publish to the existing
room and player subscriptions, including the player who triggered the action.
Pass the intended room or player ID explicitly so concurrent games stay isolated.
Use `sendToPlayer` for private data such as a player's game state view.
Messaging is shared within one server process; separate processes need a shared
message broker to communicate.

This project was created using `bun init` in bun v1.3.6. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
