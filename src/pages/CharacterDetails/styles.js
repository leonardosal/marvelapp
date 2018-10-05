import styled from 'styled-components';
import placeholder from '../../components/placeholder'

export const Container = styled.ScrollView`
`;

export const Avatar = styled(placeholder)`
  backgroundColor: #ccc
  width: 100%;
  height: 300px;
`

export const DescriptionContainer = styled.View`
  color: #000
  padding: 10px;
`;

export const Description = styled.Text`
  font-size: 16px;
  text-align: left
`;