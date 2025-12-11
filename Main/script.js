// Quick flash animation when card is clicked
function flashCard(card) {
    card.classList.add("flash-effect");
    setTimeout(() => {
        card.classList.remove("flash-effect");
    }, 600);
}

// For future: update credit, loading screen, game triggers
console.log("Casino UI Loaded!");
