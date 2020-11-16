import React, {useState, useEffect} from 'react';
import {  Text, View, FlatList } from 'react-native';
import ItemEvento from '../../components/itemEvento';

const Home = () => {


    const[eventos, setEventos] = useState([]);

    useEffect(() => {
        listarEventos();
    }, [])



    const listarEventos = () => {

        fetch(`http://192.168.0.11:5000/api/eventos`)
            .then(response => response.json())
            .then(dados => {
            setEventos(dados.data);
            console.log(data);
        })
        .catch(err => console.error(err));
    }

    const renderItem = ({item}) => {
        return(
            <ItemEvento
                nome={item.nome}
                imagem={item.urlImagem}
                link={item.link}
            />
        )
    }


    return (
        <View>
            <Text>Home</Text>
            <FlatList
                data={eventos}
                keyExtractor={item => item.id}
                renderItem={renderItem}
            />
        </View>
    )

}


export default Home;