import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, Alert, Animated, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useApiOperations, useEvents } from "../../hooks/useApi";
import { Event, apiService } from "../../services/api";

export default function EventsScreen() {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [editingEventId, setEditingEventId] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const fadeAnim = useState(new Animated.Value(0))[0];

    const { data: events, loading, error, refetch } = useEvents();
    const { execute, loading: operationLoading } = useApiOperations();

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

    const handleAddEvent = async () => {
        if (!title || !location) {
            showMessage("Por favor, preencha o Título e o Local!");
            return;
        }

        const eventData = {
            title,
            description,
            sport: 'other',
            skillLevel: 'all' as const,
            date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
            duration: 120,
            maxParticipants: 10,
            location: {
                type: 'Point' as const,
                coordinates: [0, 0] as [number, number],
                address: location,
                city: 'Unknown',
                state: 'Unknown',
                country: 'Unknown'
            },
            cost: {
                amount: 0,
                currency: 'USD'
            },
            status: 'published' as const
        };

        const result = await execute(() => apiService.createEvent(eventData));
        if (result) {
            showMessage("Evento adicionado com sucesso!");
            resetForm();
            refetch();
        }
    };

    const handleUpdateEvent = async () => {
        if (!title || !location || !editingEventId) {
            showMessage("Preencha os campos e selecione um evento para atualizar.");
            return;
        }

        const eventData = {
            title,
            description,
            location: {
                type: 'Point' as const,
                coordinates: [0, 0] as [number, number],
                address: location,
                city: 'Unknown',
                state: 'Unknown',
                country: 'Unknown'
            }
        };

        const result = await execute(() => apiService.updateEvent(editingEventId, eventData));
        if (result) {
            showMessage("Evento atualizado com sucesso!");
            resetForm();
            refetch();
        }
    };

    const handleDelete = async (id: string) => {
        Alert.alert(
            "Confirmar Exclusão",
            "Tem certeza que deseja excluir este evento?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Excluir",
                    style: "destructive",
                    onPress: async () => {
                        const result = await execute(() => apiService.deleteEvent(id));
                        if (result !== null) {
                            showMessage("Evento excluído com sucesso!");
                            refetch();
                        }
                    }
                }
            ]
        );
    };

    const handleEdit = (event: Event) => {
        setTitle(event.title);
        setLocation(event.location.address);
        setDescription(event.description || "");
        setEditingEventId(event._id);
    };

    const resetForm = () => {
        setTitle("");
        setLocation("");
        setDescription("");
        setEditingEventId(null);
    };

    const renderItem = ({ item }: { item: Event }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardInfo}>{item.location.address}</Text>
                <Text style={styles.cardSport}>{item.sport} • {item.skillLevel}</Text>
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
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Gerenciar Eventos</Text>

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
                <TextInput
                    placeholder="Descrição (opcional)"
                    placeholderTextColor="#888"
                    style={[styles.input, styles.textArea]}
                    value={description}
                    onChangeText={setDescription}
                    multiline
                />

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

            {message ? (
                <Animated.View style={[styles.messageBox, { opacity: fadeAnim }]}>
                    <Text style={styles.messageText}>{message}</Text>
                </Animated.View>
            ) : null}

            {loading || operationLoading ? (
                <View style={styles.centered}>
                    <ActivityIndicator size="large" color="#ff2962" />
                    <Text style={styles.loadingText}>Carregando eventos...</Text>
                </View>
            ) : error ? (
                <View style={styles.centered}>
                    <Text style={styles.errorText}>Erro ao carregar eventos: {error}</Text>
                    <Pressable style={styles.retryButton} onPress={refetch}>
                        <Text style={styles.retryButtonText}>Tentar Novamente</Text>
                    </Pressable>
                </View>
            ) : (
                <FlatList
                    data={events || []}
                    keyExtractor={(item) => item._id} 
                    contentContainerStyle={{ paddingBottom: 120 }}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyList}>
                            <Feather name="calendar" size={50} color="#555" />
                            <Text style={styles.emptyListText}>Nenhum evento encontrado.</Text>
                            <Text style={styles.emptyListSubText}>Use o formulário acima para criar eventos.</Text>
                        </View>
                    )}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
        paddingTop: 50, 
        backgroundColor: "#121212" 
    },
    title: { 
        fontSize: 28, 
        fontWeight: "bold", 
        color: "#fff", 
        marginBottom: 20, 
        textAlign: "center" 
    },
    form: { 
        marginBottom: 24,
        backgroundColor: "#1e1e1e",
        borderRadius: 16,
        padding: 16,
        elevation: 8,
    },
    input: { 
        backgroundColor: "#2a2a2a", 
        color: "#fff", 
        borderRadius: 12, 
        padding: 14, 
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#3a3a3a',
        fontSize: 16,
    },
    textArea: { 
        height: 80, 
        textAlignVertical: "top" 
    },
    buttonContainer: {
        gap: 10,
    },
    addButton: { 
        backgroundColor: "#ff2962",
        padding: 14, 
        borderRadius: 12, 
        alignItems: "center",
    },
    updateButton: {
        backgroundColor: "#ff2962",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    cancelButton: {
        backgroundColor: "#555",
        padding: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    buttonText: { 
        color: "#fff", 
        fontWeight: "bold", 
        fontSize: 16 
    },
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
        backgroundColor: "#1e1e1e", 
        padding: 20, 
        borderRadius: 16, 
        marginBottom: 16, 
        elevation: 5,
        borderWidth: 1,
        borderColor: "#2a2a2a",
    },
    cardHeader: { 
        marginBottom: 8 
    },
    cardTitle: { 
        fontSize: 20, 
        fontWeight: "bold", 
        color: "#fff",
        marginBottom: 6,
    },
    cardInfo: { 
        fontSize: 14, 
        color: "#bbb", 
        marginBottom: 6 
    },
    cardSport: {
        fontSize: 12,
        color: '#ff2962',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardDate: {
        fontSize: 12,
        color: '#888',
        marginBottom: 8,
    },
    cardDescription: { 
        fontSize: 14, 
        color: "#ccc",
        marginTop: 8,
        lineHeight: 20,
    },
    cardActions: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'flex-end',
        gap: 10,
    },
    editButton: {
        backgroundColor: '#ff2962',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    deleteButton: { 
        backgroundColor: '#555',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 10,
    },
    actionText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#fff',
        marginTop: 10,
    },
    errorText: {
        color: '#ff4444',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    retryButton: {
        backgroundColor: '#ff2962',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    }
});