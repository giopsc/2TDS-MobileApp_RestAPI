import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState } from 'react';
import Counter from "react-native-counters";
import axios from 'axios';

export default function App() {

  const [ texto, setTexto ] = useState("");
  const [ participants, setParticipants ] = useState(1);

  const onPressButton = () => {
    axios.get(`http://www.boredapi.com/api/activity?participants=${participants}`)
    .then(response => {
      console.log("resposta:", response.data.activity);
      setTexto(response.data.activity);
    })
    .catch(e => {
      console.log("error:", e);
    })
    .finally(() => {
      console.log("Fim.");
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>{texto}</Text>
      <StatusBar style="auto"/>
      <Counter start={1} min={1} max={5} onChange={(number) => {setParticipants(number)}}/>
      <Button title='Gerar nova atividade' onPress={onPressButton}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  texto: {
    fontSize: 20
  }
});
