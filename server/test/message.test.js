const request = require('supertest')
const mongoose = require('mongoose');
const bootstrapApp = require('../src/app')
const assert = require('assert');
const bootstrap = require('../src/app');

describe('test post message', () => {
  let app;
  before(async () => {
    app = await bootstrap()
  })
  after(() => {
    mongoose.connection.close()
  })
  it('without sentence', () => request(app).post('/').send({}).expect(200).then(res => {
    const { message, result } = res.body;
    assert.strictEqual(message, 'Hey, I saved a post');
    assert.strictEqual(result.sentence, "Hey I'm a new post!");
  }))
  it('with sentence', () => request(app).post('/').send({
    sentence: 'It works perfectly!'
  }).expect(200).then(res => {
    const { message, result } = res.body;
    assert.strictEqual(message, 'Hey, I saved a post');
    assert.strictEqual(result.sentence, 'It works perfectly!');
  }))
})