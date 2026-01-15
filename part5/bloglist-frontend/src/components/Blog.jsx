import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, onUpdate, onError }) => {

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
            <button onClick={() => handleLikeButton(blog)}>like</button>
          </div>
          {blog.users[0].name}
        </div>
      )}
    </div>
  )
}

export default Blog