const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('favorite blog', () => {
  test('returned blog with most likes', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Building Scalable Microservices with Node.js',
        author: 'Sarah Mitchell',
        url: 'https://devblog.tech/microservices-nodejs',
        likes: 42,
        __v: 0
      },
      {
        _id: '5a422b891b54a676234d17f9',
        title: 'Understanding React Hooks in Depth',
        author: 'James Anderson',
        url: 'https://frontend-masters.io/react-hooks-guide',
        likes: 128,
        __v: 0
      },
      {
        _id: '5a422ba71b54a676234d17fa',
        title: 'Modern CSS Grid Layouts: A Complete Guide',
        author: 'Emily Chen',
        url: 'https://css-weekly.com/grid-layouts-complete',
        likes: 87,
        __v: 0
      }
    ]

    const mostLiked = listHelper.favoriteBlog(blogs)

    assert.deepStrictEqual(mostLiked, {
      _id: '5a422b891b54a676234d17f9',
      title: 'Understanding React Hooks in Depth',
      author: 'James Anderson',
      url: 'https://frontend-masters.io/react-hooks-guide',
      likes: 128,
      __v: 0
    })
  })

})