/**
 * Non-modal disclosure panel driven by a button with aria-expanded.
 * Closes on outside click and on Escape, returning focus to its trigger.
 */

export function initPanel(toggle, panel) {
  if (!toggle || !panel) return;

  const isOpen = () => panel.classList.contains("is-open");

  const setOpen = (open) => {
    panel.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
  };

  toggle.addEventListener("click", (event) => {
    event.stopPropagation();
    setOpen(!isOpen());
  });

  document.addEventListener("click", (event) => {
    if (!isOpen()) return;
    if (panel.contains(event.target)) return;
    setOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !isOpen()) return;
    setOpen(false);
    toggle.focus();
  });
}
