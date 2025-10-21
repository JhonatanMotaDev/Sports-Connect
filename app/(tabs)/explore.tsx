import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MAX_DISTANCE_KM = 5.0;

const dadosEventosMock = [
  {
    id: '1',
    titulo: 'Campeonato de Futsal - Afya',
    data: '15/09/2025',
    local: 'Ginásio Afya',
    descricao: 'Torneio de futsal entre cursos da Afya.',
    coordenadas: { lat: -16.7380, lon: -43.8730 }
  },
  {
    id: '2',
    titulo: 'Corrida de Rua Unimontes 10km',
    data: '22/09/2025',
    local: 'Campus Unimontes - Montes Claros',
    descricao: 'Evento aberto a estudantes e comunidade.',
    coordenadas: { lat: -16.7150, lon: -43.8650 }
  },
  {
    id: '3',
    titulo: 'Torneio de Basquete 3x3 Funorte',
    data: '28/09/2025',
    local: 'Quadra Poliesportiva Funorte',
    descricao: 'Torneio amistoso de basquete 3x3.',
    coordenadas: { lat: -16.7050, lon: -43.8900 }
  },
  {
    id: '4',
    titulo: 'Aula Aberta de Yoga - Afya',
    data: '30/09/2025',
    local: 'Parque da Cidade - Afya',
    descricao: 'Sessão de relaxamento e bem-estar.',
    coordenadas: { lat: -16.7380, lon: -43.8730 }
  },
  {
    id: '5',
    titulo: 'Desafio de Natação Unimontes',
    data: '05/10/2025',
    local: 'Piscina Olímpica Unimontes',
    descricao: 'Provas de natação em várias distâncias.',
    coordenadas: { lat: -16.7160, lon: -43.8660 }
  },
  {
    id: '6',
    titulo: 'Circuito Funcional Funorte',
    data: '12/10/2025',
    local: 'Quadra Externa Funorte',
    descricao: 'Atividade física funcional com circuito.',
    coordenadas: { lat: -16.7060, lon: -43.8910 }
  },
  {
    id: '7',
    titulo: 'Campeonato de Vôlei de Praia - Afya',
    data: '18/10/2025',
    local: 'Quadra de Areia Afya',
    descricao: 'Torneio de vôlei de praia em duplas.',
    coordenadas: { lat: -16.7380, lon: -43.8730 }
  },
  {
    id: '8',
    titulo: 'Pedalada Ecológica Unimontes',
    data: '20/10/2025',
    local: 'Saída do Campus Unimontes',
    descricao: 'Passeio ciclístico em grupo.',
    coordenadas: { lat: -16.7140, lon: -43.8640 }
  },
  {
    id: '16',
    titulo: 'Treino Aberto de Futsal - UFMG',
    data: '30/11/2025',
    local: 'Quadra 1 - UFMG',
    descricao: 'Treino de futsal para a comunidade acadêmica.',
    coordenadas: { lat: -16.8000, lon: -43.9500 }
  },
];

type Evento = {
  id: string;
  titulo: string;
  data: string;
  local: string;
  descricao: string;
  coordenadas: { lat: number; lon: number };
  distance?: number;
};

const toRad = (deg: number): number => deg * (Math.PI / 180);

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export default function EventosScreen() {
  const [todosOsEventos] = useState<Evento[]>(dadosEventosMock);
  const [eventosFiltrados, setEventosFiltrados] = useState<Evento[]>([]);

  const [userLocation, setUserLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocationLoading, setIsLocationLoading] = useState<boolean>(true);

  const fetchUserLocation = useCallback(() => {
    setIsLocationLoading(true);
    setLocationError(null);

    const simulatedLocation = { lat: -16.7350, lon: -43.8700 };

    setTimeout(() => {
      setUserLocation(simulatedLocation);
      setIsLocationLoading(false);
    }, 2000);

  }, []);

  useEffect(() => {
    fetchUserLocation();
  }, [fetchUserLocation]);

  useEffect(() => {
    if (userLocation && todosOsEventos.length > 0) {
      const eventosProximos = todosOsEventos
        .map(evento => {
          const { lat, lon } = evento.coordenadas;
          const distance = calculateDistance(userLocation.lat, userLocation.lon, lat, lon);
          return { ...evento, distance };
        })
        .filter(evento => evento.distance !== undefined && evento.distance <= MAX_DISTANCE_KM)
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));

      setEventosFiltrados(eventosProximos);
    } else if (!isLocationLoading && !userLocation) {
      setEventosFiltrados([]);
    }
  }, [todosOsEventos, userLocation, isLocationLoading]);

  const EventCard = ({ item }: { item: Evento }) => {
    const distanceText = item.distance !== undefined
      ? `${item.distance.toFixed(2)} km`
      : 'Calculando...';

    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.eventTitle}>{item.titulo}</Text>
          <Text style={styles.eventDate}>{item.data}</Text>
        </View>
        <Text style={styles.eventLocation}>{item.local}</Text>
        <Text style={styles.eventDescription}>{item.descricao}</Text>

        <View style={styles.distanceContainer}>
          <Text style={styles.distanceText}>
            Distância: <Text style={styles.distanceValue}>{distanceText}</Text>
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <Text style={styles.header}>Eventos Esportivos Perto de Você</Text>

      <View style={[styles.filterTag, locationError ? styles.errorTag : (userLocation ? styles.successTag : styles.loadingTag)]}>
        {isLocationLoading && <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />}
        <Text style={styles.filterTagText}>
          {isLocationLoading
            ? 'Buscando sua localização em MOC...'
            : locationError
              ? `Erro: ${locationError}`
              : `Localização Encontrada. Raio: ${MAX_DISTANCE_KM} km`}
        </Text>
      </View>

      <FlatList<Evento>
        data={eventosFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={() => {
          if (isLocationLoading) {
            return <View style={styles.emptyContainer}><Text style={styles.emptyText}>Aguardando localização para filtrar...</Text></View>;
          }
          return (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {locationError
                  ? "Não foi possível filtrar eventos devido ao erro de localização."
                  : `Nenhum evento encontrado em um raio de ${MAX_DISTANCE_KM} km da sua posição.`}
              </Text>
            </View>
          );
        }}
        renderItem={({ item }) => <EventCard item={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    marginTop: 10,
  },
  filterTag: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 16,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingTag: {
    backgroundColor: '#3f51b5',
  },
  successTag: {
    backgroundColor: '#00c853',
  },
  errorTag: {
    backgroundColor: '#ff2962',
  },
  filterTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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
    borderLeftWidth: 4,
    borderLeftColor: '#ff2962',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    flexShrink: 1,
  },
  eventDate: {
    fontSize: 14,
    color: '#ff2962',
    fontWeight: '700',
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
  distanceContainer: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#2a2a2a',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  distanceText: {
    fontSize: 14,
    color: '#bbb',
    fontWeight: '600',
  },
  distanceValue: {
    color: '#00c853',
    fontWeight: '700',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#1f1f1f',
    borderRadius: 10,
  },
  emptyText: {
    color: '#bbb',
    fontSize: 16,
    fontStyle: 'italic',
  }
});
