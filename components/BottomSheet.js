import React, { useEffect, useState, useRef } from "react";
import { Animated, Dimensions,StyleSheet, View } from "react-native";
import { IconButton, Portal } from "react-native-paper";



const BottomSheet = ({show, onDismiss, children})=> {
    const bottomSheetHeight = Dimensions.get("window").height * 0.5;
    const deviceWidth = Dimensions.get("window").width;
    const [open, setOpen] = useState(show)
    const bottom = useRef(new Animated.Value(-bottomSheetHeight)).current;

    useEffect(()=> {
        if(show) {
            setOpen(show);
            Animated.timing(bottom, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            }).start();

        } else {
            Animated.timing(bottom, {
                toValue: -bottomSheetHeight,
                duration: 500,
                useNativeDriver: false,
            }).start(()=>{
                setOpen(false);

            });

        }
    }, [show])
    if(!open){
        return null;

    }
    return (
    <Portal>
        <Animated.View
            style={styles.root, {height: bottomSheetHeight, bottom: bottom, shadowOffset: {
                height :-3
            }}, styles.common}>
                <View style={styles.header,styles.common, 
                {
                    shadowOffset: {
                height :-3,
            }}}>
                <View style={{
                    width:40, 
                    height:3,
                    borderRadius: 1.5,
                    position: "absolute",
                     top: 8, 
                     left:(deviceWidth-40)/2,
                     zIndex: 10,
                     backgroundColor :"#ccc", }}/>

                     <IconButton color="#85C1D3" icon="close" style={styles.closeIcon} onPress={onDismiss}/>


                </View>
                {children}

            </Animated.View>


    </Portal>
    );
};


export default BottomSheet;

const styles = StyleSheet.create({
    root: {
        position: "absolute",
        left: 0,
        right: 0,
        zIndex: 200,
        backgroundColor: "#fff",
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        overflow: "hidden",
      
    },

    header: {
        height: 44,
        backgroundColor: "#fff"

    },
    common: {

        shadowColor: "#000",
        shadowOffset: {
           
            width: 0,
        },
        shadowOpacity: 0.24,
        shadowRadius: 4,
        elevation: 3,

    },

    closeIcon :{
        position: "absolute",
        right: 0,
        top: 0,
        zIndex: 10,



    }


})