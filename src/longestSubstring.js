/** Created by hhj on 2/16/16. */
/* eslint-disable func-names, max-len */

const trim = stringToTrim => stringToTrim.toLowerCase().replace(/\s+/g, '')

const countSpaces = (str, fromPosition, toPosition) => {
  const spaceCount = (str.substring(fromPosition, toPosition).match(/\s+/g) || []).length
  return (str.substring(fromPosition, toPosition + spaceCount).match(/\s+/g) || []).length
}

const tFind = function(str1, str2) {
  const str1Length = str1.length,
    str2Length = str2.length,
    num = new Array(str1Length)
  let sequence = '',
    maxLen = 0,
    lastSubsBegin = 0

  for (let ii = 0; ii < str1Length; ii++) {
    const subArray = new Array(str2Length)
    for (let jj = 0; jj < str2Length; jj++) {
      subArray[jj] = 0
    }
    num[ii] = subArray
  }
  let thisSubsBegin = null
  for (let i = 0; i < str1Length; i++) {
    for (let j = 0; j < str2Length; j++) {
      if (str1[i] !== str2[j]) {
        num[i][j] = 0
      } else {
        if ((i === 0) || (j === 0)) {
          num[i][j] = 1
        } else {
          num[i][j] = 1 + num[i - 1][j - 1]
        }

        if (num[i][j] > maxLen) {
          maxLen = num[i][j]
          thisSubsBegin = i - num[i][j] + 1
          if (lastSubsBegin === thisSubsBegin) {
            // if the current LCS is the same as the last time this block ran
            sequence += str1[i]
          } else {
            // this block resets the string builder if a different LCS is found
            lastSubsBegin = thisSubsBegin
            sequence = '' // clear it
            sequence += str1.substr(lastSubsBegin, (i + 1) - lastSubsBegin)
          }
        }
      }
    }
  }
  const offset1 = thisSubsBegin
  const offset2 = str2.indexOf(sequence)

  return { length: maxLen, sequence, offset1, offset2 }
}

export const find = function(origStr1, origStr2, trimStrings = true) {
  if (!origStr1 || !origStr2) {
    return { length: 0, sequence: '', offset1: 0, offset2: 0 }
  }

  const str1 = trimStrings ? trim(origStr1) : origStr1
  const str2 = trimStrings ? trim(origStr2) : origStr2

  const { length: tLength, sequence, offset1: tOffset1, offset2: tOffset2 } = tFind(str1, str2)
  const offset1 = tOffset1 + countSpaces(origStr1, 0, tOffset1 + 2)
  const length1 = tLength + countSpaces(origStr1, offset1, offset1 + tLength)
  const offset2 = tOffset2 + countSpaces(origStr2, 0, tOffset2 + 2)
  const length2 = tLength + countSpaces(origStr2, offset2, offset2 + tLength)

  return { length: tLength, sequence, offset1, offset2, length1, length2 }
}

export const mark = function(str1, str2, preTag = '<b>', postTag = '</b>', minLength = 3, trimStrings) {
  let marked1 = str1
  let marked2 = str2

  const common = find(str1, str2, trimStrings)

  if (common.length >= minLength) {
    marked1 = str1.substring(0, common.offset1) + preTag + str1.substring(common.offset1, common.offset1 + common.length1) + postTag + str1.substring(common.offset1 + common.length1, str1.length)
    // const offset2 = str2.indexOf(common.sequence)
    marked2 = str2.substring(0, common.offset2) + preTag + str2.substring(common.offset2, common.offset2 + common.length2) + postTag + str2.substring(common.offset2 + common.length2, str2.length)
  }

  return { marked1, marked2, marked: marked1, markLength: common.length }
}

export default {
  mark,
  find,
}
