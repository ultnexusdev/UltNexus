INSERT INTO "ForbiddenUsername" (username) VALUES 
('admin'), ('administrator'), ('support'), ('moderator'), ('system'), ('null'), ('undefined'), ('help'), ('root')
ON CONFLICT (username) DO NOTHING;
