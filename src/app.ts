type Ciudad = string;
type Distancia = number;

// Definimos el tipo para el grafo donde almacenaremos las distancias entre las ciudades
type Grafo = Record<Ciudad, Record<Ciudad, Distancia>>;

// Función para encontrar el índice del nodo con la distancia más corta
function encontrarNodoConDistanciaMinima(distancias: Record<Ciudad, Distancia>, visitados: Set<Ciudad>): Ciudad {
  
    let distanciaMinima = Infinity;
    let nodoConDistanciaMinima: Ciudad = "";

    for (const ciudad in distancias) {

        const distanciaCiudad = distancias[ciudad]
        const fueVisitado = !visitados.has(ciudad)
        
        debugger

        if ( distanciaCiudad < distanciaMinima && fueVisitado ) {
            distanciaMinima = distancias[ciudad];
            nodoConDistanciaMinima = ciudad;
        }

  }

  return nodoConDistanciaMinima;
}

// Función de algoritmo de Dijkstra
function dijkstra(grafo: Grafo, ciudadInicio: Ciudad): Record<Ciudad, Distancia> {

    const distancias: Record<Ciudad, Distancia> = {};
    const visitados: Set<Ciudad> = new Set();
    
    // Inicializar todas las distancias a infinito excepto el nodo de inicio
    for (const ciudad in grafo) {
        distancias[ciudad] = ciudad === ciudadInicio ? 0 : Infinity;
    }
    
    const grafoKeysSize = Object.keys(grafo).length;
    
    // Iterar hasta que todos los nodos sean visitados
    
    debugger

    while ( visitados.size < grafoKeysSize ) {

        const nodoActual = encontrarNodoConDistanciaMinima(distancias, visitados);
        
        debugger

        visitados.add(nodoActual);

        // Actualizar las distancias de los nodos vecinos
        for (const ciudad in grafo[nodoActual]) {
            
            const from = distancias[nodoActual]
            const to = grafo[nodoActual][ciudad]
            
            const distanciaTotal = from + to ;

            debugger

            if (distanciaTotal < distancias[ciudad]) 
            {
                distancias[ciudad] = distanciaTotal;
            }

        }
    }

  return distancias;
}

// Ejemplo de uso
const grafo: Grafo = {
  "A": { "B": 3, "C": 5 },
  "B": { "A": 3, "C": 1, "D": 7 },
  "C": { "A": 5, "B": 1, "D": 2 },
  "D": { "B": 7, "C": 2 },
};

const ciudadInicio = "A";
const distanciasDesdeCiudadInicio = dijkstra(grafo, ciudadInicio);

console.log(`Distancias desde ${ciudadInicio}:`, distanciasDesdeCiudadInicio);