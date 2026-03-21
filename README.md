# FluxBound

FluxBound is a turn-based elemental card game being built as a modern web project with a strong emphasis on deterministic rules, maintainable architecture, and long-term extensibility.

The project is inspired by classic elemental battlers and Trading Card Games and is structured to keep core game rules, effect resolution, and application layers clearly separated. The goal is to support a reliable gameplay foundation that can evolve into a polished browser-based card game.

## Current Status

FluxBound is in *active* **early development**. The repository contains the foundational workspace structure and project scaffolding, but the game is not yet in a playable state yet.

## Overview

FluxBound is designed around a few core principles:

- Deterministic, turn-based game logic
- Strongly typed rules and data structures with TypeScript
- Clear separation between domain logic and application code
- A workspace structure that supports growth across multiple apps and packages

## Workspace

This repository is organized as a monorepo and currently includes:

- `apps/web` for the frontend client
- `apps/server` for backend services
- `packages/schema` for shared types and schema-related code

The workspace is managed with Bun and Nx.

## Development

### Tech Stack


#### Global
- [TypeScript GO (v7)](https://www.typescriptlang.org/)
- [Bun](https://bun.sh/)
- [Nx](https://nx.dev/)
- [Oxc](https://oxc.dev/) (oxlint and oxfmt)

#### Frontend
- [React](https://reactjs.org/)
- [Tanstack Router](https://tanstack.com/router)
- [Tanstack Query](https://tanstack.com/query)
- [Tanstack Form](https://tanstack.com/form)
- [Mantine](https://mantine.dev/)
 

### Prerequisites

- Bun

### Install

```bash
bun install && cd apps/web && bun install && cd ../server && bun install
```

### Run the workspace

```bash
bun dev
```

### Build

```bash
bun build
```

### Lint

```bash
bun lint
```

## License

This project is not allowed to be copied or distributed without permission from the original author.
