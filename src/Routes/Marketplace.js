import {Card,Container,Button} from 'react-bootstrap';
import React from "react";
import {useState,useEffect} from 'react';
import {ethers} from 'ethers';
import NFT from './../BioNFT2.json'
import Trader from './../NFTtrader.json'


const coinsAdd= '0x551e0aF7F048c706dc696a85a682C3349c2eE567';
const NFTadd='0x2533614c51601d4b727611bdab19d8f7a3876c10';
const traderAdd="0x81dC9c1Ad76747f664fBF4C43759b8C45a490FC5";


const Cards = ({items,setItems})=>{
    
    const [loading, setLoading] = useState(true)
    const loadMarketplaceItems = async () => {
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
        for (let i = 3; i <= itemCount; i++) {
          const uri = await Mintcontract.tokenURI(i)
          //iterate through the tokenURI(index) to get URI
          const response = await fetch(uri)
          const metadata = await response.json()
          const selldata = await marketplace.listings(NFTadd,i)
          items.push({
                    itemId: i,
                    seller:selldata.seller,
                    price:selldata.price,
                    name: metadata.name,
                    description: metadata.description,
                    image: metadata.image
                  })
      
      
 
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
        loadMarketplaceItems()
      }, [])
      if (loading) return (
        <main style={{ padding: "1rem 0" }}>
          <h2>Loading...</h2>
        </main>
      )

    return( 
        <Container>
            <div className='row'>
  {
        items.map(({ seller, name,itemId,image,description,price }) => (   
       <Card  border="black" text='light' bg='dark' key={itemId} style={{ width: '50%' }}>
       <Card.Img variant="top" src={image} />
       <Card.Body>

            <Card.Title>{name}</Card.Title>

                <Card.Text>

                    {description}

                </Card.Text>
                <footer className="blockquote-footer">
      Seller: {seller}
      </footer>
                <Button variant="primary">Buy Now</Button>
                &nbsp; &nbsp; {price.toString()} VICT
        </Card.Body>
       
      </Card>
     
       
  
      ))
        }
        </div>
      </Container>
      );

}

export default Cards