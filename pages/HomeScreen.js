import React, { useState,useRef,useMemo, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ImageBackground, TextInput, FlatList, SafeAreaView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Provider } from "react-native-paper";
import { Button, Icon } from "react-native-elements";
import { useFonts } from 'expo-font';
import AddressPage from "./AddressPage";
import Animated from 'react-native-reanimated';
import {
    BottomSheetModal,
    BottomSheetModalProvider,
  } from '@gorhom/bottom-sheet';



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
        { src: require("../assets/profile1.jpg"), key: 1, name: "Chris" },
        { src: require("../assets/profile2.jpg"), key: 2, name: "Minah" },
        { src: require("../assets/profile3.jpg"), key: 3, name: "Lisa" },
        { src: require("../assets/profile4.jpg"), key: 4, name: "Julie" },
        { src: require("../assets/profile5.jpg"), key: 5, name: "Jhon" },
        { src: require("../assets/profile6.jpg"), key: 6, name: "Chris" },
    ]);

    let [fontsLoaded] = useFonts({
        'Font-Title': require('../assets/fonts/Fruktur-Regular.ttf'),
        'Font-Text': require('../assets/fonts/ZenKurenaido-Regular.ttf'),
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

    if (show) {
        return (<AddressPage onDismiss={dismiss} />);
    }
    return (
        <BottomSheetModalProvider> 
            <ScrollView style={styles.container}>

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
                        style={{ width: "100%", height: "100%", flex: 1, resizeMode: "cover", justifyContent: "center", backgroundColor: "black" }}
                        imageStyle={{ opacity: 0.6 }}
                    >
                        <Image source={require("../assets/trippian_logo.png")} style={{ marginTop: 18, marginLeft: 18, height: 60, width: 100 }}></Image>
                        <MaterialCommunityIcons size={30} name="weather-cloudy" color={"#fff"} style={{ alignSelf: "flex-end", marginRight: 20 }} />
                        <Text style={styles.weather}> Weather: {todayWeather + "°C, " + todayCondition} </Text>
                        <Button
                            icon={<Icon name="search" type="evilicon" color="#C0DBF5" size={40} />}
                            buttonStyle={{ width: 350, height: 70, backgroundColor: "#ffffff", borderRadius: 5, margin: 30, alignSelf: "center" }}
                            titleStyle={{ padding: 30, color: "grey" }}
                            title="Where do you way to go?"
                            onPress={openModal}
                        />

                        {/* <Searchbar
                        style={styles.SearchBar}
                        placeholder="Where do you way to go?"
                        onChangeText={onChangeSearch}
                        value={searchQuery}
                        /> */}

                        <TouchableOpacity onPress={showAddSection}>
                            <Text style={styles.line}>I directly want to explore nearby..</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                    
                </View>

                <View style={styles.inner_container}>
                    
                    <Text style={styles.Trippian_title}>Meet Popular Trippians</Text>

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
                                            width: 120,
                                            height: 120,
                                            borderWidth: 2,
                                            borderRadius: 100,

                                            resizeMode: "cover",
                                            marginLeft: 18,
                                            marginTop: 22,
                                            marginBottom: 5,
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

                    <ScrollView style={{ height: 260 }} horizontal indicatorStyle={"white"}>
                        <TouchableOpacity style={styles.BestContainer}>
                            <ImageBackground source={require("../assets/best_activity1.jpg")} style={styles.Best_image} />
                            <Text style={styles.middleButtonText}>Beach</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.BestContainer}>
                            <ImageBackground source={require("../assets/best_activity2.jpg")} style={styles.Best_image} />
                            <Text style={styles.middleButtonText}>Camping</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.BestContainer}>
                            <ImageBackground source={require("../assets/best_activity3.jpg")} style={styles.Best_image} />
                            <Text style={styles.middleButtonText}>In the sky</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.BestContainer}>
                            <ImageBackground source={require("../assets/best_activity4.jpg")} style={styles.Best_image} />
                            <Text style={styles.middleButtonText}>Boarding</Text>
                        </TouchableOpacity>
                    </ScrollView>

                    <Text style={styles.Trippian_Recommended}>Recommended places from people like you!</Text>

                    <ScrollView style={{ height: 260 }} horizontal indicatorStyle={"white"}>
                        <TouchableOpacity style={styles.BestContainer}>
                            <ImageBackground source={require("../assets/place1.jpg")} style={styles.Place_image} />

                            <View style={{ flex: 1, alignItems: "flex-end", padding: 5, paddingRight: 14 }}>
                                <Text style={styles.RecommendText}>Don't miss this place{"\n"}I recommend!</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.BestContainer}>
                            <ImageBackground source={require("../assets/place2.jpg")} style={styles.Place_image} />
                            <View style={{ flex: 1, alignItems: "flex-end", padding: 5, paddingRight: 14 }}>
                                <Text style={styles.RecommendText}>Don't miss this place{"\n"}I recommend!</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.BestContainer}>
                            <ImageBackground source={require("../assets/place3.jpg")} style={styles.Place_image} />
                            <View style={{ flex: 1, alignItems: "flex-end", padding: 5, paddingRight: 14 }}>
                                <Text style={styles.RecommendText}>Don't miss this place{"\n"}I recommend!</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.BestContainer}>
                            <ImageBackground source={require("../assets/best_activity4.jpg")} style={styles.Place_image} />
                            <View style={{ flex: 1, alignItems: "flex-end", padding: 5, paddingRight: 14 }}>
                                <Text style={styles.RecommendText}>Don't miss this place{"\n"}I recommend!</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>

                    <Text style={styles.Trippian_Recommended}>Become a Trippian</Text>

                    <ScrollView style={{ height: 260 }} horizontal indicatorStyle={"white"}>
                        <TouchableOpacity style={styles.BestContainer}>
                            <ImageBackground source={require("../assets/place1.jpg")} style={styles.Place_image} />

                            <View style={{ flex: 1, alignItems: "flex-end", padding: 5, paddingRight: 14, backgroundColor: "#ccc" }}></View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.BestContainer}>
                            <View style={{ flex: 1, alignItems: "flex-end", padding: 5, paddingRight: 14, backgroundColor: "#ccc" }}></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.BestContainer}>
                            <View style={{ flex: 1, alignItems: "flex-end", padding: 5, paddingRight: 14, backgroundColor: "#ccc" }}></View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.BestContainer}>
                            <View style={{ flex: 1, alignItems: "flex-end", padding: 5, paddingRight: 14, backgroundColor: "#ccc" }}></View>
                        </TouchableOpacity>
                    </ScrollView>


                    
                </View>

               
                                
            </ScrollView>
        </BottomSheetModalProvider>
    );
};

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
    },

    header_container: {
        flex: 1,
        backgroundColor: "#ccc",
        zIndex: 1,
        position: "relative"
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
        fontWeight: "700",
        marginTop: 25,
        marginLeft: 20,
    },

    line: {
        textAlign: "center",
        color: "white",
        textDecorationLine: "underline",
        fontSize: 18,
        marginBottom: 20,
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
        fontWeight: "700",

        color: "black",
        alignSelf: "center",
        marginLeft: 18,
    },
    Trippian_Town: {
        fontSize: 17,
        color: "black",
        fontWeight: "700",
        marginTop: 50,
        marginLeft: 20,
    },

    BestContainer: {
        backgroundColor: "#FFF",
        height: 180,
        width: 300,
        position: "relative",
        marginLeft: 20,
        marginTop: 20,
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
        fontWeight: "700",
        marginLeft: 20,
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

    


   
});
export default HomeScreen;
