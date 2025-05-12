CREATE TABLE IF NOT EXISTS prompts (
    id SERIAL PRIMARY KEY,
    prompt_text TEXT NOT NULL,  -- Store the prompt text here
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
