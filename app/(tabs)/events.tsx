import { useState } from "react";
import { View, FlatList, Text, StyleSheet, TextInput, Pressable, Animated, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";

export default function EventsScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const fadeAnim = useState(new Animated.Value(0))[0];

  function showMessage(msg: string) {
    setMessage(msg);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setMessage(""));
      }, 2000);
    });
  }

  function handleAddEvent() {
    if (!title || !location) {
      showMessage("Por favor, preencha o Título e o Local!");
      return;
    }

    const newEvent = {
      id: Math.random().toString(),
      title,
      location,
      description,
    };

    setEvents([newEvent, ...events]);
    setTitle("");
    setLocation("");
    setDescription("");
  }

  function handleUpdateEvent() {
    if (!title || !location || !editingEventId) {
      showMessage("Preencha os campos e selecione um evento para atualizar.");
      return;
    }

    const updatedEvents = events.map(e =>
      e.id === editingEventId ? { ...e, title, location, description } : e
    );
    setEvents(updatedEvents);
    
    setTitle("");
    setLocation("");
    setDescription("");
    setEditingEventId(null);
  }

  function handleDelete(id: string) {
    setEvents(events.filter(e => e.id !== id));
  }

  function handleEdit(event: any) {
    setTitle(event.title);
    setLocation(event.location);
    setDescription(event.description);
    setEditingEventId(event.id);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gerenciar Eventos</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Título do Evento"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Local do Evento"
          placeholderTextColor="#aaa"
          style={styles.input}
          value={location}
          onChangeText={setLocation}
        />
        <TextInput
          placeholder="Descrição (opcional)"
          placeholderTextColor="#aaa"
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {editingEventId ? (
          <Pressable style={styles.updateButton} onPress={handleUpdateEvent}>
            <Text style={styles.buttonText}>Atualizar Evento</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.addButton} onPress={handleAddEvent}>
            <Text style={styles.buttonText}>Adicionar Evento</Text>
          </Pressable>
        )}
      </View>
      
      {message ? (
        <Animated.View style={[styles.messageBox, { opacity: fadeAnim }]}>
          <Text style={styles.messageText}>{message}</Text>
        </Animated.View>
      ) : null}

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        ListEmptyComponent={() => (
          <View style={styles.emptyList}>
            <Feather name="calendar" size={50} color="#555" />
            <Text style={styles.emptyListText}>Nenhum evento adicionado ainda.</Text>
            <Text style={styles.emptyListSubText}>Use o formulário acima para começar.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardInfo}>{item.location}</Text>
            </View>
            {item.description ? <Text style={styles.cardDescription}>{item.description}</Text> : null}
            <View style={styles.cardActions}>
              <Pressable style={styles.editButton} onPress={() => handleEdit(item)}>
                <Text style={styles.actionText}>Editar</Text>
              </Pressable>
              <Pressable style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                <Text style={styles.actionText}>Excluir</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#121212" },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", marginBottom: 20, textAlign: "center" },
  form: { 
    marginBottom: 24,
    backgroundColor: "#1e1e1e",
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  input: { 
    backgroundColor: "#1e1e1e", 
    color: "#fff", 
    borderRadius: 12, 
    padding: 14, 
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#1e1e1e',
  },
  textArea: { height: 80, textAlignVertical: "top" },
  addButton: { 
    backgroundColor: "#ff2962",
    padding: 14, 
    borderRadius: 12, 
    alignItems: "center",
  },
  updateButton: {
    backgroundColor: "#3498db",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  messageBox: {
    backgroundColor: "#ff2962",
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    alignItems: 'center',
  },
  messageText: {
    color: "#fff",
    fontWeight: "bold",
  },
  card: { 
    backgroundColor: "#161616", 
    padding: 20, 
    borderRadius: 16, 
    marginBottom: 16, 
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  cardHeader: { marginBottom: 8 },
  cardTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  cardInfo: { fontSize: 14, color: "#bbb", marginBottom: 6 },
  cardDescription: { fontSize: 14, color: "#ccc" },
  cardActions: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end',
  },
  editButton: {
    backgroundColor: '#333',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 10,
  },
  deleteButton: { 
    backgroundColor: '#555',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyList: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyListText: {
    fontSize: 18,
    color: '#888',
    marginTop: 20,
    fontWeight: 'bold',
  },
  emptyListSubText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
});