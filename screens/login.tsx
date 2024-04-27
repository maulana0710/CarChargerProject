/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, Text } from 'react-native';

interface Props {
  setActiveScreen: any;
}

const Login = ({ setActiveScreen }: Props): React.JSX.Element => {
  const [inputValue, setInputValue] = useState({ username: '', password: '' });

  const handleInputChange = (name: string, value: string) => {
    setInputValue({ ...inputValue, [name]: value });
  };

  const handleSubmit = () => {
    if (!inputValue.username || !inputValue.password) {
      // Validasi gagal, tampilkan pesan kesalahan atau lakukan tindakan lain
      Alert.alert('Username dan password harus diisi!');
      return;
    }
    if (inputValue.username === 'user' && inputValue.password === 'user123') {
      setActiveScreen('home');
    } else {
      Alert.alert('Username dan password tidak terdaftar!');
    }
    // Lakukan sesuatu dengan nilai yang dimasukkan, seperti menyimpannya ke dalam state atau menyimpannya ke database
    console.log('Data yang dimasukkan:', inputValue);
    setInputValue({ username: '', password: '' }); // Mengosongkan nilai input setelah data ditambahkan
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>LOGIN</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={inputValue.username}
        onChangeText={(text) => handleInputChange('username', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={inputValue.password}
        onChangeText={(text) => handleInputChange('password', text)}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontWeight: '600',
    fontSize: 25,
  },
  card: {
    borderWidth: 1,
    borderRadius: 5,
    height: 250,
    padding: 5,
    justifyContent: 'space-between',
    margin: 5,
  },
});

export default Login;
