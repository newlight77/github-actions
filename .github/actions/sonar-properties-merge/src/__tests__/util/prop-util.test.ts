import { expect } from 'chai';
import { Properties } from 'properties-file';
import { writeProperties, loadProperties } from '../../util/prop-util';


describe("prop-util : load properties", () => {
    const templatesPath = __dirname + '/../templates';
    it("should load a properties from valid file", () => {
        const propFile = 'test.properties';

        const properties = loadProperties(templatesPath, propFile);

        // assert
        const value = properties.collection.find(p => p.key === 'sonar.javascript.lcov.reportPaths')!.value;
        expect(value).to.eql('coverage/lcov-merged.info');
    });

    it("should load a properties from invalid file", () => {
        const propFile = 'test.properties';

        const properties = loadProperties(templatesPath, propFile);

        // assert
        const value = properties.collection.filter(p => p.key === 'sonar.javascript.lcov.reportPaths').pop()?.value;
        expect(value).to.eql('coverage/lcov-merged.info');
    });
});

describe("pop-util : write properties to file", () => {
    const templatesPath = __dirname + '/../templates';
    it("should load a properties from valid file", () => {
        const propFile = 'write-prop.properties';
        const properties = new Properties("write.prop=done");

        writeProperties(templatesPath, propFile, properties);

        // assert
        const expected = loadProperties(templatesPath, propFile);
        const value = expected.collection.find(p => p.key === 'write.prop')!.value;
        expect(value).to.eql('done');
    });
});
