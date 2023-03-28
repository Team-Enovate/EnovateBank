
const main=async() =>{
  const enovateToken = await hre.ethers.getContractFactory("EnovateToken");
  const EnovateToken = await enovateToken.deploy("ENOVATE","ENV","1000000000000000000000000000");

  await EnovateToken.deployed();
  console.log("EnovateToken deployed to:", EnovateToken.address)

  // second contract
  
  const enovateBank = await hre.ethers.getContractFactory("EnovateBank");
  const EnovateBank = await enovateBank.deploy(EnovateToken.address);

  await EnovateBank.deployed();
  console.log("EnovateBank deployed to:", EnovateBank.address)


}


const runMain=async()=>{
  try {
    await main();
    process.exit(0);
    
  } catch (error) {
    console.error(error);
    process.exit(1);
    
  }
}
runMain();