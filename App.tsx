/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import Home from './screens/home';
import Login from './screens/login';
import ChargerDetail from './screens/charger-detail';
import Charging from './screens/charging';

function App(): React.JSX.Element {
  const [activeScreen, setActiveScreen] = useState('login');
  const [data, setData] = useState({});
  console.log('🚀 ~ App ~ data:', data);

  return (
    <SafeAreaView>
      {activeScreen === 'login' && (
        <View style={styles.height}>
          <Login setActiveScreen={setActiveScreen} />
        </View>
      )}
      {activeScreen === 'home' && (
        <View>
          <Home setData={setData} setActiveScreen={setActiveScreen} />
        </View>
      )}
      {activeScreen === 'chargeDetail' && (
        <View>
          <ChargerDetail
            data={data}
            setData={setData}
            setActiveScreen={setActiveScreen}
          />
        </View>
      )}
      {activeScreen === 'charging' && (
        <View>
          <Charging data={data} setActiveScreen={setActiveScreen} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
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
  },
  content: {
    margin: '2%',
    padding: '2%',
  },
  height: {
    height: '100%',
    justifyContent: 'space-around',
  },
});

export default App;
