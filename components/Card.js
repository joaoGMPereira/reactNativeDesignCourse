import React from "react";
import styled from "styled-components";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;
const Card = props => (
  <Container>
    <Cover>
      <Image source={props.image} />
      <Title>{props.title}</Title>
    </Cover>
    <Component>
      <Logo source={props.logo} />
      <Wrapper>
        <Caption>{props.caption}</Caption>
        <Subtitle>{props.subtitle}</Subtitle>
      </Wrapper>
    </Component>
  </Container>
);

export default Card;

const Container = styled.View`
  background: white;
  width: ${screenWidth * 0.9};
  height: 280px;
  border-radius: 14px;
  margin-left: 10px;
  margin-right: 10px;
  margin-top: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
`;

const Cover = styled.View`
  height: 200px;
  border-top-right-radius: 14px;
  border-top-left-radius: 14px;
  overflow: hidden;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const Title = styled.Text`
  color: white;
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  margin-left: 20px;
  width: 170px;
`;

const Component = styled.View`
  padding-left: 20px;
  flex-direction: row;
  align-items: center;
  height: 80px;
`;

const Wrapper = styled.View`
  margin-left: 10px;
`;

const Logo = styled.Image`
  width: 44px;
  height: 44px;
`;

const Caption = styled.Text`
  color: #3c4560;
  font-size: 20px;
  font-weight: 600;
`;

const Subtitle = styled.Text`
  color: #b8bebe;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
`;
