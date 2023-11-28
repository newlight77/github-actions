import * as fs from 'fs';
import * as path from 'path';
import * as core from '@actions/core';
import * as util from 'util';

const copyFilePromise = util.promisify(fs.copyFile)

export function loadFile(absPath: string, filename: string): string {
    let filePath = path.join(absPath, filename);
    if (!fs.existsSync(filePath)) {
        core.info(`can not find file ${absPath}/${filename}`);
        core.info(`fallback to ${absPath}/empty.properties`);
        return '# empty\n';
    }
    return fs.readFileSync(filePath).toString();
}

export function writeToFile(relPath: string, filename: string, data: string) {
    let filePath = path.join(relPath, filename);
    fs.writeFileSync(filePath, data);
}

export function backupFile(relPath: string, filename: string): Promise<void> {
    let filePath = path.join(relPath, filename);
    return copyFilePromise(filePath, `${filePath}.backup`);
}
