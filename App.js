import { json } from 'body-parser';
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native'


function App() {

  const [user, setUser] = useState({
    nome: '',
    email: ''
  });

  const getUser = async () => {
    try {
      const response = await fetch("http://localhost:3000/users");
      const jsonData = await response.json();

      setUser({
        nome: jsonData[0].usuario,
        email: jsonData[0].email
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <View>
      <Text>Hola</Text>
      <Text> {user.nome} </Text>
      <Text> {user.email} </Text>
    </View>
  );
}
export default App;
