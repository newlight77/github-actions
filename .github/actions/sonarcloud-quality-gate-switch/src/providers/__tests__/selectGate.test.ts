import { expect } from 'chai';
import { getGateByProject, selectGate } from "../sonar-provider";

describe("select quality gate", () => {
  it.skip("integration test : select a gate", () => {
    const sonarToken = '';
    const organization = 'newlight77';
    const projectKey = 'newlight77_kata-monorepo-github-actions';
    const gateId = '10003';

    selectGate(sonarToken, organization, projectKey, gateId);
  });

  it.skip("integration test : get gate by project", async () => {
    const sonarToken = '';
    const organization = 'newlight77';
    const projectKey = 'newlight77_kata-monorepo-github-actions';

    const { name } = await getGateByProject(sonarToken, organization, projectKey);
    console.log(name);

    expect(name).to.eql('Sonar way');
  });
});
