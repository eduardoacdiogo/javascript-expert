const File = require('./src/file')
const { error } = require('./src/constants')
const assert = require('assert')
  
// IFEE => function of start when this file is called
  ; (async () => {
  // variables created in this block, just exists during the execution
  {
      const filePath = './mocks/emptyFile-invalid.csv'
      const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
      const result = File.csvToJSON(filePath)
      await assert.rejects(result, expected)
    }
    
    {
      const filePath = './mocks/invalid-header.csv'
      const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
      const result = File.csvToJSON(filePath)
      await assert.rejects(result, expected)
    }
    {
      const filePath = './mocks/fiveItems-invalid.csv'
      const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
      const result = File.csvToJSON(filePath)
      await assert.rejects(result, expected)
    }
    {
      const filePath = './mocks/threeItems-valid.csv'
      const expected = [
        {
          id: '1',
          name: 'John Smith',
          profession:'developer',
          age: '28'
        },
        {
          id: '2',
          name: 'Joseph Michael',
          profession: 'manager',
          age: '43'
        },
        {
          id: '3',
          name: 'Jane Doe',
          profession: 'engineer',
          age: '27'
        }
      ]
      const result = await File.csvToJSON(filePath)
      assert.deepEqual(result, expected)
  }
})()