import {useState,useEffect} from 'react';
import {ethers} from 'ethers';
import NFT from './../BioNFT2.json'
import { StyleSheet, View} from "react-native";
import { Textarea } from '@chakra-ui/react';
import axios from 'axios';


const NFTadd='0xBC3ACfC3218566B6a04c8105f5e828441Dc38615';


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
            let tx = await contract.claimItem(metaData);
         
            console.log('response:',tx);
            await tx.wait(1);
            window.alert("Thank you for minting the NFT.")

        }
        catch(err){
            console.log("error:",err)

        }
    }
    setMetaData('');
    window.location.reload(true);
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