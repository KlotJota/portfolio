document.addEventListener("DOMContentLoaded", () => {
    const track = document.getElementById("carousel-track");
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");
  
    if (!track || !btnPrev || !btnNext) {
      console.error("Erro: Elementos do carrossel (#carousel-track, #btn-prev, #btn-next) não encontrados.");
      return;
    }
  
    const items = Array.from(track.querySelectorAll(".details-container"));
    if (!items.length) {
      console.error("Erro: Nenhum elemento .details-container encontrado dentro de #carousel-track.");
      return;
    }
  
    const realItemCount = items.length;
    const itemWidth = items[0].offsetWidth + 16;
  
    const clonesBefore = [];
    const clonesAfter = [];
    for (let i = 0; i < realItemCount * 3; i++) {
      const cloneBefore = items[i % realItemCount].cloneNode(true);
      const cloneAfter = items[i % realItemCount].cloneNode(true);
      clonesBefore.push(cloneBefore);
      clonesAfter.push(cloneAfter);
    }
  
    clonesBefore.forEach(clone => track.insertBefore(clone, items[0]));
    clonesAfter.forEach(clone => track.appendChild(clone));
  
    let allItems = Array.from(track.querySelectorAll(".details-container"));
    let totalItems = allItems.length;
  
    let currentIndex = realItemCount * 3;
  
    function updateCarousel(animate = true) {
      allItems = Array.from(track.querySelectorAll(".details-container"));
      totalItems = allItems.length;
  
      allItems.forEach((item, index) => {
        item.classList.remove("active", "side");
        if (index === currentIndex) {
          item.classList.add("active");
          console.log(`Item ativo: ${index}, Título: ${item.querySelector(".project-title").textContent}`);
        } else {
          item.classList.add("side");
        }
      });
  
      const offset = (currentIndex * itemWidth) - (track.clientWidth / 2) + (itemWidth / 2);
      if (animate) {
        track.style.transition = "transform 0.5s ease-in-out";
      } else {
        track.style.transition = "none";
      }
      track.style.transform = `translateX(-${offset}px)`;
    }
  
    function moveCarousel(direction) {
      if (direction === "next") {
        currentIndex++;
        if (currentIndex >= totalItems - realItemCount * 2) {
          currentIndex -= realItemCount * 3;
          updateCarousel(false);
        }
      } else {
        currentIndex--;
        if (currentIndex <= realItemCount * 2) {
          currentIndex += realItemCount * 3;
          updateCarousel(false);
        }
      }
  
      updateCarousel(true);
    }
  
    btnNext.addEventListener("click", () => moveCarousel("next"));
    btnPrev.addEventListener("click", () => moveCarousel("prev"));
  
    track.style.display = "flex";
    updateCarousel();
  
    window.addEventListener("load", () => updateCarousel());
  });