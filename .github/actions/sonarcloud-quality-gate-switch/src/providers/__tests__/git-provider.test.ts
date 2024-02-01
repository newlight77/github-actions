import * as core from '@actions/core';
import { expect } from 'chai';
import { getHeadCommitMessage } from '../git-provider';


const cmdOutput = {
    'git log sha1 --format=%5%- --oneline -n1': { stdout: "sha1 (tag: v1.0.60) Fix/password leak" },
    'git log sha2 --format=%5%- --oneline -n1': { stdout: "sha2 Merge branch 'master' into feat/sonar" },
    'git log sha2 --format=%5%- --oneline -n2': { stdout: `sha2 Merge branch 'master' into feat/sonar
    sha3 feat: allow to bypass the coverage check on quality gate` }
};

jest.mock('@actions/exec', () => ({
    getExecOutput: jest.fn(async (command: string) => cmdOutput[command])
})); 

describe("git-provider : get head commit message", () => {

    const patternOfCommitToSkip = "Merge branch 'master'";

    it("should get last commit message", async() => {
        const headCommit = 'sha1';

        const message = await getHeadCommitMessage(headCommit, patternOfCommitToSkip);

        core.info(`last head commit : ${message} `);

        expect(message).to.include('Fix/password leak');
    });

    it("should get second last commit message, skipping last one matching the prefix pattern", async() => {
        const headCommit = 'sha2';

        const message = await getHeadCommitMessage(headCommit, patternOfCommitToSkip);

        core.info(`last second head commit : ${message} `);

        expect(message).to.include('feat: allow to bypass the coverage check on quality gate');
    });

});
