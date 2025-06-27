interface ChangelogEntry {
  additions: string[];
  bugfixes: string[];
  changes: string[];
  version: string;
}

const changelog: ChangelogEntry[] = [{
  additions: ['initial release!'],
  bugfixes: [],
  changes: [],
  version: '1.0.0'
}, {
  additions: ['page icon', "example texts in input fields"],
  bugfixes: [],
  changes: ['styling and color improvements', 'minimal HTML cleanup', 'file size optimisations'],
  version: '1.0.1'
}];

export default changelog;
