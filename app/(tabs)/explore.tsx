import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { IconSymbol } from '@/components/ui/icon-symbol';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';

const eventos = [
  {
    id: '1',
    titulo: 'Corrida de Rua - 5km',
    data: '20/09/2025',
    local: 'Praça Central',
    descricao: 'Corrida aberta para todos os níveis, com premiação para os 3 primeiros colocados.',
  },
  {
    id: '2',
    titulo: 'Torneio de Basquete 3x3',
    data: '25/09/2025',
    local: 'Quadra Municipal',
    descricao: 'Competição amistosa com equipes locais. Inscrições gratuitas.',
  },
  {
    id: '3',
    titulo: 'Aula Aberta de Yoga',
    data: '30/09/2025',
    local: 'Parque das Águas',
    descricao: 'Sessão de relaxamento e bem-estar para iniciantes e praticantes.',
  },
];

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={260}
          color="#808080"
          name="sportscourt"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{ fontFamily: Fonts.rounded, color: '#fff' }}>
          Eventos Esportivos
        </ThemedText>
      </ThemedView>

      <FlatList
        data={eventos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingVertical: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.eventTitle}>{item.titulo}</Text>
            <Text style={styles.eventInfo}>{item.data} • {item.local}</Text>
            <Text style={styles.eventDescription}>{item.descricao}</Text>
          </TouchableOpacity>
        )}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#222',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  eventInfo: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 8,
  },
  eventDescription: {
    fontSize: 14,
    color: '#aaa',
  },
});
