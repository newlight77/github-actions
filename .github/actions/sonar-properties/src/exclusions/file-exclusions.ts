import * as core from '@actions/core';
import { Path, glob } from 'glob';
import { loadProperties } from '../properties/util/prop-util';
import { writeToFile } from '../util/file-util';


export async function reportExcludedFiles(propPath: string, propFilename: string, propertyKey: string): Promise<string[]> {
    // it's preferable to load from file because prop.collection is not reliable.
    const properties = loadProperties(propPath, propFilename);

    const exclusions = properties.collection.find(p => p.key === propertyKey);
    const exclusionsPaths = await listMatchedFiles(exclusions ? exclusions.value.split(',') : []);
    const excludedFiles = await getFilesWithChildren(exclusionsPaths);
    writeToFile(propPath, propertyKey, excludedFiles.join('\n'));

    core.info(`\n::group::<---excluded files : ${propertyKey} --->\n`);
    excludedFiles.forEach(p => core.info(`file : ${p}`));
    core.info(`\n::endgroup::<---excluded files : ${propertyKey} --->\n`);

    return excludedFiles;
}

async function getFilesWithChildren(paths: Path[]): Promise<string[]> {
    const accList: string[] = [];
    paths.forEach((path) => {
        if (path.isDirectory()) {
            getExcludedChildren(accList, path);
        } else {
            accList.push(`${path.relative()}/${path.name}`);
        }
    });

    return accList;
}

function getExcludedChildren(accList: string[], parentPath: Path) {
    parentPath.children().forEach(path => {
        if (path.isDirectory()) {
            getExcludedChildren(accList, path);
        } else {
            accList.push(`${path.relative()}`);
        }
    })
}

function listMatchedFiles(patterns: string[]): Promise<Path[]> {
    return glob(patterns, { ignore: 'node_modules/**', withFileTypes: true });
}
