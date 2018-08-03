const fs = require('fs-extra');

// CONSTANTS
const stylesDir = 'src/styles';

// FETCHING THE LIST OF PROVIDERS
const providers = fs.readdirSync(stylesDir).filter(item => {
  let fullPath = `${stylesDir}/${item}`;
  return fs.statSync(fullPath).isDirectory();
});

// READING THE VARIABLES AND WRITING THE THEME FILE FOR EACH PROVIDER
providers.forEach(provider => {
  let variables = new Array().concat(
    extractVariablesFromFile(`${stylesDir}/${provider}/_variables.scss`),
    extractVariablesFromFile(`${stylesDir}/${provider}/_images.scss`)
  );

  let themeData = `
  @import 'images';
  @import 'variables';

  $${provider}: (
  `;
  variables.forEach(v => {
    themeData += `  ${v}: $${v},\n`;
  });
  // Remove trailing comma
  themeData = themeData.slice(0, -2);
  themeData += `\n);\n`;
  let themeFile = `${stylesDir}/${provider}/_theme.scss`;
  fs.writeFileSync(themeFile, themeData);
  console.log(`SASS map written for ${provider}`);
});


// HELPER FUNCTIONS

// Takes the file path and returns an array of variables
// e.g., => ['brand-color-1', 'link-color', ...]
// Assumes each varible begins at the start of the line with a $ and ends with a colon
function extractVariablesFromFile(path) {
  let data = fs.readFileSync(path, 'utf8');
  return getAllMatches(data, /^\$.*:/gm).map(match => match.substr(1).slice(0, -1));
}

// https://stackoverflow.com/a/6323598/6213030
function getAllMatches(str, regex) {
  let matches = [];
  let match;
  do {
    match = regex.exec(str);
    if (match) {
      matches.push(match[0]);
    }
  } while (match);
  return matches;
}
