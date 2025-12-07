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
      }

      function show(delta) {
        current = (current + delta + imgs.length) % imgs.length;
        modalImg.src = imgs[current].src;
      }

      imgs.forEach((img, i) => {
        img.addEventListener("click", () => openModal(i));
      });

      closeBtn.addEventListener("click", () => modal.classList.remove("open"));
      modal.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.remove("open");
      });

      prevBtn.addEventListener("click", () => show(-1));
      nextBtn.addEventListener("click", () => show(1));

      document.addEventListener("keydown", (e) => {
        if (!modal.classList.contains("open")) return;
        if (e.key === "Escape") modal.classList.remove("open");
        if (e.key === "ArrowRight") show(1);
        if (e.key === "ArrowLeft") show(-1);
      });