import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Animated, FlatList, LayoutAnimation, Platform, Pressable, StyleSheet, Text, TextInput, UIManager, View } from "react-native";

// Habilita LayoutAnimation para Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// Componente de Input Reutilizável
interface EventInputProps {
  iconName: keyof typeof MaterialIcons.glyphMap;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  isFocused: boolean;
  onFocus: () => void;
  onBlur: () => void;
  multiline?: boolean;
  style?: object;
}

function EventInput({ iconName, placeholder, value, onChangeText, isFocused, onFocus, onBlur, multiline = false, style = {} }: EventInputProps) {
  return (
    <View style={[styles.inputContainer, isFocused && styles.inputContainerFocused, style]}>
      <MaterialIcons 
        name={iconName} 
        size={24} 
        color={isFocused ? "#ff2962" : "#aaa"} 
        style={styles.icon} 
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#aaa"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
        onBlur={onBlur}
        multiline={multiline}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );
}

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

  const addButtonScale = useState(new Animated.Value(1))[0];

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

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setEvents([newEvent, ...events]);
    setTitle("");
    setLocation("");
    setDescription("");
    setMessage("");
  }

  function handleDelete(id: string) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setEvents(events.filter(e => e.id !== id));
  }

  const handlePressIn = () => {
    Animated.spring(addButtonScale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(addButtonScale, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>{item.title}</Text>
      </View>
      <Pressable 
        style={({ pressed }) => [
          styles.deleteButton,
          { backgroundColor: pressed ? '#555' : '#333' }
        ]} 
        onPress={() => handleDelete(item.id)}
      >
        <Text style={styles.deleteText}>✕</Text>
      </Pressable>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Local:</Text>
        <Text style={styles.cardInfo}>{item.location}</Text>
      </View>
      {item.description ? (
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Descrição:</Text>
          <Text style={styles.cardDescription}>{item.description}</Text>
        </View>
      ) : null}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eventos Esportivos 🏟️</Text>

      <View style={styles.form}>
        <EventInput
          iconName="title"
          placeholder="Título"
          value={title}
          onChangeText={setTitle}
          isFocused={isTitleFocused}
          onFocus={() => setIsTitleFocused(true)}
          onBlur={() => setIsTitleFocused(false)}
        />
        <EventInput
          iconName="place"
          placeholder="Local"
          value={location}
          onChangeText={setLocation}
          isFocused={isLocationFocused}
          onFocus={() => setIsLocationFocused(true)}
          onBlur={() => setIsLocationFocused(false)}
        />
        <EventInput
          iconName="description"
          placeholder="Descrição"
          value={description}
          onChangeText={setDescription}
          isFocused={isDescriptionFocused}
          onFocus={() => setIsDescriptionFocused(true)}
          onBlur={() => setIsDescriptionFocused(false)}
          multiline
          style={{ height: 100 }}
        />

        <Animated.View style={{ transform: [{ scale: addButtonScale }] }}>
          <Pressable 
            style={({ pressed }) => [
              styles.addButton, 
              { backgroundColor: pressed ? "#c0214d" : "#ff2962" }
            ]} 
            onPress={handleAddEvent}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Text style={styles.buttonText}>Adicionar Evento</Text>
          </Pressable>
        </Animated.View>
      </View>
      
      {message ? (
        <Animated.View style={[styles.messageBox, { opacity: fadeAnim }]}>
          <Text style={styles.messageText}>🚨 {message}</Text>
        </Animated.View>
      ) : null}

      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 120 }}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <View style={styles.emptyStateContainer}>
            <MaterialIcons name="event-note" size={60} color="#666" />
            <Text style={styles.emptyStateText}>Nenhum evento adicionado ainda.</Text>
            <Text style={styles.emptyStateSubText}>Use o formulário acima para começar!</Text>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#1e1e1e", 
    borderRadius: 12, 
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#1e1e1e',
    paddingHorizontal: 8,
  },
  inputContainerFocused: {
    borderColor: '#ff2962',
  },
  icon: {
    marginRight: 8,
  },
  input: { 
    flex: 1,
    color: "#fff", 
    paddingVertical: 14,
  },
  textArea: { 
    height: 100,
  },
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
  cardTitle: { fontSize: 20, fontWeight: "bold", color: "#fff" },
  deleteButton: { 
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteText: { color: "#ff2962", fontWeight: "bold", fontSize: 18 },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 14,
    color: "#ccc",
    fontWeight: 'bold',
    marginRight: 5,
  },
  cardInfo: { fontSize: 14, color: "#bbb", flexShrink: 1 },
  cardDescription: { fontSize: 14, color: "#ccc", flexShrink: 1 },
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
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  emptyStateText: {
    color: '#888',
    fontSize: 18,
    marginTop: 10,
  },
  emptyStateSubText: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
  }
});