import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
            { id: '1', name: 'Ana Souza', avatar: 'https://avatar.iran.liara.run/public' },
            { id: '2', name: 'Carlos Ribeiro', avatar: 'https://avatar.iran.liara.run/public/boy' },
            { id: '3', name: 'Fernanda Lima', avatar: 'https://avatar.iran.liara.run/public/girl' },
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
            { id: '1', name: 'Ana Souza', avatar: 'https://avatar.iran.liara.run/public' },
            { id: '2', name: 'Carlos Ribeiro', avatar: 'https://avatar.iran.liara.run/public/boy' },
            { id: '3', name: 'Fernanda Lima', avatar: 'https://avatar.iran.liara.run/public/girl' },
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
            { id: '1', name: 'Ana Souza', avatar: 'https://avatar.iran.liara.run/public' },
            { id: '2', name: 'Carlos Ribeiro', avatar: 'https://avatar.iran.liara.run/public/boy' },
            { id: '3', name: 'Fernanda Lima', avatar: 'https://avatar.iran.liara.run/public/girl' },
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
            { id: '1', name: 'Ana Souza', avatar: 'https://avatar.iran.liara.run/public' },
            { id: '2', name: 'Carlos Ribeiro', avatar: 'https://avatar.iran.liara.run/public/boy' },
            { id: '3', name: 'Fernanda Lima', avatar: 'https://avatar.iran.liara.run/public/girl' },
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
            { id: '1', name: 'Ana Souza', avatar: 'https://avatar.iran.liara.run/public' },
            { id: '2', name: 'Carlos Ribeiro', avatar: 'https://avatar.iran.liara.run/public/boy' },
            { id: '3', name: 'Fernanda Lima', avatar: 'https://avatar.iran.liara.run/public/girl' },
        ],
        coverImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_8YmPsuUS6wVNTkmD9nFqf-Fa4-6w_gTbYHX757FfjwwmbvzwkQyVmq7Rto_oHQJEIV0&usqp=CAU',
    },
];

export default function EventsListScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const filteredEvents = eventsData;

    const EventCard = ({ event }: { event: (typeof eventsData)[0] }) => (
        <TouchableOpacity style={styles.eventCard}>
            <Image source={{ uri: event.coverImage }} style={styles.coverImage} />
            <View style={styles.cardContent}>
                <Text style={styles.title}>{event.title}</Text>
                <View style={styles.organizerContainer}>
                    <Feather name="user" size={14} color="#8899a6" />
                    <Text style={styles.organizer}> {event.organizer}</Text>
                </View>

                <View style={styles.cardDetailsRow}>
                    <View style={styles.cardDetailContainer}>
                        <Feather name="calendar" size={12} color="#ff2962" />
                        <Text style={styles.cardDetailText}> {event.date}</Text>
                    </View>
                    <View style={styles.cardDetailContainer}>
                        <Feather name="map-pin" size={12} color="#ff2962" />
                        <Text style={styles.cardDetailText}> {event.location}</Text>
                    </View>
                </View>

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
        <View style={[styles.container, { paddingTop: insets.top, backgroundColor: '#141414' }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/profile')}>
                    <Image
                        source={{ uri: 'https://images.pexels.com/photos/1578384/pexels-photo-1578384.jpeg' }}
                        style={styles.profilePic}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Eventos</Text>
                <View style={styles.profilePicPlaceholder} />
            </View>

            <ScrollView 
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: insets.bottom + 80 }
                ]}
                showsVerticalScrollIndicator={false}
            >
                {filteredEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#141414',
    },
    organizerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardDetailContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
    scrollContent: {
        paddingHorizontal: 16,
        paddingTop: 10,
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