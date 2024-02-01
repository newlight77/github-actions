import * as core from '@actions/core';
import { selectGate } from './providers/sonar-provider';

async function run() {
    const sonarToken: string = core.getInput('sonarcloud-token');
    const organization: string = core.getInput('organization');
    const projectKey: string = core.getInput('project-key');

    if (!core.getState('head-commit-message').includes('[bypass quality-gate]')) {
        core.info(`Quality Gate : no bypass`);
        return;
    }

    // const currentGateId = core.getState('current-gate-id');

    // selectGate(sonarToken, organization, projectKey, currentGateId);
}

run();
