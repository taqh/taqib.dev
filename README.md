# Website

My portfolio website built with Astro, TailwindCSS and MDX

## 🚀 Project Structure

Inside the project, you'll see the following folders and files:

```text
/
├── public/
│   ├─── fonts/
│   │    └── geist/
│   │    └── montserrat/
│   └── favicon.svg
│   └── all-opengraph-images.png
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── icons/
│   │   │   └── all-icons.astro
│   │   └── all-other-components.astro
│   ├── content/
│   │    └── projects/
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   ├── pages/
│   │    ├── index.astro
│   │    ├── projects/
│   │    │   └── index.astro
│   │    │   └── [...slug].astro
│   │    └── 404.astro
│   ├── styles/
│   │    └── global.css
├── astro.config.mjs
├── package.json
├── README.md
├── tailwind.config.cjs
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

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

## How to Use

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

## Customization

The project uses TailwindCSS for styling Which strips default styles from prose content. You can customize the prose theme by editing the `tailwind.config.mjs` file.

```typescript
// ...

theme: {
  extend: {
    typography: ({ theme }) => ({
      taqib: {
        css: {
          '--tw-prose-body': 'hsl(var(--foreground))',
          '--tw-prose-headings': 'hsl(var(--foreground))',
          '--tw-prose-lead': 'hsl(var(--foreground))',
          '--tw-prose-links': 'hsl(var(--foreground))',
         // ...
        },
      },
    }),
  }
}
// ...
```

Replace the variables with your prefered colors. The CSS variables are defined in the `src/styles/global.css` file.
<!-- https://github.com/tailwindlabs/tailwindcss-typography?tab=readme-ov-file#adding-custom-color-themes -->

## Content Collections

### Projects

You can add projects to the `src/content/projects/` directory. Each project is a markdown file with the following frontmatter:

```yaml
---
title: "Project Title"
status: "live"
description: "Project description"
slug: "project-slug"
draft: false 
image: "your-opengraph-image.png"
technologies: ["Tech1", "Tech2", "Tech3"]
links:
  repo: ""
  live: ""
preview:
  src: "../../assets/quillstash.png"
  alt: "A preview of the quillstash homepage"
---

You can then add your project content here using markdown syntax.
```

The frontmatter can be customized to fit your needs. However you will need to update the schema in the  `/content/config.ts` file to match your frontmatter.

```typescript
import { defineCollection } from 'astro:collections';

// this is my project collection schema update it to match your frontmatter
const projectsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    status: z.enum(["live", "dev"]),
    description: z.string(),
    image: z.string(),
    preview: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
    links: z.object({
      repo: z.string().url().optional(),
      live: z.string().url().optional(),
    }),
    technologies: z.array(z.string()),
  }),
});

```

To get content from the project collection, use astro's getCollection function.

```typescript
   import { getCollection } from 'astro:collections';

   // this will return an array of all projects in the collection
   const projects = await getCollection('projects');

   // get collection also takes an optional filter function
   const projects = await getCollection('projects', ({ data }) => {
      return data.draft !== true;
   });
```

## References

- [Astro Documentation](https://docs.astro.build/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [TailwindCSS Typography](https://github.com/tailwindlabs/tailwindcss-typography)
- [Learn Markdown](https://www.markdownguide.org/)

## License

See the [License](LICENSE) file.
