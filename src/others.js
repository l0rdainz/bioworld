import {useState} from 'react';
import {ethers} from 'ethers';
import coinNFT from './Victcoins.json';
import NFT from './BioNFT2.json'
import Trader from './NFTtrader.json'

const coinsAdd= '0x551e0aF7F048c706dc696a85a682C3349c2eE567';
const NFTadd='0x38504815A0501a66517085269F86b979c8ce6cE3';
const traderAdd="0x0818A424C9143f185C88a28AbD6922075cfaf23e";

const Others = ({accounts,setAccounts})=>{
    const [userAccount,setUserAccount] = useState('')
    const [amount,setAmount] = useState(0)
    const [metaData,setMetaData]=useState()
    async function requestAccount(){
      await window.ethereum.request ({method:'eth_requestAccounts'});
    }
    
   async function MintNFT(){
    if(window.ethereum){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract =new ethers.Contract(
            NFTadd,NFT.abi,signer
        );
        try{
            const response = await contract.claimItem(metaData,{
                value:ethers.utils.parseEther((0.01).toString())
            });
                
            console.log('response:',response);

        }
        catch(err){
            console.log("error:",err)

        }
    }
   }
   
   async function listNFT(){
    if(window.ethereum){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract =new ethers.Contract(
            traderAdd,Trader.abi,signer
        );
        try{
            const response = await contract.addListing(1,NFTadd,1); 
            console.log('response:',response);

        }
        catch(err){
            console.log("error:",err)

        }
    
   }}
   
   async function purchaseNFT(){
    if(window.ethereum){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract =new ethers.Contract(
            traderAdd,Trader.abi,signer
        );
        try{
            const response = await contract.purchase(NFTadd,1,1,{
                value:ethers.utils.parseEther((0.01).toString())
            }); 
            console.log('response:',response);

        }
        catch(err){
            console.log("error:",err)

        }
    
   }
   }
  
    async function sendCoins(){
      if(typeof window.ethereum !=='undefined'){
        await requestAccount()
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(coinsAdd,coinNFT.abi,signer)
        const transaction = await contract.transfer(userAccount, amount)
        await transaction.wait()
        console.log(`$(amount) successfully transfered to $(userAccount)`)
      }
    }   
    return(<div className="madness"> <h1>Start Minting BioNFT Now!!</h1>
       <input type="string" placeholder="Enter URL of metadata" 
       onChange={e => setMetaData(e.target.value)}
       ></input>
       <button onClick={MintNFT}>Mint NOW</button>
       <br></br>
       <br></br>
       <br></br>
        <button onClick={sendCoins}>Send Coins</button>
        <input onChange={e => setUserAccount(e.target.value)}
        placeholder="Account ID"/>
         <input onChange={e => setAmount(e.target.value)}
        placeholder="Amount"/>
        <br></br>
        <button onClick={listNFT}>List</button>

        <button onClick={purchaseNFT}>Buy!</button>
        </div>
        
        
        )}

export default Others