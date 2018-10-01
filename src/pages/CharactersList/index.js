import React, { Component } from 'react';
import { StatusBar } from 'react-native'
import { truncate, debounce } from 'lodash'
import { SearchBar } from 'react-native-elements'

import {Container, ItemRow, Avatar, Content, TitleRow, TitleContainer, Description, List, LoadingContainer, Loading } from './styles'

const baseURL = 'http://gateway.marvel.com/v1/public';
const params = '?ts=1&apikey=e0f8c5b17505a28de4d5ed47a5f14e92&hash=25e41ba5d1f65f86070f4a3f9d4fa6ed'

export default class CharactersList extends Component {
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
    data: [],
    offset: 0,
    loading: false,
    refreshing: false,
    textSearch: ''
  };

  componentDidMount() {
    this.loadCharacters();
  }

  sendRequest = async () => {
    const { offset } = this.state;
    const response = await fetch(`${baseURL}/characters${params}&offset=${offset}`);
    const { data } = await response.json();
    this.setState({
      data: [ ...this.state.data, ...data.results ],
      offset: offset + 20,
      loading: false,
      refreshing: false
    });
  }

  search = async (text) => {
    if (this.state.loading) return;
    
    if(!text){
      this.reload()
      return
    }

    this.setState({ 
      loading: true,
      offset: 0,
      data: [],
      textSearch: text
    }, async () => {
      const response = await fetch(`${baseURL}/characters${params}&nameStartsWith=${text}`);
      const { data } = await response.json();
      this.setState({
        data: data.results,
        loading: false
      });
    });
  }

  reload = async () => {
    this.setState({ 
      refreshing: true,
      offset: 0,
      data: [],
      textSearch: ''
    }, async () => await this.sendRequest());
  }

  loadCharacters = async () => {
    if (this.state.loading) return;

    this.setState({ loading: true });

    await this.sendRequest()
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <LoadingContainer>
        <Loading></Loading>
      </LoadingContainer>
    );
  };

  renderHeader = () => {
    if (!this.state.refreshing) return null;

    return (
      <LoadingContainer>
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
          <Avatar source={{uri: `${item.thumbnail.path}/standard_large.${item.thumbnail.extension}`}} />
          <Content>
            <TitleContainer>
              <TitleRow>{item.name}</TitleRow>
            </TitleContainer>
            <Description>{truncate(textDescription, {'length': 90})}</Description>
          </Content>
        </ItemRow>
      )
    };

  render() {
    return (
      <Container>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#F00"
        />

        <SearchBar
          lightTheme
          onChangeText={debounce(this.search, 1000)}
          onClearText={this.reload}
          icon={{ type: 'font-awesome', name: 'search' }}
          placeholder='Search character by name' />
        
        <List
          data={this.state.data}
          renderItem={this.renderItem}
          keyExtractor={item => `${item.id}`}
          refreshing={this.state.refreshing}
          onRefresh={this.reload}
          onEndReached={this.state.textSearch ? () => null : this.loadCharacters}
          onEndReachedThreshold={0.1}
          ListFooterComponent={this.renderFooter}
          ListHeaderComponent={this.renderHeader}
        />
    </Container>
    );
  }
}
