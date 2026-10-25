
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { db } from "../../../firebaseConfig";

type Props = {
  onVoltar: () => void;
};

export default function Cadastrar({ onVoltar }: Props) {
  const [nome, setNome] = useState('');
  const [ano, setAno] = useState('');
  const [idade, setIdade] = useState('');
  const [genero, setGenero] = useState('');
  const [diretor, setDiretor] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function salvar() {
    if (salvando) return;

    if (nome.trim() === '') {
      Alert.alert('Erro', 'Informe o nome do filme');
      return;
    }

    if (ano.trim() === '') {
      Alert.alert('Erro', 'Informe o ano de lançamento');
      return;
    }

    const anoNumero = Number(ano);

    if (
      !Number.isInteger(anoNumero) ||
      anoNumero < 1888 ||
      anoNumero > new Date().getFullYear() + 5
    ) {
      Alert.alert('Erro', 'Informe um ano válido');
      return;
    }

    if (idade.trim() === '') {
      Alert.alert('Erro', 'Informe a idade indicativa');
      return;
    }

    const idadeNumero = Number(idade);

    if (
      !Number.isInteger(idadeNumero) ||
      idadeNumero < 0 ||
      idadeNumero > 18
    ) {
      Alert.alert('Erro', 'Informe uma idade válida');
      return;
    }

    if (genero.trim() === '') {
      Alert.alert('Erro', 'Informe o gênero do filme');
      return;
    }

    if (diretor.trim() === '') {
      Alert.alert('Erro', 'Informe o diretor do filme');
      return;
    }

    const filme = {
      nome: nome.trim(),
      anoLancamento: anoNumero,
      idadeIndicativa: idadeNumero,
      genero: genero.trim(),
      diretor: diretor.trim()
    };

    try {
      setSalvando(true);

      await addDoc(collection(db, 'filmes'), filme);

      Alert.alert('Sucesso', 'Filme cadastrado com sucesso!');

      setNome('');
      setAno('');
      setIdade('');
      setGenero('');
      setDiretor('');
    } catch (e) {
      Alert.alert('Erro', String(e));
    } finally {
      setSalvando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastrar Filme</Text>

      <Text style={styles.label}>Nome</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Nome do filme"
      />

      <Text style={styles.label}>Ano de lançamento</Text>
      <TextInput
        style={styles.input}
        value={ano}
        onChangeText={setAno}
        placeholder="Ex: 2014"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Idade indicativa</Text>
      <TextInput
        style={styles.input}
        value={idade}
        onChangeText={setIdade}
        placeholder="Ex: 10"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Gênero</Text>
      <TextInput
        style={styles.input}
        value={genero}
        onChangeText={setGenero}
        placeholder="Ex: Ficção científica"
      />

      <Text style={styles.label}>Diretor</Text>
      <TextInput
        style={styles.input}
        value={diretor}
        onChangeText={setDiretor}
        placeholder="Nome do diretor"
      />

      <Pressable
        style={styles.botao}
        onPress={salvar}
        disabled={salvando}
      >
        <Text style={styles.textoBotao}>
          {salvando ? 'Salvando...' : 'Salvar'}
        </Text>
      </Pressable>

      <Pressable onPress={onVoltar}>
        <Text style={styles.voltar}>Voltar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#999",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  botao: {
    backgroundColor: "blue",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  textoBotao: {
    color: "white",
    fontSize: 18,
  },
  voltar: {
    color: "blue",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});
