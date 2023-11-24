import { expect } from 'chai';
import { mergePropertiesFile } from '../main';
import { loadProperties } from '../properties/prop-util';

describe("main merge properties file", () => {

    it("should merge properties file with project specific properties", () => {
        const projectStack = 'node';
        const propPath = __dirname + '/../..';

        mergePropertiesFile(propPath, projectStack);

        const properties = loadProperties(propPath, 'sonar-project.properties');

        const prop = properties.collection.find(p => p.key === 'sonar.sourceEncoding');
        expect(prop?.value).to.eql('UTF-8');
    });
});
