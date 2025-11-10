import { Feather } from "@expo/vector-icons";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { ActivityIndicator, Animated, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Event } from "../../services/api";

const sportOptions = [
    "Futebol",
    "Vôlei",
    "Basquete",
    "Corrida",
    "Tênis",
    "Academia",
    "Ciclismo",
    "Outro"
];

export default function EventsScreen() {
    const insets = useSafeAreaInsets();
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(new Date(Date.now() + 24 * 60 * 60 * 1000));
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [maxParticipants, setMaxParticipants] = useState("");
    const [sport, setSport] = useState("");

    const [editingEventId, setEditingEventId] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const fadeAnim = useState(new Animated.Value(0))[0];

    const [events, setEvents] = useState<Event[]>([]);
    const [loading] = useState(false);
    const [error] = useState<string | null>(null)
    const [isFormVisible, setIsFormVisible] = useState(true);

    function showMessage(msg: string) {
        setMessage(msg);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
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

    const onChangeDate = (event: DateTimePickerEvent, selectedDate?: Date) => {
        if (Platform.OS === 'android') {
            setShowDatePicker(false);
        }
        if (selectedDate) {
            setDate(selectedDate);
            if (Platform.OS === 'ios') {
                 setShowDatePicker(false);
            }
        } else {
            setShowDatePicker(false);
        }
    };

    const handleAddEvent = () => {
        if (!title || !location || !sport || !maxParticipants) {
            showMessage("Preencha todos os campos obrigatórios!");
            return;
        }

        const newEvent: Event = {
            _id: Date.now().toString(),
            title,
            description,
            sport: sport,
            skillLevel: "all",
            date: date.toISOString(),
            duration: 120,
            maxParticipants: parseInt(maxParticipants, 10) || 0,
            location: {
                type: "Point",
                coordinates: [0, 0],
                address: location,
                city: "Unknown",
                state: "Unknown",
                country: "Unknown"
            },
            cost: {
                amount: 0,
                currency: "USD"
            },
            status: "published",
            currentParticipants: 0,
            participants: [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            organizer: {
                _id: '0',
                name: 'Anonymous',
                email: '',
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                interests: [],
                skillLevel: "beginner",
                isActive: false,
                lastLogin: ""
            }
        };

        setEvents(prev => [...prev, newEvent]);
        showMessage("Evento adicionado!");
        resetForm();
    };

    const handleUpdateEvent = () => {
        if (!editingEventId) return;

        if (!title || !location || !sport || !maxParticipants) {
            showMessage("Preencha todos os campos obrigatórios!");
            return;
        }

        setEvents(prev =>
            prev.map(event =>
                event._id === editingEventId
                    ? {
                        ...event,
                        title,
                        location: { ...event.location, address: location },
                        description,
                        sport: sport,
                        date: date.toISOString(),
                        maxParticipants: parseInt(maxParticipants, 10) || 0
                    }
                    : event
            )
        );
        showMessage("Evento atualizado!");
        resetForm();
    };

    const handleDelete = (id: string) => {
        if (!id) {
            showMessage("ID do evento inválido.");
            return;
        }
        setEvents(prev => prev.filter(event => event._id !== id));
        showMessage("Evento excluído!");
    };

    const handleEdit = (event: Event) => {
        setIsFormVisible(true); 

        setTitle(event.title);
        setLocation(event.location.address);
        setDescription(event.description || "");
        setDate(new Date(event.date));
        setMaxParticipants(event.maxParticipants.toString());
        setSport(event.sport);
        setEditingEventId(event._id);
    };

    const resetForm = () => {
        setTitle("");
        setLocation("");
        setDescription("");
        setDate(new Date(Date.now() + 24 * 60 * 60 * 1000));
        setMaxParticipants("");
        setSport(""); 
        setEditingEventId(null);
    };

    return (
        <KeyboardAvoidingView 
            style={[styles.container, { paddingTop: insets.top }]}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
        >
            <ScrollView 
                style={styles.scrollContainer}
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: insets.bottom + 80 }
                ]}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                <Pressable style={styles.titleContainer} onPress={() => setIsFormVisible(prev => !prev)}>
                    <Text style={styles.title}>Gerenciar Eventos</Text>
                    <Feather name={isFormVisible ? "chevron-up" : "chevron-down"} size={28} color="#fff" />
                </Pressable>

                {isFormVisible && (
                    <View style={styles.form}>
                        <TextInput
                            placeholder="Título do Evento"
                            placeholderTextColor="#888"
                            style={styles.input}
                            value={title}
                            onChangeText={setTitle}
                        />
                        <TextInput
                            placeholder="Local do Evento"
                            placeholderTextColor="#888"
                            style={styles.input}
                            value={location}
                            onChangeText={setLocation}
                        />

                        <Pressable style={styles.datePickerButton} onPress={() => setShowDatePicker(true)}>
                            <Text style={styles.datePickerText}>{`Data: ${date.toLocaleDateString()}`}</Text>
                            <Feather name="calendar" size={20} color="#ff2962" />
                        </Pressable>

                        {showDatePicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode="date"
                                display="default"
                                onChange={onChangeDate}
                                minimumDate={new Date()}
                            />
                        )}

                        <Text style={styles.inputLabel}>Modalidade</Text>
                        <ScrollView 
                            horizontal 
                            showsHorizontalScrollIndicator={false} 
                            style={styles.sportSelectorContainer}
                            contentContainerStyle={{ paddingRight: 20 }}
                            nestedScrollEnabled={true}
                        >
                            {sportOptions.map(opt => (
                                <Pressable
                                    key={opt}
                                    style={[
                                        styles.sportButton,
                                        sport === opt && styles.sportButtonSelected
                                    ]}
                                    onPress={() => setSport(opt)}
                                >
                                    <Text style={[
                                        styles.sportButtonText,
                                        sport === opt && styles.sportButtonTextSelected
                                    ]}>{opt}</Text>
                                </Pressable>
                            ))}
                        </ScrollView>
                        
                        <TextInput
                            placeholder="Qtd. Máxima de Participantes"
                            placeholderTextColor="#888"
                            style={styles.input}
                            value={maxParticipants}
                            onChangeText={setMaxParticipants}
                            keyboardType="numeric"
                        />
                
                        <TextInput
                            placeholder="Horário do Evento"
                            placeholderTextColor="#888"
                            style={styles.input}
                        />

                        <TextInput
                            placeholder="Descrição (opcional)"
                            placeholderTextColor="#888"
                            style={[styles.input, styles.textArea]}
                            value={description}
                            onChangeText={setDescription}
                            multiline
                        />

                        <View>
                            {editingEventId ? (
                                <View style={styles.buttonContainer}>
                                    <Pressable style={styles.updateButton} onPress={handleUpdateEvent}>
                                        <Text style={styles.buttonText}>Atualizar Evento</Text>
                                    </Pressable>
                                    <Pressable style={styles.cancelButton} onPress={resetForm}>
                                        <Text style={styles.buttonText}>Cancelar</Text>
                                    </Pressable>
                                </View>
                            ) : (
                                <Pressable style={styles.addButton} onPress={handleAddEvent}>
                                    <Text style={styles.buttonText}>Adicionar Evento</Text>
                                </Pressable>
                            )}
                        </View>
                    </View>
                )}

                {message ? (
                    <Animated.View style={[styles.messageBox, { opacity: fadeAnim }]}>
                        <Text style={styles.messageText}>{message}</Text>
                    </Animated.View>
                ) : null}

                {loading ? (
                    <ActivityIndicator size="large" color="#ff2962" />
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : events.length === 0 ? (
                    <View style={styles.emptyList}>
                        <Feather name="calendar" size={50} color="#555" />
                        <Text style={styles.emptyListText}>Nenhum evento encontrado.</Text>
                        <Text style={styles.emptyListSubText}>Crie um evento para começar.</Text>
                    </View>
                ) : (
                    events.map((item) => (
                        <View key={item._id} style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.cardTitle}>{item.title}</Text>
                                <Text style={styles.cardInfo}>{item.location.address}</Text>
                                <Text style={styles.cardSport}>{item.sport} • {item.skillLevel}</Text>
                                <Text style={styles.cardInfo}>Participantes: {item.currentParticipants}/{item.maxParticipants}</Text>
                                <Text style={styles.cardDate}>{new Date(item.date).toLocaleDateString()}</Text>
                            </View>
                            {item.description ? <Text style={styles.cardDescription}>{item.description}</Text> : null}
                            <View style={styles.cardActions}>
                                <Pressable style={styles.editButton} onPress={() => handleEdit(item)}>
                                    <Text style={styles.actionText}>Editar</Text>
                                </Pressable>
                                <Pressable style={styles.deleteButton} onPress={() => handleDelete(item._id)}>
                                    <Text style={styles.actionText}>Excluir</Text>
                                </Pressable>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#121212",
    },
    scrollContainer: {
        flex: 1,
    },
    scrollContent: {
        padding: 10,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: { fontSize: 28, fontWeight: "bold", color: "#fff", textAlign: "center" },
    form: { marginBottom: 24, backgroundColor: "#1e1e1e", borderRadius: 16, padding: 16, elevation: 8 },
    input: { backgroundColor: "#2a2a2a", color: "#fff", borderRadius: 12, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: "#3a3a3a", fontSize: 16 },
    textArea: { height: 80, textAlignVertical: "top" },
    
    datePickerButton: {
        backgroundColor: "#2a2a2a",
        borderRadius: 12,
        padding: 14,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#3a3a3a",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    datePickerText: {
        color: '#fff',
        fontSize: 16,
    },

    inputLabel: {
        color: '#bbb',
        fontSize: 14,
        marginBottom: 8,
        marginLeft: 4,
    },

    sportSelectorContainer: {
        marginBottom: 12,
    },

    sportButton: {
        backgroundColor: '#2a2a2a',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#3a3a3a'
    },

    sportButtonSelected: {
        backgroundColor: '#ff2962',
        borderColor: '#ff2962',
    },

    sportButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '600'
    },

    sportButtonTextSelected: {
        color: '#fff',
    },

    buttonContainer: { gap: 10 },
    addButton: { backgroundColor: "#ff2962", padding: 14, borderRadius: 12, alignItems: "center" },
    updateButton: { backgroundColor: "#ff2962", padding: 14, borderRadius: 12, alignItems: "center" },
    cancelButton: { backgroundColor: "#555", padding: 14, borderRadius: 12, alignItems: "center" },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    messageBox: { backgroundColor: "#ff2962", borderRadius: 12, padding: 16, marginVertical: 12, alignItems: "center" },
    messageText: { color: "#fff", fontWeight: "bold" },
    card: { backgroundColor: "#1e1e1e", padding: 20, borderRadius: 16, marginBottom: 16, elevation: 5, borderWidth: 1, borderColor: "#2a2a2a" },
    cardHeader: { marginBottom: 8 },
    cardTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginBottom: 6 },
    cardInfo: { fontSize: 14, color: "#bbb", marginBottom: 6 },
    cardSport: { fontSize: 12, color: "#ff2962", fontWeight: "bold", marginBottom: 4 },
    cardDate: { fontSize: 12, color: "#888", marginBottom: 8 },
    cardDescription: { fontSize: 14, color: "#ccc", marginTop: 8, lineHeight: 20 },
    cardActions: { flexDirection: "row", marginTop: 16, justifyContent: "flex-end", gap: 10 },
    editButton: { backgroundColor: "#ff2962", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
    deleteButton: { backgroundColor: "#555", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
    actionText: { color: "#fff", fontWeight: "bold", fontSize: 14 },
    emptyList: { alignItems: "center", justifyContent: "center", marginTop: 50 },
    emptyListText: { fontSize: 18, color: "#888", marginTop: 20, fontWeight: "bold" },
    emptyListSubText: { fontSize: 14, color: "#555", marginTop: 5 },
    errorText: { color: "#ff4444", textAlign: "center", padding: 20 }
});