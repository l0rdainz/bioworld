
const hre = require("hardhat");

async function main() {

  const BioNFT = await hre.ethers.getContractFactory("BioNFT");
  const bionft = await BioNFT.deploy();

  await bionft.deployed();

  console.log("BioNFT deployed to:", bionft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
