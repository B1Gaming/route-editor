interface ChangelogEntry {
  additions: string[];
  bugfixes: string[];
  removals: string[];
  version: `${number}.${number}.${number}`
}

const changelog: ChangelogEntry[] = [{
  additions: ['Initial release!'],
  bugfixes: [],
  removals: [],
  version: '1.0.0'
}];

export default changelog;
