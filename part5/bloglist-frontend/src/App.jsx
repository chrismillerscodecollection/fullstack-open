import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await blogService.getAll()
        setBlogs(response)
      } catch (error) {
        setErrorMessage(`Unable to get blogs due to: ${error}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    }

    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')

    } catch {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async () => {
    try {
      setUser(null)
      setUsername('')
      setPassword('')
      blogService.setToken(null)
      window.localStorage.removeItem('loggedBlogAppUser')
    } catch (error) {
      setErrorMessage(`Unable to logout the user due to ${error}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addNewBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url
      }

      const response = await blogService.create(blog)
      console.log(response)
      setBlogs(blogs.concat(response))
      setSuccessMessage(`${response.title} brought to you by ${response.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage(`Unable to create a new blog due to: ${error}`)
    }

    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addNewBlog}>
      <h2>create new</h2>
      <p>
        <label>
          title:
          <input
            type="text"
            value={newBlog.title}
            onChange={({ target }) => setNewBlog({ ...newBlog, title: target.value })}
          />
        </label>
      </p>
      <p>
        <label>
          author:
          <input
            type="text"
            value={newBlog.author}
            onChange={({ target }) => setNewBlog({ ...newBlog, author: target.value })}
          />
        </label>
      </p>
      <p>
        <label>
          url:
          <input
            type="text"
            value={newBlog.url}
            onChange={({ target }) => setNewBlog({ ...newBlog, url: target.value })}
          />
        </label>
      </p>
      <button type="submit">create</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <Notification message={errorMessage} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      {!user && loginForm()}
      {user && (
        <main>
          <h2>blogs</h2>
          <div>
            <p>{user.name} logged in
              <button onClick={handleLogout}>logout</button>
            </p>
            <Notification message={errorMessage} />
            <Notification message={successMessage} />
            {blogForm()}
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          </div>
        </main>
      )}
    </div>
  )
}

export default App