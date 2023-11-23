import * as core from '@actions/core';
import * as path from 'path';
import { ensureAllowedStack } from './properties/policies';
import { loadProperties, mergeProperties, writeProperties } from './properties/prop-util';

let templatesPath = path.join(__dirname, '../../templates');

export async function mergePropertiesFile(propPath: string, projectStack: string) {
    const stack = ensureAllowedStack(projectStack);

    const defaultProp = loadProperties(templatesPath, 'default.properties');
    core.info('default.properties', JSON.stringify(defaultProp.format()));
    
    const projectProp = loadProperties(templatesPath, `${stack}.properties`);
    core.info(`common ${stack}.properties`, JSON.stringify(projectProp.format()));

    const mergedProp = mergeProperties(defaultProp, projectProp);
    core.info('merged properties', JSON.stringify(mergedProp.format()));

    writeProperties(propPath, 'sonar-project.properties', mergedProp)
    core.info(`merged properties : ${propPath}/sonar-project.properties`);
}

function run() {
    const projectStack: string = core.getInput('project-stack');
    const propPath: string = core.getInput('sonar-properties-path');
    mergePropertiesFile(propPath, projectStack)
}

run();
