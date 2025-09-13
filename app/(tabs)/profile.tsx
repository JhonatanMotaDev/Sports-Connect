import { Feather } from '@expo/vector-icons';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const user = {
  name: 'João Silva',
  handle: '@joaosilvarun',
  bio: 'Corredor apaixonado, maratonista e entusiasta de fitness. Compartilhando minha jornada, treinos e os desafios da corrida.',
  location: 'Rio de Janeiro, Brasil',
  joinDate: 'Entrou em Janeiro de 2023',
  avatar: 'https://images.pexels.com/photos/1578384/pexels-photo-1578384.jpeg',
  coverImage: 'https://images.pexels.com/photos/136721/pexels-photo-136721.jpeg',
  stats: {
    following: 120,
    followers: "745K",
  },
  posts: [
      { id: '1', text: 'Treino da manhã concluído! 15km e sensação incrível. Que venha a próxima maratona!', date: '2 horas atrás' },
      { id: '2', text: 'Melhorando meu tempo nos 5km. A consistência é a chave!', date: '1 dia atrás' },
      { id: '3', text: 'Começando a semana com foco total. Qual o seu treino de hoje?', date: '3 dias atrás' },
      { id: '4', text: 'Corrida na trilha hoje, paisagem deslumbrante!', date: '4 horas atrás' },
      { id: '5', text: 'Bate-papo sobre nutrição esportiva. Alguém tem dicas?', date: '6 horas atrás' },
      { id: '6', text: 'Sessão de yoga pós-treino para alongar. Essencial!', date: '8 horas atrás' },
      { id: '7', text: 'Primeira vez subindo a serra de bicicleta. Desafio superado!', date: '1 dia atrás' },
      { id: '8', text: 'Novas metas para o mês: correr 100km no total. Vamo que vamo!', date: '1 dia atrás' },
      { id: '9', text: 'Participando de um evento de corrida beneficente no fim de semana. Quem mais vai?', date: '2 dias atrás' },
      { id: '10', text: 'Descanso ativo hoje: caminhada leve no parque.', date: '3 dias atrás' },
      { id: '11', text: 'Chegou meu novo tênis de corrida! Animado para testar.', date: '3 dias atrás' },
      { id: '12', text: 'A disciplina é o que nos leva mais longe, mesmo nos dias difíceis.', date: '4 dias atrás' },
      { id: '13', text: 'Natação matinal para começar o dia com energia. 🏊‍♂️', date: '4 dias atrás' },
      { id: '14', text: 'Compartilhando meu progresso no crossfit. Orgulho do meu esforço!', date: '5 dias atrás' },
      { id: '15', text: 'Dica do dia: mantenha-se hidratado, especialmente no calor!', date: '5 dias atrás' },
      { id: '16', text: 'Terminei um triathlon hoje! Exausto, mas muito feliz.', date: '6 dias atrás' },
      { id: '17', text: 'Voltando aos treinos depois de uma lesão. Paciência é fundamental.', date: '1 semana atrás' },
      { id: '18', text: 'Receita de smoothie pré-treino que eu amo. Alguém quer?', date: '1 semana atrás' },
      { id: '19', text: 'Convidando todos para um bate-papo sobre esportes de aventura. Interessados?', date: '1 semana atrás' },
      { id: '20', text: 'Passeio de bicicleta com o grupo do pedal. Muita diversão!', date: '1 semana atrás' },
      { id: '21', text: 'Primeira vez no muro de escalada. É mais difícil do que parece!', date: '1 semana atrás' },
      { id: '22', text: 'Refletindo sobre a importância do aquecimento antes de qualquer exercício.', date: '1 semana atrás' },
      { id: '23', text: 'Dia de perna na academia! 💪', date: '2 semanas atrás' },
      { id: '24', text: 'Vibrando com a vitória do meu time de basquete!', date: '2 semanas atrás' },
      { id: '25', text: 'Como vocês lidam com a falta de motivação? Preciso de inspiração!', date: '2 semanas atrás' },
      { id: '26', text: 'Conquistando novos picos. A vista do topo vale a pena!', date: '2 semanas atrás' },
      { id: '27', text: 'Planejando a próxima corrida de rua. Algum evento que vocês recomendam?', date: '2 semanas atrás' },
      { id: '28', text: 'Corrida noturna para fugir do sol forte. A cidade fica linda!', date: '3 semanas atrás' },
      { id: '29', text: 'Sentimento de dever cumprido após o treino de hoje.', date: '3 semanas atrás' },
      { id: '30', text: 'Foco no progresso, não na perfeição. Essa é a minha nova filosofia.', date: '3 semanas atrás' },
  ],
};

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: user.coverImage }} style={styles.coverImage} />

      <View style={styles.profileHeader}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Seguir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.handle}>{user.handle}</Text>
        <Text style={styles.bio}>{user.bio}</Text>
        <View style={styles.detailsRow}>
          <Feather name="map-pin" size={16} color="#bbb" />
          <Text style={styles.detailText}>{user.location}</Text>
          <Feather name="calendar" size={16} color="#bbb" style={{ marginLeft: 10 }} />
          <Text style={styles.detailText}>{user.joinDate}</Text>
        </View>
        <View style={styles.statsRow}>
          <Text style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.following}</Text>
            <Text style={styles.statLabel}> Seguindo</Text>
          </Text>
          <Text style={styles.statItem}>
            <Text style={styles.statNumber}>{user.stats.followers}</Text>
            <Text style={styles.statLabel}> Seguidores</Text>
          </Text>
        </View>
      </View>

      <View style={styles.postsContainer}>
        <Text style={styles.postsTitle}>Publicações</Text>
        {user.posts.map(post => (
          <View key={post.id} style={styles.postItem}>
            <Text style={styles.postText}>{post.text}</Text>
            <Text style={styles.postDate}>{post.date}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414',
  },
  coverImage: {
    width: '100%',
    height: 200,
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: -60,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: '#15202b',
  },
  followButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 50,
  },
  followButtonText: {
    color: '#ff2962 ',
    fontWeight: 'bold',
  },
  profileInfo: {
    paddingHorizontal: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  handle: {
    fontSize: 16,
    color: '#8899a6',
    marginBottom: 10,
  },
  bio: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 10,
    lineHeight: 22,
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 13,
    color: '#8899a6',
    marginLeft: 5,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  statItem: {
    fontSize: 15,
    marginRight: 20,
  },
  statNumber: {
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    color: '#8899a6',
  },
  postsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#38444d',
    paddingTop: 10,
    paddingHorizontal: 20,
  },
  postsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  postItem: {
    backgroundColor: '#1f1f1f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  postText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
    lineHeight: 22,
  },
  postDate: {
    fontSize: 10,
    color: '#8899a6',
    textAlign: 'right',
  },
});