import { StyleSheet, Platform, StatusBar } from 'react-native';
import properties from '../properties/properties_expo';

export const styleTurismoItem = StyleSheet.create({
    scroll: {
        backgroundColor: properties.style.color.background
    },
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
        fontSize: 16
    },
    viewTextContainer: {
        padding: 10,
        alignItems: "center"
    },
    text: {
        fontSize: 15,
        textAlign: "justify"
    },
    textBold: {
        fontWeight: "bold",
        fontSize: 15,
        textAlign: "justify"
    },
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
        padding: 10
    },
    title: {
        fontSize: 15,
        fontWeight: "bold"
    },
    rowContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    iconsContainer: {
        flex: 2,
        flexDirection: "row"
    },
    titleContainer: {
        flex: 1
    },
    iconClose: {
        flex: 0
    },
    closeContainer: {
        flexDirection: "row",
        justifyContent: "flex-end"
    }, 
    chevron: {
        flexDirection: "column",
        flex: 1
    },
    dropDown: {
        flex: 1
    },
    tempo: {
        flexDirection: "row",
        flex: 2
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
    scroll: {
        backgroundColor: properties.style.color.background
    },
    leftIconsContainer: {
        flex: 2,
        flexDirection: "row"
    },
    centerIconsContainer: {
        flex: 2.5,
        flexDirection: "row"
    },
    rightIconsContainer: {
        flex: 1.1,
        flexDirection: "row"
    }
});

export const flexRowContainer = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: "row",
        padding: 20,
        justifyContent: "center",
        alignItems: "center"
    }
})