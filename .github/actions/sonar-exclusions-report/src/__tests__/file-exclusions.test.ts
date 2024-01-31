import { expect } from 'chai';
import { reportExcludedFiles } from '../exclusions/file-exclusions';


describe("file-exclusions : print excluded files", () => {
    const propPath = __dirname;
    const propFilename = 'sonar-project.properties';


    it("should match existing files for coverage exclusions rules", async() => {

        const result = await reportExcludedFiles(propPath, propFilename, 'sonar.coverage.exclusions');

        expect(result).to.eql([
            'src/exclusions/file-exclusions.ts',
            'src/__tests__/file-exclusions.test.ts',
        ]);
    });

    it("should match existing files for scan exclusions rules", async() => {

        const result = await reportExcludedFiles(propPath, propFilename, 'sonar.exclusions');

        expect(result).to.eql([
            'src/__tests__/file-exclusions.test.ts',
        ]);
    });
});