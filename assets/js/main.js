/**
 * Entry point. Wires the about panel, the three dialogs, the two waitlist
 * forms and the exit-intent prompt. Everything visual is handled in CSS.
 */

import { EMAILJS } from "./modules/config.js";
import { closeDialog, hasOpenDialog, openDialog, registerDialog } from "./modules/dialogs.js";
import { initPanel } from "./modules/panel.js";
import { initSubscribeForm } from "./modules/subscribe.js";

const EXIT_INTENT_DELAY = 3000;

const reviewsDialog = document.getElementById("reviews-dialog");
const exitDialog = document.getElementById("exit-dialog");
const thanksDialog = document.getElementById("thanks-dialog");

[reviewsDialog, exitDialog, thanksDialog].forEach(registerDialog);

/* -- About panel ----------------------------------------------------------- */

initPanel(document.getElementById("about-toggle"), document.getElementById("about-panel"));

/* -- Reviews --------------------------------------------------------------- */

const reviewsToggle = document.getElementById("reviews-toggle");

if (reviewsToggle) {
  reviewsToggle.addEventListener("click", () => openDialog(reviewsDialog));
}

/* -- Close buttons, delegated ---------------------------------------------- */

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;

  const trigger = event.target.closest("[data-close-dialog]");
  if (!trigger) return;

  closeDialog(trigger.closest("dialog"));
});

/* -- Waitlist forms -------------------------------------------------------- */

let hasSubscribed = false;

function handleSubscribed() {
  hasSubscribed = true;
  closeDialog(exitDialog);
  openDialog(thanksDialog);
}

initSubscribeForm(document.getElementById("exit-form"), EMAILJS.exitTemplateId, handleSubscribed);
initSubscribeForm(document.getElementById("footer-form"), EMAILJS.footerTemplateId, handleSubscribed);

/* -- Exit intent ----------------------------------------------------------- */

if (exitDialog) {
  let armed = false;

  window.setTimeout(() => {
    armed = true;
  }, EXIT_INTENT_DELAY);

  document.addEventListener("mouseleave", (event) => {
    if (!armed || hasSubscribed || hasOpenDialog()) return;
    if (event.clientY > 0) return;

    armed = false;
    openDialog(exitDialog);
  });
}
