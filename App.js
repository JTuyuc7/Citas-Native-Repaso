import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, } from 'react-native';


const App = () => {
  return (  
    <>
      <SafeAreaView style={ styles.container }>
        <View style={ styles.Scontainer }>
          <Text style={styles.text}>Proyectos Citas</Text>
        </View>
      </SafeAreaView>
    </>
  );
}

// crear variables para los estilos
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#aa076b'
  },
  Scontainer:{
    paddingTop: 55,
    //backgroundColor: 'yellow',
    flex: 1
  },
  text:{
    textAlign: 'center',
    color: 'white',
    fontSize: 20
  }

})

export default App;