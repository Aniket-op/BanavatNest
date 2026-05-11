const hi = require('./messages/hi.json');
console.log("Keys in hi.json:");
console.log(Object.keys(hi));
console.log("Has boardPage: " + !!hi.boardPage);
console.log("Has collaborationPage: " + !!hi.collaborationPage);

const en = require('./messages/en.json');
console.log("\nKeys in en.json:");
console.log("Has boardPage: " + !!en.boardPage);
console.log("Has collaborationPage: " + !!en.collaborationPage);

console.log("\nHas ourEcosystem in hi.json/nav: " + !!hi.nav.ourEcosystem);
