import { useState } from "react";
import { View, FlatList, Text, StyleSheet, TextInput, Pressable, Animated } from "react-native";

export default function EventsScreen() {
  const [events, setEvents] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const fadeAnim = useState(new Animated.Value(0))[0];
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isLocationFocused, setIsLocationFocused] = useState(false);
  const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);

  function handleAddEvent() {
    if (!title || !location) {
      setMessage("Por favor, preencha o Título e o Local!");
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
    setMessage("");
  }

  function handleDelete(id: string) {
    setEvents(events.filter(e => e.id !== id));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos Esportivos</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Título"
          placeholderTextColor="#aaa"
          style={[styles.input, isTitleFocused && styles.inputFocused]}
          value={title}
          onChangeText={setTitle}
          onFocus={() => setIsTitleFocused(true)}
          onBlur={() => setIsTitleFocused(false)}
        />
        <TextInput
          placeholder="Local"
          placeholderTextColor="#aaa"
          style={[styles.input, isLocationFocused && styles.inputFocused]}
          value={location}
          onChangeText={setLocation}
          onFocus={() => setIsLocationFocused(true)}
          onBlur={() => setIsLocationFocused(false)}
        />
        <TextInput
          placeholder="Descrição"
          placeholderTextColor="#aaa"
          style={[styles.input, styles.textArea, isDescriptionFocused && styles.inputFocused]}
          value={description}
          onChangeText={setDescription}
          multiline
          onFocus={() => setIsDescriptionFocused(true)}
          onBlur={() => setIsDescriptionFocused(false)}
        />
        <Pressable 
          style={({ pressed }) => [
            styles.addButton, 
            {
              backgroundColor: pressed ? "#c0214d" : "#ff2962",
            },
          ]} 
          onPress={handleAddEvent}
        >
          <Text style={styles.buttonText}>Adicionar Evento</Text>
        </Pressable>
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
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardInfo}>{item.location}</Text>
            </View>
            <Pressable 
                style={({ pressed }) => [
                  styles.deleteButton,
                  {
                    backgroundColor: pressed ? '#555' : '#333'
                  }
                ]} 
                onPress={() => handleDelete(item.id)}
              >
                <Text style={styles.deleteText}>✕</Text>
              </Pressable>
            {item.description ? <Text style={styles.cardDescription}>{item.description}</Text> : null}
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
    borderColor: '#1e1e1e', // Unfocused color
  },
  inputFocused: {
    borderColor: '#ff2962', // Focused color
  },
  textArea: { height: 80, textAlignVertical: "top" },
  addButton: { 
    padding: 14, 
    borderRadius: 12, 
    alignItems: "center",
    shadowColor: "#ff2962",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
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
    position: 'relative',
  },
  cardHeader: { flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginBottom: 8 },
  cardTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", flex: 1, marginRight: 12 },
  deleteButton: { 
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15, // half of width/height
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: { color: "#ff2962", fontWeight: "bold", fontSize: 18 },
  cardInfo: { fontSize: 14, color: "#bbb", marginBottom: 6 },
  cardDescription: { fontSize: 14, color: "#ccc" },
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
});
