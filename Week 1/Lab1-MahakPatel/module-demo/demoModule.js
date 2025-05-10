import { addItem, getItemCount } from './collectionModule.js';

addItem("apples");
addItem("oranges");
addItem("bananas");
addItem("pineapple");
addItem("mango");

console.log(`Current item count: ${getItemCount()}`);

addItem("grapes");
console.log(`Updated item count: ${getItemCount()}`);