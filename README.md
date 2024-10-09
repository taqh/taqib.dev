# Website

My portfolio website built with Astro, TailwindCSS and MDX

## 🚀 Project Structure

Inside the project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── icons/
│   │   │   └── some-icon.svg
│   │   └── all-other-components.astro
│   ├── scripts/ 
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
│       └── projects/
│           └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

## Content

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## Usage

First, clone the repository:

```bash
git clone https://github.com/taqh/website.git
```

Then, navigate to the project directory:

```bash
cd website
```

Install the dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm dev
```

Open [http://localhost:4321](http://localhost:4321) with your browser to see the result.
