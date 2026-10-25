
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Cadastrar from "./components/Cadastrar";
import Consultar from "./components/Consultar";

export default function Index() {
  const [tela, setTela] = useState('');

  return (
    <View style={styles.container}>
      {tela === 'cadastrar' ? (
        <Cadastrar onVoltar={() => setTela('')} />
      ) : tela === 'consultar' ? (
        <Consultar onVoltar={() => setTela('')} />
      ) : (
        <>
          <Text style={styles.titulo}>Catálogo de Filmes</Text>

          <Pressable onPress={() => setTela('cadastrar')}>
            <Text style={styles.texto}>Cadastrar Filme</Text>
          </Pressable>

          <Pressable onPress={() => setTela('consultar')}>
            <Text style={styles.texto}>Consultar Filmes</Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  titulo: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  texto: {
    fontSize: 20,
    color: "blue",
    textAlign: "center",
    marginVertical: 10,
  },
});
