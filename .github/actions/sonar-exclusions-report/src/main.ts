import * as core from '@actions/core';
import { reportExcludedFiles } from './exclusions/file-exclusions';

function run() {
    const propPath = '.';
    reportExcludedFiles(propPath, 'sonar-project.properties', 'sonar.exclusions');
    reportExcludedFiles(propPath, 'sonar-project.properties', 'sonar.coverage.exclusions');
}

run();
