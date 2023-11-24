import * as core from '@actions/core';
import * as path from 'path';
import { ensureAllowedStack } from './util/stack-util';
import { loadProperties, writeProperties } from './util/prop-util';
import { Properties } from 'properties-file';
import { PropertiesEditor } from 'properties-file/editor';

let templatesPath = path.join(__dirname, '/../../templates');

export async function mergePropertiesFile(propPath: string, projectStack: string) {
    const stack = ensureAllowedStack(projectStack);

    const stackProp = loadProperties(templatesPath, `${stack}.properties`);

    const projectProp = loadProperties(propPath, 'sonar-project.properties');

    const finalProp = mergeProperties(stackProp, projectProp);
    core.info(`final properties : <`);
    core.info(finalProp.format());
    core.info(`final properties : >`);

    writeProperties(propPath, 'sonar-project.properties', finalProp, true);
    core.info(`final properties : ${propPath}/sonar-project.properties`);
}

export function mergeProperties(base: Properties, override: Properties): Properties {
    const mergedProperties = new PropertiesEditor(base.format())

    override.collection.forEach((property) => {
        const baseMatchedProp = base.collection.find(p => p.key === property.key)
        const mergedPropValue = mergePropertyValue(property.key, property.value, baseMatchedProp ? baseMatchedProp.value : undefined);
        console.info(`property key : ${property.key}=${mergedPropValue}`);
        mergedProperties.upsert(property.key, mergedPropValue)
    });

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
        return dedupValues.map(v => v.trim()).join(', ');
    }

    return specificValue;
}