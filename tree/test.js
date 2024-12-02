const MerkleTree = require('./proofs');
const concat = (a, b) => `Hash(${a} + ${b})`;
const leaves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const merkleTree = new MerkleTree(leaves, concat);
console.log(merkleTree.getProof(8));