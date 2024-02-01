import * as core from '@actions/core';
import * as exec from '@actions/exec';

export async function getHeadCommitMessage(headCommit: string, patternOfCommitToSkip: string): Promise<string> {

    let message = (await exec.getExecOutput(`git log ${headCommit} --format=%5%- --oneline -n1`, [])).stdout;

    if (message.includes(patternOfCommitToSkip)) {
        message = await secondLastCommit(headCommit);
    }

    core.info(`Pull request head commit message=${message}`);

    return message;
}

async function secondLastCommit(headCommit: string): Promise<string> {
    let message = (await exec.getExecOutput(`git log ${headCommit} --format=%5%- --oneline -n2`, [])).stdout;
    message = message.split('\n')[1];
    return message.replace('\n', '');
}