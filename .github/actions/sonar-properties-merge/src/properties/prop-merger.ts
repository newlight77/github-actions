import * as core from '@actions/core';
import * as path from 'path';
import { ensureAllowedStack } from '../util/stack-util';
import { loadProperties, writeProperties } from '../util/prop-util';
import { Properties } from 'properties-file';
import { PropertiesEditor } from 'properties-file/editor';

let templatesPath = path.join(__dirname, '/../../templates');

export function mergePropertiesFile(propPath: string, propFilename: string, projectStack: string): Properties {
    const stack = ensureAllowedStack(projectStack);

    const stackProp = loadProperties(templatesPath, `${stack}.properties`);

    const projectProp = loadProperties(propPath, propFilename);

    const finalProp = mergeProperties(stackProp, projectProp);

    writeProperties(propPath, propFilename, finalProp, true);

    return finalProp;
}

export function mergeProperties(base: Properties, override: Properties): Properties {
    const mergedProperties = new PropertiesEditor(base.format())
    core.info(`\n::group::<---merging properties : --->\n`);

    override.collection.forEach((property) => {
        const baseMatchedProp = base.collection.find(p => p.key === property.key)
        const mergedPropValue = mergePropertyValue(property.key, property.value, baseMatchedProp ? baseMatchedProp.value : undefined);
        core.info(`property : ${property.key}=${mergedPropValue}`);
        mergedProperties.upsert(property.key, mergedPropValue)
    });

    core.info(`\n::endgroup::<---merging properties : --->\n`);

    return mergedProperties;
}

/**
 * Merging the common and project specific property values, the specific may override the base one.
 * @param specificValue of property from specific project, has higher order
 * @param baseValue of property from common base rules
 * @returns 
 */
export function mergePropertyValue(key: string, specificValue: string, baseValue?: string): string {
    if (!baseValue) return specificValue;

    if (key === 'sonar.exclusions' ||
        key === 'sonar.coverage.exclusions') {
        const currentValues: string[] = baseValue.split(',');
        const overrideValues: string[] = specificValue.split(',');
        currentValues.push(...overrideValues);
        const dedupValues = [...new Set(currentValues)];
        return dedupValues.map(v => v.trim())
            .filter(p => p && p !== '')
            .join(', ');
    }

    return specificValue;
}