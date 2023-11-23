import * as core from '@actions/core';
import { ensureAllowedStack } from './properties/policies';
import { loadProperties, mergeProperties, writeProperties } from './properties/prop-util';

const templatesPath = '../../templates';


export async function mergePropertiesFile(propPath: string, projectStack: string) {
    const stack = ensureAllowedStack(projectStack);

    const defaultProp = loadProperties(templatesPath, 'default.properties');
    core.info(`default.properties : ${defaultProp}`);
    
    const projectProp = loadProperties(templatesPath, `${stack}.properties`);
    core.info(`default.properties : ${projectProp}`);

    const mergedProp = mergeProperties(defaultProp, projectProp);

    writeProperties(propPath, 'sonar-project.properties', mergedProp)
}

function run() {
    const projectStack: string = core.getInput('project-stack');
    const propPath: string = core.getInput('sonar-properties-path');
    mergePropertiesFile(propPath, projectStack)
}

run();
