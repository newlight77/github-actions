import { expect } from 'chai';
import { ensureAllowedStack } from '../../../util/stack-util';


describe("stack-util", () => {
  it("should accept a valid stack", () => {
    const projectStack = 'node';

    const result = ensureAllowedStack(projectStack);

    expect(result).to.eql('node');

  });

  it("should fallback to default when having an invalid stack", () => {
    const projectStack = 'go';

    const result = ensureAllowedStack(projectStack);

    expect(result).to.eql('default');

  });
});
