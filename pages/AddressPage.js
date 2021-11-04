import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions, TextInput, Button } from "react-native";
import * as Location from 'expo-location';
import MapView from 'react-native-maps';

const AddressPage = (props) => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [address, onChangeAddress] = useState("");
    const onSearch = useCallback(async () => {
        console.log(address);
        let loc = await Location.geocodeAsync(address);
        console.log(loc);
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
    })
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                setErrorMsg("Permission to access location was denied");
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            if (loc) {
                if (loc.coords) {
                    setLocation({
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    });
                } else {
                    setErrorMsg("Could not find this location");
                }
            } else {
                setErrorMsg("Could not find this location");
            }
        })();
    }, []);

    let text = "Waiting..";
    if (errorMsg) {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} onChangeText={onChangeAddress} value={address}/>
                <Button title="Search" onPress={onSearch} />
                <Text>{errorMsg}</Text>
            </View>
        )
    } else if (location) {
        return (
            <View>
                <TextInput style={styles.input} onChangeText={onChangeAddress} value={address}/>
                <Button title="Search" onPress={onSearch} />
                <MapView style={styles.map} 
                region={location}
                />
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <TextInput style={styles.input} onChangeText={onChangeAddress} value={address}/>
                <Button title="Search" onPress={onSearch} />
                <Text>{text}</Text>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: 200,
    },
});

export default AddressPage;
