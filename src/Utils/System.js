const policiesData = require('./data/companies.json');

export function checkPolicy(number) {  
  for (let policy of policiesData) {
    for (let format in policy.formats) {
      let regexp = new RegExp(policy['formats'][format]);
      if (regexp.test(number)) return [format, policy.sk];
    }
  }
}