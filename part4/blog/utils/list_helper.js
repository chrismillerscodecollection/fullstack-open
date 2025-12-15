const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  // sorts the blog in-place
  blogs.sort((a, b) => a.likes - b.likes)
  // sorted in ascending order, so the last element has the most likes
  return blogs[blogs.length - 1]
}

module.exports = { dummy, totalLikes, favoriteBlog }