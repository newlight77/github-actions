import { Properties } from 'properties-file';
import { backupFile, loadFile, writeToFile } from './file-util';

export function loadProperties(templatesPath: string, filename: string): Properties {
    const content = loadFile(templatesPath, filename)
            .replace('\\\n( )*', ' ')
            .replace(',( )*', ', ');

    return new Properties(content);
}

export function writeProperties(path: string, filename: string, properties: Properties, backup?: boolean) {
    if (backup) {
        backupFile(path, filename)
        .then(() => 
            writeToFile(path, filename, properties.format().split(', ').join(',\\\n    '))
        );
    } else {
        writeToFile(path, filename, properties.format().split(', ').join(',\\\n    '));
    }
}
