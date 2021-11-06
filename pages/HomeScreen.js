import React, { useState,useRef,useMemo, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, TextInput, FlatList, SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Modal, Provider } from "react-native-paper";
import { Button, Icon } from "react-native-elements";
import { useFonts } from 'expo-font';
import AddressPage from "./AddressPage";
import Animated from 'react-native-reanimated';
import BottomSheet from "../components/BottomSheet";
import {
    BottomSheetModal,
    BottomSheetModalProvider,
  } from '@gorhom/bottom-sheet';
import LinearGradient from "react-native-linear-gradient"




let todayWeather = 10 + 17;
let todayCondition = "Cloudy";

const HomeScreen = ({ navigation }) => {
    const [show, setShow] = useState(false);


                // ref
            const bottomSheetModalRef = useRef(null);

            // variables
            const snapPoints = useMemo(() => ['50%'], []);

            const openModal = useCallback(() => {
                bottomSheetModalRef.current?.present();
              }, []);
              
            


    

    const [images, setimages] = useState([
        { src: require("../assets/Karen.jpg"), key: 1, name: "Karen" },
        { src: require("../assets/Cigdem.jpg"), key: 2, name: "Cigdem" },
        { src: require("../assets/Nana.jpg"), key: 3, name: "Nana" },
        { src: require("../assets/Daniel.jpg"), key: 4, name: "Daniel" },
        { src: require("../assets/Jungae.jpg"), key: 5, name: "JungAe" },
        { src: require("../assets/Jisung.jpg"), key: 6, name: "Jisung" },
        { src: require("../assets/Chris.jpg"), key: 7, name: "Chris" },
    ]);

    const [towns, settowns] = useState([
        { src: require("../assets/best_activity2.jpg"),  key: 1, title: "Jamsil Baseball Stadium", place: "Korea, Seoul", people: "6-14 Group"},
        { src: require("../assets/best_activity1.jpg"),  key: 2, title: "Taekwondo", place: "Korea, Seoul", people: "8 Group"},
        { src: require("../assets/best_activity3.jpg"),  key: 3, title: "HanRiver", place: "Korea, Seoul", people: "Many Group"},
        { src: require("../assets/best_activity4.jpg"),  key: 4, title: "Jamsil Baseball Stadium", place: "Korea, Seoul", people: "6-14 Group"},
        
    ])



    const [places, setplaces] = useState([
        { src: require("../assets/place1.jpg"),  key: 1, title: "coffeowa in sungsu", place: "sungsu, Seoul", content: "I recommended here first when you \n want to go home coffee in Seoul!"},
        { src: require("../assets/place2.jpg"),  key: 2, title: "river place of town", place: "Korea, Seoul", content: "I recommended here first when you \n want to go home coffee in Seoul!"},
        { src: require("../assets/place3.jpg"),  key: 3, title: "HanRiver", place: "Korea, Seoul", content: "I recommended here first when you \n want to go home coffee in Seoul!"},
        { src: require("../assets/place2.jpg"),  key: 4, title: "Jamsil Baseball Stadium", place: "Korea, Seoul", content: "I recommended here first when you \n want to go home coffee in Seoul!"},
        
    ])

    let [fontsLoaded] = useFonts({
        'Font-Title': require('../assets/fonts/Fruktur-Regular.ttf'),
        'Font-Text': require('../assets/fonts/ZenKurenaido-Regular.ttf'),
        'Font-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
        'Font-Light' : require('../assets/fonts/Roboto-Light.ttf'),
        'Font-Regular' : require('../assets/fonts/Roboto-Regular.ttf'),
        'Font-Medium' : require('../assets/fonts/Roboto-Medium.ttf'),
        'Font-Comforta' : require('../assets/fonts/Comfortaa-VariableFont_wght.ttf'),

    });

    const dismiss = useCallback(() => {
        setShow(false)
    })
    const showAddSection = useCallback(() => {
        setShow(true)
    })

    if (!fontsLoaded) {
        return null;
    }

    return (

        <BottomSheetModalProvider> 
            <ScrollView style={styles.container}>
                <Provider>

            <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={0}
                        snapPoints={snapPoints}
                        style={styles.bottomSheet}
                    >   <View style={styles.weather}>
                    <Text> Awesome🎉</Text>
                  </View>  </BottomSheetModal>

            
                <View style={styles.header_container}>

                    <ImageBackground
                        source={require("../assets/Home_back_1.jpg")}
                        style={{ width: "100%", height: "100%", flex: 1, resizeMode: "cover", justifyContent: "center", backgroundColor: "black", borderBottomLeftRadius:40, borderBottomRightRadius:40 }}
                        imageStyle={{ opacity: 0.6, borderBottomLeftRadius:40, borderBottomRightRadius:40 }}
                    >
                        <Image source={require("../assets/trippian_logo.png")} style={{ marginTop: 18, marginLeft: 18, height: 60, width: 100 }}></Image>
                        <MaterialCommunityIcons size={30} name="weather-cloudy" color={"#fff"} style={{ alignSelf: "flex-end", marginRight: 20 }} />
                        <Text style={styles.weather}> Weather: {todayWeather + "°C, " + todayCondition} </Text>
                        <Button
                            icon={<Icon name="search" type="evilicon" color="#C0DBF5" size={40} />}
                            buttonStyle={{ width: 350, height: 70, backgroundColor: "#ffffff", borderRadius: 5, margin: 30, alignSelf: "center" }}
                            titleStyle={{ padding: 30, color: "grey" }}
                            title="Where do you way to go?"
                            onPress={showAddSection}
                        />

                        {/* <Searchbar
                        style={styles.SearchBar}
                        placeholder="Where do you way to go?"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        /> */}

                        <TouchableOpacity onPress={openModal}>
                            <Text style={styles.line}>I directly want to explore nearby..</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                    
                </View>

                <View style={styles.inner_container}>
                    
                    <Text style={styles.Trippian_title}>Meet and Chat !</Text>
                    <Text style={styles.Trippian_description}>here are Trippians read to hang out with you</Text>

                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={images}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    <Image
                                        source={item.src} /* Use item to set the image source */
                                        /* Important to set a key for list items,
                                   but it's wrong to use indexes as keys, see below */
                                        style={{
                                            width: 90,
                                            height: 90,
                                            borderWidth: 2,
                                            borderRadius: 100,

                                            resizeMode: "cover",
                                            marginLeft: 20,
                                            marginTop: 22,
                                            marginBottom: 6,
                                        }}
                                    />

                                    <Text style={styles.trippian_name}>{item.name}</Text>
                                </View>
                            );
                        }}
                    >
                        {" "}
                    </FlatList>

                    <Text style={styles.Trippian_Town}>Best Thing To Do in Town</Text>

                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={towns}
                        renderItem={({ item }) => {
                            return (
                                <View style={{height: 260}} horizontal indicatorStyle={"white"}>

                            <TouchableOpacity style={styles.BestContainer} >
                                    <ImageBackground
                                        source={item.src} /* Use item to set the image source */
                                        /* Important to set a key for list items,
                                   but it's wrong to use indexes as keys, see below */
                                        style={{
                                            width: 300,
                                            height: 130,
                                            
                                            borderRadius: 10,

                                           resizeMode:"cover",
                                            marginLeft: 20,
                                            marginTop: 22,
                                            
                                        }}
                                    />
                                    </TouchableOpacity>

                                    <Text style={styles.town_name}>{item.title}</Text>

                                    <View style={styles.cardText}>
                                    <Text style={styles.town_place}>{item.place}</Text>
                                    <Icon style={{marginLeft: 28, marginTop:5}} name="people" type="octicons" color="#Cccccc" size={20} />
                                    <Text style={styles.town_people}>{item.people}</Text>
                                    </View>


                                </View>
                            );
                        }}
                    >
                        {" "}
                    </FlatList>


                

                    <Text style={styles.Trippian_Recommended}>Recommended places </Text>
                    <Text style={styles.Trippian_description}>from people like you!</Text>

                    <FlatList
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={places}
                        renderItem={({ item }) => {
                            return (
                                <View style={{height: 260}} horizontal indicatorStyle={"white"}>

                            <TouchableOpacity style={[styles.ShadowContainer,shadow]}>
                                <View  > 
                                    <View style={{ flexDirection:"row"   }}>
                                        <Image style={{
                                            width: 60,
                                            height: 60,
                                            
                                            borderRadius: 10,

                                           resizeMode:"cover",
                                           
                                            
                                        }}
                                            source={item.src}> 
                                           
                                        
                                         </Image>



                                         <View>

                                         <Text style={styles.place_name}>{item.title}</Text>
                                         <View style={styles.cardText}>
                                             
                                   
                                            <Icon style={{marginLeft: 15, marginTop:5}} name="place" type="octicons" color="#Cccccc" size={20} />
                                            <Text style={styles.place_title}>{item.place}</Text>
                                            </View>

                                             
                                         </View>


                                    </View>


                                    <View>
                                    <Text style={styles.place_content}>{item.content}</Text>
                                    </View>
                                
                               

                                   
                                </View>

                                
                                    
                                    </TouchableOpacity>

                                    


                                </View>
                            );
                        }}
                    >
                        {" "}
                    </FlatList>

                   


                    

                    <SafeAreaView style={styles.Trippian_container}>

                    <ImageBackground style={styles.aboutImage}  source={require('../assets/trippian_leader.jpg')} imageStyle={{ opacity: 0.7}}>
                    

            

                    <ScrollView style={styles.Trippian_text}>

                    <Text style={styles.Trippian_title2}>You can be Trippian :)</Text>

            
            
                    <Text style={styles.desc01}>
                        You can share whatever you experience{"\n"}
                        that mad you happy{"\n"}
                        Not only that, but you can have global friends{"\n"}
                        at just your town!{"\n\n"}
                        One more thing!{"\n"}
                        There is a bonus, credit point.
                    
                    </Text>

                    <Button 
               
                    buttonStyle={{ width: 200,
                    height: 65,
                    
                    backgroundColor:"#ffffff",
                    borderRadius:50,
                    marginTop: 30,
                    alignSelf: "center" }}
                    titleStyle={{padding: 50}}
                    title="More Info"
                    titleStyle={{color: "#C882AF", fontSize: 20, fontFamily: "Font-Medium"}}
            
            />

                    

                    

                        <View style={{padding : 60}}></View>

                        

         

            

            
                </ScrollView>

            

                </ImageBackground>

            </SafeAreaView>


                    




                

                </View>


                <BottomSheet
                show={show}
                onDismiss={dismiss}>
                </BottomSheet>

                </Provider>

            </ScrollView>
        </BottomSheetModalProvider>
    );
};

