import * as core from '@actions/core';
import * as path from 'path';
import { ensureAllowedStack } from './properties/policies';
import { loadProperties, mergeProperties, writeProperties } from './properties/prop-util';

let templatesPath = path.join(__dirname, '/../templates');

export async function mergePropertiesFile(propPath: string, projectStack: string) {
    const stack = ensureAllowedStack(projectStack);

    const stackProp = loadProperties(templatesPath, `${stack}.properties`);

    const projectProp = loadProperties(propPath, 'sonar-project.properties');

    const finalProp = mergeProperties(stackProp, projectProp);
    core.info(`final properties : ${finalProp.format()}`);

    writeProperties(propPath, 'sonar-project.properties', finalProp, true);
    core.info(`final properties : ${propPath}/sonar-project.properties`);
}

function run() {
    const projectStack: string = core.getInput('project-stack');
    const propPath = '.';
    core.info(`args : projectStack=${projectStack} propPath=${propPath}`);
    
    mergePropertiesFile(propPath, projectStack)
}

run();
