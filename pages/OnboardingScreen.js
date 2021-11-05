import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

import { useFonts } from 'expo-font';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 6,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = (props) => {



    let [fontsLoaded] = useFonts({
        'Font-Black': require('../assets/fonts/Roboto-Black.ttf'),

    });


    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => props.showHome()}
        onDone={() => props.showHome()}
        onLayout={props.onLayout()}
        pages={[
          {
            backgroundColor: '#C882AF',
            image: <Image source={require('../assets/onboarding-img1.png')} />,
            title: <Text style={styles.textContainer}>   Meet Your{"\n"}  Local Guide {"\n"}      Friend </Text>,
            subtitle: ' ',
          },
          {
            backgroundColor: '#ffffff',
            image: <Image source={require('../assets/onboarding-img2.png')} />,
            title: <Text style={styles.textContainer}> Experience{"\n"}       New {"\n"}    Culture </Text>,
            subtitle: ' ',
          },
          {
            backgroundColor: '#85C1D3',
            image: <Image source={require('../assets/onboarding-img3.png')} />,
            title: <Text style={styles.textContainer}>      Be {"\n"}   Better {"\n"} Yourself </Text>, 
            subtitle: "",
          },
        ]}
      />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },

  textContainer: {

    alignSelf:"center",
    fontSize: 35,
    marginTop: 20 ,
    fontFamily:'Font-Black',   
  }
});