import React, { Component } from 'react';
import { StatusBar } from 'react-native'
import { truncate } from 'lodash'
import Api from '../../helpers/api'

import { Container, ItemRow, Avatar, Content, TitleRow, TitleContainer, Description, List, LoadingContainer, Loading } from './styles'

const params = '?ts=1&apikey=e0f8c5b17505a28de4d5ed47a5f14e92&hash=25e41ba5d1f65f86070f4a3f9d4fa6ed'

class CharactersList extends Component {
  static navigationOptions = {
    title: 'Characters',
    headerStyle: {
      backgroundColor: '#F00'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      textAlign: 'center',
      flex: 1
    },
  };

  state = {
    characters: [],
    loading: false,
    offset: 0
  }

  componentDidMount() {
    this.loadCharacteres();
  }

  loadCharacteres = async () => {
      if(this.state.loading) return
      
      const { offset } = this.state;

      this.setState({ loading: true });
  
      const { data } = await Api.get(`/characters${params}&offset=${offset}`);
      const results = data.data.results
      console.log(offset)
      this.setState({
        characters: [ ...this.state.characters, ...results ],
        offset: offset + 20,
        loading: false,
      });
  }

  renderFooter = () => {
    if (!this.state.loading) return null;
    return (
      <LoadingContainer>
        <Loading />
      </LoadingContainer>
    );
  };

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;
    const textDescription = item.description || 'No description'
    const character = {
      name: item.name,
      description: item.description ? item.description : 'No description',
      imagePath: `${item.thumbnail.path}.${item.thumbnail.extension}`
    }

    return (
      <ItemRow onPress={() => navigate('CharacterDetails', character)}>
        <Avatar source={{uri: `${item.thumbnail.path}.${item.thumbnail.extension}`}} />
        <Content>
          <TitleContainer>
            <TitleRow>{item.name}</TitleRow>
          </TitleContainer>
          <Description>{truncate(textDescription, {'length': 90})}</Description>
        </Content>
      </ItemRow>
    )
  }

  render () {
    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#F00"
        />
        <List
          data={this.state.characters}
          renderItem={this.renderItem}
          keyExtractor={item => String(item.id)}
          ListFooterComponent={this.renderFooter}
        />
      </Container>
    )
  }
}

// onEndReached={this.loadCharacteres}
//onEndReachedThreshold={0.1}
         

export default CharactersList;