import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Modal, Image } from 'react-native';
import { Camera } from 'expo-camera';
import {FontAwesome} from '@expo/vector-icons';

export default function Foto() {

    const camRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [capturedPhoto, setCapturedPhoto] = useState(null);
    const [open, setOpen] = useState(false);


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>Acesso Negado</Text>;
    }

    async function takePicture() {
        if (camRef) {
            const data = await camRef.current.takePictureAsync();
            setCapturedPhoto(data.uri);
            setOpen(true);
            console.log(data);
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={type} ref={camRef}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                        style={{
                            flex: 0.1,
                            alignSelf: 'flex-end',
                            alignItems: 'center',
                        }}
                        onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                    ? Camera.Constants.Type.front
                                    : Camera.Constants.Type.back
                            );
                        }}>
                        <Text style={{ fontSize: 16, marginBottom: 12, marginLeft: 10, color: 'white' }}> Flip </Text>
                    </TouchableOpacity>

                    {capturedPhoto &&
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={open}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', margin: 20 }}>
                                <TouchableOpacity style={{ margin: 10 }} onPress={() => setOpen(false)}>
                                    <FontAwesome name="window-close" size={50} color="blue" />
                                </TouchableOpacity>

                                <Image
                                    style={{ width: '100%', height: 300, borderRadius: 20 }}
                                    source={{ uri: capturedPhoto }}
                                />

                            </View>


                        </Modal>
                    }
                </View>
            </Camera>

            <TouchableOpacity onPress={takePicture}>
                <Text name="camera" size={23} style={{ textAlign: 'center', color: 'black'}}>Tirar foto</Text>
            </TouchableOpacity>
        </View>
    );
}