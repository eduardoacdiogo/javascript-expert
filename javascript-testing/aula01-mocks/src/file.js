const { error } = require('./constants')
const { readFile } =  require('fs/promises')
const DEFAULT_OPTIONS = {
  maxLines: 3,
  fields: ['id', 'name', 'profession', 'age']
}

class File {
  static async csvToJSON(filePath) { 
    const content = await readFile(filePath, 'utf-8')
    const validation = this.isValid(content)
    if (!validation?.valid) {
      throw new Error(validation?.error)
    }
    const result = this.parseCSVToJSON(content)
    return result
  }

  static parseCSVToJSON(csvString) { 
    // const jsonWithHeader = csvString.split(/\r?\n/)
    // .map(row => row.split(', '))
    // .map(row => ({
    //     id: row[0],
    //     name: row[1],
    //     profession: row[2],
    //     age: row[3]
    // }))
    // jsonWithHeader.shift()
    // return jsonWithHeader
    const lines = csvString.split(/\r?\n/)

    const firstLine = lines.shift()
    const headers = firstLine.split(', ')

    const users = lines.map(line => {
      const columns = line.split(',')
      const user = {}
      for (const index in columns) {
        user[headers[index]] = columns[index].trim()
      }
      return user
    })
    return users
  }

  static isValid(csvString, options = DEFAULT_OPTIONS) {
    const [headers, ...fileWithoutHeader] = csvString.split(/\r?\n/)
    const isHeaderValid = headers === options.fields.join(', ')
    if (!isHeaderValid) {
      return {
        error: error.FILE_FIELDS_ERROR_MESSAGE,
        valid: false
      }
    }
    if (!fileWithoutHeader.length || fileWithoutHeader.length > options.maxLines) {
      return {
        error: error.FILE_LENGTH_ERROR_MESSAGE,
        valid: false
      }
    }
    return {
          valid: true
        }
  }
}

module.exports = File;