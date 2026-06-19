CREATE TABLE IF NOT EXISTS ai_generations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  prompt TEXT NOT NULL,
  article_title TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID
);

ALTER TABLE ai_generations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_ai_generations" ON ai_generations FOR SELECT
  TO authenticated USING (true);

CREATE POLICY "insert_ai_generations" ON ai_generations FOR INSERT
  TO authenticated WITH CHECK (true);

CREATE POLICY "update_ai_generations" ON ai_generations FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "delete_ai_generations" ON ai_generations FOR DELETE
  TO authenticated USING (true);
