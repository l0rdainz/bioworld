import {useState,useEffect} from 'react';
import {ethers} from 'ethers';
import NFT from './../BioNFT2.json'
import Trader from './../NFTtrader.json'
import { StyleSheet, View} from "react-native";
import {Card,Container,Button,Modal} from 'react-bootstrap';

const NFTadd='0xBC3ACfC3218566B6a04c8105f5e828441Dc38615';
// const traderAdd="0x81dC9c1Ad76747f664fBF4C43759b8C45a490FC5";
const traderAdd="0x03c0b2360743A98DB410A47b6FDAe5CdE48AE038";

const Others = ({accounts,items,setItems})=>{
    const isConnected = Boolean(accounts[0]);
    const [NFTname,setNFTname] = useState('')
    const [amount,setAmount] = useState(0)
    const [NFTid,setNFTid]=useState(0)
    const [isOpen, setIsOpen] = useState(false);
    const hideModal = () => {

        setIsOpen(false);
    
      };
 
   function triggerclick(itemId,name){
setIsOpen(true)
setNFTname(name)
setNFTid(itemId)
       
   }
   async function listNFT(itemId){
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
            //move this to smart contract
            let tx = await Mintcontract.setApprovalForAll(traderAdd,true)
            window.alert("Please wait for the transaction to be mined")
            await tx.wait(1)
            const response = await contract.addListing(`${amount}`.toString(),NFTadd,itemId); 
            console.log('response:',response);
            await response.wait(1)
            window.alert("Your NFT has been listed")
            setIsOpen(false);


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
          //some error here
          if (await Mintcontract.ownerOf(i)!= accounts[0]){
           console.log(accounts[0])
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
      else {
        continue
    }} 
      setItems(items) 
    
    }
     catch(err){
        console.log("error:",err)

    }
    
   
      setLoading(false)
}
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
                {/* testing2(`${itemId}`) */}
                <Button variant="primary" onClick={()=>triggerclick(`${itemId}`,`${name}`)}>List Now</Button>
                <Modal show={isOpen} onHide={hideModal}>

<Modal.Header>

  <Modal.Title>List Your NFT</Modal.Title>

</Modal.Header>

<Modal.Body>Name: {NFTname} <br></br>
Price: <input onChange={e => setAmount(e.target.value)}
        placeholder="Amount(VICT)"/>
</Modal.Body>

<Modal.Footer>

  <button onClick={hideModal}>Cancel</button>

  <button onClick={()=>listNFT(`${NFTid}`)}>List</button>

</Modal.Footer>

</Modal>
        </Card.Body>
       
      </Card>
     
       
  
      ))
        }
        </div>
      </Container>

      
       
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