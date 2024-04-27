/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, StyleSheet, Button, Alert} from 'react-native';

interface Props {
  data: any;
  setActiveScreen: any;
}

export default function Charging({
  data,
  setActiveScreen,
}: Props): React.JSX.Element {
  const energyCapacity = 100 - 20;
  const [remainingTime, setRemainingTime] = useState<number>(0);
  const [startStopHandler, setStartStopHandler] = useState<boolean>(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    // Fungsi untuk memperbarui waktu sisa
    const updateRemainingTime = () => {
      if (remainingTime > 0) {
        setRemainingTime(prevTime => prevTime - 1); // Kurangi waktu sisa setiap detik
      }  else {
        clearInterval(timer!); // Hentikan timer jika waktu sisa telah habis
        Alert.alert('Pengisian telah selesai!', 'OK', [{ text: 'OK', onPress: () => setActiveScreen('home') }]);
      }
    };

    // Memperbarui waktu sisa saat charging dimulai
    if (startStopHandler) {
      timer = setInterval(updateRemainingTime, 1000); // Mulai interval untuk memperbarui waktu sisa setiap detik
    } else {
      clearInterval(timer!); // Membersihkan timer jika charging dihentikan
    }

    return () => {
      // Membersihkan timer ketika komponen di-unmount
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [remainingTime, startStopHandler, setActiveScreen]); // Tambahkan remainingTime dan startStopHandler ke dalam dependensi useEffect

  useEffect(() => {
    const durationCharging = energyCapacity / data.charge;
    setRemainingTime(Math.round(durationCharging * 3600)); // Konversi durasi ke detik dan atur sebagai waktu sisa awal
  }, [data, energyCapacity]); // Tambahkan data dan energyCapacity ke dalam dependensi useEffect

  // Fungsi untuk mengonversi waktu sisa ke format yang sesuai
  const formatRemainingTime = (timeInSeconds: number): string => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return `${hours} Hours ${minutes} Minutes ${seconds} Seconds Remaining`;
  };

  const finsihHandler = () => {
    setRemainingTime(0);
    Alert.alert('Pengisian telah selesai!', 'OK', [{ text: 'OK', onPress: () => setActiveScreen('home') }]);
  };
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.HeaderView}>
        <Text style={styles.HeaderText}>CARS CHARGER</Text>
      </View>
      <View style={styles.container}>
        <Text style={[styles.title, styles.highlight]}>Charging Status</Text>
        <View style={styles.center}>
          <Text style={[styles.title]}>
            Anda sedang terhubung ke Charging Station
          </Text>
        </View>
        <Text style={[styles.title]}>{data.title}</Text>
        <Text style={[]}>{data.description}</Text>
        <View style={styles.flex}>
          <Text>Total Payment</Text>
          <Text>Rp{data.totalPrice}</Text>
        </View>
        <View style={styles.flex}>
          <Text>Capacity</Text>
          <Text>{energyCapacity} kWh Remaining</Text>
        </View>
        <View style={styles.flex}>
          <Text>Duration</Text>
          <Text>{formatRemainingTime(remainingTime)}</Text>
        </View>
        <View style={styles.divider}>
          <Button
            color={startStopHandler ? 'red' : 'green'}
            title={`${
              remainingTime === 0
                ? 'finish'
                : startStopHandler
                ? 'Stop'
                : 'Start'
            }`}
            onPress={() => setStartStopHandler(prev => !prev)}
          />
          {!startStopHandler && (
            <Button
              title="Finish"
              color="red"
              onPress={() => finsihHandler()}
            />
          )}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  HeaderView: {
    width: '100%',
    padding: 12,
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
  center: {
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  container: {
    padding: 10,
    justifyContent: 'space-between',
  },
  divider: {
    padding: 10,
    height: 300,
    justifyContent: 'space-between',
  },
});
