import { Properties } from 'properties-file';
import { backupFile, loadFile, writeToFile } from './file-util';

export function loadProperties(templatesPath: string, filename: string): Properties {
    return new Properties(loadFile(templatesPath, filename));
}

export function writeProperties(path: string, filename: string, properties: Properties, backup?: boolean) {
    if (backup) {
        backupFile(path, filename)
        .then(() => 
            writeToFile(path, filename, properties.format())
        );
    } else {
        writeToFile(path, filename, properties.format());
    }
}


