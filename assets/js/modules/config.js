/**
 * EmailJS identifiers.
 *
 * These four values are publishable identifiers, not secrets. The EmailJS
 * browser SDK requires them in client-side code, and access is restricted by
 * allowed origin in the EmailJS dashboard rather than by hiding the key.
 * Rotate them there. No private key or server token belongs in this file.
 *
 * Replacing the values here is all that is needed to point the two forms at a
 * different EmailJS account.
 */
export const EMAILJS = {
  publicKey: "Amo5GBjS_00-An44w",
  serviceId: "service_bjy0bsa",
  exitTemplateId: "template_inofmni",
  footerTemplateId: "template_1n53v5q",
};
