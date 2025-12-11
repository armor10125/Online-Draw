const Database = require('better-sqlite3');
const db = new Database('casino.db');
const { v4: uuidv4 } = require('uuid');

// Place Bet and Auto Credit Function
function placeBet(playerId, amount) {
    // Check player balance
    const player = db.prepare('SELECT credit FROM players WHERE id = ?').get(playerId);
    if (!player) return { error: "Player not found" };
    if (player.credit < amount) return { error: "Insufficient credit" };

    // Deduct bet
    db.prepare('UPDATE players SET credit = credit - ? WHERE id = ?').run(amount, playerId);

    // Determine win/lose (50% chance)
    const win = Math.random() < 0.5;
    let payout = 0;
    let result = "lose";

    if (win) {
        payout = amount * 2; // Example: 2x payout
        db.prepare('UPDATE players SET credit = credit + ? WHERE id = ?').run(payout, playerId);
        result = "win";
    }

    // Store bet record
    const betId = uuidv4();
    db.prepare('INSERT INTO bets (id, player_id, amount, result) VALUES (?, ?, ?, ?)')
        .run(betId, playerId, amount, result);

    // Return result
    return {
        betId,
        result,
        payout,
        newCredit: db.prepare('SELECT credit FROM players WHERE id = ?').get(playerId).credit
    };
}

// Example usage
const result = placeBet('player-uuid-1234', 20);
console.log(result);
