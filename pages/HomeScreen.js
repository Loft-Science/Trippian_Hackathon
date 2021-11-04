import React, { Component,useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, TextInput, FlatList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Searchbar, Provider } from 'react-native-paper';
import { Button, Icon } from 'react-native-elements'; 
import ActionSheet from "react-native-actions-sheet";
import BottomSheet from "../components/BottomSheet";
import { useFonts } from 'expo-font';





let todayWeather = 10 + 17; 
let todayCondition = "Cloudy"





const HomeScreen = ({navigation}) => {

    const [show, setShow] = useState(true);

    const [searchQuery, setSearchQuery] = React.useState('');

    const [images, setimages] = useState([
        {src:require('../assets/profile1.jpg'),key:1, name:'Chris'},
        {src:require('../assets/profile2.jpg'),key:2, name:'Minah'},
        {src:require('../assets/profile3.jpg'),key:3, name:'Lisa'},
        {src:require('../assets/profile4.jpg'),key:4, name:'Julie'},
        {src:require('../assets/profile5.jpg'),key:5, name:'Jhon'},
        {src:require('../assets/profile6.jpg'),key:6, name:'Chris'},
      ]);

      

      let [fontsLoaded] = useFonts({
        'Font-Title': require('../assets/fonts/Fruktur-Regular.ttf'),
        'Font-text': require('../assets/fonts/ZenKurenaido-Regular.ttf'),

      });


    return(
        <Provider>
        <ScrollView style={styles.container}>
            
            <View style={styles.header_container}>
                <ImageBackground source={require('../assets/Home_back_1.jpg')}
                     style={{width:"100%", height:"100%", flex:1, resizeMode: 'cover',
                        justifyContent: 'center',
                        backgroundColor: 'black',}} imageStyle={{opacity: 0.6}} > 
            
            <Image source={require('../assets/trippian_logo.png')} style={{marginTop:18, marginLeft:18,height:60, width:100}}></Image>
                <MaterialCommunityIcons size={30} name="weather-cloudy" color={'#fff'} style={{alignSelf:'flex-end', marginRight:20, }} />
                <Text style={styles.weather}> Weather: {todayWeather + '°C, ' + todayCondition} </Text>
                <Button 
                icon={ <Icon name="search" type="evilicon" color="#C0DBF5" size={40}  />}
                        buttonStyle={{ width: 350,
                    height: 70,
                    backgroundColor:"#ffffff",
                    borderRadius:5,
                    margin: 30,
                    alignSelf: "center" }}
                    titleStyle={{padding: 30, color: "grey"}}
                title="Where do you way to go?"
                onPress={() => {
                    setShow(true)
                  }}
            
            />
                

             
                {/* <Searchbar
                        style={styles.SearchBar}
                        placeholder="Where do you way to go?"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        /> */}

                <TouchableOpacity>
                        <Text style={styles.line}>I directly want to explore nearby..</Text>
                </TouchableOpacity>

                </ImageBackground>




                <BottomSheet
                show={show}
                onDismiss={()=> {
                    setShow(false);
                }}>
                </BottomSheet>


            </View>

            

                <View style={styles.inner_container}>
                    

                <Text style={styles.Trippian_title}>Meet Popular Trippians</Text>

                <FlatList
                horizontal={true} 
                showsHorizontalScrollIndicator={false} 
                data={images}
                renderItem={ ({ item }) => {
                    return(
                        <View>
                  <Image source={item.src} /* Use item to set the image source */
                  /* Important to set a key for list items,
                                   but it's wrong to use indexes as keys, see below */
                    style={{
                      width:120,
                      height:120,
                      borderWidth:2,
                      borderRadius: 100,
                    
                      resizeMode:'cover',
                      marginLeft:18,
                      marginTop:22,
                      marginBottom:5
                    }}
                    
                  />

                    <Text style={styles.trippian_name}>{item.name}</Text>



                    



                    </View>

                  

                  

                  
                  


                );
                }}> </FlatList>



                    <Text style={styles.Trippian_Town}>Best Thing To Do in Town</Text>

                    <ScrollView style={{height: 260}} horizontal indicatorStyle={"white"}> 
                    <TouchableOpacity style={styles.BestContainer}>
                        <ImageBackground
                        source={require('../assets/best_activity1.jpg')}
                        style={styles.Best_image}
                    /><Text style={styles.middleButtonText}>Beach</Text></TouchableOpacity> 


                    <TouchableOpacity style={styles.BestContainer}>
                    <ImageBackground
                        source={require('../assets/best_activity2.jpg')}
                        style={styles.Best_image}
                    />
                        <Text style={styles.middleButtonText}>Camping</Text></TouchableOpacity> 
                    <TouchableOpacity style={styles.BestContainer}>
                    <ImageBackground
                        source={require('../assets/best_activity3.jpg')}
                        style={styles.Best_image}
                    />
                        <Text style={styles.middleButtonText}>In the sky</Text></TouchableOpacity> 
                    <TouchableOpacity style={styles.BestContainer}>
                    <ImageBackground
                        source={require('../assets/best_activity4.jpg')}
                        style={styles.Best_image}
                    />
                        <Text style={styles.middleButtonText}>Boarding</Text></TouchableOpacity>
                    </ScrollView>



                    <Text style={styles.Trippian_Recommended}>Recommended places from people like you!</Text>

                    <ScrollView style={{height: 260}} horizontal indicatorStyle={"white"}> 
                    <TouchableOpacity style={styles.BestContainer}>
                        <ImageBackground
                        source={require('../assets/best_activity1.jpg')}
                        style={styles.Best_image}
                    /><Text style={styles.middleButtonText}>Life</Text></TouchableOpacity> 


                    <TouchableOpacity style={styles.BestContainer}>
                    <ImageBackground
                        source={require('../assets/best_activity2.jpg')}
                        style={styles.Best_image}
                    />
                        <Text style={styles.middleButtonText}>재테크</Text></TouchableOpacity> 
                    <TouchableOpacity style={styles.BestContainer}>
                    <ImageBackground
                        source={require('../assets/best_activity3.jpg')}
                        style={styles.Best_image}
                    />
                        <Text style={styles.middleButtonText}>반려견</Text></TouchableOpacity> 
                    <TouchableOpacity style={styles.BestContainer}>
                    <ImageBackground
                        source={require('../assets/best_activity4.jpg')}
                        style={styles.Best_image}
                    />
                        <Text style={styles.middleButtonText}>꿀팁 찜</Text></TouchableOpacity>
                    </ScrollView>
                


                
                


                </View>
                


        </ScrollView>
        </Provider>

    )




}



