function Myparse(str) {
  let i = 0
  return parseValue()

  function parseValue() {
    if (str[i] == '{') {
      return parseObject()
    } else if (str[i] == '[') {
      return parseArray()
    } else if (str[i] == '"') {
      return parseString()
    } else if (str[i] == 'n') {
      return parseNull()
    } else if (str[i] == 'f') {
      return parseFalse()
    } else if (str[i] == 't') {
      return parseTrue()
    } else {
      return parseNumber()
    }
  }

  function parseTrue() {
    let content = str.substring(i, i + 4)
    if (content == 'true') {
      i += 4
      return true
    } else {
      throw new Error('Unexpected char at pos: ' + i)
    }
  }

  function parseFalse() {
    let content = str.substring(i, i + 5)
    if (content == 'false') {
      i += 5
      return false
    } else {
      throw new Error('Unexpected char at pos: ' + i)
    }
  }

  function parseNull() {
    let content = str.substring(i, i + 4)
    if (content == 'null') {
      i += 4
      return null
    } else {
      throw new Error('Unexpected char at pos: ' + i)
    }
  }

  function parseObject() {
    i++
    let result = {}
    while(str[i] !== '}') {
      var key = parseString()
      i++
      var value = parseValue()
      result[key] = value
      if (str[i] == ',') {
        i++
      }
    }
    return result
  }

  function parseArray() {
    i++
    let result = []
    while(str[i] !== ']') {
      if (str[i] == ',') {
        i++
      }
      var val = parseValue()
      result.push(val)
    }
    i++
    return result
  }

  function parseNumber() {
    let numStr = ''

    while(isNumberChar()) {
      numStr += str[i++]
    }
    return parseFloat(numStr)
  }

  function isNumberChar() {
    let chars = {
      '+': true,
      '-': true,
      'e': true,
      'E': true,
      '.': true,
    }
    if (chars[str[i]]) {
      return true
    }
    if (str[i] >= '0' && str[i] <= '9') {
      return true
    }
    return false
  }

  function parseString() {
    i++
    let result = ''
    while (str[i] !== '"') {
      result += str[i++]
    }
    i++
    return result
  }
}
