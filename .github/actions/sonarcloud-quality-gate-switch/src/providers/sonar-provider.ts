import * as core from '@actions/core';
import axios from 'axios';


const host = "https://sonarcloud.io";
const baseUrl = "/api/qualitygates";

type QualityGate = {
    default: boolean,
    id: number,
    name: string
}

export async function selectGate(sonarToken: string, organization: string, projectKey: string, gateId: string) {
    try {
        core.info(`Quality Gate : switching of ${projectKey} to ${gateId}`);

        const url = `${host}${baseUrl}/select`;
        const params = {
            organization: organization,
            projectKey: projectKey,
            gateId: gateId
        }
        core.debug(`calling sonarcloud params=${JSON.stringify(params)}`);

        await axios.post(url, {}, { 
            params: params,
            auth: {
                username: sonarToken,
                password: ''
            }
        });

        core.info(`Quality Gate : ${projectKey} is assigned to gate=${gateId}`);

    } catch (error) {
        // Fail the workflow run if an error occurs
        if (error instanceof Error) core.setFailed(error.message)
    }
}

export async function getGateByProject(sonarToken: string, organization: string, projectKey: string): Promise<QualityGate> {
    try {
        core.info(`Retrieve the quality gate for projectKey=${projectKey}`);

        const url = `${host}${baseUrl}/get_by_project`;
        const params = {
            organization: organization,
            project: projectKey,
        }

        core.debug(`calling sonarcloud params=${JSON.stringify(params)}`);

        const response = await axios.get(url,
            { 
                params: params,
                auth: {
                    username: sonarToken,
                    password: ''
                }
            }
        );

        const gate = response.data;

        core.info(`Quality Gate : ${projectKey} is assigned to gate=${JSON.stringify(gate.qualityGate)}`);

        return gate.qualityGate ;

    } catch (error) {
        // Fail the workflow run if an error occurs
        if (error instanceof Error) core.setFailed(error.message)

        return { default: false, id: 0, name: "" };
    }
}
