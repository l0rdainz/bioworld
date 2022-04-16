import {useState,useEffect} from 'react';
import {ethers} from 'ethers';
import coinNFT from './Victcoins.json';
import NFT from './BioNFT2.json'
import Trader from './NFTtrader.json'
import { StyleSheet, View} from "react-native";
import {Card,Container,Button,CardGroup} from 'react-bootstrap';
import React from "react";
import { namehash } from 'ethers/lib/utils';

const coinsAdd= '0x551e0aF7F048c706dc696a85a682C3349c2eE567';
const NFTadd='0x2533614c51601d4b727611bdab19d8f7a3876c10';
const traderAdd="0x81dC9c1Ad76747f664fBF4C43759b8C45a490FC5";

const cards = ({accounts,setAccounts,items})=>{
    
    
    return( 
        <Container>
  <div class='row'>{
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
                {price.toString()} VICT
        </Card.Body>
       
      </Card>
     
       
  
      ))
        }</div>
      </Container>
      );

}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 8,
      opacity:1
    },
  });
export default cards