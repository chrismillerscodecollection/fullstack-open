import { useState } from 'react'

const Blog = ({ blog }) => {

  const [showDetails, setShowDetails] = useState(false)

  const handleClick = () => setShowDetails(!showDetails)

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
            <td style={tableDataStyle}>{blog.title} <button onClick={handleClick}>{showDetails ? "hide" : "view"}</button></td>
          </tr>
        </div>

      )}
      
      {showDetails && (
        <div style={blogStyle}>
          <tr>
            <th style={tableHeadingStyle}>Title</th>
            <td style={tableDataStyle}>{blog.title} <button onClick={handleClick}>{showDetails ? "hide" : "view"}</button></td>
          </tr>
          <tr>
            <th style={tableHeadingStyle}>Author</th>
            <td style={tableDataStyle}>{blog.author}</td>
          </tr>
          <tr>
            <th style={tableHeadingStyle}>Likes</th>
            <td style={tableDataStyle}>{blog.likes} <button>like</button></td>
          </tr>
        </div>
      )}
    </div>
  )
}

export default Blog