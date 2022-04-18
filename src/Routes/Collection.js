import {useState,useEffect} from 'react';
import {ethers} from 'ethers';
import NFT from './../BioNFT2.json'
import Trader from './../NFTtrader.json'
import { StyleSheet, View} from "react-native";
import {Card,Container,Button} from 'react-bootstrap';

const NFTadd='0x79D6A68E7AfEff80992a4acd49b74B99bfa7D9BB';
const traderAdd="0x81dC9c1Ad76747f664fBF4C43759b8C45a490FC5";

const Others = ({accounts,setAccounts,items,setItems})=>{
    const isConnected = Boolean(accounts[0]);
    const [userAccount,setUserAccount] = useState('')
    const [amount,setAmount] = useState(0)
    const [metaData,setMetaData]=useState()
   async function testing(){
       console.log(accounts[0])
   }
   async function testing2(){
       window.alert("test")
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
            const response = await contract.addListing(1,NFTadd,1); 
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
  
  
    const [loading, setLoading] = useState(true)
  
    const loadmyitems = async () => {
       
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
        for (let i = 1; i <= itemCount; i++) {
          const uri = await Mintcontract.tokenURI(i)
          if(await Mintcontract.ownerOf(i)==traderAdd){
              continue
          }
          else{
          const response = await fetch(uri)
          const metadata = await response.json()
          const selldata = await marketplace.listings(NFTadd,i)
          items.push({
                    itemId: i,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image
                  })
      
                }
 
      }
      setItems(items) 
      console.log({items}.items)
    
    }
     catch(err){
        console.log("error:",err)

    }}
    
   
      setLoading(false)
      
    }


    useEffect(() => {
        loadmyitems()
      }, [])
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Loading...</h2>
        </main>
      )
    return(<div className="madness"> 
     {isConnected?(
         <div>
    <Container>
            <div className='row'>
  {
        items.map(({  name,itemId,image,description }) => (   
       <Card  border="black" text='light' bg='dark' key={itemId} style={{ width: '50%' }}>
       <Card.Img variant="top" src={image} />
       <Card.Body>

            <Card.Title>{name}</Card.Title>

                <Card.Text>

                    {description}

                </Card.Text>
              
                <Button variant="primary" onClick={testing2}>List Now</Button>
               
        </Card.Body>
       
      </Card>
     
       
  
      ))
        }
        </div>
      </Container>

        <br></br>
        <br></br>
        <button onClick={listNFT}>List</button>
        <button onClick={purchaseNFT}>Buy!</button>
        <button onClick={testing}>test!</button>
        <br></br>
        <h2>Marketplace</h2>
       
        </div>
        ):(
                <h1>Connect Now to View Your Collection</h1>
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


export default Others