import { expect } from 'chai';
import { reportExcludedFiles } from '../file-exclusions';


describe("file-exclusions : print excluded files", () => {
    const propPath = __dirname;
    const propFilename = 'sonar-project.properties';


    it("should match existing files for coverage exclusions rules", async() => {

        const result = await reportExcludedFiles(propPath, propFilename, 'sonar.coverage.exclusions');

        expect(result).to.eql([
            'src/exclusions/file-exclusions.ts/file-exclusions.ts',
            'src/exclusions/__tests__/file-exclusions.test.ts/file-exclusions.test.ts',
        ]);
    });

    it("should match existing files for scan exclusions rules", async() => {

        const result = await reportExcludedFiles(propPath, propFilename, 'sonar.exclusions');

        expect(result).to.eql([
            'src/exclusions/__tests__/file-exclusions.test.ts/file-exclusions.test.ts',
        ]);
    });
});