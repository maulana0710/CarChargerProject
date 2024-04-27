/* eslint-disable prettier/prettier */
import React from 'react';
import {ScrollView, View, Text, StyleSheet, Button} from 'react-native';

interface Props {
  data: any;
  setData: any;
  setActiveScreen: any;
}

export default function ChargerDetail({
  data,
  setData,
  setActiveScreen,
}: Props): React.JSX.Element {
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
  // Hitung total kWh
  const totalKWh = data.price * 10;
  // Hitung persentase
  const calculatedPercentage = (20 / 100) * data.price;
  // Hitung total harga
  const totalPrice = totalKWh + calculatedPercentage + 500;
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.HeaderView}>
        <Text style={styles.HeaderText}>CARS CHARGER</Text>
      </View>
      <View style={styles.container}>
        <View>
          <Text style={styles.highlight}>{data.title}</Text>
          <Text>Rp{addDot(data.price)} / kWh</Text>
        </View>
        <View style={styles.card}>
          <Text style={[styles.title]}>Payment Detail</Text>
          <View style={styles.flex}>
            <Text>Total kWh (10)</Text>
            <Text>Rp{addDot(totalKWh)}</Text>
          </View>
          <View style={styles.flex}>
            <Text>PPN (20%)</Text>
            <Text>Rp{addDot(calculatedPercentage)}</Text>
          </View>
          <View style={styles.flex}>
            <Text>Admin fee</Text>
            <Text>Rp500</Text>
          </View>
          <View style={styles.horizontalRule} />
          <View style={styles.flex}>
            <Text>Total</Text>
            <Text>Rp{addDot(totalPrice)}</Text>
          </View>
        </View>
        <Button
          title="Pay"
          onPress={() => {
            setActiveScreen('charging');
            setData({...data, totalPrice: totalPrice});
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 20,
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: '2%',
    padding: '2%',
  },
  container: {
    padding: 10,
    justifyContent: 'space-between',
  },
  content: {
    minHeight: 50,
  },
  expanded: {
    minHeight: 100,
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#DFF5FF',
  },
  horizontalRule: {
    height: 1,
    backgroundColor: 'black',
    marginVertical: 10,
  },
});
