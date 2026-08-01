/**
 * Waitlist form: visible validation, submit state and a concrete outcome
 * message. Delivery goes through the EmailJS browser SDK, which serialises the
 * form by input `name`, so those names must stay in sync with the EmailJS
 * templates (`email_id` and `email_id2`).
 */

import { EMAILJS } from "./config.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

let sdkInitialised = false;

/** Returns the EmailJS SDK, initialising it on first use, or null if absent. */
function getSdk() {
  const sdk = window.emailjs;
  if (!sdk) return null;

  if (!sdkInitialised) {
    sdk.init({ publicKey: EMAILJS.publicKey });
    sdkInitialised = true;
  }

  return sdk;
}

export function initSubscribeForm(form, templateId, onSuccess) {
  if (!form) return;

  const input = form.querySelector(".subscribe__input");
  const submit = form.querySelector(".subscribe__submit");
  const message = form.querySelector(".subscribe__message");

  if (!input || !submit || !message) return;

  const idleLabel = submit.textContent;

  const setMessage = (text, isError = false) => {
    message.textContent = text;
    message.classList.toggle("subscribe__message--error", isError);
  };

  const setBusy = (busy) => {
    submit.disabled = busy;
    submit.textContent = busy ? "Subscribing…" : idleLabel;
  };

  input.addEventListener("input", () => {
    if (input.getAttribute("aria-invalid") !== "true") return;
    input.removeAttribute("aria-invalid");
    setMessage("");
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (submit.disabled) return;

    if (!EMAIL_PATTERN.test(input.value.trim())) {
      input.setAttribute("aria-invalid", "true");
      setMessage("Enter a valid email address, for example name@example.com.", true);
      input.focus();
      return;
    }

    const sdk = getSdk();

    if (!sdk) {
      setMessage("The signup service could not be reached. Check your connection and try again.", true);
      return;
    }

    input.removeAttribute("aria-invalid");
    setBusy(true);
    setMessage("Sending your details…");

    try {
      await sdk.sendForm(EMAILJS.serviceId, templateId, form);
      form.reset();
      setBusy(false);
      setMessage("");
      if (typeof onSuccess === "function") onSuccess();
    } catch {
      setBusy(false);
      setMessage("We could not sign you up just now. Please try again in a moment.", true);
    }
  });
}
