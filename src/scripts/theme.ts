document.addEventListener("astro:page-load", () => {
  const theme = (() => {
    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
    return "light";
  })();

  if (theme === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
  }

  window.localStorage.setItem("theme", theme!);

  const handleToggleClick = () => {
    const html = document.documentElement;
    html.classList.toggle("dark");

    const isDark = html.classList.contains("dark");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  document.getElementById("themeToggle")!.onclick = handleToggleClick;
});

function applyTheme() {
  localStorage.theme === "dark"
    ? document.documentElement.classList.add("dark")
    : document.documentElement.classList.remove("dark");
}

document.addEventListener("astro:after-swap", applyTheme);
applyTheme();
