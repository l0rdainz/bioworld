import {useState} from 'react';
import {ethers, BigNumber} from 'ethers';
import BioNFT from './BioNFT.json'
import { Flex } from '@chakra-ui/react';

const BioNFTAddress = "0xFCC7C71f25647F19D718E0d269054b23E3ca7ee5";
const MainMint = ({accounts,setAccounts})=>{
    const [ mintAmount,setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);

    async function handleMint(){
        console.log({mintAmount})
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract =new ethers.Contract(
                BioNFTAddress,BioNFT.abi,signer
            );
            try{
                const response = await contract.mint(BigNumber.from(mintAmount),{
                    value:ethers.utils.parseEther((0.02*mintAmount).toString())
                });
                    
                console.log('response:',response);

            }
            catch(err){ 
                console.log("error:",err)

            }
        }
    }
    const handleDecrement = () =>{
        if (mintAmount<=0) return;
        setMintAmount(mintAmount - 1)

    };
    const handleIncrement =()=>{
        if(mintAmount>=3)return;
        setMintAmount(mintAmount+1)
    }
    return(
        <div>
            <h1>BioWorlds</h1>
            <p>Help!!</p>
            {isConnected?(
                <div>
                    <div>
                        <Flex align="center" justify="center">
                        <button 
                            backgroundColor="#D6517D"
                            borderradius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop='10px'
                            onClick={handleDecrement}>-</button>
                        <input type='number'readOnly value={mintAmount}/>
                        <button onClick={handleIncrement}>+</button>
                        </Flex>
                    </div>
                    <button onClick={handleMint}>Mint Now</button>
                    </div>
                    
            ):(
                <p>Not Connected</p>
            )}
      </div>
    );
};

export default MainMint