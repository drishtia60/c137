import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import axios from "axios";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      imagePath: "",
      url: "https://2431-2405-201-8008-e095-a413-c282-beb3-6a86.ngrok.io",
    };
  }

  componentDidMount() {
    this.getPlanets();
  }

  getPlanets = () => {
    const { url } = this.state;
    axios
      .get(url)
      .then((response) => {
        this.setState({
          listData: response.data.data,
        });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  setDetails = (planetDetails) => {
    const planetType = planetDetails.planet_type;
    let imagePath = "";
    switch (planetType) {
      case "Gas Giant":
        imagePath = require("../assets/Gas_Giant.png");
        break;
      case "Terrestrial":
        imagePath = require("../assets/Terrestrial.png");
        break;
      case "Super Earth":
        imagePath = require("../assets/Super_Earth.png");
        break;
      case "Neptune Like":
        imagePath = require("../assets/Neptune-like.png");
        break;
      default:
        imagePath = require("../assets/Gas_Giant.png");
    }

    this.setState({
      details: planetDetails,
      imagePath: imagePath,
    });
  };

  renderItem = ({ item, index }) => {
    this.setDetails(item);
    return (
      <TouchableOpacity
        style={[
          styles.listItem,
          { backgroundColor: this.selectColor(index), opacity: 0.7 },
        ]}
        onPress={() =>
          this.props.navigation.navigate("Details", { planet_name: item.name })
        }
      >
        <Image
          source={this.state.imagePath}
          style={styles.cardImage}
        ></Image>

        <View style={styles.nameCardPlanet}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  keyExtractor = (item, index) => index.toString();

  /*this function selects a color for the cards on the flatlist*/
  selectColor = (index) => {
    var color = ["#fbffd5", "#ffefff", "#ede5ff", "#eafff4"];
    var num = index % 4;
    return color[num];
  };

  render() {
    const { listData } = this.state;

    if (listData.length != 0) {
      return (
        <View style={styles.container}>
          <SafeAreaView
            style={{
              marginTop:
                Platform.OS === "android" ? StatusBar.currentHeight : 0,
            }}
          />
          <ImageBackground
            source={require("../assets/bg.png")}
            style={{ flex: 1, paddingTop: 20 }}
          >
            <View style={styles.upperContainer}>
              <Text style={styles.headerText}>Planets World</Text>
            </View>
            <View style={styles.lowerContainer}>
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.listData}
                renderItem={this.renderItem}
                numColumns={2}
              />
            </View>
          </ImageBackground>
        </View>
      );
    } else {
      return (
        <ImageBackground
          source={require("../assets/bg.png")}
          style={{ flex: 1, paddingTop: 20 }}
        >
          <View
            style={{ alignItems: "center", justifyContent: "center", flex: 1 }}
          >
            <Text style={styles.headerText}>Loading...</Text>
          </View>
        </ImageBackground>
      );
    }
  }
}