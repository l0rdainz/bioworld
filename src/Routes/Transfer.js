import {useState} from 'react';
import {ethers} from 'ethers';
import coinNFT from './../Victcoins.json';
import { StyleSheet, View} from "react-native";

const coinsAdd= '0x551e0aF7F048c706dc696a85a682C3349c2eE567';

const Transfer = ({accounts,setAccounts,items,setItems})=>{
    const [userAccount,setUserAccount] = useState('')
    const [amount,setAmount] = useState(0)
    async function requestAccount(){
      await window.ethereum.request ({method:'eth_requestAccounts'});
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
    
    return(<>      
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
       
        </>

        
        
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


export default Transfer