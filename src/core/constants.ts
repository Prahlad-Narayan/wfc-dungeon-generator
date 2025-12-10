export type TileType = 'FLOOR' | 'WALL' | 'CORRIDOR' | 'START' | 'END';

export interface TileDef {
    type: TileType;
    color: string;
    weight: number; // bigger weight = shows up more often
}

export const TILE_TYPES: Record<TileType, TileDef> = {
    // floor tiles (main walkable area)
    FLOOR: { type: 'FLOOR', color: '#e0d0b0', weight: 45 },

    // wall tiles (boundaries/obstacles)
    WALL: { type: 'WALL', color: '#2d2d2d', weight: 35 },

    // corridor tiles (paths)
    CORRIDOR: { type: 'CORRIDOR', color: '#a0522d', weight: 12 },

    // start/end markers (placed manually)
    START: { type: 'START', color: '#4caf50', weight: 0 },
    END: { type: 'END', color: '#f44336', weight: 0 },
};

export const AL_TILE_TYPES = Object.values(TILE_TYPES);

/**
 * Adjacency rules for each tile type
 * (which tiles can touch which)
 */
export const ADJACENCY: Record<TileType, TileType[]> = {
    /**
     * WALL: can touch walls, floors, corridors
     */
    WALL: ['WALL', 'FLOOR', 'CORRIDOR'],

    /**
     * FLOOR: very flexible, touches almost everything
     */
    FLOOR: ['FLOOR', 'WALL', 'CORRIDOR', 'START', 'END'],

    /**
     * CORRIDOR: connects areas like paths
     */
    CORRIDOR: ['FLOOR', 'WALL', 'CORRIDOR', 'START', 'END'],

    /**
     * START: behaves similar to a floor tile
     */
    START: ['FLOOR', 'CORRIDOR', 'WALL'],

    /**
     * END: also behaves like a floor tile
     */
    END: ['FLOOR', 'CORRIDOR', 'WALL'],
};

/**
 * checks if two tile types are allowed next to each other
 * (must be symmetric)
 */
export function canBeAdjacent(tileA: TileType, tileB: TileType): boolean {
    return ADJACENCY[tileA].includes(tileB) && ADJACENCY[tileB].includes(tileA);
}

/**
 * short text descriptions for each tile
 */
export const TILE_DESCRIPTIONS: Record<TileType, string> = {
    FLOOR: "Open walkable space inside rooms",
    WALL: "Solid boundary that forms room structures and obstacles",
    CORRIDOR: "Narrow passage connecting different rooms",
    START: "Entry point - player spawn location",
    END: "Exit point - level goal or boss room"
};

/**
 * notes: changing weights and adjacency
 * will change the dungeon style (maze, cavern, etc.)
 */
