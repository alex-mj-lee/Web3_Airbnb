const hre = require("hardhat");

async function main() {
  const airbnbFactory = await hre.ethers.getContractFactory("Airbnb");
  const airbnbContract = await airbnbFactory.deploy();
  await airbnbContract.deployed();

  console.log("Airbnb deployed address:", airbnbContract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
