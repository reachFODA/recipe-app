import { StyleSheet, SafeAreaView, Text, View, TextInput, TouchableOpacity, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Logo } from "../../components/logo";
import { FoodList } from "../../components/foodlist";
import { useNavigation } from "@react-navigation/native";
import server from "../../services/server";
import { Text as MotiText } from "moti";

export function Home() {
  const [inputValue, setInputValue] = useState("");
  const [foods, setFoods] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    async function fetchApi() {
      const response = await server.get("/foods");
      setFoods(response.data);
    }

    fetchApi();
  }, []);

  function handleSearch() {
    if (!inputValue) return;

    let input = inputValue;
    setInputValue("")
    navigation.navigate("Search", { name: input })
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />

      <MotiText
        style={styles.title}
        from={{
          opacity: 0,
          translateY: 15,

        }}
        animate={{
          opacity: 1,
          translateY: 0
        }}
        transition={{
          delay: 100,
          type: "timing",
          duration: 650
        }}
      >Encontre as melhores receitas
      </MotiText>
      <MotiText style={styles.title}
        from={{
          opacity: 0,
          translateY: 18,

        }}
        animate={{
          opacity: 1,
          translateY: 0
        }}
        transition={{
          delay: 200,
          type: "timing",
          duration: 850
        }}
      >para fazer na sua casa
      </MotiText>

      <View style={styles.form}>
        <TextInput
          placeholder="Digite o nome da receita..."
          style={styles.input}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />

        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={28} color="#4CBE6C" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={foods}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <FoodList data={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F9FF",
    paddingTop: 36,
    paddingStart: 14,
    paddingEnd: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0e0e0e",
  },
  form: {
    width: "100%",
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#ECECEC",
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    width: "90%",
    maxWidth: "90%",
    height: 54,
  },
});