const shadow = {
    shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: 0.7,
    elevation: 10,
    shadowOffset: {
      width: 5,
      height: 5
    }
  }

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        position: "relative"
    },
    title: {
        fontSize: 20,
        fontWeight: "700",
        marginTop: 25,
        marginLeft: 20,
        color: "white",
    },
    weather: {
        alignSelf: "flex-end",
        paddingRight: 10,
        color: "white",
        fontFamily: 'Font-Light'
    },

    header_container: {
        flex: 1,
        backgroundColor: "#fff",
        zIndex: 1,
        position: "relative",
        
    },

    inner_container: {
        flex: 2,
        zIndex: 1,
        position: "relative"
    },

    SearchBar: {
        margin: 30,
        height: 60,
    },
    Trippian_title: {
        fontSize: 17,
        color: "black",
        
        marginTop: 25,
        marginLeft: 20,
        fontFamily: 'Font-Comforta'
    },

    Trippian_description:{
        fontSize: 13,
        color:"black",
        marginLeft: 22,
        fontFamily: 'Font-Comforta'

    },

    line: {
        textAlign: "center",
        color: "white",
        textDecorationLine: "underline",
        fontSize: 18,
        marginBottom: 20,
        fontFamily: 'Font-Regular'

    },
    goBtn: {
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        backgroundColor: "white",
        margin: 30,
    },
    way_to_line: {
        color: "grey",
        fontSize: 17,
    },
    trippian_name: {
        

        color: "black",
        alignSelf: "center",
        marginLeft: 20,
        fontFamily: 'Font-Medium'
    },
    Trippian_Town: {
        fontSize: 17,
        color: "black",
        
        marginTop: 50,
        marginLeft: 20,
        fontFamily: 'Font-Comforta',
        
    },

    town_name: {

        fontSize: 15,
        color: "black",
        marginLeft: 30,
       
        fontFamily: "Font-Bold"


    },

    place_name: {
        fontSize: 15,
        color: "black",
        marginLeft: 15,
        fontFamily: "Font-Bold"

    },

    place_title: {
        fontSize: 12,
        color: "#cccccc",
        marginLeft: 5,
        marginTop: 8,
        fontFamily: "Font-Bold"

    },

    town_place: {
        fontSize: 12,
        color: "#cccccc",
        marginLeft: 35,
        marginTop: 8,
        fontFamily: "Font-Bold"

    },

    BestContainer: {
        backgroundColor: "#FFF",
        height: 170,
        width: 320,
        
        position: "relative",
        
        
        
    },

    cardText:{
        flexDirection:"row"

    },

    town_people: {
        fontSize: 12,
        color: "#cccccc",
        marginLeft: 8,
        marginTop: 8,
        fontFamily: "Font-Bold"

    },

    place_content: {
        fontSize: 14,
        color: "#cccccc",
        marginLeft: 8,
        marginTop: 10,
        fontFamily: "Font-Medium"

    },

    Best_image: {
        height: 180,
        width: 300,

        position: "absolute",
    },

    middleButtonText: {
        marginLeft: 13,
        marginTop: 10,
        fontFamily: "Font-Title",
        fontSize: 20,
    },
    Trippian_Recommended: {
        fontSize: 17,
        color: "black",
        
        marginLeft: 20,
        fontFamily: 'Font-Comforta',
        marginTop: 10,
    },

    Place_image: {
        height: 180,
        width: 300,
        opacity: 0.6,
        position: "absolute",
    },

    RecommendText: {
        marginTop: 10,
        fontFamily: "Font-Text",
        fontSize: 20,
    },

    bottom_header:{
        backgroundColor: "#ffffff",
        shadowColor: "#333333",
        shadowOffset: {width: -1, height: -3},
        shadowRadius : 2,
        shadowOpacity: 0.4,
        paddingTop:20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        

    },

    bottomSheet: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -4,
        },
        shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  ShadowContainer :{ 
    width: 300,
    height: 160,
    borderRadius: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    
    marginLeft: 20,
    marginRight: 5,
    marginTop: 25,

  },
  Trippian_container :{
    flex:1,
    backgroundColor:"#F2F2F2",
    alignItems:"center",
    borderRadius: 20,
    width: 360,
    height: 550,
    alignSelf:"center",
    margin: 20,
    marginBottom: 150,
    alignContent:"center"


  },

  Trippian_text: {
    width:360,
        height:550,
        marginTop:50,
        
        paddingTop: 30,


  },

  aboutImage: {
   
    width: "100%", 
    height: "100%", 
    flex: 1, 
    resizeMode: "cover", 
    justifyContent: "center", 
    backgroundColor: "#C882AF",
    
    borderBottomLeftRadius:40, borderBottomRightRadius:40 , borderTopLeftRadius: 40, borderTopRightRadius: 40
                        

    

  },
  desc01: {
    textAlign:"center",
    fontSize:15,
    fontFamily: "Font-Bold",
    paddingLeft:22,
    paddingRight:22,
    paddingTop: 50,
    color: "white"

  },
  Trippian_title2:{

    fontSize:25,
    fontFamily: "Font-Comforta",
    marginTop: 20,
    color: "white",
    alignSelf:"center"


  }


    


   
});
export default HomeScreen;
