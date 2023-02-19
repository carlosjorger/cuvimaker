# CUVIMAKER - CV Maker

An online cv maker made in astro with vuejs components using typescript and tailwind. With the Astro's island arquitecture we are able to combine SPA and SSG approaches.

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   ├─── assets/
│   |   └── ...
│   ├─── fonts/
│   |   └── ...
├── src/
│   ├─── components/
|   |   ├─── app/
|   |   |   └── ...
|   |   ├─── shared/
|   |   |   └── ...
|   ├─── layouts/
|   |   └── ...
|   ├─── models/
|   |   └── ...
|   ├─── pages/
|   |   └── ...
|   ├─── styles/
|   |   └── ...
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/Vue components.
Inside `src/components/` there are two folders: `src/components/app` and `src/components/shared`.

Inside app are the business component. Inside shared are the component that can be used by any components and doesnt depend on the business data or doesnt need to be descended from any particular components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:3000`      |
| `npm run build`        | Build your production site to `./dist/`          |
| `npm run preview`      | Preview your build locally, before deploying     |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |
| `npm run astro --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
