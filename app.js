// ============================================================
// ASGAR LUXURY BAGS
// Main JavaScript
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ============================================================
  // SETTINGS
  // ============================================================

  const WHATSAPP_NUMBER = "919653181917";

  // ============================================================
  // HELPER FUNCTIONS
  // ============================================================

  function getElement(id) {
    return document.getElementById(id);
  }

  function getValue(id) {
    const element = getElement(id);

    if (!element) {
      return "";
    }

    return element.value.trim();
  }

  // ============================================================
  // TOAST NOTIFICATION
  // ============================================================

  const toast = getElement("toast");

  let toastTimer = null;

  function showToast(message) {
    if (!toast) {
      return;
    }

    toast.textContent = message;
    toast.classList.add("show");

    if (toastTimer) {
      clearTimeout(toastTimer);
    }

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }

  // ============================================================
  // WHATSAPP
  // ============================================================

  function openWhatsApp(message) {
    const url =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(message);

    window.open(url, "_blank", "noopener,noreferrer");
  }

  // ============================================================
  // CURRENT YEAR
  // ============================================================

  const yearElement = getElement("year");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ============================================================
  // MOBILE MENU
  // ============================================================

  const menuBtn = getElement("menuBtn");
  const mobileMenu = getElement("mobileMenu");

  function closeMobileMenu() {
    if (!mobileMenu) {
      return;
    }

    mobileMenu.classList.remove("open");

    if (menuBtn) {
      menuBtn.setAttribute("aria-label", "Open menu");
    }
  }

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.classList.toggle("open");

      menuBtn.setAttribute(
        "aria-label",
        isOpen ? "Close menu" : "Open menu"
      );
    });

    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });
  }

  // ============================================================
  // QUOTE MODAL
  // ============================================================

  const quoteModal = getElement("quoteModal");
  const closeModal = getElement("closeModal");

  const modalProduct = getElement("modalProduct");
  const modalQuantity = getElement("modalQuantity");
  const modalName = getElement("modalName");

  function openQuoteModal(productName) {
    if (!quoteModal) {
      return;
    }

    if (modalProduct) {
      modalProduct.value =
        productName || "General Trolley Bag Inquiry";
    }

    if (modalQuantity) {
      modalQuantity.value = "";
    }

    if (modalName) {
      modalName.value = "";
    }

    quoteModal.classList.add("open");
    quoteModal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    setTimeout(() => {
      if (modalQuantity) {
        modalQuantity.focus();
      }
    }, 120);
  }

  function closeQuoteModal() {
    if (!quoteModal) {
      return;
    }

    quoteModal.classList.remove("open");
    quoteModal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";
  }

  // ============================================================
  // ALL QUOTE BUTTONS
  // ============================================================

  const quoteButtons = document.querySelectorAll(".quote-btn");

  quoteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productName =
        button.getAttribute("data-product") ||
        "General Trolley Bag Inquiry";

      openQuoteModal(productName);
    });
  });

  // ============================================================
  // CLOSE MODAL BUTTON
  // ============================================================

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      closeQuoteModal();
    });
  }

  // ============================================================
  // CLOSE MODAL WHEN CLICKING OUTSIDE
  // ============================================================

  if (quoteModal) {
    quoteModal.addEventListener("click", (event) => {
      if (event.target === quoteModal) {
        closeQuoteModal();
      }
    });
  }

  // ============================================================
  // CLOSE MODAL WITH ESCAPE KEY
  // ============================================================

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (
        quoteModal &&
        quoteModal.classList.contains("open")
      ) {
        closeQuoteModal();
      }
    }
  });

  // ============================================================
  // MODAL QUOTE FORM
  // ============================================================

  const modalForm = getElement("modalForm");

  if (modalForm) {
    modalForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const product =
        getValue("modalProduct") ||
        "General Trolley Bag Inquiry";

      const quantity = getValue("modalQuantity");
      const name = getValue("modalName");

      // ------------------------------------------
      // VALIDATE QUANTITY
      // ------------------------------------------

      if (!quantity) {
        showToast("Please enter the required quantity.");

        if (modalQuantity) {
          modalQuantity.focus();
        }

        return;
      }

      const quantityNumber = Number(quantity);

      if (
        !Number.isFinite(quantityNumber) ||
        quantityNumber < 1
      ) {
        showToast("Please enter a valid quantity.");

        if (modalQuantity) {
          modalQuantity.focus();
        }

        return;
      }

      // ------------------------------------------
      // VALIDATE NAME
      // ------------------------------------------

      if (!name) {
        showToast("Please enter your name / business name.");

        if (modalName) {
          modalName.focus();
        }

        return;
      }

      // ------------------------------------------
      // CREATE WHATSAPP MESSAGE
      // ------------------------------------------

      const message =
`Hello Asgar Luxury Bags,

I want a bulk quotation.

Product: ${product}
Required Quantity: ${quantityNumber} pieces
Name / Business: ${name}

Please share price, available colours, minimum order quantity and delivery details.`;

      // ------------------------------------------
      // OPEN WHATSAPP
      // ------------------------------------------

      showToast("Opening WhatsApp...");

      closeQuoteModal();

      setTimeout(() => {
        openWhatsApp(message);
      }, 300);
    });
  }

  // ============================================================
  // MAIN BULK ORDER FORM
  // ============================================================

  const quoteForm = getElement("quoteForm");

  if (quoteForm) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const product =
        getValue("formProduct") ||
        "General Trolley Bag Inquiry";

      const quantity = getValue("formQuantity");
      const name = getValue("formName");
      const extraRequirement = getValue("formMessage");

      // ------------------------------------------
      // VALIDATE QUANTITY
      // ------------------------------------------

      if (!quantity) {
        showToast("Please enter the required quantity.");

        const quantityInput = getElement("formQuantity");

        if (quantityInput) {
          quantityInput.focus();
        }

        return;
      }

      const quantityNumber = Number(quantity);

      if (
        !Number.isFinite(quantityNumber) ||
        quantityNumber < 1
      ) {
        showToast("Please enter a valid quantity.");

        const quantityInput = getElement("formQuantity");

        if (quantityInput) {
          quantityInput.focus();
        }

        return;
      }

      // ------------------------------------------
      // VALIDATE NAME
      // ------------------------------------------

      if (!name) {
        showToast("Please enter your name / business name.");

        const nameInput = getElement("formName");

        if (nameInput) {
          nameInput.focus();
        }

        return;
      }

      // ------------------------------------------
      // OPTIONAL MESSAGE
      // ------------------------------------------

      let additionalRequirement = "";

      if (extraRequirement) {
        additionalRequirement =
          `

Additional Requirement: ${extraRequirement}`;
      }

      // ------------------------------------------
      // CREATE WHATSAPP MESSAGE
      // ------------------------------------------

      const message =
