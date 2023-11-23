import { expect } from 'chai';
import { writeProperties, loadProperties, mergeProperties } from '../prop-util';
import { Properties } from 'properties-file';


describe("pop-util : load properties", () => {
    const templatesPath = './__test__/templates';
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
    const templatesPath = './__test__/templates';
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


describe("pop-util : merge properties", () => {
    const templatesPath = './__test__/templates';

    it("should override a property when having empty base", () => {
        const baseProperties = loadProperties(templatesPath, 'base.properties');
        const testProperties = loadProperties(templatesPath, 'test.properties');

        // act
        const merged = mergeProperties(baseProperties, testProperties);

        // assert
        expect(merged.format().includes('test.value')).to.eql(true);
    });

    it("should keep the base property when there is no property to override", () => {
        const baseProperties = loadProperties(templatesPath, 'base.properties');
        const testProperties = loadProperties(templatesPath, 'test.properties');

        // act
        const merged = mergeProperties(baseProperties, testProperties);

        // assert
        expect(merged.format().includes('base.value')).to.eql(true);
    });


    it("should override a multiple value property", () => {
        const baseProperties = loadProperties(templatesPath, 'base.properties');
        const testProperties = loadProperties(templatesPath, 'test.properties');

        // act
        const merged = mergeProperties(baseProperties, testProperties);

        // assert
        expect(merged.format().includes('value1,value2,value3,value4,value5')).to.eql(true);
    });
});