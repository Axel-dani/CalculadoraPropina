import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

export default function Ventana2({ route }) {
  const { totalPersonas, importePorPersona } = route.params;

  const [personasPago, setPersonasPago] = useState(totalPersonas.toString());
  const [aporto, setAporto] = useState('');
  const [cambio, setCambio] = useState('');

  const sumarRestarPersonas = (operacion) => {
    const valorActual = Number(personasPago);
    const nuevoValor = operacion === 'sumar' ? valorActual + 1 : Math.max(valorActual - 1, 1);
    setPersonasPago(nuevoValor.toString());
  };

  const calcularCambio = () => {
    const personasPagoNumerico = Number(personasPago);
    const aportoNumerico = Number(aporto);

    const totalPagar = importePorPersona * personasPagoNumerico;
    const cambioCalculado = aportoNumerico - totalPagar;

    setCambio(cambioCalculado.toFixed(2));
  };

  return (
    <View style={styles.contenedor}>
      <Text>{`De los `}
        <Text style={styles.negrita}>{`${totalPersonas}`}</Text>
        <Text> comerciantes </Text>
      </Text>

      <View style={styles.yoPagoContainer}>
        <Text>Yo pago por:</Text>
        <TextInput
          style={styles.inputYoPago}
          keyboardType="numeric"
          value={personasPago}
          onChangeText={(text) => setPersonasPago(text)}
          placeholder="0"
          placeholderTextColor="black"
        />
        <TouchableOpacity
          style={styles.botonSumarRestar}
          onPress={() => sumarRestarPersonas('sumar')}
        >
          <Text style={styles.TextoBotonSumarRestar}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botonSumarRestar}
          onPress={() => sumarRestarPersonas('restar')}
        >
          <Text style={styles.TextoBotonSumarRestar}>-</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.totalTexto}>{`Mi total es: $`}
        <Text style={styles.negrita}>{`${(importePorPersona * Number(personasPago)).toFixed(2)}`}</Text>
      </Text>

      <Text>Aporto:</Text>
      <TextInput
        style={styles.inputAporto}
        keyboardType="numeric"
        value={aporto}
        onChangeText={(text) => setAporto(text)}
        placeholder="Ingrese la cantidad"
        placeholderTextColor="black"
      />

      <Text style={styles.cambioTexto}>{`Mi cambio es: $`}
        <Text style={styles.negrita}>{`${cambio}`}</Text>
      </Text>

      <Button
        title="Calcular"
        onPress={calcularCambio}
        style={styles.calcularBoton}
        textStyle={styles.TextoBotonCalcular}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yoPagoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputYoPago: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 50,
    padding: 8,
    marginBottom: 10,
  },
  botonSumarRestar: {
    backgroundColor: '#4BBAA3',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  TextoBotonSumarRestar: {
    color: 'white',
  },
  totalTexto: {
    marginBottom: 10,
  },
  inputAporto: {
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    padding: 8,
    marginBottom: 10,
  },
  cambioTexto: {
    marginBottom: 10,
  },
  calcularBoton: {
    backgroundColor: '#4BBAA3',
    padding: 10,
    borderRadius: 5,
  },
  TextoBotonCalcular: {
    color: 'white',
    textAlign: 'center',
  },
  negrita: {
    fontWeight: '600',
  },
});
