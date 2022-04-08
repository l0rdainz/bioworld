
const hre = require("hardhat");

async function main() {

  const Trader = await hre.ethers.getContractFactory("NFTtrader");
  const trader = await Trader.deploy();

  await trader.deployed();

  console.log("NFTtrader deployed to:", trader.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
