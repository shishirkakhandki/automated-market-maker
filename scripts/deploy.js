const { ethers } = require("hardhat");

async function main() {
  // Deploy Token0
  const Token0 = await ethers.deployContract("Token0", [10000]); // Replace with your Token0 contract's name

  await Token0.waitForDeployment();

  console.log("Token0 deployed to:", await Token0.getAddress());

  // Deploy Token1
  const Token1 = await ethers.deployContract("Token1", [10000]); // Replace with your Token1 contract's name
  // const token1Instance = await Token1.deploy(10000);

  await Token1.waitForDeployment();

  console.log("Token1 deployed to:", await Token1.getAddress());

  // Use Token0 and Token1 addresses in AMM contract deployment
  const token0Address = await Token0.getAddress();
  const token1Address = await Token1.getAddress();

  // Deploy the AMM contract
  const AMMContract = await ethers.deployContract("CPAMM", [
    token0Address,
    token1Address,
  ]); // Replace with your AMM contract's name
  //const ammInstance = await AMMContract.deploy(token0Address, token1Address);

  await AMMContract.waitForDeployment();

  console.log("AMM Contract deployed to:", await AMMContract.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
