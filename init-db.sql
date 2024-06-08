-- 创建 User 表
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    user_name VARCHAR(255) NOT NULL UNIQUE,
    pass_word VARCHAR(255) NOT NULL,
    gender VARCHAR(255) DEFAULT 'Walmart Shopping Bag',
    motto VARCHAR(255) DEFAULT NULL,
    last_login_time TIMESTAMP NOT NULL,
    avatar VARCHAR(255) DEFAULT NULL,
    num_of_shares INTEGER DEFAULT 0 NOT NULL,
    user_class INTEGER DEFAULT 0 NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE NOT NULL
);

-- 创建 Post 表
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    title VARCHAR(255) NOT NULL,
    author_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    floor INTEGER DEFAULT 1 NOT NULL,
    is_locked BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    is_top BOOLEAN DEFAULT FALSE,
    is_invisible BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE
);

-- 创建 Reply 表
CREATE TABLE IF NOT EXISTS replies (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP,
    post_id INTEGER NOT NULL,
    author_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    floor INTEGER NOT NULL,
    reply_to INTEGER DEFAULT NULL,
    is_invisible BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (post_id) REFERENCES posts (id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES users (id) ON DELETE CASCADE
);

-- 插入初始用户数据
INSERT INTO users (user_name, pass_word, gender, motto, last_login_time, avatar, num_of_shares, user_class, is_deleted) VALUES
('yamanashi', '123456', 'Male', 'Live and let live', NOW(), NULL, 0, 0, FALSE);

-- 插入初始帖子数据
INSERT INTO posts (title, author_id, content, floor, is_locked, is_deleted, is_top, is_invisible) VALUES
('Test Post', 1, 'Test Post Content', 1, FALSE, FALSE, FALSE, FALSE);

-- 插入初始回复数据
INSERT INTO replies (post_id, author_id, content, floor, reply_to, is_invisible, is_deleted) VALUES
(1, 1, 'hello world', 1, NULL, FALSE, FALSE);