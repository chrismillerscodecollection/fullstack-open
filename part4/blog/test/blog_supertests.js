const { test } = require('node:test')
const supertest = require('supertest')
const app = require('express')


test('blogs are returned', () => {
    api
        .get('/')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect('Content-Length', '500')
})