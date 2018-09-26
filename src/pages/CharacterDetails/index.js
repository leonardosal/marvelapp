import React, { Component } from 'react';

import { Container, Avatar, Description, DescriptionContainer } from './styles'

class CharacterDetails extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('name'),
    headerStyle: {
      backgroundColor: '#F00'
    },
    headerTintColor: '#fff'
  });

  render () {
    const { description, imagePath} = this.props.navigation.state.params

    return (
      <Container>
        <Avatar resizeMode="stretch" source={{uri: imagePath}}></Avatar>
        <DescriptionContainer>
          <Description>{description}</Description>
        </DescriptionContainer>
      </Container>
    )
  }
}

export default CharacterDetails;