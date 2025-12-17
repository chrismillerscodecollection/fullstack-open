const _ = require ('lodash')

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

const mostBlogs = (blogs) => {
  const newArr = _.countBy(blogs, 'author')
  const sorted = _.orderBy(
    Object.entries(newArr),
    [([key, value]) => value],
    ['desc']
  )

  const sortedObject = Object.fromEntries(sorted)

  const obj = {
    'author': Object.keys(sortedObject)[0],
    'blogs': Object.values(sortedObject)[0]
  }

  return obj
}

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')
  const likes = _.map(grouped, (items, author) => 
  ({
    author,
    likes: _.sumBy(items, 'likes')
  }))
  
  const ordered = _.orderBy(likes, ['likes'], ['desc'])
  
  return ordered[0]
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }