import { Feather } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';

const eventsData = [
    {
        id: 'evt1',
        title: 'Novo Nordisk: Corrida no Site Montes Claros',
        organizer: 'Time Novo Nordisk',
        date: '18/05/2024',
        time: '08:00 AM',
        location: 'Montes Claros, MG, Brasil',
        description: 'Participe da Maratona de Montes Claros com o Time Novo Nordisk. Junte-se a nós para aumentar a conscientização sobre diabetes e inspirar a todos a viver uma vida ativa. Um evento para corredores de todos os níveis.',
        participants: [
            { id: '1', name: 'Ana Souza', avatar: 'https://images.unsplash.com/photo-1549476041-3870814a044d?fit=crop&w=400&q=80' },
            { id: '2', name: 'Carlos Ribeiro', avatar: 'https://images.unsplash.com/photo-1571060965313-2d2f1f5d2b7c?fit=crop&w=400&q=80' },
            { id: '3', name: 'Fernanda Lima', avatar: 'https://images.unsplash.com/photo-1517592994974-90a612085731?fit=crop&w=400&q=80' },
        ],
        coverImage: 'https://novonordiskfonden.dk//app/uploads/royal-run-2020.jpg',
    },
    {
        id: 'evt2',
        title: 'Novo Nordisk: Corrida de Bicicleta',
        organizer: 'Time Novo Nordisk',
        date: '18/05/2024',
        time: '09:00 AM',
        location: 'Montes Claros, MG, Brasil',
        description: 'Um evento de ciclismo para celebrar a saúde e o bem-estar. A rota passa pelas belas paisagens do sertão mineiro, com apoio total ao longo do percurso. Aberto a ciclistas de todos os níveis.',
        participants: [
            { id: '1', name: 'Pedro Alves', avatar: 'https://images.unsplash.com/photo-1506114177439-01580214a1a6?fit=crop&w=400&q=80' },
            { id: '2', name: 'Mariana Costa', avatar: 'https://images.unsplash.com/photo-1517178120689-d106c117b9b1?fit=crop&w=400&q=80' },
            { id: '3', name: 'Jorge Souza', avatar: 'https://images.unsplash.com/photo-1507720970717-d95a28b056be?fit=crop&w=400&q=80' },
        ],
        coverImage: 'https://i.guim.co.uk/img/media/b82d47c198666e2e67a4e759d0df26bf0edcd368/0_16_2873_1724/master/2873.jpg?width=620&dpr=2&s=none&crop=none',
    },
    {
        id: 'evt3',
        title: 'Atlética De Engenharia FIP Moc Afya: COPAFIP 2025',
        organizer: 'Atlética de Engenharia FIP Moc',
        date: '18/05/2024',
        time: '07:00 AM',
        location: 'Montes Claros, MG, Brasil',
        description: 'O maior evento de esportes universitários de Moc! A Atlética El Toro convida todos para a CopaFip, com jogos, festas e muito mais.',
        participants: [
            { id: '1', name: 'Ana Oliveira', avatar: 'https://images.unsplash.com/photo-1519443209503-4f964082269a?fit=crop&w=400&q=80' },
            { id: '2', name: 'Thiago Martins', avatar: 'https://images.unsplash.com/photo-1517592994974-90a612085731?fit=crop&w=400&q=80' },
            { id: '3', name: 'Camila Santos', avatar: 'https://images.unsplash.com/photo-1541434195191-4e78f4a3e9c9?fit=crop&w=400&q=80' },
        ],
        coverImage: 'https://cdn.prod.website-files.com/6643c4e972b0ff3a6da531c9/6672f9cb2df1d5916fcf69f9_copafip1.jpeg',
    },
    {
        id: 'evt4',
        title: 'Atlética Unimontes: Torneio de Pré-Medicina (TPM)',
        organizer: 'Atlética da Unimontes',
        date: '18/05/2024',
        time: '09:00 AM',
        location: 'Montes Claros, MG, Brasil',
        description: 'Prepare-se para o Torneio de Pré-Medicina (TPM), um campeonato que reúne as melhores atléticas de Medicina da região. Venha torcer e participar!',
        participants: [
            { id: '1', name: 'Breno Rocha', avatar: 'https://images.unsplash.com/photo-1518342417724-4f933e144a1e?fit=crop&w=400&q=80' },
            { id: '2', name: 'Leticia Diniz', avatar: 'https://images.unsplash.com/photo-1563583569503-017e88c03732?fit=crop&w=400&q=80' },
            { id: '3', name: 'Gabriel Ferreira', avatar: 'https://images.unsplash.com/photo-1571736691459-7b7f16f1947e?fit=crop&w=400&q=80' },
        ],
        coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_Y9r3IE2ELGSouCbWW5yOqwTTJwBC-CwzXg&s',
    },
    {
        id: 'evt5',
        title: 'Atlética Funorte: Jogos do CopaMed',
        organizer: 'Atlética da Funorte',
        date: '18/05/2024',
        time: '08:30 AM',
        location: 'Montes Claros, MG, Brasil',
        description: 'A Atlética Funorte sediará os jogos do Intermed, promovendo a competição saudável entre as universidades e celebrando o espírito esportivo.',
        participants: [
            { id: '1', name: 'Sofia Mendes', avatar: 'https://images.unsplash.com/photo-1561726056-a14917173a0c?fit=crop&w=400&q=80' },
            { id: '2', name: 'João Victor', avatar: 'https://images.unsplash.com/photo-1553580434-f761d4b6b66b?fit=crop&w=400&q=80' },
            { id: '3', name: 'Isabela Alves', avatar: 'https://images.unsplash.com/photo-1563852062635-c3c4f733f3e8?fit=crop&w=400&q=80' },
        ],
        coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_8YmPsuUS6wVNTkmD9nFqf-Fa4-6w_gTbYHX757FfjwwmbvzwkQyVmq7Rto_oHQJEIV0&usqp=CAU',
    },
];

