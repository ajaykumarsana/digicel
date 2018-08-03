const fs = require('fs-extra');
const targz = require('tar.gz');
const warify = require('@rogue-zero/warify');

const angularConfig = JSON.parse(fs.readFileSync('.angular-cli.json'));
const distDirectory = angularConfig.apps[0].outDir; // 'dist'
const baseName = angularConfig.project.name; // 'mbe-easy-ui'
const version = JSON.parse(fs.readFileSync('package.json')).version;
let outputDirectory, extension;
const fileType = process.argv[2];

if (fileType === 'tar') {
    outputDirectory = 'tarballs';
    extension = 'tar.gz';
} else if (fileType === 'war') {
    outputDirectory = 'war_files';
    extension = 'war';
} else {
    throw new Error('Please specify either war or tar');
}

// Update index.html to have correct verision
const indexHtml = `${distDirectory}/index.html`;
fs.writeFileSync(
    indexHtml,
    fs.readFileSync(indexHtml, 'utf8').replace(/Version.*Built/, `Version ${version}. Built`),
    'utf8'
);

// Create output directory if it does not exist
if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory);
}

const outputFile = `${baseName}-${version}.${extension}`;

if (fileType === 'tar') {
    targz().compress(distDirectory, `${outputDirectory}/${outputFile}`)
        .then(() => {
            console.log(outputFile, 'has been created');
        }).catch(err => {
            console.log('Error making tarball: ', err.stack);
        });
} else if (fileType === 'war') {
    warify(distDirectory, `${outputDirectory}/${outputFile}`, () => {
        console.log(outputFile, 'has been created');
    }, err => {
        console.log('Error making war: ', err.stack);
    });
}
