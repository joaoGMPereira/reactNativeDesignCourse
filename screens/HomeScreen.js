import React from "react";
import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar
} from "react-native";
import styled from "styled-components";
import Card from "../components/Card";
import Logo from "../components/Logo";
import Course from "../components/Course";
import { NotificationIcon } from "../components/Icons";
import LogosModel from "../models/LogosModel";
import CardsQuery from "../models/CardsModel";
import CoursesModel from "../models/CoursesModel";
import Menu from "../components/Menu";
import { connect } from "react-redux";
import Avatar from "../components/Avatar";
import { Query } from "react-apollo";
import { Platform } from "react-native";

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU"
      })
  };
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1)
  };

  componentDidMount() {
    StatusBar.setBarStyle("dark-content", true);
    if (Platform.OS === "android") StatusBar.setBarStyle("light-content", true);
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.parallel([
        Animated.timing(this.state.scale, {
          toValue: 0.9,
          duration: 300,
          easing: Easing.in()
        }),
        Animated.timing(this.state.opacity, {
          toValue: 0.5,
          duration: 300
        })
      ]).start();

      StatusBar.setBarStyle("light-content", true);
      if (Platform.OS === "android")
        StatusBar.setBarStyle("light-content", true);
    }

    if (this.props.action == "closeMenu") {
      Animated.parallel([
        Animated.timing(this.state.scale, {
          toValue: 1,
          duration: 300
        }),
        Animated.timing(this.state.opacity, {
          toValue: 1,
          duration: 300
        })
      ]).start();

      StatusBar.setBarStyle("dark-content", true);
      if (Platform.OS === "android")
        StatusBar.setBarStyle("light-content", true);
    }
  };

  render() {
    return (
      <RootView>
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity
          }}
        >
          <SafeAreaView>
            <ScrollView style={{ height: "100%" }}>
              <TitleBar>
                <TouchableOpacity
                  onPress={this.props.openMenu}
                  style={{ position: "absolute", top: 0, left: 10 }}
                >
                  <Avatar />
                </TouchableOpacity>
                <Title>Welcome back,</Title>
                <Name>{this.props.name}</Name>
                <NotificationIcon
                  style={{ position: "absolute", right: 20, top: 5 }}
                />
              </TitleBar>
              <ScrollView
                style={{
                  flexDirection: "row",
                  padding: 20,
                  paddingLeft: 12,
                  paddingTop: 30
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {LogosModel.map((logo, index) => (
                  <Logo key={index} image={logo.image} text={logo.text} />
                ))}
              </ScrollView>
              <Subtitle>{"Continue Learning".toUpperCase()}</Subtitle>
              <ScrollView
                horizontal={true}
                style={{ paddingBottom: 30 }}
                showsHorizontalScrollIndicator={false}
              >
                <Query query={CardsQuery}>
                  {({ loading, error, data }) => {
                    if (loading) return <Message>Loading...</Message>;
                    if (error) return <Message>Error...</Message>;

                    console.log(data.cardsCollection.items);

                    return (
                      <CardsContainer>
                        {data.cardsCollection.items.map((card, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              this.props.navigation.push("Section", {
                                section: card
                              });
                            }}
                          >
                            <Card
                              title={card.title}
                              image={{ uri: card.image.url }}
                              caption={card.caption}
                              logo={{ uri: card.logo.url }}
                              subtitle={card.subtitle}
                              content={card.content}
                            />
                          </TouchableOpacity>
                        ))}
                      </CardsContainer>
                    );
                  }}
                </Query>
                {/* <CardsContainer>
                  {CardsQuery.map((card, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        console.log(card);
                        this.props.navigation.navigate("Section", {
                          section: card
                        });
                      }}
                    >
                      <Card
                        title={card.title}
                        image={card.image}
                        caption={card.caption}
                        logo={card.logo}
                        subtitle={card.subtitle}
                        content={card.content}
                      />
                    </TouchableOpacity>
                  ))}
                </CardsContainer> */}
              </ScrollView>
              <Subtitle>{"Popular Courses".toUpperCase()}</Subtitle>
              <CoursesContainer>
                {CoursesModel.map((course, index) => (
                  <Course
                    key={index}
                    image={course.image}
                    title={course.title}
                    subtitle={course.subtitle}
                    logo={course.logo}
                    author={course.author}
                    avatar={course.avatar}
                    caption={course.caption}
                  />
                ))}
              </CoursesContainer>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootView>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const RootView = styled.View`
  background: black;
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;
const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const Subtitle = styled.Text`
  font-size: 15px;
  color: #b8bece;
  font-weight: 500;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const Message = styled.Text`
  margin: 20px;
  color: #b8bece;
  font-size: 15px;
  font-weight: 500;
`;

const CoursesContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const CardsContainer = styled.View`
  flex-direction: row;
  padding-left: 10px;
`;
