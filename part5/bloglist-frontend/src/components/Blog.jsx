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

  const tableHeadingStyle = {
    textAlign: 'left'
  }

  const tableDataStyle = {
    paddingLeft: 10
  }

  return (
    <div>
      {!showDetails && (
        <div style={blogStyle}>
          <tr>
            <th style={tableHeadingStyle}>Title</th>
            <td style={tableDataStyle}>{blog.title} <button onClick={handleShowDetails}>{showDetails ? "hide" : "view"}</button></td>
          </tr>
        </div>

      )}

      {showDetails && (
        <div style={blogStyle}>
          <tr>
            <th style={tableHeadingStyle}>Title</th>
            <td style={tableDataStyle}>{blog.title} <button onClick={handleShowDetails}>{showDetails ? "hide" : "view"}</button></td>
          </tr>
          <tr>
            <th style={tableHeadingStyle}>Author</th>
            <td style={tableDataStyle}>{blog.author}</td>
          </tr>
          <tr>
            <th style={tableHeadingStyle}>Likes</th>
            <td style={tableDataStyle}>{blog.likes} <button onClick={() => handleLikeButton(blog)}>like</button></td>
          </tr>
        </div>
      )}
    </div>
  )
}

export default Blog