CREATE TABLE categories (
  id         integer PRIMARY KEY,  -- matches WordPress category ID
  name       text    NOT NULL,
  slug       text    NOT NULL UNIQUE,
  post_count integer NOT NULL DEFAULT 0
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON categories FOR SELECT USING (true);

INSERT INTO categories (id, name, slug, post_count) VALUES
  (32, 'Auto Accident',          'auto-accident',          4),
  (29, 'Beneficiary Litigation', 'beneficiary-litigation', 6),
  (30, 'Estate Planning',        'estate-planning',        23),
  (28, 'Estates',                'estates',                9),
  (1,  'General',                'general',                1),
  (26, 'Mental Health',          'mental-health',          1),
  (31, 'Personal Injury',        'personal-injury',        5),
  (27, 'Probate',                'probate',                23),
  (33, 'Public Interest',        'public-interest',        1);
