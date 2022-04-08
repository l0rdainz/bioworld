
const hre = require("hardhat");

async function main() {

  const Coins = await hre.ethers.getContractFactory("Victcoins");
  const coins = await Coins.deploy();

  await coins.deployed();

  console.log("Coins deployed to:", coins.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
