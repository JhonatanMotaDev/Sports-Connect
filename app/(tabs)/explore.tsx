import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const MAX_DISTANCE_KM = 5.0;

const dadosLocaisMock = [
  {
    id: '1',
    nome: 'Centro Esportivo Afya',
    tipo: 'Ginásio/Quadras',
    endereco: 'Av. Aida Mainartina Paraíso. 80 - Ibituruna',
    coordenadas: { lat: -16.7380, lon: -43.8730 },
    comodidades: ['Ginásio Poliesportivo', 'Vestiários', 'Estacionamento']
  },
  {
    id: '2',
    nome: 'Campus Unimontes - Centro Esportivo',
    tipo: 'Universidade',
    endereco: 'Av. Prof. Ruy Braga - Vila Mauriceia',
    coordenadas: { lat: -16.7150, lon: -43.8650 },
    comodidades: ['Piscina Olímpica', 'Pista de Atletismo', 'Quadras', 'Campo de Futebol']
  },
  {
    id: '3',
    nome: 'Campus Funorte JK',
    tipo: 'Universidade',
    endereco: 'Av. Osmane Barbosa, 1111 - JK',
    coordenadas: { lat: -16.7050, lon: -43.8900 },
    comodidades: ['Quadra Poliesportiva', 'Campo de Futebol', 'Academia']
  },
  {
    id: '4',
    nome: 'Praça de Esportes M. Claros',
    tipo: 'Centro Esportivo Público',
    endereco: 'R. Santa Lúcia, 234 - Todos os Santos',
    coordenadas: { lat: -16.7260, lon: -43.8600 },
    comodidades: ['Piscinas', 'Quadras', 'Ginásio', 'Aulas Gratuitas']
  },
  {
    id: '5',
    nome: 'AABB Montes Claros',
    tipo: 'Clube',
    endereco: 'R. Olímpio Guedes, 137 - Constantino',
    coordenadas: { lat: -16.7190, lon: -43.8550 },
    comodidades: ['Piscinas', 'Campos de Futebol', 'Quadras de Tênis', 'Restaurante']
  },
  {
    id: '6',
    nome: 'Arena MOC Society',
    tipo: 'Quadra de Society',
    endereco: 'Av. Donato Quintino, 90 - Cidade Nova',
    coordenadas: { lat: -16.7020, lon: -43.8580 },
    comodidades: ['Vestiário', 'Bar', 'Estacionamento', 'Churrasqueira']
  },
  {
    id: '7',
    nome: 'MOC Beach Arena',
    tipo: 'Quadra de Beach Tennis',
    endereco: 'R. Eng. João Antônio Pimenta, 500 - Augusta Mota',
    coordenadas: { lat: -16.7290, lon: -43.8790 },
    comodidades: ['Vestiário', 'Lanchonete', 'Aulas', 'Wi-Fi']
  },
  {
    id: '8',
    nome: 'Clube Campestre Pentáurea',
    tipo: 'Clube',
    endereco: 'BR-365, Km 15 - Zona Rural',
    coordenadas: { lat: -16.6350, lon: -43.8450 },
    comodidades: ['Piscinas', 'Campos', 'Restaurante', 'Hospedagem']
  },
];

type LocalEsportivo = {
  id: string;
  nome: string;
  tipo: string;
  endereco: string;
  coordenadas: { lat: number; lon: number };
  comodidades: string[];
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

export default function LocaisEsportivosScreen() {
  const [todosOsLocais] = useState<LocalEsportivo[]>(dadosLocaisMock);
  const [locaisFiltrados, setLocaisFiltrados] = useState<LocalEsportivo[]>([]);

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
    }, 1000);

    
  }, []);

  useEffect(() => {
    fetchUserLocation();
  }, [fetchUserLocation]);

  useEffect(() => {
    if (userLocation && todosOsLocais.length > 0) {
      const locaisProximos = todosOsLocais
        .map(local => {
          const { lat, lon } = local.coordenadas;
          const distance = calculateDistance(userLocation.lat, userLocation.lon, lat, lon);
          return { ...local, distance };
        })
        .filter(local => local.distance !== undefined && local.distance <= MAX_DISTANCE_KM)
        .sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));

      setLocaisFiltrados(locaisProximos);
    } else if (!isLocationLoading && !userLocation) {
      setLocaisFiltrados([]);
    }
  }, [todosOsLocais, userLocation, isLocationLoading]);

  const LocalCard = ({ item }: { item: LocalEsportivo }) => {
    const distanceText = item.distance !== undefined
      ? `${item.distance.toFixed(2)} km`
      : 'Calculando...';

    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.localNome}>{item.nome}</Text>
          <Text style={styles.localTipo}>{item.tipo}</Text>
        </View>

        <Text style={styles.localEndereco}>{item.endereco}</Text>

        <View style={styles.comodidadesContainer}>
          {item.comodidades.map((comodidade, index) => (
            <View key={index} style={styles.comodidadeTag}>
              <Text style={styles.comodidadeTagText}>{comodidade}</Text>
            </View>
          ))}
        </View>

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
      <Text style={styles.header}>Locais Esportivos Perto de Você</Text>

      <View style={[styles.filterTag, locationError ? styles.errorTag : (userLocation ? styles.successTag : styles.loadingTag)]}>
        {isLocationLoading && <ActivityIndicator color="#fff" style={{ marginRight: 8 }} />}
        <Text style={styles.filterTagText}>
          {isLocationLoading
            ? 'Buscando sua localização...'
            : locationError
              ? `Erro: ${locationError}`
              : `Localização Encontrada. Raio: ${MAX_DISTANCE_KM} km`}
        </Text>
      </View>

      <FlatList<LocalEsportivo>
        data={locaisFiltrados}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={() => {
          if (isLocationLoading) {
            return (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Aguardando localização para filtrar...</Text>
              </View>
            );
          }
          return (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                {locationError
                  ? "Não foi possível filtrar locais devido ao erro de localização."
                  : `Nenhum local esportivo encontrado em um raio de ${MAX_DISTANCE_KM} km.`}
              </Text>
            </View>
          );
        }}
        renderItem={({ item }) => <LocalCard item={item} />}
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
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 20,
    marginTop: 20,
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
    backgroundColor: '#00a043ff',
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
    borderLeftColor: '#ff2079ff',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  localNome: {
    fontSize: 20,
    fontWeight: '700',
    color: '#fff',
    flexShrink: 1,
    marginRight: 8,
  },
  localTipo: {
    fontSize: 14,
    color: '#ffffffff',
    fontWeight: '700',
    fontStyle: 'italic',
  },
  localEndereco: {
    fontSize: 14,
    color: '#bbb',
    marginBottom: 12,
  },

  comodidadesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
    marginBottom: 8,
  },
  comodidadeTag: {
    backgroundColor: '#333',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
  },
  comodidadeTagText: {
    color: '#eee',
    fontSize: 12,
    fontWeight: '500',
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
    textAlign: 'center',
  }
});