import {useState} from 'react';
import axios from 'axios';
import { StyleSheet, View } from "react-native";
import { Textarea } from '@chakra-ui/react';

const BioNFTAddress = "0xFCC7C71f25647F19D718E0d269054b23E3ca7ee5";
const MainMint = ({accounts,setAccounts})=>{
    const [ name,setName] = useState("");
    const [ Description,setDescription] = useState("");
    const [ image,setImage] = useState("");
    const isConnected = Boolean(accounts[0]);



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
    return(
        <div>
           
            <h1>BioWorlds</h1>
           
          
               
            <View style={styles.container}>
            <p >What is your ideal universe? What about somewhere with unlimited money making opportunities?
                Join us in BioWorld, a Biologists' heaven where you can find any living cells or their components.
                From Jacob the Bacteria to Frank the mutated Koji. We've got you covered fam!
            </p>
            </View>
          
            
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
                 
                    </div>
                    
            ):(
                <p>Not Connected</p>
            )}
      </div>
    );
};

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

export default MainMint