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

This project was created using `bun init` in bun v1.3.6. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
