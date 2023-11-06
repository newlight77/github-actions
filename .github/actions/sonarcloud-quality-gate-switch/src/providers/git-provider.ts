import * as core from '@actions/core';
import * as exec from '@actions/exec';

export async function getHeadCommitMessage(headCommit: string): Promise<string> {

    const output = await exec.getExecOutput(`git log ${headCommit} --oneline -n1`, []);
    
    core.info(`Pull request head commit message: ${output.stdout}`);

    return output.stdout;
}