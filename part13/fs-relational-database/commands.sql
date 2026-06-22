CREATE TABLE blogs(
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes int DEFAULT 0
);

insert into blogs (author, url, title) values ('bird', 'http://localhost:3000', 'test-blog');
insert into blogs (author, url, title, likes) values ('bird', 'http://localhost:3000', 'test-blog-2', 10);
