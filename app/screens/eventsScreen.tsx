import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { createEvent, deleteEvent, getEvents } from "../services/eventService";

export default function EventsScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddEvent() {
    if (!title || !location) {
      Alert.alert("Preencha os campos obrigatórios!");
      return;
    }

    try {
      await createEvent({ title, location, description });

      setTitle("");
      setLocation("");
      setDescription("");

      await loadEvents();
    } catch (err) {
      console.error(err);
      Alert.alert("Erro ao adicionar evento");
    }
  }

  async function handleDeleteEvent(id: string) {
    try {
      await deleteEvent(id);
      await loadEvents();
    } catch (err) {
      console.error(err);
      Alert.alert("Erro ao deletar evento");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Título"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Local"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          placeholder="Descrição"
          placeholderTextColor="#aaa"
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          multiline
        />
        <Pressable style={styles.button} onPress={handleAddEvent}>
          <Text style={styles.buttonText}>Adicionar Evento</Text>
        </Pressable>
      </View>

      <FlatList
        data={events}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardLocation}>{item.location}</Text>
            <Text style={styles.cardDescription}>{item.description}</Text>

            <Pressable
              style={styles.deleteButton}
              onPress={() => handleDeleteEvent(item.id)}
            >
              <Text style={styles.deleteText}>Excluir</Text>
            </Pressable>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#121212" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff", marginBottom: 20 },
  form: { marginBottom: 20 },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  textArea: { height: 80, textAlignVertical: "top" },
  button: { backgroundColor: "#ff2962", padding: 14, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  card: { backgroundColor: "#1e1e1e", padding: 16, borderRadius: 12, marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#fff" },
  cardLocation: { fontSize: 14, color: "#aaa" },
  cardDescription: { fontSize: 14, color: "#ccc", marginTop: 4 },
  deleteButton: { marginTop: 10, alignSelf: "flex-start", padding: 6, borderRadius: 6, backgroundColor: "#ff4444" },
  deleteText: { color: "#fff", fontWeight: "bold" },
});