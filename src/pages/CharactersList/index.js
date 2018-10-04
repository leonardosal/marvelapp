import React, { Component } from 'react';
import { StatusBar, Platform } from 'react-native'
import { truncate, debounce } from 'lodash'
import { SearchBar } from 'react-native-elements'

import { Container, ItemRow, Avatar, Content, TitleRow, TitleContainer, Description, List, LoadingContainer, Loading, ShimmerAvatar, Shimmer } from './styles'

const baseURL = 'http://gateway.marvel.com/v1/public';
const params = '?ts=1&apikey=e0f8c5b17505a28de4d5ed47a5f14e92&hash=25e41ba5d1f65f86070f4a3f9d4fa6ed'

export default class CharactersList extends Component {

  static searchBar
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
    textSearch: '',
    isVisible: false,
  };

  componentDidMount() {
    this.loadCharacters();
  }

  delay () {
    setTimeout(() => this.setState({ isVisible: !this.state.isVisible }), 2500);
  }

  sendRequest = async () => {
    const { offset } = this.state;
    const response = await fetch(`${baseURL}/characters${params}&offset=${offset}`);
    const { data } = await response.json();
    const listData = this.state.data
    this.setState({
      data: [ ...listData, ...data.results ],
      offset: offset + 20,
      loading: false,
      refreshing: false
    },() => {
      if(!listData.length) this.delay()
    });
   
  }

  search = async (text) => {
    if (this.state.loading) return;
    if(!text){
      this.reload()
      return
    }

    this.searchBar.blur()

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
      textSearch: '',
      isVisible: false
    }, async () => await this.sendRequest());
  }

  loadCharacters = () => {
    if (this.state.loading) return;

    const isDirty = !!this.state.data.length

    this.setState({ loading: true, isVisible: isDirty }, 
      async () => await this.sendRequest());
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
        thumbnailPath: `${item.thumbnail.path}/standard_small.${item.thumbnail.extension}`,
        imagePath: `${item.thumbnail.path}.${item.thumbnail.extension}`
      }

      return (
        <ItemRow onPress={() => navigate('CharacterDetails', character)}>
          <ShimmerAvatar autoRun={true} visible={this.state.isVisible}>
              <Avatar 
              source={{uri: `${item.thumbnail.path}/standard_large.${item.thumbnail.extension}`}} />
          </ShimmerAvatar>
          <Content>
            <TitleContainer>
                <Shimmer autoRun={true} visible={this.state.isVisible}>
                  <TitleRow>{item.name}</TitleRow>
                </Shimmer>
            </TitleContainer>
            <Shimmer autoRun={true} visible={this.state.isVisible}>
              <Description>{truncate(textDescription, {'length': 90})}</Description>
            </Shimmer>
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
          ref={searchBar =>  this.searchBar = searchBar}
          lightTheme
          platform={Platform.OS}
          onChangeText={debounce(this.search, 1000)}
          icon={{ type: 'font-awesome', name: 'search' }}
         />
        
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