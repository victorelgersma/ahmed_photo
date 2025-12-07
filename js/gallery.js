const imgs = Array.from(document.querySelectorAll(".gallery-img"));
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.getElementById("closeModal");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let current = 0;

function openModal(index) {
  current = index;
  modalImg.src = imgs[current].src;
  modal.classList.add("open");
  document.body.classList.add("noscroll");   // 🚫 disable scrolling
}

function closeModal() {
  modal.classList.remove("open");
  document.body.classList.remove("noscroll"); // ✅ re-enable scrolling
}

function show(delta) {
  current = (current + delta + imgs.length) % imgs.length;
  modalImg.src = imgs[current].src;
}

imgs.forEach((img, i) => {
  img.addEventListener("click", () => openModal(i));
});

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

prevBtn.addEventListener("click", () => show(-1));
nextBtn.addEventListener("click", () => show(1));

document.addEventListener("keydown", (e) => {
  if (!modal.classList.contains("open")) return;

  if (e.key === "Escape") closeModal();
  if (e.key === "ArrowRight") show(1);
  if (e.key === "ArrowLeft") show(-1);
});
