import * as core from '@actions/core';
import { mergePropertiesFile } from './properties/prop-merger';
import { reportExcludedFiles } from './exclusions/file-exclusions';

function run() {
    const projectStack: string = core.getInput('project-stack');
    const propPath = '.';
    core.info(`args : projectStack=${projectStack} propPath=${propPath}`);
    
    mergePropertiesFile(propPath, 'sonar-project.properties', projectStack);

    reportExcludedFiles(propPath, 'sonar-project.properties', 'sonar.exclusions');
    reportExcludedFiles(propPath, 'sonar-project.properties', 'sonar.coverage.exclusions');
}

run();
