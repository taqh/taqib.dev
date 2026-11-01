export const SITE = {
  DESCRIPTION: "Software Engineer",
  TITLE: "Taqib Ibrahim",
};

export const PROJECTS = [
  {
    active: true,
    description: "Salah reminders right in your Mac's notch",
    links: {
      live: "https://hamza.taqib.dev",
    },
    title: "Hamza",
  },
  {
    active: true,
    description: "Super simple headless CMS for managing blogs",
    links: {
      live: "https://marblecms.com?ref=taqib.dev",
      repo: "https://github.com/usemarble?ref=taqib.dev",
    },
    title: "Marble",
  },
  {
    active: true,
    description: "Transform documents to audio podcasts",
    links: {
      live: "https://fablepod.com?ref=taqib.dev",
      repo: "https://helloworld.ng/fable",
    },
    title: "Fable",
  },
  {
    active: true,
    description: "Control suite for running a single-station radio broadcast",
    links: {
      live: "https://rdio-docs.vercel.app",
      repo: "https://github.com/helloworld-ng/rdio",
    },
    title: "Rdio",
  },
  {
    active: false,
    description: "A shared planner for organizing group trips",
    links: {
      live: "https://grvl.ai",
      repo: "https://app.grvl.ai",
    },
    title: "GRVL",
  },
];

export const ACTIVE_PROJECTS = PROJECTS.filter((project) => project.active);
