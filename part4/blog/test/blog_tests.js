const { test, describe } = require('node:test')
const assert = require('node:assert')
const testHelper = require('../utils/test_helper')
const listHelper = require('../utils/list_helper')
const _ = require('lodash')

const blogs = testHelper.blogs

describe('total likes', () => {
  test('works with a small list of blogs', () => {
    const result = listHelper.totalLikes(_.slice(blogs, 0, 2))

    assert.strictEqual(result, 170)
  })

  test('works with a large list of blogs', () => {
    const result = listHelper.totalLikes(blogs)
    
    assert.strictEqual(result, 625)
  })

  test('is not negative', () => {
    const result = listHelper.totalLikes(_.slice(blogs, 0, 2))
    assert.ok(result > -1)
  })
})

describe('most likes', () => {
  test('author with most likes', () => {
    const blogs = testHelper.blogs
    const result = listHelper.mostLikes(blogs)

    assert.deepStrictEqual(result, { author: 'James Anderson', likes: 271 })
  })
})

describe('favorite blog', () => {
  test('returned blog with most likes', () => {

    const mostLiked = listHelper.favoriteBlog(_.slice(blogs, 0, 2))

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

describe('most blogs', () => {
  test('author with most blogs', () => {
    const result = listHelper.mostBlogs(blogs)

    assert.deepStrictEqual(result, { author: 'James Anderson', blogs: 3 })
  })
})