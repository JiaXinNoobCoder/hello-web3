class MerkleTree {
    constructor(leaves, concat) {
        this.leaves = leaves;
        this.concat = concat;
        
    }
    getRoot() {
        if (!this.leaves) {
            return null;
        } 
        const queue = [];
        let rootHash = null;
        queue.push([this.leaves[0], 1]);
        const len = this.leaves.length;
        for (let i = 1; i < len; i++) {
            let curr = [this.leaves[i], 1];
            while (queue.length > 0) {
                let tail = queue.pop();
                if (curr[1] === tail[1]) {
                    curr[0] = this.concat(tail[0], curr[0]);
                    curr[1] = tail[1] + curr[1];
                    continue; 
                }
                queue.push(tail);
                break;
            }
            queue.push(curr);
        }
        rootHash = queue.pop();
        while (queue.length > 0) {
            let tail = queue.pop();
            rootHash[0] = this.concat(tail[0], rootHash[0]);
            rootHash[1] += tail[1];
        }
        return rootHash[0];
        
    }
}

module.exports = MerkleTree;