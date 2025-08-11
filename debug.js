import { sutra1211 } from './sutras/1.2.11/index.js';

const context = {
  root: 'गुप्',
  affix: 'लिङ्',
  substitute: 'अ',
  followingAffix: 'ते'
};

console.log('Testing sutra with context:', context);
const result = sutra1211('गुप्अते', context);
console.log('Result keys:', Object.keys(result));
console.log('Result:', result);
