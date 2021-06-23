const NeighboursCoordinates = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]];


export class GameMapService {
    static PREDEFINED_MAP_4 = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
    static PREDEFINED_MAP_5 = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 1, 1, 1, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
    static PREDEFINED_MAP_6 = [[0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 1, 1, 1, 0], [0, 1, 1, 1, 0, 0], [0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0]];

    getCellNeighboursQuantity = (x: number, y: number, map: number[][]) => {
        const mapHeight = map.length;
        const mapWidth = mapHeight >= 1 ? map[0].length : 0;

        let aliveNeighbours = 0;

        NeighboursCoordinates.forEach(([xOffset, yOffset]) => {
            const neighbourX = x + xOffset;
            const neighbourY = y + yOffset;
            const isOutside = neighbourX < 0 || neighbourX >= mapWidth || neighbourY < 0 || neighbourY >= mapHeight;

            if (!isOutside) {
                aliveNeighbours += map[neighbourY][neighbourX] === 1 ? 1 : 0;
            }
        });

        return aliveNeighbours;
    }

    copyMap = (map: number[][]) => {
        return Array(map.length).fill([]).map((value, index) => [...map[index]])
    }
}

const gameMapService = new GameMapService();
export default gameMapService;
