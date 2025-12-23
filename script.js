const card = document.querySelectorAll(".card");
window.addEventListener("scroll",animateCards);
function animateCards(){
    const checkingBottom = (window.innerHeight / 4) * (175/35);

