import React, { useState, useEffect} from 'react';
import { View, Text, SafeAreaView, FlatList, StyleSheet, StatusBar, Item } from 'react-native';

const Eventos = () => {

  const[id, setId] = useState(0);
  const[nome, setNome] = useState('');
  const[descricao, setDescricao] = useState('');
  const[dataInicial, setDataInicial] = useState('');
  const[dataFinal, setDataFinal] = useState('');
  const[eventos, setEventos] = useState([]);

  useEffect(() => {
    listarEventos();
}, [])



  const listarEventos = () => {

    fetch(`http://192.168.0.11:5000/api/eventos`)
        .then(response => response.json())
        .then(dados => {
            setEventos(dados.data);
        })
        .catch(err => console.error(err));
  }

  const renderItem = () => (
    <Item 
    nome={nome}
    descricao={descricao}
    dataInicial={dataInicial}
    dataFinal={dataFinal}
     />
    
  );


  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={setNome, setDescricao, setDataInicial, setDataFinal}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Eventos;