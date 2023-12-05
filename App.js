import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState('15');
  const [numberOfPeople, setNumberOfPeople] = useState('1');
  const [total, setTotal] = useState('0.00');
  const [tipAmount, setTipAmount] = useState('0.00');
  const [totalWithTip, setTotalWithTip] = useState('0.00');

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const tip = (bill * parseFloat(tipPercentage)) / 100;
    const totalAmount = bill + tip;

    setTipAmount(tip.toFixed(2));
    setTotalWithTip(totalAmount.toFixed(2));

    const perPersonTotal = totalAmount / parseInt(numberOfPeople);
    setTotal(perPersonTotal.toFixed(2));
  };

  const goToResultScreen = () => {
    const peopleArray = Array.from({ length: parseInt(numberOfPeople) }, (_, index) => ({
      id: index.toString(),
      totalPerPerson: total,
    }));

    navigation.navigate('Result', {
      peopleArray,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora De Propina</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.symbol}>$</Text>
        <TextInput
          style={styles.input}
          placeholder="costo de paga"
          keyboardType="numeric"
          value={billAmount}
          onChangeText={(text) => setBillAmount(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.symbol}>%</Text>
        <TextInput
          style={styles.input}
          placeholder="Porcentaje"
          keyboardType="numeric"
          value={tipPercentage}
          onChangeText={(text) => setTipPercentage(text)}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.symbol}>#</Text>
        <TextInput
          style={styles.input}
          placeholder="Numero de personas"
          keyboardType="numeric"
          value={numberOfPeople}
          onChangeText={(text) => setNumberOfPeople(text)}
        />
      </View>
      <Button
        title="Calcular"
        onPress={calculateTip}
        color="#BA68C8" 
      />
      <Text style={styles.resultText}>Cantidad de Propina: ${tipAmount}</Text>
      <Text style={styles.resultText}>Cantidad Total : ${totalWithTip}</Text>
      <Text style={styles.total}>Total por persona: ${total}</Text>
      <Button
        title="Division de la cuenta"
        onPress={goToResultScreen}
        color="#BA68C8" 
      />
      <StatusBar style="auto" />
    </View>
  );
};

const ResultScreen = ({ route, navigation }) => {
  const { peopleArray } = route.params;
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [paidAmount, setPaidAmount] = useState('');

  const calculateChange = () => {
    if (selectedPerson !== null) {
      const paid = parseFloat(paidAmount) || 0;
      const totalPerPerson = parseFloat(peopleArray[selectedPerson].totalPerPerson);
      const change = paid - totalPerPerson;
      alert(`Change: $${change.toFixed(2)}`);
    } else {
      alert('Select a person before calculating the change.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desglose de la cuenta</Text>
      <FlatList
        data={peopleArray}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => setSelectedPerson(index)}
            style={[
              styles.personItem,
              { backgroundColor: selectedPerson === index ? '#BA68C8' : '#FFD9E6' },
            ]}
          >
            <Text style={styles.personText}>Person {index + 1}: ${item.totalPerPerson}</Text>
          </TouchableOpacity>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Cantidad Pagada"
        keyboardType="numeric"
        value={paidAmount}
        onChangeText={(text) => setPaidAmount(text)}
      />
      <Button title="C" onPress={calculateChange} color="#BA68C8" />
      <StatusBar style="auto" />
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Inicio" component={HomeScreen} />
        <Stack.Screen name="Resultado" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    marginBottom: 15,
    color: '#333333',
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  symbol: {
    fontSize: 20,
    marginRight: 10,
    color: '#333333',
  },
  input: {
    height: 40,
    borderColor: '#333333',
    borderWidth: 1,
    marginHorizontal: 10,
    width: 200,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  total: {
    fontSize: 18,
    marginTop: 15,
    color: '#333333',
  },
  resultText: {
    fontSize: 18,
    marginTop: 5,
    color: '#333333',
    textAlign: 'right',
  },
  personItem: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  personText: {
    fontSize: 16,
    color: '#333333',
  },
});
