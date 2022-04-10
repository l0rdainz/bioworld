import {useState,useEffect} from 'react';
import {ethers} from 'ethers';
import coinNFT from './Victcoins.json';
import NFT from './BioNFT2.json'
import Trader from './NFTtrader.json'

const coinsAdd= '0x551e0aF7F048c706dc696a85a682C3349c2eE567';
const NFTadd='0x2533614c51601d4b727611bdab19d8f7a3876c10';
const traderAdd="0x81dC9c1Ad76747f664fBF4C43759b8C45a490FC5";

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
        const Mintcontract =new ethers.Contract(
            NFTadd,NFT.abi,signer
        );
        const contract =new ethers.Contract(
            traderAdd,Trader.abi,signer
        );
        try{
            await Mintcontract.setApprovalForAll(traderAdd,true)
            const response = await contract.addListing(10,NFTadd,3); 
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
        const reviseamt = ethers.utils.parseEther((amount).toString())
        const transaction = await contract.transfer(userAccount, reviseamt)
        await transaction.wait()
        console.log(`${amount} VICT successfully transfered to ${userAccount}`)
      }
    }  
    
    const [loading, setLoading] = useState(true)
    const [items, setItems] = useState([])
    const loadMarketplaceItems = async () => {
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const Mintcontract =new ethers.Contract(
                NFTadd,NFT.abi,signer
            );
            const marketplace =new ethers.Contract(
                traderAdd,Trader.abi,signer
            );
            
        
     try{
         
        const itemCount = await Mintcontract.balanceOf(traderAdd)
        console.log(itemCount)
        let items = []
        for (let i = 1; i <= itemCount; i++) {
          const item = await Mintcontract.tokenOfOwnerByIndex.call(traderAdd,i)
          console.log(item)
     }}
     catch(err){
        console.log("error:",err)

    }}
    
    //     if (!item.sold) {
    //       // get uri url from nft contract
    //       const uri = await nft.tokenURI(item.tokenId)
    //       // use uri to fetch the nft metadata stored on ipfs 
    //       const response = await fetch(uri)
    //       const metadata = await response.json()
    //       // get total price of item (item price + fee)
    //       const totalPrice = await marketplace.getTotalPrice(item.itemId)
    //       // Add item to items array
    //       items.push({
    //         totalPrice,
    //         itemId: item.itemId,
    //         seller: item.seller,
    //         name: metadata.name,
    //         description: metadata.description,
    //         image: metadata.image
    //       })
    //     }
    //   }
    //   setLoading(false)
    //   setItems(items)
    }

    useEffect(() => {
        loadMarketplaceItems()
      }, [])
    //   if (loading) return (
    //     <main style={{ padding: "1rem 0" }}>
    //       <h2>Loading...</h2>
    //     </main>
    //   )
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
        <br></br>
        <button onClick={listNFT}>List</button>
        <button onClick={purchaseNFT}>Buy!</button>
        </div>
        
        
        )}

export default Others