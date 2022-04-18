import React,{useState}  from 'react';
import {ethers} from 'ethers';
import {Flex,Image,Link} from '@chakra-ui/react';
import Facebook from "./assets/social-media-icons/facebook_32x32.png";
import Twitter from "./assets/social-media-icons/twitter_32x32.png";
import Email from "./assets/social-media-icons/email_32x32.png";
import coinNFT from './Victcoins.json';
import coins from './assets/coin.png'


const coinsAdd= '0x551e0aF7F048c706dc696a85a682C3349c2eE567';


const NavBar = ({accounts,setAccounts}) => {
    const isConnected = Boolean(accounts[0]);
    const [ balance,setBalance] = useState(0);
    
    async function connectAccount(){
        if (window.ethereum){
            const accounts = await window.ethereum.request({
                method:"eth_requestAccounts",
            })
            setAccounts(accounts)
        }

    };
    async function getbalance(){
        if(typeof window.ethereum !=='undefined'){
            const [account] = await window.ethereum.request({method:'eth_requestAccounts'})
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(coinsAdd, coinNFT.abi, provider);
            const balance = await contract.balanceOf(account);
            const number = (parseInt(balance._hex,16) /(10**18))
            setBalance(number)
          console.log(number)
          
          }
        }
    return(
        <Flex justify="space-between" align="center" padding="1%">
            <Flex justify="space-around" width="20%" >
                <Link href="https://www.facebook.com">
                    <Image src={Facebook} boxSize="42px" />
                </Link>
            </Flex>
            <Flex justify="space-around" width="20%" >
            <Link href="https://www.twitter.com">
            <Image src={Twitter} boxSize="42px" />
            </Link>
            </Flex>
            <Flex justify="space-around" width="20%" >
            <Link href="https://www.gmail.com">
            <Image src={Email} boxSize="42px" />
            </Link>
            </Flex>

          <Flex
            justify="space-around"
            align="center"
            width="60%"
            padding="30px"
            >
               <Link href="/mint">
                <h1>Mint</h1>
                </Link> 
                <Link href="/collection">
                <h1>Collection</h1>
                </Link> 
                <Link href="/marketplace">
                <h1>Marketplace</h1>
                </Link>
          
              
                <Link href="/transfer">
                <h1>Transfer</h1>
                </Link>
             
               

                {isConnected ? (<h1> </h1>
                
                ):(<div>
                 <button 
                           
                            onClick={connectAccount}>Connect</button></div>
            )}


         
                {isConnected ? ( <div> <button 
                    
                    onClick={getbalance}>Show Balance</button></div>
                )
                
                :( <p> </p>)}
               
            </Flex>
                
           <h1>{balance} </h1>
           <Image src={coins} boxSize="42px" margin="0 15px"/>
        </Flex>
    )
}
export default NavBar