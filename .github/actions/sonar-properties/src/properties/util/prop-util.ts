import { Properties } from 'properties-file';
import { PropertiesEditor } from 'properties-file/editor';
import { backupFile, loadFile, writeToFile } from './file-util';
import { mergePropertyValue } from '../prop-merger';

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

export function mergeProperties(base: Properties, override: Properties): Properties {
    const mergedProperties = new PropertiesEditor(base.format())

    override.collection.forEach((property) => {
        const baseMatchedProp = base.collection.find(p => p.key === property.key)
        const mergedPropValue = mergePropertyValue(property.key, property.value, baseMatchedProp ? baseMatchedProp.value : undefined);
        mergedProperties.upsert(property.key, mergedPropValue)
    });

    return mergedProperties;
}


