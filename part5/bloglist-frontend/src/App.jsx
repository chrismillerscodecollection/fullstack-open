import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [notification, setNotification] = useState({ type: '', message: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await blogService.getAll()
        setBlogs(response)
      } catch (error) {
        showNotification('error', `Unable to get blogs due to: ${error}`)
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

  const showNotification = (type, message) => {
    setNotification({ type, message })
    return setTimeout(() => {
      setNotification({ type: '', message: '' })
    }, 5000)
  }

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
      showNotification('error', 'Wrong credentials')
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
      showNotification('error', `Unable to logout the user due to ${error}`)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )

  const addNewBlog = async (event) => {
    event.preventDefault()

    try {
      const blog = {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url
      }

      const response = await blogService.create(blog)

      setBlogs(blogs.concat(response))
      showNotification('success', `${response.title} brought to you by ${response.author} added`)
    } catch (error) {
      showNotification('error', `Unable to create a new blog due to: ${error}`)
    }

    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  const handleBlogUpdate = (updatedBlog) => {                                                                     
    setBlogs(prevBlogs => prevBlogs.map(b => b.id === updatedBlog.id ? updatedBlog : b))                                           
  }

  const handleBlogError = (error) => {
    showNotification('error', `Unable to update blog due to ${error}`)
  }
  
  const blogForm = () => (
    <Togglable buttonLabel="create new blog">
      <BlogForm
        handleAddNewBlog={addNewBlog}
        newBlog={newBlog}
        handleSetNewBlog={setNewBlog}
      />
    </Togglable>
  )

  if (user === null) {
    return (
      <div>
        <h2>Log in to the application</h2>
        <Notification type={notification.type} message={notification.message} />
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
              <button onClick={handleLogout} style={{ marginLeft: '10px' }}>logout</button>
            </p>
            <Notification type={notification.type} message={notification.message} />
            {blogForm()}
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} onUpdate={handleBlogUpdate} onError={handleBlogError}/>
            )}
          </div>
        </main>
      )}
    </div>
  )}

export default App