import * as fs from 'fs';
import * as path from 'path';
import * as core from '@actions/core';

export function loadFile(relPath: string, filename: string): string {
    let filePath = path.join(__dirname, relPath, filename);
    if (!fs.existsSync(filePath)) {
        core.warn("can not find file", `${relPath}/${filename}`);
        core.warn("fallback to ", `${relPath}/empty.properties`);
        return '# empty';
    }
    return fs.readFileSync(filePath).toString().replace('\\\n', '').replace('\\\n( )*', '');
}

export function writeToFile(relPath: string, filename: string, data: string) {
    let filePath = path.join(__dirname, relPath, filename);
    const content = data.split(',').join(',\\\n');
    fs.writeFileSync(filePath, content);
}