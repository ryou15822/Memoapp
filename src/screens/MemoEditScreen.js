import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';

import firebase from 'firebase';

import CircleButton from '../elements/CircleButton';

class MemoEditScreen extends React.Component {
state = {
  body: '',
  key: '',
}

componentWillMount() { //  MemoDetailScreenが表示される前に処理
  const { params } = this.props.navigation.state;
  this.setState({ // 文字列を定義しておく
    body: params.memo.body,
    key: params.memo.key,
  });
}

handlePress() {
  const { currentUser } = firebase.auth();
  const db = firebase.firestore();
  console.log(this.state);
  db.collection(`users/${currentUser.uid}/memos`).doc(this.state.key) // keyの文字列を取得
    .update({
      body: this.state.body, //  メモの内容を更新する
    })
    .then(() => {
      console.log('success!');
    })
    .catch((error) => {
      console.log(error);
    });
}

render() {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.memoEditInput}
        multiline
        value={this.state.body} // bodyを直接定義した
        onChangeText={(text) => { this.setState({ body: text }); }} // こちらもbodyを直接定義
      />
      <CircleButton onPress={this.handlePress.bind(this)}>
        {'\uf00c'}
      </CircleButton>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  memoEditInput: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    fontSize: 16,
  },
});

export default MemoEditScreen;
