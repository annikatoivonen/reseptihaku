import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, Image } from 'react-native';
import React, { useState } from 'react';

export default function App() {

  const [keyword, setKeyword] = useState('');
  const [repositories, setRepositories] = useState([]);

  const getRepositories = () => {
    fetch('https://www.themealdb.com/api/json/v1/1/filter.php?i='+keyword)
    .then(response => response.json())
    .then(data => setRepositories(data.meals))
    .catch(error => {
      Alert.alert('Error', error);
    });
  }

  const listSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: 80, 
          backgroundColor: 'blue', 
          marginLeft: 10,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
    <View style={{flex:1, justifyContent:'center'}}>
      <TextInput
        style={styles.input}
        placeholder='keyword'
        onChangeText={text => setKeyword(text)}>
      </TextInput>
      <Button
        title="FIND"
        onPress={getRepositories}>
      </Button>
    </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>
        <View style={{flex:2}}>
          <Text>{item.strMeal}</Text>
          <Image source={{url: item.strMealThumb+'/preview'}}
          style={styles.image}></Image>
          </View>}
        data={repositories}
        ItemSeparatorComponent={listSeparator}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 150,
    borderWidth: 1,
    margin: 12,
    padding: 10,
  },
  image: {
    width:100,
    height: 100,
  },
});
