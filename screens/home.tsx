/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Button,
  TextInput,
  Alert,
} from 'react-native';
import stations from '../stations.json';

interface Props {
  setData: any;
  setActiveScreen: any;
}
interface Station {
  setActiveSession: any;
}

const Station = ({setActiveSession}: Station) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  const handleSubmit = () => {
    console.log('inputValue.station:', inputValue);

    if (!inputValue) {
      // Validasi gagal, tampilkan pesan kesalahan atau lakukan tindakan lain
      Alert.alert('station harus diisi!');
      return;
    }
    if (inputValue === 'depok') {
      setActiveSession('home');
    } else {
      Alert.alert('station tidak terdaftar!');
    }
    // Lakukan sesuatu dengan nilai yang dimasukkan, seperti menyimpannya ke dalam state atau menyimpannya ke database
    console.log('Data yang dimasukkan:', inputValue);
    setInputValue(''); // Mengosongkan nilai input setelah data ditambahkan
  };

  return (
    <View style={styles.card}>
      <Text style={styles.highlight}>Masukan ID stasiun pengisian (ex: depok)</Text>
      <TextInput
        style={styles.input}
        placeholder="ID Station"
        value={inputValue}
        onChangeText={text => handleInputChange(text)}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const Home = ({setData, setActiveScreen}: Props) => {
  const [expandedId, setExpandedId] = useState(null);
  const [activeSession, setActiveSession] = useState('station');
  console.log('🚀 ~ Home ~ activeSession:', activeSession);

  const handlePress = (id: any) => {
    // Memeriksa apakah id yang diklik sama dengan id yang sedang diperluas
    // Jika ya, maka akan di-collapse (tinggi dikembalikan ke nilai awal)
    // Jika tidak, maka akan di-expand (tinggi diperluas)
    setExpandedId(prevId => (prevId === id ? null : id));
  };

  const handleChoose = (data: object) => {
    setData(data);
    setActiveScreen('chargeDetail');
  };

  const addDot = (number: number) => {
    const strNumber = number.toString();
    const parts = [];
    let part = '';

    for (let i = strNumber.length - 1, count = 0; i >= 0; i--) {
      part = strNumber[i] + part;
      count++;
      if (count === 3 && i !== 0) {
        parts.unshift(part);
        part = '';
        count = 0;
      }
    }

    parts.unshift(part);
    return parts.join('.');
  };

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.HeaderView}>
        <Text style={styles.HeaderText}>CARS CHARGER</Text>
      </View>
      <View>
        {activeSession === 'station' && (
          <Station setActiveSession={setActiveSession} />
        )}
        {activeSession === 'home' && (
          <View>
            {stations.map((value, key) => (
              <TouchableOpacity key={key} onPress={() => handlePress(value.id)}>
                <View
                  style={[
                    styles.flex,
                    styles.content,
                    expandedId === value.id && styles.expanded,
                  ]}>
                  <Text style={styles.highlight}>{value.title}</Text>
                  <Text>{value.description}</Text>
                  {expandedId === value.id && (
                    <Text>Rp{addDot(value.price)} / kWh</Text>
                  )}
                  {expandedId === value.id && (
                    <Button
                      title="choose"
                      onPress={() => handleChoose(value)}
                    />
                  )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  HeaderView: {
    width: '100%',
    padding: '4%',
    backgroundColor: '#5356FF',
    alignItems: 'center',
  },
  HeaderText: {
    color: '#DFF5FF',
    fontWeight: '700',
  },
  highlight: {
    fontWeight: '700',
  },
  flex: {
    display: 'flex',
    backgroundColor: '#67C6E3',
    margin: '2%',
    padding: '2%',
  },
  content: {
    minHeight: 50,
  },
  expanded: {
    minHeight: 100,
  },
  card: {
    padding: 5,
    justifyContent: 'space-between',
    margin: 5,
  },
});

export default Home;
