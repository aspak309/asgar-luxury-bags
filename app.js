const WHATSAPP_NUMBER = "919653181917";

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const quoteModal = document.getElementById("quoteModal");
const closeModal = document.getElementById("closeModal");
const modalProduct = document.getElementById("modalProduct");
const modalForm = document.getElementById("modalForm");
const quoteForm = document.getElementById("quoteForm");
const toast = document.getElementById("toast");

document.getElementById("year").textContent = new Date().getFullYear();

menuBtn?.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

document.querySelectorAll("#mobileMenu a").forEach(link => {
  link.addEventListener("click", () => mobileMenu.classList.remove("open"));
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function openQuote(product) {
  modalProduct.value = product || "General Trolley Bag Inquiry";
  quoteModal.classList.add("open");
  document.body.style.overflow = "hidden";
  setTimeout(() => document.getElementById("modalQuantity")?.focus(), 100);
}

function closeQuote() {
  quoteModal.classList.remove("open");
  document.body.style.overflow = "";
}

document.querySelectorAll(".quote-btn").forEach(button => {
  button.addEventListener("click", () => openQuote(button.dataset.product));
});

closeModal?.addEventListener("click", closeQuote);

quoteModal?.addEventListener("click", event => {
  if (event.target === quoteModal) closeQuote();
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && quoteModal.classList.contains("open")) {
    closeQuote();
  }
});

function openWhatsApp(message) {
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  showToast("Opening WhatsApp...");
  setTimeout(() => window.open(url, "_blank", "noopener"), 150);
}

modalForm?.addEventListener("submit", event => {
  event.preventDefault();

  const product = modalProduct.value.trim();
  const quantity = document.getElementById("modalQuantity").value.trim();
  const name = document.getElementById("modalName").value.trim();

  if (!product || !quantity || !name) {
    alert("Please fill product, quantity and name.");
    return;
  }

  const message =
`Hello Asgar Luxury Bags,

I want a bulk quotation.

Product: ${product}
Required Quantity: ${quantity} pieces
Name / Business: ${name}

Please share wholesale price and available details.`;

  closeQuote();
  openWhatsApp(message);
});

quoteForm?.addEventListener("submit", event => {
  event.preventDefault();

  const product = document.getElementById("formProduct").value.trim();
  const quantity = document.getElementById("formQuantity").value.trim();
  const name = document.getElementById("formName").value.trim();
  const extra = document.getElementById("formMessage").value.trim();

  if (!quantity || Number(quantity) < 1 || !name) {
    alert("Please enter your name and required quantity.");
    return;
  }

  const message =
`Hello Asgar Luxury Bags,

I want a bulk quotation.

Product: ${product}
Required Quantity: ${quantity} pieces
Name / Business: ${name}
${extra ? `Additional Requirement: ${extra}` : ""}

Please share wholesale price and available details.`;

  openWhatsApp(message);
});
