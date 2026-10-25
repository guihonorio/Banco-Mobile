
import {
    collection,
    deleteDoc,
    doc,
    getDocs
} from "firebase/firestore";
import { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View
} from "react-native";
import { db } from "../../../firebaseConfig";

type Filme = {
  id: string;
  nome: string;
  anoLancamento: number;
  idadeIndicativa: number;
  genero: string;
  diretor: string;
};

type Props = {
  onVoltar: () => void;
};

export default function Consultar({ onVoltar }: Props) {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [carregando, setCarregando] = useState(true);

  async function consultar() {
    try {
      setCarregando(true);

      const querySnapshot = await getDocs(collection(db, 'filmes'));

      const lista = querySnapshot.docs.map((documento) => {
        const dados = documento.data();

        return {
          id: documento.id,
          nome: dados.nome,
          anoLancamento: dados.anoLancamento,
          idadeIndicativa: dados.idadeIndicativa,
          genero: dados.genero,
          diretor: dados.diretor
        } as Filme;
      });

      setFilmes(lista);
    } catch (e) {
      Alert.alert('Erro', String(e));
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    consultar();
  }, []);

  function confirmarExclusao(id: string) {
    Alert.alert(
      'Excluir Filme',
      'Deseja realmente excluir este filme?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          onPress: () => deletar(id)
        }
      ]
    );
  }

  async function deletar(id: string) {
    try {
      await deleteDoc(doc(db, 'filmes', id));

      setFilmes(filmesAtuais =>
        filmesAtuais.filter(filme => filme.id !== id)
      );

      Alert.alert('Sucesso', 'Filme excluído com sucesso!');
    } catch (e) {
      Alert.alert('Erro', String(e));
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Filmes Cadastrados</Text>

      {carregando ? (
        <Text style={styles.mensagem}>Carregando filmes...</Text>
      ) : (
        <FlatList
          data={filmes}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            <Text style={styles.mensagem}>
              Nenhum filme cadastrado.
            </Text>
          }
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.nome}>{item.nome}</Text>

              <Text>Ano: {item.anoLancamento}</Text>
              <Text>Idade indicativa: {item.idadeIndicativa} anos</Text>
              <Text>Gênero: {item.genero}</Text>
              <Text>Diretor: {item.diretor}</Text>

              <Pressable
                style={styles.botaoExcluir}
                onPress={() => confirmarExclusao(item.id)}
              >
                <Text style={styles.textoBotao}>Excluir</Text>
              </Pressable>
            </View>
          )}
        />
      )}

      <Pressable onPress={consultar}>
        <Text style={styles.voltar}>Atualizar Lista</Text>
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
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 30,
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  nome: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  botaoExcluir: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  textoBotao: {
    color: "white",
    fontSize: 16,
  },
  voltar: {
    fontSize: 18,
    color: "blue",
    textAlign: "center",
    marginVertical: 10,
  },
  mensagem: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 30,
  },
});
