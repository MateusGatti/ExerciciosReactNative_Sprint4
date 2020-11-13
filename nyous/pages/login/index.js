import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ( {navigation} ) => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const salvarToken = async (value) => {
        try {
          await AsyncStorage.setItem('@jwt', value)
        } catch (e) {
          // saving error
        }
    }

    const Logar = () => {

        const corpo = {
            email : email,
            senha : senha
        }



        fetch('http://192.168.0.11:5000/api/Account/login', {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(corpo)
        })
        .then(response => response.json())
        .then(data => {
            if(data.status != 404){
                alert('Login efetuado com sucesso!')
                salvarToken(data.token)
                navigation.push('Autenticado')
            }else{
                alert('Email ou senha invalidos ):')
            }
        })
    }

    return(
        <View style={styles.container}>

            <Image
                style={styles.logo}
                source={require('../../assets/Logo.svg')}
            />

            <Text>Login</Text>
            <TextInput
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
                placeholder="Digite seu email"
            />
            <TextInput
                style={styles.input}
                onChangeText={text => setSenha(text)}
                value={senha}
                secureTextEntry={true}
                placeholder="Digite sua senha"
            />

            <TouchableOpacity
                style={styles.button}
                onPress={Logar}
            >
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>



        </View>
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        width: '90%',
        height: 40, 
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 6,
        padding: 10,
        marginTop: 10
    },
    button: {
        backgroundColor : 'black',
        padding: 10,
        borderRadius: 6,
        width: '90%',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText:{
        color: '#fff'
    },
    logo:{
        width: 200,
        height: 220
    }
  });

export default Login;