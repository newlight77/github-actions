import { expect } from 'chai';
import { loadFile, writeToFile } from '../file-util';


describe("file-util", () => {
    const relPath = './__test__/templates';

    it("should load a valid properties file", () => {
        const propFile = 'test.properties';

        const result = loadFile(relPath, propFile);

        expect(result.includes('test.key')).to.eql(true);
    });

    it("should fallback to empty content when having invalid properties file", () => {
        const propFile = 'invalid.properties';

        const result = loadFile(relPath, propFile);

        expect(result.startsWith('# empty')).to.eql(true);
    });

    it("should write to file", () => {
        const propFile = 'write.properties';

        writeToFile(relPath, propFile, "write=true");

        expect(loadFile(relPath, propFile).includes('write=true')).to.eql(true);
    });
});