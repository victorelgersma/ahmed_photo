// modal.js — shared gallery modal for all pages

(function () {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modalImg");
  const closeBtn = document.getElementById("closeModal");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!modal || !modalImg) return; // modal not present → nothing to do

  // Collect all possible gallery selectors generically
  const selectors = [
    ".gallery-img",        // used on portraits.html / events.html
    ".thumb-portraits",    // homepage portraits
    ".thumb-events"        // homepage events
  ];

  const imgs = selectors.flatMap(sel =>
    Array.from(document.querySelectorAll(sel))
  );

  if (!imgs.length) return; // no images → nothing to bind

  let index = 0;

  function openModal(i) {
    index = i;
    modalImg.src = imgs[index].src;
    modal.classList.add("open");
    document.body.classList.add("noscroll"); // lock scroll
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.classList.remove("noscroll"); // unlock scroll
  }

  function show(delta) {
    index = (index + delta + imgs.length) % imgs.length;
    modalImg.src = imgs[index].src;
  }

  // Bind click handlers
  imgs.forEach((img, i) => {
    img.addEventListener("click", () => openModal(i));
  });

  // Buttons
  if (prevBtn) prevBtn.addEventListener("click", () => show(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => show(1));
  if (closeBtn) closeBtn.addEventListener("click", closeModal);

  // Backdrop click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Keyboard controls
  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;

    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") show(1);
    if (e.key === "ArrowLeft") show(-1);
  });

})();
