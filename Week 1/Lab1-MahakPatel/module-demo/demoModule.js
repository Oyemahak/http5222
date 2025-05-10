import { addItem, getItemCount } from './collectionModule.js';

addItem("apples");
addItem("oranges");
addItem("bananas");

console.log(`Current item count: ${getItemCount()}`);

addItem("grapes");
console.log(`Updated item count: ${getItemCount()}`);