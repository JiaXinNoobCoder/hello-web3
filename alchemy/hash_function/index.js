const { sha256 } = require("ethereum-cryptography/sha256");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");

// the possible colors that the hash could represent
const COLORS = ['red', 'green', 'blue', 'yellow', 'pink', 'orange'];

// given a hash, return the color that created the hash
function findColor(hash) {
  function caculateHashOfColor(color) {
      const c = color;
      const cBytes = utf8ToBytes(c);
      const cHash = sha256(cBytes);
      return toHex(cHash);
  }
  for (let i = 0; i < COLORS.length; i++) {
      let color = COLORS[i];
      const hashOfColor = caculateHashOfColor(color);
      const hexHash = toHex(hash);
      if (hexHash === hashOfColor) {
          return color;
      }
  }
  return null;
}

module.exports = findColor;