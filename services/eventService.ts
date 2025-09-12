// Mock de eventos em memória
let mockEvents: any[] = [
  { id: "1", title: "Copa Fip", location: "Quadra 1 - Campus Afya Montes Claros", date: new Date(), description: "Torneio esportivo das atléticas da universidade Afya Montes Claros" },
  { id: "2", title: "Amistoso: Engenharias Fip VS Medicina Fip", location: "Quadra 1 - Campus Afya Montes Claros", date: new Date(), description: "Jogo amistoso entre atléticas da universidade Afya Montes Claro" },
  { id: "3", title: "Intermed 2025", location: "Unimontes - Quadra 3", date: new Date(), description: "Jogos do Intermed 2025 (Fip VS Funorte VS Unimontes)" },
];

export async function getEvents() {
  // Simula requisição assíncrona
  return new Promise<any[]>((resolve) => {
    setTimeout(() => resolve([...mockEvents]), 500);
  });
}

export async function createEvent(event: any) {
  const newEvent = { ...event, id: (mockEvents.length + 1).toString() };
  mockEvents.push(newEvent);
  return newEvent;
}
