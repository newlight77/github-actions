import { Properties } from 'properties-file';
import { loadFile, writeToFile } from './file-util';
import { PropertiesEditor } from 'properties-file/editor';

export function loadProperties(templatesPath: string, filename: string): Properties {
    return new Properties(loadFile(templatesPath, filename));
}

export function writeProperties(path: string, filename: string, properties: Properties) {
    writeToFile(path, filename, properties.format());
}

export function mergeProperties(base: Properties, override: Properties): Properties {
    const mergedProperties = new PropertiesEditor(base.format())

    override.collection.forEach((property) => {
        const baseMatchedProp = base.collection.find(p => p.key === property.key)
        const mergedPropValue = mergeProperty(property.key, property.value, baseMatchedProp ? baseMatchedProp.value : undefined);
        mergedProperties.upsert(property.key, mergedPropValue)
    });

    return mergedProperties;
}

/**
 * Merging common and project specific properties, the specific may override the base ones.
 * @param specificValue of property from specific project, has higher order
 * @param baseValue of property from common base rules
 * @returns 
 */
function mergeProperty(key: string, specificValue: string, baseValue?: string): string {
    let resultingValue = specificValue;
    if (!baseValue) return specificValue;

    if (key === 'sonar.exclusions' ||
        key === 'sonar.coverage.exclusions') {
        const currentValues: string[] = baseValue.split(',');
        const overrideValues: string[] = specificValue.split(',');
        currentValues.push(...overrideValues);
        const dedupValues = [...new Set(currentValues)];
        resultingValue = dedupValues.map(v => v.trim()).join(',');
    }

    return resultingValue;
}

