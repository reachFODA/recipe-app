import { Text, View, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect  } from "react";
import { FoodList } from "../../components/foodlist"
import server from "../../services/server";

export function Search() {

  const route = useRoute();
  const [receipes, setRecipes] = useState([])

  useEffect(() =>  {
    async function fetchRecipes(){
      const response = await server.get(`/foods?name_like=${route.params?.name}`)
      setRecipes(response.data);
    }

    fetchRecipes();
  }, [route.params?.name])

  return (
    <View style={styles.container}>
      <FlatList 
      showsVerticalScrollIndicator={false}
      data={receipes}
      keyExtractor={(item) => String(item.id)}
      renderItem={ ({ item }) => <FoodList data={item}/> }
      ListEmptyComponent={ () => <Text style={styles.text}>Sem resultados.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f9ff",
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 14,
  },
  text: {
    fontSize: 16,
  }
});
