const BlogForm = (
  {handleAddNewBlog,
  newBlog,
  handleSetNewBlog}
) => {
  return (
    <form onSubmit={handleAddNewBlog}>
      <h2>create new</h2>
      <div style={{ marginBottom: '2px' }}>
        <label style={{ display: 'inline-block', width: '60px' }}>
          title:
        </label>
        <input
          type="text"
          value={newBlog.title}
          onChange={({ target }) => handleSetNewBlog({ ...newBlog, title: target.value })}
        />
      </div>
      <div style={{ marginBottom: '2px' }}>
        <label style={{ display: 'inline-block', width: '60px' }}>
          author:
        </label>
        <input
          type="text"
          value={newBlog.author}
          onChange={({ target }) => handleSetNewBlog({ ...newBlog, author: target.value })}
        />
      </div>
      <div>
        <label style={{ display: 'inline-block', width: '60px' }}>
          url:
        </label>
        <input
          type="text"
          value={newBlog.url}
          onChange={({ target }) => handleSetNewBlog({ ...newBlog, url: target.value })}
        />
      </div>
      <div style={{ marginLeft: '154px', marginTop: '5px', marginBottom: '10px' }}>
        <button type="submit">create</button>
      </div>
    </form>
  )
}

export default BlogForm