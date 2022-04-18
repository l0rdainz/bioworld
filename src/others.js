import {useState,useEffect} from 'react';
import {ethers} from 'ethers';
import coinNFT from './Victcoins.json';
import NFT from './BioNFT2.json'
import Trader from './NFTtrader.json'
import { StyleSheet, View} from "react-native";

const coinsAdd= '0x551e0aF7F048c706dc696a85a682C3349c2eE567';
const NFTadd='0x79D6A68E7AfEff80992a4acd49b74B99bfa7D9BB';
const traderAdd="0x81dC9c1Ad76747f664fBF4C43759b8C45a490FC5";

const Others = ({accounts,setAccounts,items,setItems})=>{
    const [userAccount,setUserAccount] = useState('')
    const [amount,setAmount] = useState(0)
    const [metaData,setMetaData]=useState()
    async function requestAccount(){
      await window.ethereum.request ({method:'eth_requestAccounts'});
    }
    
   async function MintNFT(event){
       event.preventDefault()
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
            var number=(await contract.totalSupply()).toString()
            window.alert("Thank you for minting the NFT.")
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
  
    async function sendCoins(event){
        event.preventDefault();
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
         
        const itemCount = await Mintcontract.totalSupply()
       
        let items = []
        for (let i = 3; i <= itemCount; i++) {
          const uri = await Mintcontract.tokenURI(i)
          //iterate through the tokenURI(index) to get URI
          const response = await fetch(uri)
          const metadata = await response.json()
          const selldata = await marketplace.listings(NFTadd,i)
          items.push({
                    itemId: i,
                    seller:selldata.seller,
                    price:selldata.price,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image
                  })
      
      
 
      }
      setItems(items) 
      console.log({items}.items)
    
    }
     catch(err){
        console.log("error:",err)

    }}
    
   
      setLoading(false)
      
    }

 function Testing(){
    const newitem={items}.items
    console.log(newitem)
    const Test2= newitem.map(
        ({ seller, itemId }) => `Seller: ${seller} itemId: ${itemId} `
      );
    
   console.log(Test2)
}
    useEffect(() => {
        loadMarketplaceItems()
      }, [])
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Loading...</h2>
        </main>
      )
    return(<div className="madness"> <h1>Start Minting BioNFT Now!!</h1>
       <form>
       <View style={styles.form}>
       <input type="string" placeholder="Enter URL of metadata" 
       onChange={e => setMetaData(e.target.value)}
       ></input>
       <button onClick={MintNFT}>Mint NOW</button>
       </View>
       </form>
       <br></br>
       <br></br>
       <br></br>
        <h1>Send Vict to Other Wallets</h1>
        <form>
        <View style={styles.form}>
        <input onChange={e => setUserAccount(e.target.value)}
        placeholder="Wallet Address"/>
         <input onChange={e => setAmount(e.target.value)}
        placeholder="Amount"/>
        <button onClick={sendCoins}>Send Coins</button>
        </View>
        </form>


        <br></br>
        <br></br>
        <button onClick={listNFT}>List</button>
        <button onClick={purchaseNFT}>Buy!</button>
        <br></br>
        <h2>Marketplace</h2>
        <button onClick={Testing}>TEST!</button>
        <ul>
  
        </ul>
        
    
        
        </div>
        
        
        )}
        const styles = StyleSheet.create({
            container: {
              flex: 1,
              marginTop: 8,
              marginRight: '20%',
              marginLeft: '20%',
              paddingLeft: '5%',
              paddingRight: '5%',
              backgroundColor: 'rgba(108, 122, 137, .4)',
              opacity:1
            },
            form: {
                flex: 1,
                marginTop: 8,
                marginRight: '10%',
                marginLeft: '10%',
                paddingLeft: '10%',
                paddingRight: '10%',
                opacity:1
              },
          });


export default Others