const fs = require('fs-extra');
const path = require('path');

const mixinsPath = path.join(process.cwd(), "src/styles/_mixins.scss");
const mixinsBackupPath = path.join(process.cwd(), "src/styles/_mixins-backup.scss");

if (fs.existsSync(mixinsBackupPath)) {
    fs.unlinkSync(mixinsPath);
    fs.renameSync(mixinsBackupPath, mixinsPath);
}

const exportsPath = path.join(process.cwd(), "src/styles/_provider-exports.scss");
const exportsBackupPath = path.join(process.cwd(), "src/styles/_provider-exports-backup.scss");

if (fs.existsSync(exportsBackupPath)) {
    fs.unlinkSync(exportsPath);
    fs.renameSync(exportsBackupPath, exportsPath);
}
