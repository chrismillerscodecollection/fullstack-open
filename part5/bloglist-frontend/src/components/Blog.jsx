import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, onUpdate, onError, onRemove }) => {
  const [showDetails, setShowDetails] = useState(false)
  const handleShowDetails = () => setShowDetails(!showDetails)

  const handleLikeButton = async (blog) => {
    try {
      const response = await blogService.update(blog)
      onUpdate(response)

    } catch (error) {
      onError(error)
    }
  }

  const handleRemoveButton = async (blog) => {
    const ok = window.confirm(`delete "${blog.title}`)
    if (!ok) return // if user selects cancel - exit the function
    
    console.log('handleRemoveButton tech hit ', blog)
    onRemove(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        <div style={{ display: 'none' }}>{blog.id}</div>
        {blog.title} by {blog.author}
        <button onClick={handleShowDetails}>
          {showDetails ? "hide" : "view"}
        </button>
      </div>
      {showDetails && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={() => handleLikeButton(blog.id)}>like</button>
          </div>
          <div>{blog.users?.[0]?.name}</div>
           <div><button onClick={() => handleRemoveButton(blog)}>remove</button></div>
        </div>
       
      )}
    </div>
  )
}

export default Blog