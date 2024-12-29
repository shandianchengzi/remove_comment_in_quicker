function removeLinesContainingKeyword(lines, keyword) {
  var result = [];
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].indexOf(keyword) === -1) {
      result.push(lines[i]);
    }
  }
  return result;
}

function removeComments(code) {
    // Regular expression to match string literals (both single and double quotes)
    var stringPattern = /(".*?"|'.*?')/g;

    // Temporary replacement to avoid altering strings
    var tempCode = code.replace(stringPattern, function(match) {
        return match.replace('#', '__HASH__HASH__HASH__');
    });
    
    // Remove empty lines that follow a comment line
    tempCode = tempCode.replace(/^[^\S\r\n]*#.*/gm, '__LINETOBEDELETE__LINETOBEDELETE__');

    // Remove single-line comments outside of strings
    tempCode = tempCode.replace(/#.*$/gm, '');

    // Remove contain '__LINETOBEDELETE__LINETOBEDELETE__' lines
    // split code into lines
    var lines = tempCode.split('\n');
    lines = removeLinesContainingKeyword(lines, '__LINETOBEDELETE__LINETOBEDELETE__');
    tempCode = lines.join('\n');

    // Restore the original strings (with the '__HASH__' placeholder replaced back with '#')
    var cleanCode = tempCode.replace(/__HASH__HASH__HASH__/g, '#');

    return cleanCode;
}

function exec() {
    var localName = quickerGetVar('text');  // 读取text变量值, (text 是动作里的变量)
    var cleanedCode = removeComments(localName);
    quickerSetVar('text', cleanedCode); // 输出修改后的值到text变量中。
    return 0; // 返回0表示成功。返回其他数字表示失败。
}