const styles = StyleSheet.create({ 
    container: { 
        backgroundColor: '#fff',
        flex:1
    }, 
    title: { 
        fontSize: 20, 
        fontWeight: '700', 
        marginTop:25, 
        marginLeft:20,
        color:"white"
    },
    weather:{ 
        alignSelf:"flex-end", 
        paddingRight:10,
        color:"white",
    },


    header_container:{ 
        flex:1,
        backgroundColor:"#ccc"
        
    },

    inner_container:{
        flex:2,
        backgroundColor:"yellow",
        
    },

    SearchBar: {
        margin: 30,
        height: 60,


    },
    Trippian_title: {
        fontSize:17,
        color:"black",
        fontWeight: '700', 
        marginTop:25, 
        marginLeft:20,
    },

    line: {
        textAlign:"center",
        color:"white",
        textDecorationLine: 'underline',
        fontSize: 18,
        marginBottom: 20,
        

    },
    goBtn: {
        
        height : 60,
        justifyContent: "center",
        alignItems : "center",
        borderRadius : 5,
        backgroundColor:"white",
        margin:30

    },
    way_to_line :{

        color: "grey",
        fontSize:17
    },
    trippian_name:{
        fontWeight:"700",
        
        color: "black",
        alignSelf:"center",
        marginLeft:18,
        
        


    },
    Trippian_Town : {
        fontSize:17,
        color:"black",
        fontWeight: '700', 
        marginTop:50, 
        marginLeft:20,

    },

    BestContainer: {
        backgroundColor: '#FFF',
            height: 180,
            width: 300,
            position: 'relative',
            marginLeft : 20,
            marginTop: 20,
    },

    Best_image: {
        height: 180,
              width: 300,
              
              position: 'absolute',

    },

    middleButtonText: {

        marginLeft: 13,
        marginTop:10,
        fontFamily: "Font-Title",
        fontSize: 20,
        


    },
    Trippian_Recommended : {

        fontSize:17,
        color:"black",
        fontWeight: '700', 
        marginLeft: 20,

    }

});
export default HomeScreen;