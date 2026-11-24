const MAX_MARGIN = 32;
/** Scrolling further than this while zoomed closes the image. */
const SCROLL_TOLERANCE = 40;
const OPEN_MS = 320;
const CLOSE_MS = 240;
const EASING = "cubic-bezier(0.2, 0, 0, 1)";

interface Parts {
  backdrop: HTMLDivElement;
  dialog: HTMLDialogElement;
  full: HTMLImageElement;
}

let parts: Parts | undefined;
let zoom: (Parts & { openedAt: number; thumb: HTMLImageElement }) | undefined;
let closing = false;

const prefersReducedMotion = () =>
  matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Built on first use, and again after a page swap removes it. */
const getParts = (): Parts => {
  if (parts?.dialog.isConnected) {
    return parts;
  }
  const dialog = document.createElement("dialog");
  dialog.className =
    "m-0 h-dvh max-h-none w-screen max-w-none place-items-center overflow-hidden border-0 bg-transparent p-0 backdrop:bg-transparent open:grid";
  const backdrop = document.createElement("div");
  backdrop.className = "bg-background/95 absolute inset-0";
  const full = document.createElement("img");
  full.alt = "";
  full.className = "relative max-w-none origin-top-left rounded-lg border";
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "absolute inset-0 cursor-zoom-out";
  closeButton.dataset.zoomClose = "";
  const label = document.createElement("span");
  label.className = "sr-only";
  label.textContent = "Close full size image";
  closeButton.append(label);
  dialog.append(backdrop, full, closeButton);
  document.body.append(dialog);
  parts = { backdrop, dialog, full };
  return parts;
};

/** Moves and scales a box from `to` back onto `from`, for a FLIP animation. */
const flip = (from: DOMRect, to: DOMRect) =>
  `translate(${from.left - to.left}px, ${from.top - to.top}px) scale(${from.width / to.width})`;

const zoomIn = (trigger: HTMLElement) => {
  const thumb = [...trigger.querySelectorAll("img")].find(
    (img) => img.offsetParent !== null
  );
  if (!thumb || zoom) {
    return;
  }
  const { backdrop, dialog, full } = getParts();
  const from = thumb.getBoundingClientRect();
  const ratio = from.width / from.height;
  const margin = Math.min(MAX_MARGIN, innerWidth / 32);
  const width = Math.min(
    innerWidth - margin * 2,
    (innerHeight - margin * 2) * ratio
  );
  full.style.width = `${width}px`;
  full.style.height = `${width / ratio}px`;
  full.src = thumb.currentSrc || thumb.src;
  full.alt = thumb.alt;
  dialog.showModal();
  thumb.style.visibility = "hidden";
  zoom = { backdrop, dialog, full, openedAt: scrollY, thumb };

  if (!prefersReducedMotion()) {
    const to = full.getBoundingClientRect();
    const timing = { duration: OPEN_MS, easing: EASING };
    full.animate(
      [{ transform: flip(from, to) }, { transform: "none" }],
      timing
    );
    backdrop.animate([{ opacity: 0 }, { opacity: 1 }], timing);
  }

  const { zoomSrc } = thumb.dataset;
  if (zoomSrc) {
    const fullSize = new Image();
    fullSize.src = zoomSrc;
    fullSize.decode().then(
      () => {
        if (zoom?.thumb === thumb) {
          full.src = zoomSrc;
        }
      },
      () => undefined
    );
  }
};

const zoomOut = () => {
  if (!zoom || closing) {
    return;
  }
  const { backdrop, dialog, full, thumb } = zoom;
  const finish = () => {
    for (const animation of [
      ...full.getAnimations(),
      ...backdrop.getAnimations(),
    ]) {
      animation.cancel();
    }
    dialog.close();
    full.removeAttribute("src");
    thumb.style.visibility = "";
    zoom = undefined;
    closing = false;
  };

  if (prefersReducedMotion()) {
    finish();
    return;
  }
  closing = true;
  const timing = {
    duration: CLOSE_MS,
    easing: EASING,
    fill: "forwards",
  } as const;
  backdrop.animate([{ opacity: 1 }, { opacity: 0 }], timing);
  full
    .animate(
      [
        { transform: "none" },
        {
          transform: flip(
            thumb.getBoundingClientRect(),
            full.getBoundingClientRect()
          ),
        },
      ],
      timing
    )
    .finished.then(finish, finish);
};

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }
  if (event.target.closest("[data-zoom-close]")) {
    zoomOut();
    return;
  }
  const trigger = event.target.closest<HTMLElement>("[data-zoom]");
  if (trigger) {
    zoomIn(trigger);
  }
});

document.addEventListener(
  "cancel",
  (event) => {
    if (zoom?.dialog === event.target) {
      event.preventDefault();
      zoomOut();
    }
  },
  true
);

addEventListener(
  "scroll",
  () => {
    if (zoom && Math.abs(scrollY - zoom.openedAt) > SCROLL_TOLERANCE) {
      zoomOut();
    }
  },
  { passive: true }
);
addEventListener("resize", zoomOut);

/**
 * Blog posts come as Marble HTML or MDX, so their images are wrapped in a zoom
 * button here instead of at render time. Linked images keep their link.
 */
const makeZoomable = () => {
  for (const img of document.querySelectorAll<HTMLImageElement>(
    "[data-zoomable] img"
  )) {
    if (img.closest("a, button")) {
      continue;
    }
    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.ariaHasPopup = "dialog";
    trigger.className =
      "not-prose focus-visible:outline-accent block w-full cursor-zoom-in rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dashed";
    trigger.dataset.zoom = "";
    const label = document.createElement("span");
    label.className = "sr-only";
    label.textContent = "View full size:";
    img.replaceWith(trigger);
    trigger.append(label, img);
  }
};

makeZoomable();
document.addEventListener("astro:page-load", makeZoomable);

document.addEventListener("astro:before-swap", () => {
  zoom?.dialog.close();
  zoom = undefined;
  closing = false;
});
