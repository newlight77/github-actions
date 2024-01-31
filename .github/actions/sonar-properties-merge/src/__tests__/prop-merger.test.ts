import { expect } from 'chai';
import { loadProperties } from '../util/prop-util';
import { mergeProperties, mergePropertiesFile } from '../properties/prop-merger';


describe("prop-merger : merge properties file", () => {

  it("should merge properties file with project specific properties", () => {
      const projectStack = 'node';
      const propPath = __dirname;
      const propFilename = '/sonar-project.properties';

      mergePropertiesFile(propPath, propFilename, projectStack);

      const properties = loadProperties(propPath, 'sonar-project.properties');

      const prop = properties.collection.find(p => p.key === 'sonar.sourceEncoding');
      expect(prop?.value).to.eql('UTF-8');
  });
});


describe("prop-merger : merge properties", () => {
  const templatesPath = __dirname + '/templates';

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
      expect(merged.format().includes('value1, value2, value3, value4, value5')).to.eql(true);
  });
});
