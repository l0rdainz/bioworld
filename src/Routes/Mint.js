import {useState,useEffect} from 'react';
import {ethers} from 'ethers';
import coinNFT from './../Victcoins.json';
import NFT from './../BioNFT2.json'
import Trader from './../NFTtrader.json'
import { StyleSheet, View} from "react-native";
import { Textarea } from '@chakra-ui/react';
import axios from 'axios';

const coinsAdd= '0x551e0aF7F048c706dc696a85a682C3349c2eE567';
const NFTadd='0x79D6A68E7AfEff80992a4acd49b74B99bfa7D9BB';
const traderAdd="0x2b0e98Dd08b2E8B9Ab380eec62eC3fD45C9a366f";

const Mint = ({accounts,setAccounts,items,setItems})=>{
    const isConnected = Boolean(accounts[0]);
    const [ name,setName] = useState("");
    const [ Description,setDescription] = useState("");
    const [ image,setImage] = useState("");
    const [metaData,setMetaData]=useState()
    
   async function MintNFT(event){
    event.preventDefault();
    if(window.ethereum){
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract =new ethers.Contract(
            NFTadd,NFT.abi,signer
        );
        try{
            const response = await contract.claimItem(metaData);
                
            console.log('response:',response);
            var number=(await contract.totalSupply()).toString()
            window.alert("Thank you for minting the NFT.")
        }
        catch(err){
            console.log("error:",err)

        }
    }
   }
   async function generatejson(event){
    event.preventDefault();
const headers= {
 "Api-Key" :"eb322cec-bac8-11ec-b95c-0242ac110002"
}
axios.post('https://json.extendsclass.com/gui/bin',[{name},{Description},{image}],{headers: headers})
.then(res => {
    console.log(res);
    const uri = (res.data.uri);
    window.alert(uri)
  })
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
  
   

    return(<div className="madness"> 
       <br></br>
       <br></br>
       <br></br>
       {isConnected?(
                <div>
                    <div>
                    <h1>Tell Us About Your NFT</h1> 
                    <form>
                    <View style={styles.form}>
                    <input type='string' placeholder="NFT Title" value={name} onChange={e => setName(e.target.value)}/><br></br>
                    <Textarea type='string' placeholder="NFT Description" value={Description} onChange={e => setDescription(e.target.value)}/><br></br>
                    <input type='string' placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)}/><br></br>
                      
                    <button onClick={generatejson}>Generate</button>
                    </View>
                    </form>
                    </div>

                    <h1>Start Minting BioNFT Now!!</h1>
       <form>
       <View style={styles.form}>
       <input type="string" placeholder="Enter URL of metadata" 
       onChange={e => setMetaData(e.target.value)}
       ></input>
       <button onClick={MintNFT}>Mint NOW</button>
       </View>
       </form>
                    
                 
                    </div>
                    
            ):(
                <h1>Connect Now to Start Minting</h1>
            )}
    
        
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


export default Mint