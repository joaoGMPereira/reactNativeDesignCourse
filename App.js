import React from "react";
import { ScrollView, SafeAreaView } from "react-native";
import styled from "styled-components";
import Card from "./components/Card";
import Logo from "./components/Logo";
import Course from "./components/Course";
import { NotificationIcon } from "./components/Icons";
import LogosModel from "./Models/LogosModel";
import CardsModel from "./Models/CardsModel";
import CoursesModel from "./Models/CoursesModel";
export default class App extends React.Component {
  render() {
    return (
      <Container>
        <SafeAreaView>
          <ScrollView style={{ height: "100%" }}>
            <TitleBar>
              <Avatar source={require("./assets/avatar.jpg")} />
              <Title>Welcome back,</Title>
              <Name>John</Name>
              <NotificationIcon
                style={{ position: "absolute", right: 20, top: 5 }}
              />
            </TitleBar>
            <ScrollView
              horizontal={true}
              style={{
                paddingTop: 30,
                paddingBottom: 20
              }}
              showsHorizontalScrollIndicator={false}
            >
              {LogosModel.map((logo, index) => (
                <Logo key={index} image={logo.image} text={logo.text} />
              ))}
            </ScrollView>
            <Subtitle>Continue Learning</Subtitle>
            <ScrollView
              horizontal={true}
              style={{ paddingBottom: 30 }}
              showsHorizontalScrollIndicator={false}
            >
              {CardsModel.map((card, index) => (
                <Card
                  key={index}
                  title={card.title}
                  image={card.image}
                  logo={card.logo}
                  caption={card.caption}
                  subtitle={card.subtitle}
                />
              ))}
            </ScrollView>
            <Subtitle>Popular Courses</Subtitle>
            {CoursesModel.map((course, index) => (
              <Course
                key={index}
                subtitle={course.subtitle}
                title={course.title}
                image={course.image}
                logo={course.logo}
                avatar={course.avatar}
                caption={course.caption}
                author={course.author}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </Container>
    );
  }
}

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
  margin-left: 20px;
  position: absolute;
  top: 0;
  left: 0;
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
