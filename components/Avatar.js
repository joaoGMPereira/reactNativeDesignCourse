import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    name: state.name,
    photo: state.photo
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateName: response =>
      dispatch({
        type: "UPDATE_NAME",
        name: response.name,
        photo: response.photo
      })
  };
}

class Avatar extends React.Component {
  componentDidMount() {
    fetch("https://uinames.com/api/?ext")
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.props.updateName(response);
      });
  }

  render() {
    return <Image source={{ uri: this.props.photo }} />;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar);

const Image = styled.Image`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  margin-left: 20px;
`;
