import * as fs from 'fs';
import * as path from 'path';
import * as core from '@actions/core';

export function loadFile(absPath: string, filename: string): string {
    let filePath = path.join(absPath, filename);
    if (!fs.existsSync(filePath)) {
        core.info(`can not find file ${absPath}/${filename}`);
        core.info(`fallback to ${absPath}/empty.properties`);
        return '# empty';
    }
    return fs.readFileSync(filePath).toString().replace('\\\n', '').replace('\\\n( )*', '');
}

export function writeToFile(relPath: string, filename: string, data: string) {
    let filePath = path.join(relPath, filename);
    const content = data.split(',').join(',\\\n');
    fs.writeFileSync(filePath, content);
}