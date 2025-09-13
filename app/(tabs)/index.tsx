import { Feather } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

const eventsData = [
  {
    id: 'evt1',
    title: 'Novo Nordisk: Corrida de Boston',
    organizer: 'Time Novo Nordisk',
    date: '18/05/2024',
    time: '08:00 AM',
    location: 'Boston, MA, EUA',
    description: 'Participe da lendária Maratona de Boston com o Time Novo Nordisk. Junte-se a nós para aumentar a conscientização sobre diabetes e inspirar a todos a viver uma vida ativa. Um evento para corredores de todos os níveis.',
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
    location: 'Copenhague, Dinamarca',
    description: 'Um evento de ciclismo para celebrar a saúde e o bem-estar. A rota passa pelas belas paisagens da Dinamarca, com apoio total ao longo do percurso. Aberto a ciclistas de todos os níveis.',
    participants: [
      { id: '1', name: 'Pedro Alves', avatar: 'https://images.unsplash.com/photo-1506114177439-01580214a1a6?fit=crop&w=400&q=80' },
      { id: '2', name: 'Mariana Costa', avatar: 'https://images.unsplash.com/photo-1517178120689-d106c117b9b1?fit=crop&w=400&q=80' },
      { id: '3', name: 'Jorge Souza', avatar: 'https://images.unsplash.com/photo-1507720970717-d95a28b056be?fit=crop&w=400&q=80' },
    ],
    coverImage: 'https://scontent.fmoc3-1.fna.fbcdn.net/v/t39.30808-6/508456791_9745107635616646_5517243033239801517_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=0b6b33&_nc_ohc=hDwQMgnJP2IQ7kNvwGYOiqZ&_nc_oc=AdlkkMoG8NRLatgfQc81K--RoDI3FQJ9Qvnk6a6YJhwwlI6gOPwib8YBNJMqKMx3up0&_nc_zt=23&_nc_ht=scontent.fmoc3-1.fna&_nc_gid=SqUZjKsG6sgFZuSNFJNm7Q&oh=00_AfaNnEMFvEcAqhtGW1bnHvYq-dAi9EsMyAMJcFJ-jrsWIg&oe=68C9FB82',
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
    coverImage: 'https://unimontes.br/wp-content/uploads/2019/02/InterMed_Unimontes_2018.jpg',
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

export default function EventDetailScreen() {
  const router = useRouter();

  const filteredEvents = eventsData;

  return (
    <View style={styles.appContainer}>
      <View style={styles.header}>

      <TouchableOpacity onPress={() => router.push('/profile')}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1578384/pexels-photo-1578384.jpeg' }}
          style={styles.profilePic}
        />
</TouchableOpacity>

        <Text style={styles.headerTitle}>Eventos</Text>
      </View>

      <ScrollView style={styles.container}>
        {filteredEvents.map(event => (
          <View key={event.id} style={styles.eventCard}>
            <Image source={{ uri: event.coverImage }} style={styles.coverImage} />
            <View style={styles.content}>
              <Text style={styles.title}>{event.title}</Text>
              <Text style={styles.organizer}>Organizado por: {event.organizer}</Text>
              <View style={styles.detailsSection}>
                <View style={styles.detailItem}>
                  <Feather name="calendar" size={20} color="#ff2962" />
                  <Text style={styles.detailText}>{event.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Feather name="clock" size={20} color="#ff2962" />
                  <Text style={styles.detailText}>{event.time}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Feather name="map-pin" size={20} color="#ff2962" />
                  <Text style={styles.detailText}>{event.location}</Text>
                </View>
              </View>
              <Text style={styles.sectionTitle}>Descrição</Text>
              <Text style={styles.description}>{event.description}</Text>
              <Text style={styles.sectionTitle}>Participantes ({event.participants.length})</Text>
              <ScrollView horizontal style={styles.participantsContainer}>
                {event.participants.map(p => (
                  <View key={p.id} style={styles.participantItem}>
                    <Image source={{ uri: p.avatar }} style={styles.participantAvatar} />
                    <Text style={styles.participantName}>{p.name.split(' ')[0]}</Text>
                  </View>
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.joinButton}>
                <Text style={styles.joinButtonText}>Participar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#141414',
    paddingTop: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 72,
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
  container: {
    flex: 1,
  },
  eventCard: {
    marginBottom: 20,
    borderRadius: 18,
    overflow: 'hidden',
  },
  coverImage: {
    width: '100%',
    height: 250,
  },
  content: {
    padding: 20,
    backgroundColor: '#141414',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  organizer: {
    fontSize: 16,
    color: '#8899a6',
    marginBottom: 20,
  },
  detailsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    lineHeight: 22,
  },
  participantsContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    marginTop: 10,
  },
  participantItem: {
    marginRight: 15,
    alignItems: 'center',
  },
  participantAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#ff2962',
  },
  participantName: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 5,
  },
  joinButton: {
    backgroundColor: '#ff2962',
    padding: 15,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  joinButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});