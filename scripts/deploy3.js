
const hre = require("hardhat");

async function main() {

  const NFT = await hre.ethers.getContractFactory("BioNFT2");
  const nft = await NFT.deploy();

  await nft.deployed();

  console.log("BioNFT2 deployed to:", nft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
