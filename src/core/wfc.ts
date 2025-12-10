import { type TileType, AL_TILE_TYPES, ADJACENCY, TILE_TYPES } from './constants';

export class Cell {
    x: number;
    y: number;
    collapsed: boolean = false;
    possibleOptions: TileType[];
    finalType: TileType | null = null;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        // start with all tile types allowed here
        this.possibleOptions = AL_TILE_TYPES.map(t => t.type);
    }

    // entropy = how many options this cell still has
    get entropy(): number {
        return this.possibleOptions.length;
    }

    // collapse this cell to one tile (optionally a specific one)
    collapse(type?: TileType) {
        this.collapsed = true;

        if (type) {
            // force a specific tile (e.g. START/END)
            this.finalType = type;
            this.possibleOptions = [type];
        } else {
            // pick tile using weights
            this.finalType = this.weightedRandomChoice();
            this.possibleOptions = [this.finalType];
        }
    }

    // choose a random tile from options, using weights
    private weightedRandomChoice(): TileType {
        // get weights for all possible tiles
        const weights = this.possibleOptions.map(opt => TILE_TYPES[opt].weight);
        const totalWeight = weights.reduce((sum, w) => sum + w, 0);

        // if all weights are 0, just pick any
        if (totalWeight === 0) {
            const idx = Math.floor(Math.random() * this.possibleOptions.length);
            return this.possibleOptions[idx];
        }

        // roulette wheel selection
        let random = Math.random() * totalWeight;

        for (let i = 0; i < this.possibleOptions.length; i++) {
            random -= weights[i];
            if (random <= 0) {
                return this.possibleOptions[i];
            }
        }

        // fallback (should not be hit)
        return this.possibleOptions[this.possibleOptions.length - 1];
    }
}

export class WFC {
    width: number;
    height: number;
    grid: Cell[][];

    // overall state flags
    failed: boolean = false;
    complete: boolean = false;
    lastCollapsed: Cell | null = null;

    // counters for stats
    stepCount: number = 0;
    propagationCount: number = 0;
    contradictionCount: number = 0;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.grid = [];
        this.initGrid();
    }

    // create fresh grid of uncollapsed cells
    initGrid() {
        this.grid = [];
        for (let x = 0; x < this.width; x++) {
            const col: Cell[] = [];
            for (let y = 0; y < this.height; y++) {
                col.push(new Cell(x, y));
            }
            this.grid.push(col);
        }
        this.failed = false;
        this.complete = false;
        this.stepCount = 0;
        this.propagationCount = 0;
        this.contradictionCount = 0;
    }

    // safe cell access with bounds check
    getCell(x: number, y: number): Cell | null {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
            return this.grid[x][y];
        }
        return null;
    }

    // pick the uncollapsed cell with the lowest entropy
    getLowestEntropyCell(): Cell | null {
        let minEntropy = Infinity;
        let candidates: Cell[] = [];

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const cell = this.grid[x][y];

                if (!cell.collapsed) {
                    if (cell.entropy < minEntropy) {
                        minEntropy = cell.entropy;
                        candidates = [cell];
                    } else if (cell.entropy === minEntropy) {
                        candidates.push(cell);
                    }
                }
            }
        }

        if (candidates.length === 0) return null;

        // random tie-break
        return candidates[Math.floor(Math.random() * candidates.length)];
    }

    // run one full WFC step (observe → collapse → propagate)
    step(): boolean {
        if (this.complete || this.failed) return false;

        // 1) find lowest entropy cell
        const cell = this.getLowestEntropyCell();
        if (!cell) {
            this.complete = true;
            return false; // nothing left to do
        }

        // 2) collapse that cell
        cell.collapse();
        this.lastCollapsed = cell;
        this.stepCount++;

        // 3) update neighbors
        this.propagate(cell);

        return true;
    }

    // push constraints from a collapsed cell out to its neighbors
    propagate(startCell: Cell) {
        const stack = [startCell];

        while (stack.length > 0) {
            const current = stack.pop()!;
            const curOptions = current.possibleOptions;

            const neighbors = this.getNeighbors(current.x, current.y);

            for (const neighbor of neighbors) {
                if (neighbor.collapsed) continue;

                const originalCount = neighbor.possibleOptions.length;

                // keep only neighbor options compatible with current cell
                neighbor.possibleOptions = neighbor.possibleOptions.filter(nOpt => {
                    return curOptions.some(cOpt => this.isCompatible(nOpt, cOpt));
                });

                // if no options left, we hit a contradiction
                if (neighbor.possibleOptions.length === 0) {
                    this.failed = true;
                    this.contradictionCount++;
                    // no backtracking here, just stop
                    return;
                }

                // if we removed options, keep propagating
                if (neighbor.possibleOptions.length < originalCount) {
                    this.propagationCount++;
                    stack.push(neighbor);
                }
            }
        }
    }

    // return 4-way neighbors (N, E, S, W)
    getNeighbors(x: number, y: number): Cell[] {
        const neighbors: Cell[] = [];
        const directions = [
            [0, 1],   // north
            [1, 0],   // east
            [0, -1],  // south
            [-1, 0]   // west
        ];

        for (const [dx, dy] of directions) {
            const cell = this.getCell(x + dx, y + dy);
            if (cell) neighbors.push(cell);
        }

        return neighbors;
    }

    // check adjacency using the rules from constants
    isCompatible(neighborType: TileType, currentType: TileType): boolean {
        const allowed = ADJACENCY[currentType];
        return allowed.includes(neighborType);
    }

    // force START/END tiles in specific positions
    initializeSpecialCells() {
        // START at left middle
        const startX = 0;
        const startY = Math.floor(this.height / 2);
        const start = this.grid[startX][startY];
        start.collapse('START');
        this.propagate(start);

        // END at right middle
        const endX = this.width - 1;
        const endY = Math.floor(this.height / 2);
        const end = this.grid[endX][endY];
        end.collapse('END');
        this.propagate(end);
    }

    // gather stats for UI / info panel
    getStats() {
        let collapsed = 0;
        let totalEntropy = 0;
        let uncollapsedCount = 0;

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const cell = this.grid[x][y];
                if (cell.collapsed) {
                    collapsed++;
                } else {
                    totalEntropy += cell.entropy;
                    uncollapsedCount++;
                }
            }
        }

        const avgEntropy = uncollapsedCount === 0 ? 0 : totalEntropy / uncollapsedCount;

        return {
            collapsed,
            total: this.width * this.height,
            avgEntropy: avgEntropy.toFixed(2),
            stepCount: this.stepCount,
            propagationCount: this.propagationCount,
            contradictionCount: this.contradictionCount
        };
    }
}
