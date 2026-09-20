const assert = require('assert');

function calculateTriggerThreshold(viewportHeight, ratio = 0.85) {
    if (viewportHeight <= 0) return 0;
    return viewportHeight * ratio;
}

function shouldSlideIn(cardTop, triggerThreshold) {
    return cardTop < triggerThreshold;
}

function getCardInitialTransform(index) {
    const isEven = index % 2 === 0;
    return isEven 
        ? "translateX(120%) rotate(8deg) scale(0.85)" 
        : "translateX(-120%) rotate(-8deg) scale(0.85)";
}

function computeVisibilityStats(cards, viewportHeight, ratio = 0.85) {
    const threshold = calculateTriggerThreshold(viewportHeight, ratio);
    let visibleCount = 0;
    
    cards.forEach((card) => {
        if (shouldSlideIn(card.top, threshold)) {
            visibleCount++;
        }
    });

    return {
        total: cards.length,
        visible: visibleCount,
        hidden: cards.length - visibleCount,
        threshold: threshold
    };
}

console.log("Running Scroll Images Effect Unit Tests...\n");

// Test 1: Trigger Threshold Calculation
assert.strictEqual(calculateTriggerThreshold(1000, 0.85), 850);
assert.strictEqual(calculateTriggerThreshold(800, 0.8), 640);
assert.strictEqual(calculateTriggerThreshold(0, 0.85), 0);
console.log("PASS: Viewport trigger threshold calculated with precision");

// Test 2: Slide-in Detection
const threshold = 850;
assert.strictEqual(shouldSlideIn(500, threshold), true);
assert.strictEqual(shouldSlideIn(849, threshold), true);
assert.strictEqual(shouldSlideIn(850, threshold), false);
assert.strictEqual(shouldSlideIn(1200, threshold), false);
console.log("PASS: Card visibility boundaries evaluate accurately");

// Test 3: Alternating Slide Directions
assert.ok(getCardInitialTransform(0).includes("translateX(120%)"));
assert.ok(getCardInitialTransform(1).includes("translateX(-120%)"));
assert.ok(getCardInitialTransform(2).includes("translateX(120%)"));
assert.ok(getCardInitialTransform(3).includes("translateX(-120%)"));
console.log("PASS: Odd and even cards alternate slide-in trajectories");

// Test 4: Batch Card Visibility Accounting
const mockCards = [
    { top: 100 },
    { top: 350 },
    { top: 700 },
    { top: 900 },
    { top: 1400 }
];
const stats = computeVisibilityStats(mockCards, 1000, 0.85);
assert.strictEqual(stats.total, 5);
assert.strictEqual(stats.visible, 3);
assert.strictEqual(stats.hidden, 2);
console.log("PASS: Batch visibility accounting accurately tracks active DOM cards");

console.log("\nAll 4 Scroll Effect unit test suites passed successfully!");
