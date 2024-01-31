import * as core from '@actions/core';
import { mergePropertiesFile } from './properties/prop-merger';

function run() {
    const projectStack: string = core.getInput('project-stack');
    const propPath = '.';
    core.info(`args : projectStack=${projectStack} propPath=${propPath}`);
    
    mergePropertiesFile(propPath, 'sonar-project.properties', projectStack);
}

run();
