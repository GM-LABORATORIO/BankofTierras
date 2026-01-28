/**
 * 🔗 Lógica de Bonificación por Adyacencia (Corredores Biológicos)
 * Detecta si los píxeles seleccionados forman un grupo conectado y calcula descuentos.
 */

// Distancia máxima para considerar dos píxeles como "conectados" (incluye diagonales)
// Asumiendo que GRID_STEP es consistente, la distancia ortogonal es 1 unidad de grid, diagonal es ~1.41
const ADJACENCY_THRESHOLD = 1.5;

export const calculateAdjacencyBonus = (selectedCells, gridStep = 0.5) => {
    if (!selectedCells || selectedCells.length < 2) {
        return {
            discountPercent: 0,
            discountAmount: 0,
            bonusName: null,
            finalPrice: selectedCells.reduce((acc, cell) => acc + cell.price, 0),
            isConnected: false
        };
    }

    // 1. Construir Grafo de Conexiones
    // Usamos un Map donde cada key es el ID de la celda y value es su lista de vecinos
    const adjacencyGraph = new Map();

    selectedCells.forEach(cell => {
        adjacencyGraph.set(cell.id, []);
    });

    // Comparación O(N^2) - Aceptable para selección <= 20 items
    for (let i = 0; i < selectedCells.length; i++) {
        for (let j = i + 1; j < selectedCells.length; j++) {
            const cellA = selectedCells[i];
            const cellB = selectedCells[j];

            // Distancia Euclidiana
            const dx = (cellA.coords[0] - cellB.coords[0]) / gridStep;
            const dy = (cellA.coords[1] - cellB.coords[1]) / gridStep;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance <= ADJACENCY_THRESHOLD) {
                adjacencyGraph.get(cellA.id).push(cellB.id);
                adjacencyGraph.get(cellB.id).push(cellA.id);
            }
        }
    }

    // 2. Encontrar el componente conexo más grande (BFS/DFS)
    const visited = new Set();
    let maxConnectedSize = 0;

    selectedCells.forEach(cell => {
        if (!visited.has(cell.id)) {
            let currentSize = 0;
            const stack = [cell.id];
            visited.add(cell.id);

            while (stack.length > 0) {
                const nodeId = stack.pop();
                currentSize++;

                const neighbors = adjacencyGraph.get(nodeId) || [];
                neighbors.forEach(neighborId => {
                    if (!visited.has(neighborId)) {
                        visited.add(neighborId);
                        stack.push(neighborId);
                    }
                });
            }
            if (currentSize > maxConnectedSize) {
                maxConnectedSize = currentSize;
            }
        }
    });

    // 3. Calcular Bonus basado en el tamaño del cluster más grande
    let discountPercent = 0;
    let bonusName = null;

    if (maxConnectedSize >= 9) {
        discountPercent = 0.15; // 15%
        bonusName = "ECOSYSTEM BUILDER (Silver Badge)";
    } else if (maxConnectedSize >= 4) {
        discountPercent = 0.10; // 10%
        bonusName = "COMMUNITY GUARDIAN (Bronze Badge)";
    } else if (maxConnectedSize >= 2) {
        discountPercent = 0.05; // 5%
        bonusName = "GOOD NEIGHBOR";
    }

    const basePrice = selectedCells.reduce((acc, cell) => acc + cell.price, 0);
    const discountAmount = Math.round(basePrice * discountPercent);

    return {
        discountPercent,
        discountAmount,
        bonusName,
        finalPrice: basePrice - discountAmount,
        connectedCount: maxConnectedSize,
        totalCount: selectedCells.length
    };
};
