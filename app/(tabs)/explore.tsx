import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Fonts } from '@/constants/theme';

const eventos = [
  {
    id: '1',
    titulo: 'Campeonato de Futsal - Afya',
    data: '15/09/2025',
    local: 'Ginásio Afya',
    descricao: 'Torneio de futsal entre cursos da Afya, com premiação para o time campeão e semifinalistas.',
  },
  {
    id: '2',
    titulo: 'Corrida de Rua Unimontes 10km',
    data: '22/09/2025',
    local: 'Campus Unimontes - Montes Claros',
    descricao: 'Evento aberto a estudantes e comunidade, percorrendo principais ruas do campus. Medalhas para todos os participantes.',
  },
  {
    id: '3',
    titulo: 'Torneio de Basquete 3x3 Funorte',
    data: '28/09/2025',
    local: 'Quadra Poliesportiva Funorte',
    descricao: 'Torneio amistoso de basquete 3x3 para alunos da Funorte. Inscrições gratuitas por equipe.',
  },
  {
    id: '4',
    titulo: 'Aula Aberta de Yoga - Afya',
    data: '30/09/2025',
    local: 'Parque da Cidade - Afya',
    descricao: 'Sessão de relaxamento e bem-estar aberta a toda comunidade acadêmica da Afya.',
  },
  {
    id: '5',
    titulo: 'Desafio de Natação Unimontes',
    data: '05/10/2025',
    local: 'Piscina Olímpica Unimontes',
    descricao: 'Provas de natação em várias distâncias, com premiação para os 3 primeiros colocados de cada categoria.',
  },
  {
    id: '6',
    titulo: 'Circuito Funcional Funorte',
    data: '12/10/2025',
    local: 'Quadra Externa Funorte',
    descricao: 'Atividade física funcional com circuito de exercícios, aberta a todos os estudantes da Funorte.',
  },
];


export default function EventosScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Eventos Esportivos</Text>

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.eventTitle}>{item.titulo}</Text>
              <Text style={styles.eventDate}>{item.data}</Text>
            </View>
            <Text style={styles.eventLocation}>{item.local}</Text>
            <Text style={styles.eventDescription}>{item.descricao}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    fontFamily: Fonts.rounded,
  },
  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flexShrink: 1,
  },
  eventDate: {
    fontSize: 14,
    color: '#ff2962',
    fontWeight: 'bold',
  },
  eventLocation: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#ccc',
  },
});
