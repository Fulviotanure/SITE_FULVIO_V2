const fs = require('fs');
let content = fs.readFileSync('js/home.js', 'utf8');

// Find exactly where the function starts and ends
const fnStart = content.indexOf('        function highlightCode(plainText) {');
if (fnStart === -1) { console.log('ERROR: could not find function'); process.exit(1); }

// Find the closing brace of this function (8 spaces + closing brace + newline)
const fnBody = content.substring(fnStart);
// The function ends at the first occurrence of "\n        }\n" after the opening
let depth = 0;
let fnEnd = -1;
for (let i = fnStart; i < content.length; i++) {
    if (content[i] === '{') depth++;
    else if (content[i] === '}') {
        depth--;
        if (depth === 0) {
            fnEnd = i + 1; // include the closing brace
            break;
        }
    }
}

if (fnEnd === -1) { console.log('ERROR: could not find function end'); process.exit(1); }

console.log('Function found at:', fnStart, 'to', fnEnd);
console.log('Current function:');
console.log(content.substring(fnStart, fnEnd));

const newFn = `        function highlightCode(plainText) {
            function escHtml(s) {
                return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            }

            const KEYWORDS = new Set(['function','const','let','var','class','return','if','else','new','constructor']);
            const FUNCS = new Set(['initializeWebApp','log','fetchConfig','applyTheme','render','handleScroll','setTitle','getElementById','createElement','appendChild','addEventListener']);

            return plainText.split('\\n').map(function(line) {
                // Check for comment lines
                var commentIdx = line.search(/\\/\\//);
                var beforeComment = commentIdx >= 0 ? line.substring(0, commentIdx) : line;
                var commentPart = commentIdx >= 0 ? line.substring(commentIdx) : '';

                // Tokenize the non-comment part
                var result = '';
                var i = 0;
                while (i < beforeComment.length) {
                    var ch = beforeComment[i];
                    // String literal
                    if (ch === '"' || ch === "'") {
                        var j = i + 1;
                        while (j < beforeComment.length && beforeComment[j] !== ch) {
                            if (beforeComment[j] === '\\\\') j++;
                            j++;
                        }
                        result += '<span class="code-str">' + escHtml(beforeComment.substring(i, j + 1)) + '</span>';
                        i = j + 1;
                        continue;
                    }
                    // Identifier
                    if (/[a-zA-Z_$]/.test(ch)) {
                        var k = i;
                        while (k < beforeComment.length && /[\\w$]/.test(beforeComment[k])) k++;
                        var word = beforeComment.substring(i, k);
                        if (KEYWORDS.has(word)) {
                            result += '<span class="code-keyword">' + escHtml(word) + '</span>';
                        } else if (FUNCS.has(word)) {
                            result += '<span class="code-func">' + escHtml(word) + '</span>';
                        } else {
                            result += escHtml(word);
                        }
                        i = k;
                        continue;
                    }
                    result += escHtml(ch);
                    i++;
                }

                if (commentPart) {
                    result += '<span class="code-comment">' + escHtml(commentPart) + '</span>';
                }
                return result;
            }).join('\\n');
        }`;

const newContent = content.substring(0, fnStart) + newFn + content.substring(fnEnd);
fs.writeFileSync('js/home.js', newContent, 'utf8');
console.log('\\nDone! New function written successfully.');
console.log('New function:');
const verifyStart = newContent.indexOf('        function highlightCode(plainText) {');
const verifyEnd = newContent.indexOf('        async function typeConventionalCode');
console.log(newContent.substring(verifyStart, verifyEnd));
