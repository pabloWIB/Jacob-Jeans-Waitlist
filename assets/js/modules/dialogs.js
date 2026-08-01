/**
 * Thin wrapper over the native <dialog> element.
 *
 * showModal() already provides the focus trap, focus restoration and Escape
 * handling, so the only things left to add are a background scroll lock and
 * closing on a backdrop click.
 */

const openDialogs = new Set();

function syncScrollLock() {
  document.body.classList.toggle("is-scroll-locked", openDialogs.size > 0);
}

/** Closes on a click landing outside the dialog box, i.e. on the backdrop. */
function handleBackdropClick(event) {
  const dialog = event.currentTarget;

  // Keyboard activation of an inner button reports a click at (0, 0).
  if (event.clientX === 0 && event.clientY === 0) return;

  const box = dialog.getBoundingClientRect();
  const isInside =
    event.clientX >= box.left &&
    event.clientX <= box.right &&
    event.clientY >= box.top &&
    event.clientY <= box.bottom;

  if (!isInside) dialog.close();
}

export function registerDialog(dialog) {
  if (!dialog) return;

  dialog.addEventListener("close", () => {
    openDialogs.delete(dialog);
    syncScrollLock();
  });

  dialog.addEventListener("click", handleBackdropClick);
}

export function openDialog(dialog) {
  if (!dialog || dialog.open) return;

  dialog.showModal();
  openDialogs.add(dialog);
  syncScrollLock();
}

export function closeDialog(dialog) {
  if (!dialog || !dialog.open) return;
  dialog.close();
}

export function hasOpenDialog() {
  return openDialogs.size > 0;
}