export default function EventsListScreen() {
    const router = useRouter();
    const filteredEvents = eventsData;

    const EventCard = ({ event }: { event: (typeof eventsData)[0] }) => (
        <TouchableOpacity style={styles.eventCard}>
            <Image source={{ uri: event.coverImage }} style={styles.coverImage} />
            <View style={styles.cardContent}>
                <Text style={styles.title}>{event.title}</Text>
                <Text style={styles.organizer}>
                    <Feather name="user" size={14} color="#8899a6" /> {event.organizer}
                </Text>

                <View style={styles.cardDetailsRow}>
                    <Text style={styles.cardDetailText}>
                        <Feather name="calendar" size={12} color="#ff2962" /> {event.date}
                    </Text>
                    <Text style={styles.cardDetailText}>
                        <Feather name="map-pin" size={12} color="#ff2962" /> {event.location}
                    </Text>
                </View>

                {}
                <View style={styles.participantsPreview}>
                    {event.participants.slice(0, 3).map(p => (
                        <Image key={p.id} source={{ uri: p.avatar }} style={styles.participantAvatarSmall} />
                    ))}
                    <Text style={styles.participantsCountText}>
                        + {event.participants.length} participantes
                    </Text>
                </View>

            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.appContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.push('/profile')}>
                        <Image
                            source={{ uri: 'https://images.pexels.com/photos/1578384/pexels-photo-1578384.jpeg' }}
                            style={styles.profilePic}
                        />
                    </TouchableOpacity>
                    {}
                    <Text style={styles.headerTitle}>Eventos</Text>
                    {}
                    <View style={styles.profilePicPlaceholder} />
                </View>

                <ScrollView contentContainerStyle={styles.container}>
                    {filteredEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#141414',
        paddingTop: 30,
    },
    appContainer: {
        flex: 1,
        backgroundColor: '#141414',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 60,
        backgroundColor: '#141414',
        borderBottomWidth: 1,
        borderBottomColor: '#252525',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#ff2962',
    },
    profilePicPlaceholder: {
        width: 40, 
        height: 40,
    },
    container: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        paddingBottom: 40,
    },
    eventCard: {
        marginBottom: 20,
        borderRadius: 18,
        overflow: 'hidden',
        backgroundColor: '#1c1c1c', 
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    coverImage: {
        width: '100%',
        height: 180,
    },
    cardContent: {
        padding: 15,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 5,
    },
    organizer: {
        fontSize: 14,
        color: '#8899a6',
        marginBottom: 10,
    },
    cardDetailsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    cardDetailText: {
        fontSize: 12,
        color: '#ccc',
        marginTop: 5,
        marginRight: 15,
        alignItems: 'center',
    },
    participantsPreview: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    participantAvatarSmall: {
        width: 25,
        height: 25,
        borderRadius: 12.5,
        borderWidth: 1,
        borderColor: '#1c1c1c',
        marginLeft: -5,
        marginRight: 2,
    },
    participantsCountText: {
        fontSize: 12,
        color: '#ff2962',
        fontWeight: 'bold',
        marginLeft: 10,
    },
    joinButton: {
        backgroundColor: '#ff2962',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 15,
    },
    joinButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});