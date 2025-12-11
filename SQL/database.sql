-- Players table
CREATE TABLE IF NOT EXISTS players (
  id TEXT PRIMARY KEY,
  username TEXT UNIQUE,
  credit INTEGER DEFAULT 0
);

-- Bets table
CREATE TABLE IF NOT EXISTS bets (
  id TEXT PRIMARY KEY,
  player_id TEXT,
  amount INTEGER,
  result TEXT,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
