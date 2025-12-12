import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import "./index.css";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUser(JSON.parse(user));
    }
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      notify(error.response.data.error, "error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleCreateBlog = async (event) => {
    event.preventDefault();
    const title = event.target.title.value;
    const author = event.target.author.value;
    const url = event.target.url.value;
    try {
      const blog = await blogService.create({ title, author, url });
      setBlogs([...blogs, blog]);
      notify("Blog created successfully");
    } catch (error) {
      notify(error.response.data.error, "error");
    }
  };

  const notify = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 3000);
  };

  return (
    <div>
      {notification.message && (
        <div className='notification' style={{ color: notification.type === "error" ? "red" : "green" }}>
          {notification.message}
        </div>
      )}
      {user ? (
        <>
          <h2>blogs</h2>
          <div>
            {user.name} logged in
            <button onClick={handleLogout}>Logout</button>
          </div>
          <h2>create new</h2>
          <form onSubmit={handleCreateBlog}>
            <div>
              <label>
                Title: <input type="text" name="title" />
              </label>
            </div>
            <div>
              <label>
                Author: <input type="text" name="author" />
              </label>
            </div>
            <div>
              <label>
                Url: <input type="text" name="url" />
              </label>
            </div>
            <button type="submit">Create</button>
          </form>
          {blogs
            .filter((blog) => blog.user.id === user.id)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
        </>
      ) : (
        <>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>
                Username: <input type="text" name="username" />
              </label>
            </div>
            <div>
              <label>
                Password: <input type="password" name="password" />
              </label>
            </div>
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </div>
  );
};

export default App;
