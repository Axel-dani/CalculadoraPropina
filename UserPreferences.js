import React, { useState } from 'react';
import { View, Text, Button, TextInput, Switch } from 'react-native';

export default function UserPreferences() {
  const [nombre, setNombre] = useState('');
  const [soloWifi, setSoloWifi] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text>Nombre a mostrar:</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={(text) => setNombre(text)}
        />
      </View>
      <View style={styles.row}>
        <Text>Solo Wifi?</Text>
        <Switch
          value={soloWifi}
          onValueChange={(value) => setSoloWifi(value)}
        />
      </View>
      <Button title="Guardar"/>
    </View>
  );
}

const styles = {
  container: {
    backgroundColor: '#CCCCCC',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    backgroundColor: 'white',
    padding: 4,
    flex: 1,
    marginLeft: 8,
  },
};
