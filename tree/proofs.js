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

    getProof(index) {
        if (!this.leaves || this.leaves.length === 1) {
            return [];
        }
        // init
        const queue = Array.from(this.leaves);
        const proofs = [];
        let size = queue.length;
        while (size > 1) {

            if (index % 2) { // odd.. should be right, need left.
                proofs.push({ data: queue[index - 1], left: true });
            } 
            else if (index + 1 < size){
                proofs.push({ data: queue[index + 1], left: false });
            }
            let counter = 0;
            // up to next level
            for (let i = 0; i < size; i += 2, counter++) {
                if ( i+1 < size) {
                    queue[counter] = this.concat(queue[i] , queue[i + 1]);
                    continue;
                }
                queue[counter] = queue[i];
            }

            // update states; 
            size = counter;
            index = Math.floor(index / 2);
        }
        return proofs;
        

    }
}

module.exports = MerkleTree;