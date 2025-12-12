import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    const user = await loginService.login({ username, password });
    setUser(user);
  };

  return (
    <div>
      {user ? (
        <>
          <h2>blogs</h2>
          {blogs.filter(blog => blog.user.id === user.id).map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      ) : (
        <>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Username: <input type="text" name="username" /></label>
            </div>
            <div>
              <label>Password: <input type="password" name="password" /></label>
            </div>
            <button type="submit">Login</button>
          </form>
        </>
      )}
    </div>
  );
};

export default App;