`Hello Asgar Luxury Bags,

I want a bulk quotation.

Product: ${product}
Required Quantity: ${quantityNumber} pieces
Name / Business: ${name}${additionalRequirement}

Please share price, available colours, minimum order quantity and delivery details.`;

      // ------------------------------------------
      // SEND TO WHATSAPP
      // ------------------------------------------

      showToast("Opening WhatsApp...");

      setTimeout(() => {
        openWhatsApp(message);
      }, 300);
    });
  }

  // ============================================================
  // SMOOTH NAVIGATION
  // ============================================================

  const navigationLinks = document.querySelectorAll(
    'a[href^="#"]'
  );

  navigationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const header =
        document.querySelector(".main-header") ||
        document.querySelector("header");

      const headerHeight = header
        ? header.offsetHeight
        : 0;

      const targetTop =
        target.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        12;

      window.scrollTo({
        top: Math.max(0, targetTop),
        behavior: "smooth"
      });

      closeMobileMenu();
    });
  });

  // ============================================================
  // PREVENT BODY SCROLL WHEN MODAL IS OPEN
  // ============================================================

  function updateBodyScroll() {
    if (
      quoteModal &&
      quoteModal.classList.contains("open")
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  // Observe modal class changes
  if (quoteModal) {
    const observer = new MutationObserver(() => {
      updateBodyScroll();
    });

    observer.observe(quoteModal, {
      attributes: true,
      attributeFilter: ["class"]
    });
  }

  // ============================================================
  // CLOSE MOBILE MENU WHEN SCREEN BECOMES LARGE
  // ============================================================

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 1024) {
      closeMobileMenu();
    }
  });

  // ============================================================
  // INITIAL SETUP COMPLETE
  // ============================================================

  console.log("Asgar Luxury Bags website loaded successfully.");
});
