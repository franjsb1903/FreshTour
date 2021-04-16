import { StyleSheet, Platform, StatusBar } from 'react-native';
import properties from '../properties/properties_expo';

export const stylesBorderContainer = StyleSheet.create({
    viewContainer: {
        borderColor: "#000",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 1,
        padding: 15,
        margin: 15
    },
    title: {
        fontStyle: "italic"
    },
    titleSize: {
        fontStyle: "italic",
        fontSize: 20
    },
    viewTextContainer: {
        padding: 10,
        alignItems: "center"
    },
    text: {
        fontSize: 18,
        textAlign: "center"
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center"
    }
})

export const stylesScroll = StyleSheet.create({
    scroll: {
        backgroundColor: properties.style.color.background
    },
    containerScroll: {
        paddingBottom: 20
    }
})

export const styleTurismoItem = StyleSheet.create({
    url: {
        fontWeight: "bold",
        fontSize: 15,
        color: "blue"
    },
    stars: {
        padding: 0,
        flex: 1
    },
    valoracion: {
        flex: 1,
        marginLeft: 5,
        padding: 0
    },
    rightIcons: {
        padding: 0,
        margin: 3
    },
    resumoContainer: {
        flex: 0,
        flexGrow: 0,
        padding: 20
    },
    resumo: {
        textAlign: "justify",
        fontSize: 18
    },
    container: {
        flex: 0,
        flexDirection: "row",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: properties.style.color.background
    }
});

export const stylesTurismoList = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: 30,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    spinnerTextStyle: {
        color: '#FFF',
    },
    scroll: {
        marginBottom: 15
    }
});

export const stylesMapa = StyleSheet.create({
    header: {
        backgroundColor: properties.style.color.main,
        flex: 0,
        paddingLeft: 5,
        paddingRight: 5,
        margin: 0,
        paddingBottom: 0,
    },
    search: {
        flex: 0
    },
    headerBottom: {
        flex: 0,
        flexDirection: "row"
    },
    title: {
        flex: 6,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 28,
        color: properties.style.color.title,
        fontFamily: Platform.OS == "ios" ? "San Francisco" : properties.style.text.title_font_family
    }
    ,
    icon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export const stylesApp = StyleSheet.create({
    AndroidSafeArea: {
        flex: 1,
        backgroundColor: properties.style.color.main,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    container: {
        flex: 1,
        backgroundColor: properties.style.color.main
    },
    headerStyle: {
        backgroundColor: properties.style.color.main
    },
    headerTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    }
});

export const stylesCardElement = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    imageCardStyle: {
        padding: 0
    },
    text: {
        textAlign: "justify",
        color: "#000000",
        fontSize: 15
    },
    textBold: {
        textAlign: "justify",
        color: "#000000",
        fontWeight: "bold",
        fontSize: 15
    },
    noImageCardStyle: {
        padding: 15
    },
    rowView: {
        flex: 0,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        flex: 1,
        fontSize: 20
    },
    iconRow: {
        flex: 1,
        flexDirection: "row"
    }
});

export const stylesCardElementPlanificacion = StyleSheet.create({
    container: {
        flex: 0,
        padding: 10,
        backgroundColor: properties.style.color.main
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: properties.style.color.text
    },
    rowContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    iconsContainer: {
        flexDirection: "row"
    },
    titleContainer: {
        flex: 2,
        marginRight: 5
    },
    iconClose: {
        flex: 0
    },
    closeContainer: {
        justifyContent: "flex-end"
    },
    chevron: {
        justifyContent: "flex-start",
        flex: 1
    },
    dropDownContainer: {
        flex: 1
    },
    tempo: {
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 10,
        justifyContent: "flex-end"
    },
    text: {
        textAlign: "justify",
        color: properties.style.color.text,
        fontSize: 20
    },
    textBold: {
        textAlign: "justify",
        color: properties.style.color.text,
        fontWeight: "bold",
        fontSize: 20
    },
});

export const stylesCardElementRuta = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: properties.style.color.main
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
    title: {
        fontSize: 15,
        color: properties.style.color.text
    },
    titleBold: {
        fontSize: 18,
        fontWeight: "bold",
        color: properties.style.color.text
    },
    textTempo: {
        fontSize: 15,
        justifyContent: "flex-start",
        color: properties.style.color.text
    },
    textDistancia: {
        fontSize: 15,
        justifyContent: "flex-end",
        color: properties.style.color.text
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: properties.style.color.text
    }
});

export const stylesDropDown = StyleSheet.create({
    style: {
        backgroundColor: properties.style.color.main
    },
    scroll: {
        backgroundColor: properties.style.color.main,
        height: 110
    },
    text: {
        fontSize: 15,
        color: properties.style.color.text
    }
});

export const stylesTopNavigator = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: properties.style.color.main
    },
    image: {
        width: "100%",
        height: 150
    },
    imageContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});

export const stylesSearchBar = StyleSheet.create({
    constainer: {
        flex: 1
    },
    searchBar: {
        backgroundColor: "#fff"
    },
    searchBarBorder: {
        backgroundColor: properties.style.color.main
    }
});

export const stylesPlanificadorScreens = StyleSheet.create({
    leftIconsContainer: {
        flex: 3,
        flexDirection: "row"
    },
    rightIconsContainer: {
        flex: 2,
        flexDirection: "row"
    },
    centerIconsContainer: {
        flex: 3,
        flexDirection: "row"
    },
    noElementsContainer: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: properties.style.color.background
    },
    textNoElements: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center"
    }
});

export const flexRowContainer = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: "row",
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: properties.style.color.main
    }
});

export const stylesListInstrucion = StyleSheet.create({
    background: {
        backgroundColor: "#fff"
    },
    text: {
        fontSize: 18
    }
});

export const notLoggedIn = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: properties.style.color.background
    },
    header: {
        backgroundColor: properties.style.color.main,
        flex: 3,
        justifyContent: "center",
        alignContent: "center"
    },
    titleText: {
        fontSize: 50,
        color: properties.style.color.title,
        fontFamily: Platform.OS == "ios" ? "San Francisco" : properties.style.text.title_font_family,
        textAlign: "center"
    },
    subtitleContainer: {
        paddingRight: 50,
        paddingLeft: 50
    },
    subtitleText: {
        fontSize: 24,
        color: properties.style.color.title,
        textAlign: "center"
    },
    bottom: {
        flex: 2,
        justifyContent: "center",
        alignContent: "center",
        padding: 10
    },
    textBottom: {
        fontSize: 20,
        textAlign: "center",
        paddingTop: 10,
        fontWeight: "bold"
    },
    rowTextBottom: {
        flexDirection: "row"
    },
    textLogIn: {
        fontSize: 20,
        color: properties.style.color.darkGreen,
        textDecorationLine: "underline",
        paddingTop: 10
    },
    image: {
        flex: 3,
        resizeMode: "cover",
        justifyContent: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
        justifyContent: "flex-end"
    }
});

export const customTouchableOpacity = {
    buttonContainer: {
        elevation: 0,
        backgroundColor: properties.style.color.button,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    buttonText: {
        fontSize: 25,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    buttonTextSmaller: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
}

export const registerScreen = StyleSheet.create({
    conatiner: {
        flex: 1,
        padding: 35,
        backgroundColor: properties.style.color.background
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#006400"
    },
    textInput: {
        fontSize: 20,
        color: properties.style.color.darkGreen
    },
    buttonViewContainer: {
        paddingTop: 20
    }
});