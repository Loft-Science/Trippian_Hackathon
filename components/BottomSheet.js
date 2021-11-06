import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet, View, Modal, Text, Dimensions, TextInput, Button, Image } from "react-native";
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import { useFonts } from 'expo-font';
import { Searchbar, IconButton } from "react-native-paper";
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

const BottomSheet = (props,{children}) => {
    const onSwipe = (gestureName, gestureState) => {
        const {dy} = gestureState;
        if (dy > 0) {
            props.onDismiss();
        }
    };

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [address, onChangeAddress] = useState("");
    const [images, setimages] = useState([
        { src: require("../assets/clock-icon.png"), key: 1, name: "clock" },
        { src: require("../assets/search-icon.png"), key: 2, name: "search" },
        { src: require("../assets/map-icon.png"), key: 3, name: "map" },
        { src: require("../assets/profile1.png"), key: 4, name: "profile1" },
        { src: require("../assets/profile2.png"), key: 5, name: "profile2" },
        { src: require("../assets/profile3.png"), key: 6, name: "profile3" },
        { src: require("../assets/japan.jpg"), key: 7, name: "place1" },
        { src: require("../assets/sebu.jpg"), key: 8, name: "place2" },
        { src: require("../assets/checko.jpg"), key: 9, name: "place3" },
    ]);
    const config = {
        velocityThreshold: 0.3,
        directionalOffsetThreshold: 80
    };    
    let [fontsLoaded] = useFonts({
        'comfortaa': require('../assets/fonts/Comfortaa-VariableFont_wght.ttf'),
        'roboto-regular': require('../assets/fonts/Roboto-Regular.ttf'),
        'roboto-light':  require('../assets/fonts/Roboto-Light.ttf'),
    });
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            // let loc = await Location.getCurrentPositionAsync({});
            // if (loc) {
            //     if (loc.coords) {
            //         setLocation({
            //             latitude: loc.coords.latitude,
            //             longitude: loc.coords.longitude,
            //             latitudeDelta: 0.0922,
            //             longitudeDelta: 0.0421
            //         });
            //     } else {
            //         setErrorMsg("Could not find this location");
            //     }
            // } else {
            //     setErrorMsg("Could not find this location");
            // }
        })();
    }, []);

    const onSearch = async (add) => {
        let loc = await Location.geocodeAsync(add);
        if (loc) {
            if (loc.length>0) {
                setLocation({
                    latitude: loc[0].latitude,
                    longitude: loc[0].longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421
                });
            } else {
                setErrorMsg("Could not find this location");
            }
        } else {
            setErrorMsg("Could not find this location");
        }
    }

    if (!fontsLoaded) {
        return null;
    }

    if (errorMsg) {
        return (
            <Modal
                animationType="slide"
                visible={props.show}
                onRequestClose={dismiss}
                style={styles.modalWrapper}
                transparent={true}
            >
                <View style={styles.container}>
                    <View style={styles.content}>
                        <Text>{errorMsg}</Text>
                    </View>
                </View>
            </Modal>
        )
    } else if (location) {
        return (
            <GestureRecognizer onSwipe={(direction, state) => onSwipe(direction, state)} config={config}>
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={props.show}
                    style={styles.modalWrapper}
                >
                    <View style={styles.container}>                    
                        <View style={styles.content}>
                            <View style={styles.topLine}/>
                            <View style={styles.inputWrapper}>
                                <Image style={styles.searchIcon} source={images[1].src}/>
                                <TextInput style={styles.input} onChangeText={()=>{}} placeholder="Where I go?"/>                                
                            </View>
                            <MapView style={styles.map} 
                                region={location}
                            />
                            <View>
                                <View style={styles.listElWrapper}>
                                    <Text style={[styles.listNum, styles.listNumFirst]}>1</Text>
                                    <Image style={styles.listThumbnail} source={images[3].src}/>
                                    <View style={styles.listTextFull}>
                                        <Text style={styles.listHighLight}>Hisu Lee</Text>
                                        <Text style={styles.listDesp}>Asia, South Korea, Seoul</Text>
                                    </View>
                                    <Image style={styles.mapIcon} source={images[2].src}/>
                                </View>
                                <View style={styles.listElWrapper}>
                                    <Text style={[styles.listNum, styles.listNumRest]}>2</Text>
                                    <Image style={styles.listThumbnail} source={images[4].src}/>
                                    <View style={styles.listTextFull}>
                                        <Text style={styles.listHighLight}>Minh Lee</Text>
                                        <Text style={styles.listDesp}>Asia, South Korea, Seoul</Text>
                                    </View>
                                    <Image style={styles.mapIcon} source={images[2].src}/>
                                </View>
                                <View style={styles.listElWrapper}>
                                    <Text style={[styles.listNum, styles.listNumRest]}>3</Text>
                                    <Image style={styles.listThumbnail} source={images[5].src}/>
                                    <View style={styles.listTextFull}>
                                        <Text style={styles.listHighLight}>Chris Kang</Text>
                                        <Text style={styles.listDesp}>Asia, South Korea, Seoul</Text>
                                    </View>
                                    <Image style={styles.mapIcon} source={images[2].src}/>
                                </View>
                            </View>
                        </View>
                    </View>
                </Modal>
            </GestureRecognizer>
        );
    } else {
        return (
            <GestureRecognizer onSwipe={(direction, state) => onSwipe(direction, state)} config={config}>
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={props.show}
                    style={styles.modalWrapper}
                >
                    <View style={styles.container}>                    
                        <View style={styles.content}>
                            <View style={styles.topLine}/>
                            <View style={styles.inputWrapper}>
                                <Image style={styles.searchIcon} source={images[1].src}/>
                                <TextInput style={styles.input} onChangeText={()=>{}} placeholder="Where I go?"/>                                
                            </View>
                            <View>
                                <Text style={styles.textTitle}>Recent Researches</Text>
                                <View style={styles.listElWrapper}>
                                    <Image style={styles.clockIcon} source={images[0].src}/>
                                    <View>
                                        <Text style={styles.listHighLight}>Paris</Text>
                                        <Text style={styles.listDesp} onPress={()=>{onSearch("Paris, France")}}>Paris, France</Text>
                                    </View>
                                </View>
                                <View style={styles.listElWrapper}>
                                    <Image style={styles.clockIcon} source={images[0].src}/>
                                    <View>
                                        <Text style={styles.listHighLight}>Pariser Strabe</Text>
                                        <Text style={styles.listDesp}>Pariser Str, 60486 Frankfurt am Main, Germany</Text>
                                    </View>
                                </View>
                                <View style={styles.listElWrapper}>
                                    <Image style={styles.clockIcon} source={images[0].src}/>
                                    <View>
                                        <Text style={styles.listHighLight}>Paris' Bar</Text>
                                        <Text style={styles.listDesp}>Oppenheimer Landstrabe 27, 60596 Frankfurt am Main, Germany</Text>
                                    </View>
                                </View>
                            </View>

                            <View style={{marginTop: 20}}>

                            <Text style={styles.textTitle}>Popular Searches</Text>


                            <View style={styles.listElWrapper}>
                                <View style={{width: 30, height: 30, borderRadius: 60, marginTop: -50, marginEnd: -15,
                                   backgroundColor:"#ccc",  justifyContent: "center" , alignItems: 'center',
                                    opacity:0.7,
                                    shadowColor: "#ccc",
                                    shadowOffset: {
                                    width: 0,
                                    height: -4,
                                    },
                                    shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5, }}>
                                    <Text style={{fontFamily: defStyle.fontComfortaa, fontSize: 16 }}>1</Text>
                                </View>
                                    <Image style={styles.place_Icon} source={images[7].src}/>
                                    <View>
                                        <Text style={styles.listHighLight}>Pillipin, sebu</Text>
                                        <Text style={styles.listDesp}>Oppenheimer Landstrabe 27, 60596 {"\n"}Frankfurt am</Text>
                                    </View>
                                </View>


                                


                            </View>


                            <View style={{flexDirection: "row",
                                            marginTop: defStyle.elementMargin,
                                            width: Dimensions.get("window").width - 40,
                                            alignItems: "center",}}>
                            <View style={{width: 30, height: 30, borderRadius: 60, marginTop: -50, marginEnd: -15,
                                   backgroundColor:"#ccc",  justifyContent: "center" , alignItems: 'center',
                                    opacity:0.7,
                                    shadowColor: "#ccc",
                                    shadowOffset: {
                                    width: 0,
                                    height: -4,
                                    },
                                    shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5, }}>
                                    <Text style={{fontFamily: defStyle.fontComfortaa, fontSize: 16 }}>2</Text>
                                </View>
                                <Image style={styles.place_Icon} source={images[6].src}/>
                                    <View>
                                        <Text style={styles.listHighLight}>Japan, Osaka</Text>
                                        <Text style={styles.listDesp}>Oppenheimer Landstrabe 27, 60596 {"\n"}Frankfurt am</Text>
                                    </View>
                                
                            </View>


                            <View style={{flexDirection: "row",
                                            marginTop: defStyle.elementMargin,
                                            width: Dimensions.get("window").width - 40,
                                            alignItems: "center",}}>
                            <View style={{width: 30, height: 30, borderRadius: 60, marginTop: -50, marginEnd: -15,
                                   backgroundColor:"#ccc",  justifyContent: "center" , alignItems: 'center',
                                    opacity:0.7,
                                    shadowColor: "#ccc",
                                    shadowOffset: {
                                    width: 0,
                                    height: -4,
                                    },
                                    shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5, }}>
                                    <Text style={{fontFamily: defStyle.fontComfortaa, fontSize: 16 }}>3</Text>
                                </View>
                                <Image style={styles.place_Icon} source={images[8].src}/>
                                    <View>
                                        <Text style={styles.listHighLight}>Cheko, peulaha</Text>
                                        <Text style={styles.listDesp}>Oppenheimer Landstrabe 27, 60596 {"\n"}Frankfurt am</Text>
                                    </View>
                                
                            </View>





                            


                           


                            




                            






                        </View>
                    </View>
                </Modal>
            </GestureRecognizer>
        )
    }
};

