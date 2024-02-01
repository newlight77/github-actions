import * as core from '@actions/core';
import { expect } from 'chai';
import { getHeadCommitMessage } from '../git-provider';


describe("git-provider : get head commit message", () => {

    const patternOfCommitToSkip = "shorter ci";

/* given the git history
ed0846e retrieving sonar properties templates
cfa564b shorter ci
44aecf9 initial github actions with default workflow
*/

    it("should get last commit message", async() => {
        const headCommit = 'ed0846e';

        const message = await getHeadCommitMessage(headCommit, patternOfCommitToSkip);

        core.info(`last head commit : ${message} `);

        expect(message).to.include('retrieving sonar properties templates');
    });

    it("should get second last commit message, skipping last one matching the prefix pattern", async() => {
        const headCommit = 'cfa564b';

        const message = await getHeadCommitMessage(headCommit, patternOfCommitToSkip);

        core.info(`last second head commit : ${message} `);

        expect(message).to.include('initial github actions with default workflow');
    });

});
