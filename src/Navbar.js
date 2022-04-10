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
        <Flex justify="space-between" align="center" padding="30px">
            <Flex justify="space-around" width="40%" >
                <Link href="https://www.facebook.com">
                    <Image src={Facebook} boxSize="42px" />
                </Link>
            </Flex>
            <Flex justify="space-around" width="40%" >
            <Link href="https://www.twitter.com">
            <Image src={Twitter} boxSize="42px" />
            </Link>
            </Flex>
            <Flex justify="space-around" width="40%" >
            <Link href="https://www.gmail.com">
            <Image src={Email} boxSize="42px" />
            </Link>
            </Flex>

          <Flex
            justify="space-around"
            align="center"
            width="40%"
            padding="30px"
            >
                <box margin="0 15px"><h1>About</h1></box>
                <spacer/>
                <box margin="0 15px"><h1>Mint</h1></box>
                <spacer/>
                <box margin="0 15px"><h1>Team</h1></box>
                <spacer/>
                {isConnected ? (<h1> </h1>
                
                ):(<div>
                 <button 
                            backgroundColor="#D6517D"
                            borderradius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="white"
                            cursor="pointer"
                            fontFamily="inherit"
                            padding="15px"
                            marginTop='10px'
                            onClick={connectAccount}>Connect</button></div>
            )}


            <spacer/>
                {isConnected ? ( <div> <button 
                    
                    onClick={getbalance}>Show Balance</button></div>
                )
                
                :( <p> </p>)}
               
            </Flex>
                
           <box><h1>{balance} </h1></box>
           <Image src={coins} boxSize="42px" margin="0 15px"/>
        </Flex>
    )
}
export default NavBar