export default BottomSheet;
const defStyle = {
    mainColor: "#84abb8",
    secondColor: "#ba81a3",
    thirdColor: "#84abb8",
    borderColor: "#ba81a340",
    shadowColor: "#ba81a3",
    fontComfortaa: "comfortaa",
    fontRobotoNormal: "roboto-regular",
    fontRobotoLight: "roboto-light",
    sectionMargin: 20,
    elementMargin: 15,
    fontSizeTitle: 16,
    fontSizeHighlight: 18,
    fontSizeNormal: 15,
    elementBorderRadius: 25,
}
const styles = StyleSheet.create({
    listTextFull: {
        width: Dimensions.get("window").width - 20 - defStyle.elementMargin - 80,
    },
    listNum: {
        fontFamily: defStyle.fontComfortaa,
        fontSize:defStyle.fontSizeHighlight,
        marginRight: defStyle.elementMargin / 2
    },
    listNumFirst: {
        color: defStyle.secondColor,
    },
    listNumRest: {
        color:defStyle.thirdColor
    },
    textTitle: {
        fontFamily: defStyle.fontComfortaa,
        fontWeight: "bold",
        fontSize: defStyle.fontSizeTitle,
        color: defStyle.mainColor,
        marginTop: defStyle.sectionMargin,
    },
    listElWrapper: {
        flexDirection: "row",
        marginTop: defStyle.elementMargin,
        width: Dimensions.get("window").width - 40,
        alignItems: "center",
    },
    listHighLight: {
        fontFamily: defStyle.fontComfortaa,
        fontSize: defStyle.fontSizeHighlight,
        fontWeight: "bold"
    },
    listDesp: {
        fontFamily: defStyle.fontRobotoLight,
        fontSize: defStyle.fontSizeNormal,
    },
    listThumbnail: {
        width: 48,
        height:48,
        marginRight: defStyle.elementMargin / 2
    },
    closeIcon: {
        position: "absolute",
        right: 0,
        top: 0,
    },
    mapIcon: {
        width: 17.25,
        height: 23,
    },
    topLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 5,
        width: 134,
        marginLeft: Dimensions.get("window").width/2-77,
        borderRadius: 10,
    },
    inputWrapper: {
        position: "relative",
        flexDirection: "row",

        marginBottom: 12,
        marginTop: 25,
        borderWidth: 1,
        borderRadius: defStyle.elementBorderRadius,
        borderColor: defStyle.borderColor,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
        shadowColor: defStyle.shadowColor,
        shadowOffset: {
            width: 1,
            height: 2,
        },
        shadowOpacity: 0.4,
        shadowRadius: 0.25,
    },
    searchIcon: {
        width: 16,
        height: 16,
        marginTop: 8,
    },
    clockIcon: {
        width: 32,
        height: 32,
        margin: defStyle.elementMargin / 2,
    },
    input: {
        color: "#000",
        fontFamily: defStyle.fontComfortaa,
        fontSize: defStyle.fontSizeTitle,
        width: "100%",
        paddingLeft: 10,
        paddingRight: 20,
    },
    container: {
        position: "absolute",
        paddingTop: 50,
        left: 0,
        width: Dimensions.get("window").width,
        height: "100%",
        backgroundColor: '#00000080'
    },
    content: {
        borderColor: "#fff",
        backgroundColor: "#fff",
        height: Dimensions.get('window').height - 40,
        borderWidth: 5,
        borderTopLeftRadius: 48,
        borderTopRightRadius: 48,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        position: "relative"
    },
    map: {
      width: Dimensions.get('window').width,
      height: 200,
    },
    modalWrapper: {
        margin: 0      
    },

    place_Icon: {
        width: 60,
        height: 60,
        marginEnd: 15
    }
});