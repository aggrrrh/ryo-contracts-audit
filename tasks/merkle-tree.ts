import { task, types } from 'hardhat/config'
import { StandardMerkleTree } from '@openzeppelin/merkle-tree'
import { createReadStream, createWriteStream } from 'fs'
import { createInterface } from 'readline'
import { writeFileSync, readFileSync } from 'fs'

task('merkle-tree:build', 'Builds merkle tree from provided file')
  .addParam('path', 'Path to CSV file containing account information and balances. See accounts.example.csv', undefined, types.string)
  .addParam('output', 'Output file path', 'tree.json', types.string)
  .addParam('skipHeader', 'Set to true if the file doesn\'t have a header row. Default is true.', true, types.boolean)
  .setAction(async (taskArgs, env) => {
    let { skipHeader } = taskArgs
    const { path, output } = taskArgs

    const accounts = []

    const rl = createInterface({
      input: createReadStream(path),
      crlfDelay: Infinity
    })

    for await (const line of rl) {
      if (skipHeader) {
        skipHeader = false
        continue
      }

      const [address, balance] = line.split(',').map(item => item.trim().replace(/^"|"$/g, ''))

      accounts.push([ address, balance ])
    }

    const merkleTree = StandardMerkleTree.of(accounts, ["address", "uint256"])
    writeFileSync(output, JSON.stringify(merkleTree.dump()));

    console.log('Merkle tree successfully written to:', output)
    console.log('Root:', merkleTree.root)
  })

task('merkle-tree:get-proof', 'Returns Merkle proof from the provided file and a leaf index')
.addParam('path', 'Path to json file containing a Merkle tree', 'tree.json', types.string)
.addParam('leaf', 'Leaf index', undefined, types.int)
.addParam('output', 'Output file path', 'tree-proof.json', types.string)
.setAction(async (taskArgs, env) => {
  const { path, leaf, output } = taskArgs

  const tree = StandardMerkleTree.load(JSON.parse(readFileSync(path, "utf8")));

  for (const [i, v] of tree.entries()) {
    if (i === leaf) {
      const proof = tree.getProof(i);
      console.log('Value:', v);
      writeFileSync(output, JSON.stringify(proof));

      console.log('Merkle tree successfully written to:', output)
    }
  }
})
