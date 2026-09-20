let ticking = false;
let triggerRatio = 0.85;

function calculateTriggerBottom() {
    return window.innerHeight * triggerRatio;
}

function updateScrollProgress() {
    const progressBar = document.getElementById("progressBar");
    if (!progressBar) return;
    
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progressPercent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    
    progressBar.style.width = `${Math.min(100, Math.max(0, progressPercent))}%`;
}

function updateStats(visibleCount, totalCount) {
    const countBadge = document.getElementById("visibleCount");
    if (countBadge) {
        countBadge.textContent = `${visibleCount} / ${totalCount} In View`;
    }
}

function animateCards() {
    const cards = document.querySelectorAll(".card");
    const triggerBottom = calculateTriggerBottom();
    let visibleCount = 0;

    cards.forEach((singleCard) => {
        const cardTop = singleCard.getBoundingClientRect().top;
        const toSlideIn = cardTop < triggerBottom;

        if (toSlideIn) {
            singleCard.classList.add("slidingIn");
            visibleCount++;
        } else {
            singleCard.classList.remove("slidingIn");
        }
    });

    updateStats(visibleCount, cards.length);
    updateScrollProgress();
}

function handleScroll() {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            animateCards();
            ticking = false;
        });
        ticking = true;
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toggleDirectionStyle() {
    const gallery = document.getElementById("cardsGallery");
    const btn = document.getElementById("toggleAnimBtn");
    if (!gallery || !btn) return;

    if (gallery.classList.contains("mode-depth")) {
        gallery.classList.remove("mode-depth");
        gallery.classList.add("mode-alternate");
        btn.textContent = "Animation: Alternating";
    } else {
        gallery.classList.remove("mode-alternate");
        gallery.classList.add("mode-depth");
        btn.textContent = "Animation: 3D Depth";
    }
    animateCards();
}

window.addEventListener("scroll", handleScroll, { passive: true });
window.addEventListener("resize", handleScroll);

document.addEventListener("DOMContentLoaded", () => {
    animateCards();

    const scrollBtn = document.getElementById("scrollTopBtn");
    if (scrollBtn) scrollBtn.addEventListener("click", scrollToTop);

    const animToggleBtn = document.getElementById("toggleAnimBtn");
    if (animToggleBtn) animToggleBtn.addEventListener("click", toggleDirectionStyle);
});

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        calculateTriggerBottom,
        animateCards,
        handleScroll
    };
}
