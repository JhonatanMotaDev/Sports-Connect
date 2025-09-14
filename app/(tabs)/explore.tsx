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
  {
    id: '7',
    titulo: 'Campeonato de Vôlei de Praia - Afya',
    data: '18/10/2025',
    local: 'Quadra de Areia Afya',
    descricao: 'Torneio de vôlei de praia em duplas, aberto a alunos e professores.',
  },
  {
    id: '8',
    titulo: 'Pedalada Ecológica Unimontes',
    data: '20/10/2025',
    local: 'Saída do Campus Unimontes',
    descricao: 'Passeio ciclístico em grupo pelas principais avenidas da cidade, incentivando a prática esportiva sustentável.',
  },
  {
    id: '9',
    titulo: 'Campeonato de Xadrez Acadêmico - Funorte',
    data: '25/10/2025',
    local: 'Auditório Funorte',
    descricao: 'Competição de xadrez entre alunos de diferentes cursos. Premiação para os finalistas.',
  },
  {
    id: '10',
    titulo: 'Aula Aberta de Zumba - Afya',
    data: '28/10/2025',
    local: 'Quadra Poliesportiva Afya',
    descricao: 'Aula coletiva de dança e atividade aeróbica animada, aberta a toda comunidade.',
  },
  {
    id: '11',
    titulo: 'Torneio de Tênis Universitário',
    data: '02/11/2025',
    local: 'Quadras de Tênis Unimontes',
    descricao: 'Competição de tênis individual e em duplas, voltada para a comunidade acadêmica.',
  },
  {
    id: '12',
    titulo: 'Caminhada da Saúde - Funorte',
    data: '09/11/2025',
    local: 'Lagoa da Pampulha - Montes Claros',
    descricao: 'Atividade de caminhada leve para promoção da saúde e bem-estar dos estudantes.',
  },
  {
    id: '13',
    titulo: 'Campeonato de Handebol - Afya',
    data: '15/11/2025',
    local: 'Ginásio Afya',
    descricao: 'Torneio entre turmas e cursos, incentivando a prática do handebol na comunidade acadêmica.',
  },
  {
    id: '14',
    titulo: 'Festival de Atletismo Unimontes',
    data: '20/11/2025',
    local: 'Pista de Atletismo Unimontes',
    descricao: 'Provas de corrida, salto e arremesso, abertas a estudantes e comunidade externa.',
  },
  {
    id: '15',
    titulo: 'Campeonato de E-Sports - Funorte',
    data: '25/11/2025',
    local: 'Laboratório de Informática Funorte',
    descricao: 'Competição de jogos eletrônicos entre os alunos, com destaque para League of Legends e FIFA.',
  },
  {
    id: '16',
    titulo: 'Treino Aberto de CrossFit - Afya',
    data: '30/11/2025',
    local: 'Estacionamento Afya',
    descricao: 'Sessão aberta de treino funcional e crossfit para a comunidade acadêmica.',
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
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingTop: 42,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
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