
import { StyleSheet, View } from "react-native";

const BioNFTAddress = "0xFCC7C71f25647F19D718E0d269054b23E3ca7ee5";
const MainMint = ()=>{
  
  
    return(
        <div>
           
            <h1>BioWorlds</h1>
           
          
               
            <View style={styles.container}>
            <p >What is your ideal universe? What about somewhere with unlimited money making opportunities?
                Join us in BioWorld, a Biologists' heaven where you can find any living cells or their components.
                From Jacob the Bacteria to Frank the mutated Koji. We've got you covered fam!
            </p>
            </View>
          
            
           <br></br>
           <br></br>
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