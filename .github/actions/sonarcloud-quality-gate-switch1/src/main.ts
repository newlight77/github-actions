import * as core from '@actions/core';
import { getGateByProject, selectGate } from './providers/sonar-provider';
import { getHeadCommitMessage } from './providers/git-provider';

async function run() {
    const sonarToken: string = core.getInput('sonarcloud-token');
    const organization: string = core.getInput('organization');
    const projectKey: string = core.getInput('project-key');
    const gateId: string = core.getInput('tmp-gate-id');
    const headCommit: string= core.getInput('pr-head-commit');

    const patternOfCommitToSkip = "Merge branch 'master' into";
    const headCommitMessage: string = await getHeadCommitMessage(headCommit, patternOfCommitToSkip);
    core.saveState('head-commit-message', headCommitMessage);

    if (!headCommitMessage.includes('[bypass quality-gate]')) {
        core.info(`Quality Gate : no bypass`);
        return;
    }

    // const currentGate = await getGateByProject(sonarToken, organization, projectKey);
    // core.saveState('current-gate-id', currentGate.id);

    // selectGate(sonarToken, organization, projectKey, gateId);
    core.setOutput('bypassed', 'true');
}

run();
