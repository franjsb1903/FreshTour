import { StyleSheet, Platform } from 'react-native';
import properties from '../properties/properties_expo';

const styleTurismoItem = StyleSheet.create({
    scroll: {
        backgroundColor: properties.color.background
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
    resumoContainer: {
        flex: 0,
        flexDirection: "row",
        padding: 20,
        justifyContent: "center",
        alignItems: "center"
    },
    resumoStars: {
        padding: 0,
        flex: 1
    },
    resumoText: {
        flex: 1,
        marginLeft: 5,
        padding: 0
    },
    resumoIconElements: {
        padding: 0,
        margin: 3
    },
    resumoContainerText: {
        flex: 0,
        flexGrow: 0,
        padding: 20
    },
    resumo: {
        textAlign: "justify",
        fontSize: 18
    }
});

const stylesTurismoList = StyleSheet.create({
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

const stylesMapa = StyleSheet.create({
    header: {
      backgroundColor: properties.color.main,
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
      color: properties.color.title,
      fontFamily: Platform.OS == "ios" ? "San Francisco" : properties.text.title_font_family
    }
    ,
    icon: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

export { styleTurismoItem, stylesTurismoList, stylesMapa }