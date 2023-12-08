import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Ventana1() {
  const [importe, setImporte] = useState('');
  const [totalPersonas, setTotalPersonas] = useState('');
  const [PorcentajePropina, setPorcentajePropina] = useState('');
  const [porcentajeSeleccionado, setPorcentajeSeleccionado] = useState(0);
  const [importePropina, setImportePropina] = useState(0);
  const [importeTotal, setImporteTotal] = useState(0);
  const [propinaPorPersona, setPropinaPorPersona] = useState(0);
  const [importePorPersona, setImportePorPersona] = useState(0);
  const navigation = useNavigation();

  const sumarRestarPorcentaje = (operacion) => {
    const valorActual = Number(PorcentajePropina || porcentajeSeleccionado);
    const nuevoValor = operacion === 'sumar' ? valorActual + 1 : valorActual - 1;
    setPorcentajePropina(String(nuevoValor));
  };

  const navigateToVentana2 = () => {
    const totalPersonas = 5;
    const importePorPersona = 10;

    navigation.navigate('Ventana2', { totalPersonas, importePorPersona });
  };

  const calcularPropina = () => {
    const importeNumerico = Number(importe);
    const totalPersonasNumerico = Number(totalPersonas);
    const porcentajeNumerico = Number(PorcentajePropina || porcentajeSeleccionado);

    const propina = (importeNumerico * porcentajeNumerico) / 100;
    const importeTotalCalculado = importeNumerico + propina;
    const propinaPorPersonaCalculada = propina / totalPersonasNumerico;
    const importePorPersonaCalculado = importeTotalCalculado / totalPersonasNumerico;

    setImportePropina(propina);
    setImporteTotal(importeTotalCalculado);
    setPropinaPorPersona(propinaPorPersonaCalculada);
    setImportePorPersona(importePorPersonaCalculado);
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.texttitulo}>Calculadora de propinas</Text>
      <Image 
        style={styles.logo}
        source={require('../imagenes/logo.png')}
      />
      <View style={styles.bloque1}>
        <Text style={styles.textoBloque1}>Importe de la cuenta:</Text>
        <TextInput
          style={styles.texto2Bloque1}
          keyboardType="numeric"
          value={importe}
          onChangeText={(text) => setImporte(text)}
          placeholder="$00.00"
          placeholderTextColor="black"
        />
        <View style={styles.totalPersonasContainer}>
          <Text style={styles.textoBloque1}>Total de </Text>
          <TextInput
            style={styles.texto2Bloque1}
            keyboardType="numeric"
            value={totalPersonas}
            onChangeText={(text) => setTotalPersonas(text)}
            placeholder="0"
            placeholderTextColor="black"
          />
          <Text style={styles.textoBloque1}>personas</Text>
        </View>
      </View>

      <Text style={styles.textoBloque2}>Selecciona la propina:</Text>
      <View style={styles.bloque2}>
        <BotonesPropina
          onPorcentajeSeleccionado={(porcentaje) => setPorcentajeSeleccionado(porcentaje)}
        />
        <View style={styles.totalPorcentajeContainer}>
          <Text style={styles.texto2Bloque2}>Porcentaje de la propina: </Text>
          <Text style={styles.texto3Bloque2}>%</Text>
          <TextInput
            style={styles.texto3Bloque2}
            keyboardType="numeric"
            value={PorcentajePropina || porcentajeSeleccionado.toString()}
            onChangeText={(text) => setPorcentajePropina(text)}
            placeholder="0"
            placeholderTextColor="black"
          />
        </View>
        <View style={styles.botonesSumaResta}>
          <TouchableOpacity
            style={styles.botonSumarRestar}
            onPress={() => sumarRestarPorcentaje('sumar')}
          >
            <Text style={styles.TextoBotonSumarRestar}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botonSumarRestar}
            onPress={() => sumarRestarPorcentaje('restar')}
          >
            <Text style={styles.TextoBotonSumarRestar}>-</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bloque3}>
        <Text style={styles.textoBloque3}># Propina:</Text>
        <View style={styles.bloque3parte2}>
          <View>
            <Text style={styles.texto2Bloque3}>Importe de la propina: ${importePropina.toFixed(2)}</Text>
            <Text style={styles.texto2Bloque3}>Importe total: ${importeTotal.toFixed(2)}</Text>
            <Text style={styles.texto2Bloque3}>Propina por persona: ${propinaPorPersona.toFixed(2)}</Text>
            <Text style={styles.texto2Bloque3}>Importe por persona: ${importePorPersona.toFixed(2)}</Text>
          </View>
        </View>
        <Button
          title="Limpiar"
          onPress={() => {
            setImporte('');
            setTotalPersonas('');
            setPorcentajePropina('');
            setPorcentajeSeleccionado(0);
            setImportePropina(0);
            setImporteTotal(0);
            setPropinaPorPersona(0);
            setImportePorPersona(0);
          }}
          style={styles.limpiarBoton}
          textStyle={styles.TextoBotonLimpiar}
        />
        <Button
        title="Calcular"
        onPress={calcularPropina}
        style={styles.limpiarBoton}
        textStyle={styles.TextoBotonLimpiar}
      />
      </View>

      <Button title="Ir a Ventana2" onPress={navigateToVentana2} />
    </View>
  );
}

const BotonesPropina = ({ onPorcentajeSeleccionado }) => {
  const porcentajes = [10, 12.5, 15, 20];

  return (
    <View style={styles.botonesContenedor}>
      {porcentajes.map((porcentaje) => (
        <TouchableOpacity
          key={porcentaje}
          style={styles.botonPropina}
          onPress={() => {
            onPorcentajeSeleccionado(porcentaje);
          }}
        >
          <Text style={styles.TextoBotonPropina}>{porcentaje}%</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texttitulo: {
    marginTop: 10,
    fontWeight: '600',
    flex: 1,
  },
  logo: {
    width: 70,
    height: 70,
    marginBottom: -35,
    zIndex: 1,
    alignSelf: 'center',
  },
  bloque1: {
    backgroundColor: 'white',
    marginBottom: 10,
    marginHorizontal: 3,
    height: 180,
    width: 350,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBloque1: {
    color: '#C8CCCD',
  },
  totalPersonasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: -5,
  },
  totalPorcentajeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bloque2: {
    marginBottom: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  texto2Bloque1: {
    fontWeight: '600',
  },
  textoBloque2: {
    fontWeight: '600',
    color: '#585D60',
  },
  texto2Bloque2: {
    marginTop: 8,
  },
  texto3Bloque2: {
    fontWeight: '600',
    marginTop: 10,
  },
  bloque3: {
    marginTop: 50,
  },
  bloque3parte2: {
    backgroundColor: '#4BBAA3',
    height: 100,
    justifyContent: 'center',
    width: 350,
    padding: 8,
  },
  textoBloque3: {
    fontWeight: '600',
    color: '#585D60',
  },
  texto2Bloque3: {
    color: 'white',
  },
  botonesContenedor: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  botonPropina: {
    backgroundColor: '#4BBAA3',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    
  },
  TextoBotonPropina: {
    color: 'white',
  },
  botonesSumaResta: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
  },
  
  botonSumarRestar: {
    backgroundColor: '#4BBAA3',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  
  TextoBotonSumarRestar: {
    color: 'white',
  },
  limpiarBoton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  TextoBotonLimpiar: {
    color: 'white',
    textAlign: 'center',
  },
});
