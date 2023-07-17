const assert = require('assert'); 
const { createSandbox } = require('sinon');

const Fibonacci = require('./fibonacci');

const sinon = createSandbox()

; (async () => {
  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(
      fibonacci,
      'execute'
    )
    for (const sequencia of fibonacci.execute(5)) {}
    
    const expectedCallFunction = 4
    assert.strictEqual(spy.callCount, expectedCallFunction)
    
    const { args } = spy.getCall(2)
    const expectedParams = [3, 1, 2]
    assert.deepStrictEqual(args, expectedParams, 'Os arrays não são iguais')
  }

  {
    const fibonacci = new Fibonacci()
    const spy = sinon.spy(
      fibonacci,
      'execute'
    )
    
    const results = [...fibonacci.execute(5)]
    
    const expectedCallFunction = 6
    assert.strictEqual(spy.callCount, expectedCallFunction)
    
    const { args } = spy.getCall(2)
    const expectedParams = [3, 1, 2]
    assert.deepStrictEqual(args, expectedParams, 'Os arrays não são iguais')

    const expectedResult = [0, 1, 1, 2, 3]
    assert.deepStrictEqual(results, expectedResult, 'Os resultado não são iguais')
  }
})()