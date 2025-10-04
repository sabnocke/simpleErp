# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Developing

Once you've created a project and installed dependencies with `bun install`, start a development server:

```bash
bun run dev

# or start the server and open the app in a new browser tab
bun run dev -- --open
```

## Building

To create a production version of your app:

```bash
bun run build
```

You can preview the production build with `bun run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.


## Docker

To run the project with docker, tagged version of frontend must exist

```bash
docker tag frontend:latest frontend:latest
```

(I have no clue if that is correct, should test that)

This should be done only if `Dockerfile.dev` is updated

Then

```bash
docker compose up -d
```

> if the compose file had different name it would need to be specified with a -f/--file flag

# To Do
- [ ] Rename `RadioButton` component to `Worker` or something similar
- [ ] Use relative units where possible (rem, em, ...)
- [ ] Convert `OrderDisplay` to use flex of flex (for matrix)
  - [ ] Store data in singleton matrix where each row is one order