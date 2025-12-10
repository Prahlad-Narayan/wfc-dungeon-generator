import React, { useState } from 'react';
import { Layout } from '../components/Layout.tsx';
import { ADJACENCY, type TileType } from '../core/constants.ts';

// simple starter cell type for students to use
interface StarterCell {
    x: number;
    y: number;
    collapsed: boolean;
    possibleOptions: TileType[];
    finalType: TileType | null;
}

export const Starter: React.FC = () => {
    // basic status text for the starter mode
    const [status] = useState('Starter Mode');

    // main generate handler (full loop)
    const handleGenerate = () => {
        console.log("TODO: Implement Generation Loop");
    };

    // single WFC step handler
    const handleStep = () => {
        console.log("TODO: Implement Single Step");
        // 1. compute entropy
        // 2. pick lowest entropy cell
        // 3. collapse that cell
        // 4. propagate to neighbors
    };

    const calculateEntropy = (cell: StarterCell) => {
        // TODO: return cell.possibleOptions.length
        console.log(cell);
        return 0;
    };

    const collapseCell = (cell: StarterCell) => {
        // TODO: choose random tile and set finalType
        console.log(cell);
    };

    const propagateConstraints = (cell: StarterCell) => {
        // TODO: update neighbors based on rules
        console.log(cell);
    };

    // helper: get neighbor cells (stubbed for starter)
    const getNeighbors = (x: number, y: number): StarterCell[] => {
        const neighbors: StarterCell[] = [];
        // implementation will be provided in real version
        return neighbors;
    };

    // helper: check if two tiles can be next to each other
    const isCompatible = (tileA: TileType, tileB: TileType): boolean => {
        return ADJACENCY[tileA].includes(tileB);
    };

    // small test cell to check entropy logic
    const testCell: StarterCell = {
        x: 5,
        y: 5,
        collapsed: false,
        possibleOptions: ['FLOOR', 'WALL', 'CORRIDOR'],
        finalType: null
    };

    console.log('Entropy:', calculateEntropy(testCell)); // expected: 3

    // avoid unused function warnings in the starter template
    void calculateEntropy;
    void collapseCell;
    void propagateConstraints;

    return (
        <Layout
            left={
                <div className="panel">
                    <h2>Dungeon Generator (Starter)</h2>
                    <div style={{ margin: '20px 0' }}>
                        <p>Implement the WFC logic to make these buttons work!</p>
                    </div>
                    {/* hidden block just to reference things if needed */}
                    <div style={{ display: 'none' }}>
                        {/* could be used to attach dummy handlers later */}
                    </div>

                    <button onClick={handleGenerate} style={{ width: '100%', marginBottom: 10 }}>Generate</button>
                    <button onClick={handleStep} style={{ width: '100%', marginBottom: 10 }}>Step</button>
                    <button onClick={() => window.location.reload()} style={{ width: '100%' }}>Reset</button>
                </div>
            }
            center={
                <div className="canvas-container">
                    <div style={{ color: 'white', textAlign: 'center' }}>
                        <h3>Grid Visualization</h3>
                        <p>TODO: Render Grid Here</p>
                    </div>
                </div>
            }
            right={
                <div className="panel">
                    <h2>Info</h2>
                    <p>Status: {status}</p>
                    <div style={{ marginTop: 20, padding: 10, background: '#333' }}>
                        <h4>TODO List:</h4>
                        <ul>
                            <li>Implement Cell Class</li>
                            <li>Implement CalculateEntropy</li>
                            <li>Implement Collapse</li>
                            <li>Implement Propagation</li>
                        </ul>
                    </div>
                </div>
            }
        />
    );
};
