import React, { Component } from 'react';
import { capitalize, truncate } from 'lodash'
import Api from '../../helpers/api'

import { Container, ItemRow, Avatar, Content, TitleRow, TitleContainer, Description } from './styles'

const params = '?ts=1&apikey=e0f8c5b17505a28de4d5ed47a5f14e92&hash=25e41ba5d1f65f86070f4a3f9d4fa6ed'

class RepoList extends Component {
  static navigationOptions = {
    title: 'Marvel Characters',
  };

  state = {
    error: null,
    characters: []
  }

  componentDidMount() {
    this.setState({ error: null }, async () => {
      try {
        const { data } = await Api.get(`/characters${params}`);
        this.setState({
          characters: data.data.results
        })
      } catch(err) {
        this.setState({ error: 'Ocorreu um erro ao recuperar os dados' });
      }
    });
  }

  render () {
    return (
      <Container>
        {this.state.characters && this.state.characters.map((item) => (
          <ItemRow key={item.id}>
             <Avatar source={{uri: `${item.thumbnail.path}.${item.thumbnail.extension}`}} />
             <Content>
              <TitleContainer>
                <TitleRow>{capitalize(item.name)}</TitleRow>
              </TitleContainer>
              <Description>{item.description ? 
                truncate(item.description, {'length': 90}) 
                : 'No description'}</Description>
            </Content>
          </ItemRow>
        ))}
      </Container>
    )
  }
}

export default RepoList;