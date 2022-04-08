import {useState} from 'react';
import {ethers} from 'ethers';
import coinNFT from './Victcoins.json';
import NFT from './BioNFT2.json'
const coinsAdd= '0x551e0aF7F048c706dc696a85a682C3349c2eE567';
const NFTadd='0x72E4835576ad237eb63Bd87825eD56F520309c4f';

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
            const response = await contract.claimItem(metaData);
                
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
        
        
        </div>
        
        )}

export default Others