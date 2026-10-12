/*
 * Lightweight lightbox for detail page photos (.detail-photo links).
 * Progressively enhances <a href="full-size"> links; without JS they
 * simply open the image directly.
 */
(() => {
  const links = Array.from(document.querySelectorAll(".detail-photo"));
  if (!links.length) return;

  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";

  const img = document.createElement("img");
  img.alt = "";
  dialog.append(img);

  const makeButton = (className, label, glyph) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.setAttribute("aria-label", label);
    button.textContent = glyph;
    return button;
  };

  const close = makeButton("lightbox-close", "Close", "×");
  dialog.append(close);
  close.addEventListener("click", () => dialog.close());

  let current = 0;

  const show = (index) => {
    current = (index + links.length) % links.length;
    const link = links[current];
    img.src = link.href;
    img.alt = link.querySelector("img")?.alt || "";
  };

  links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      show(index);
      dialog.showModal();
    });
  });

  // Click on the backdrop (outside the image/buttons) closes the viewer.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  if (links.length > 1) {
    const prev = makeButton("lightbox-prev", "Previous photo", "‹");
    const next = makeButton("lightbox-next", "Next photo", "›");
    prev.addEventListener("click", () => show(current - 1));
    next.addEventListener("click", () => show(current + 1));
    dialog.append(prev, next);

    dialog.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") show(current - 1);
      if (event.key === "ArrowRight") show(current + 1);
    });
  }

  document.body.append(dialog);
})();
