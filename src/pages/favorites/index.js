import { Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { useState, useEffect } from "react";
import { getFavorites } from "../../utils/storage";
import { useIsFocused } from "@react-navigation/native";
import { FoodList } from "../../components/foodlist"

export function Favorites() {
  const [receipes, setReceipes] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    let isActive = true;


    async function getReceipes() {
      const result = await getFavorites("@apprecipes")
      if (isActive) {
        setReceipes(result);
      }
    }

    if (isActive) {
      getReceipes();
    }

    return () => {
      isActive = false;
    }

  }, [isFocused])

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Página de Favoritos</Text>

      {receipes.length === 0 && (
        <Text>Você ainda não tem uma receita nos favoritos</Text>
      )}

      <FlatList 
      showsVerticalScrollIndicator={false}
      style={{ marginTop: 14 }}
      data={receipes}
      keyExtractor={(item) => String(item.id)}
      renderItem={ ({ item }) => <FoodList data={item}/> }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f9ff",
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 36
  },
  title: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 24,
  }
});
