import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerEl = document.querySelector(".footer");

  const descendants = footerEl.querySelectorAll("*");

  // Loop through the descendants to find .default-content-wrapper
  var contentWrapper = null;
  descendants.forEach(function (element) {
    if (element.classList.contains("default-content-wrapper")) {
      contentWrapper = element;
      return; // Exit the loop once found
    }
  });

  // load footer as fragment
  const footerMeta = getMetadata("footer");
  const footerPath = footerMeta
    ? new URL(footerMeta, window.location).pathname
    : "/footer";
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = "";
  const footer = document.createElement("div");
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
