const v8Transformers = {
  // at /Users/brett/IndexedDBShim/dist/indexeddbshim-UnicodeIdentifiers-node.js:6626:32
  // at IDBOpenDBRequest.tryCatch (/Users/brett/IndexedDBShim/dist/indexeddbshim-UnicodeIdentifiers-node.js:6641:9)
  newFileRegex: /(\s*)at (\S+ \()?([^e][^(]*?):(\d+):(\d+)(\))?/,
  newFilePath (match) {
    return match[3];
  },
  newFileLineNumber (match) {
    return parseInt(match[4], 10);
  },
  newFileColumnNumber: function (match) {
    return match[5] || '';
  },
  originalPositionString: function (formattingSpaces, originalPosition, untransformedOutput, match /*, prev=false */) {
    const erringFunc = match[2] || '';
    const endingParenth = match[6] || '';
    if (originalPosition.source) {
      console.log('originalPosition.line', originalPosition.source, originalPosition.line);
      return formattingSpaces + 'at ' + erringFunc + originalPosition.source + ':' + originalPosition.line + ':' + originalPosition.column + endingParenth;
    }
    return untransformedOutput;
  }
};

if (typeof module !== 'undefined') {
  module.exports = v8Transformers;
}
