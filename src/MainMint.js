import {useState} from 'react';
import axios from 'axios';

const BioNFTAddress = "0xFCC7C71f25647F19D718E0d269054b23E3ca7ee5";
const MainMint = ({accounts,setAccounts})=>{
    const [ name,setName] = useState("");
    const [ Description,setDescription] = useState("");
    const [ image,setImage] = useState("");
    const isConnected = Boolean(accounts[0]);
async function generatejson(){
    const headers= {
     "Api-Key" :"eb322cec-bac8-11ec-b95c-0242ac110002"
    }
    axios.post('https://json.extendsclass.com/gui/bin',[{name},{Description},{image}],{headers: headers})
    .then(res => {
        console.log(res);
        console.log(res.data);
      })
}
    return(
        <div>
            <h1>BioWorlds</h1>
            <p>some description of Bioworld!!</p>
            {isConnected?(
                <div>
                    <div>
                        
                    <input type='string' placeholder="NFT Title" value={name} onChange={e => setName(e.target.value)}/>
                    <input type='string' placeholder="NFT Description" value={Description} onChange={e => setDescription(e.target.value)}/>
                    <input type='string' placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)}/>
                      
                    <button onClick={generatejson}>Generate</button>
                    </div>
                 
                    </div>
                    
            ):(
                <p>Not Connected</p>
            )}
      </div>
    );
};

export default MainMint