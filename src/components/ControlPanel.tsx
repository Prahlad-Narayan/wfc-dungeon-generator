import React from 'react';
import { WFC } from '../core/wfc';

interface ControlPanelProps {
    onGenerate: () => void;
    onStep: () => void;
    onReset: () => void;
    speed: number;
    setSpeed: (v: number) => void;
    gridSize: number;
    setGridSize: (v: number) => void;
    isRunning: boolean;
    wfc?: WFC; // current WFC instance (if any)
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
    onGenerate,
    onStep,
    onReset,
    speed,
    setSpeed,
    gridSize,
    setGridSize,
    isRunning,
    wfc
}) => {
    // export current dungeon data as JSON
    const exportJSON = () => {
        if (!wfc) {
            alert('No dungeon to export!');
            return;
        }

        const data = {
            metadata: {
                width: wfc.width,
                height: wfc.height,
                generatedAt: new Date().toISOString(),
                complete: wfc.complete,
                failed: wfc.failed,
                stepCount: wfc.stepCount,
                version: '1.0'
            },
            tiles: [] as any[],
            statistics: wfc.getStats()
        };

        // flatten grid into a simple list
        for (let x = 0; x < wfc.width; x++) {
            for (let y = 0; y < wfc.height; y++) {
                const cell = wfc.grid[x][y];
                data.tiles.push({
                    x: cell.x,
                    y: cell.y,
                    type: cell.finalType || 'UNCOLLAPSED',
                    collapsed: cell.collapsed
                });
            }
        }

        // trigger JSON download
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `dungeon-${gridSize}x${gridSize}-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // export the canvas as an image file
    const exportPNG = () => {
        const canvas = document.querySelector('canvas');
        if (!canvas) {
            alert('No canvas found!');
            return;
        }

        canvas.toBlob((blob) => {
            if (!blob) {
                alert('Failed to export image!');
                return;
            }

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `dungeon-${gridSize}x${gridSize}-${Date.now()}.png`;
            a.click();
            URL.revokeObjectURL(url);
        });
    };

    // copy a text/ASCII version of the dungeon to clipboard
    const copyToClipboard = () => {
        if (!wfc) {
            alert('No dungeon to copy!');
            return;
        }

        let text = `WFC Dungeon (${wfc.width}x${wfc.height})\n`;
        text += `Steps: ${wfc.stepCount}, Complete: ${wfc.complete}\n\n`;

        // build a simple ASCII map
        for (let y = 0; y < wfc.height; y++) {
            for (let x = 0; x < wfc.width; x++) {
                const cell = wfc.grid[x][y];
                if (!cell.collapsed) {
                    text += '?';
                } else if (cell.finalType === 'WALL') {
                    text += '█';
                } else if (cell.finalType === 'FLOOR') {
                    text += '·';
                } else if (cell.finalType === 'CORRIDOR') {
                    text += '░';
                } else if (cell.finalType === 'START') {
                    text += 'S';
                } else if (cell.finalType === 'END') {
                    text += 'E';
                } else {
                    text += ' ';
                }
            }
            text += '\n';
        }

        navigator.clipboard.writeText(text).then(() => {
            alert('Dungeon copied to clipboard!');
        }).catch(() => {
            alert('Failed to copy to clipboard');
        });
    };

    // map delay value to a simple label
    const getSpeedLabel = () => {
        if (speed < 50) return 'Very Fast';
        if (speed < 100) return 'Fast';
        if (speed < 300) return 'Medium';
        if (speed < 600) return 'Slow';
        return 'Very Slow';
    };

    return (
        <div
            className="panel"
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px',
                height: '100%',
                overflow: 'auto'
            }}
        >
            <h2 style={{ margin: 0 }}>Dungeon Generator</h2>

            {/* main generation buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                    onClick={onGenerate}
                    disabled={isRunning}
                    style={{
                        backgroundColor: isRunning ? '#555' : 'var(--accent-blue, #3282b8)',
                        color: 'white',
                        padding: '12px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: isRunning ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        transition: 'all 0.3s',
                        opacity: isRunning ? 0.6 : 1
                    }}
                    onMouseOver={(e) =>
                        !isRunning && (e.currentTarget.style.backgroundColor = '#4296cb')
                    }
                    onMouseOut={(e) =>
                        !isRunning && (e.currentTarget.style.backgroundColor = '#3282b8')
                    }
                >
                    {isRunning ? 'Running...' : 'Generate Auto'}
                </button>

                <button
                    onClick={onStep}
                    disabled={isRunning}
                    style={{
                        backgroundColor: isRunning ? '#333' : '#2d2d2d',
                        color: 'white',
                        padding: '12px',
                        border: '1px solid #444',
                        borderRadius: '5px',
                        cursor: isRunning ? 'not-allowed' : 'pointer',
                        fontSize: '14px',
                        transition: 'all 0.3s',
                        opacity: isRunning ? 0.6 : 1
                    }}
                    onMouseOver={(e) =>
                        !isRunning && (e.currentTarget.style.backgroundColor = '#3d3d3d')
                    }
                    onMouseOut={(e) =>
                        !isRunning && (e.currentTarget.style.backgroundColor = '#2d2d2d')
                    }
                >
                    Step (Manual)
                </button>

                <button
                    onClick={onReset}
                    style={{
                        backgroundColor: 'var(--highlight-red, #e63946)',
                        color: 'white',
                        padding: '12px',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        fontSize: '14px',
                        fontWeight: 'bold',
                        transition: 'all 0.3s'
                    }}
                    onMouseOver={(e) =>
                        (e.currentTarget.style.backgroundColor = '#f44336')
                    }
                    onMouseOut={(e) =>
                        (e.currentTarget.style.backgroundColor = '#e63946')
                    }
                >
                    Reset
                </button>
            </div>

            {/* delay/speed slider */}
            <div
                style={{
                    padding: '15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '5px'
                }}
            >
                <label
                    style={{
                        display: 'block',
                        marginBottom: '10px',
                        fontWeight: 'bold',
                        color: '#ccc'
                    }}
                >
                    Speed: {getSpeedLabel()} ({speed}ms)
                </label>
                <input
                    type="range"
                    min="10"
                    max="1000"
                    step="10"
                    style={{
                        width: '100%',
                        direction: 'rtl',
                        cursor: 'pointer'
                    }}
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                />
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: '0.75em',
                        color: '#888',
                        marginTop: '5px'
                    }}
                >
                    <span>Slow</span>
                    <span>Fast</span>
                </div>
            </div>

            {/* grid size dropdown */}
            <div
                style={{
                    padding: '15px',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '5px'
                }}
            >
                <label
                    style={{
                        display: 'block',
                        marginBottom: '10px',
                        fontWeight: 'bold',
                        color: '#ccc'
                    }}
                >
                    Grid Size
                </label>
                <select
                    value={gridSize}
                    onChange={(e) => setGridSize(Number(e.target.value))}
                    disabled={isRunning}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#0a0a12',
                        color: 'white',
                        border: '1px solid #444',
                        borderRadius: '5px',
                        fontSize: '14px',
                        cursor: isRunning ? 'not-allowed' : 'pointer',
                        opacity: isRunning ? 0.6 : 1
                    }}
                >
                    <option value="10">10x10 Tiny</option>
                    <option value="15">15x15 Small</option>
                    <option value="20">20x20 Standard</option>
                    <option value="25">25x25 Large</option>
                    <option value="30">30x30 Extra Large</option>
                </select>
            </div>

            {/* export buttons section */}
            <div
                style={{
                    padding: '15px',
                    backgroundColor: 'rgba(255, 215, 0, 0.1)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    borderRadius: '5px'
                }}
            >
                <h3
                    style={{
                        margin: '0 0 10px 0',
                        fontSize: '14px',
                        color: '#ffd700'
                    }}
                >
                    Export Options
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                        onClick={exportJSON}
                        disabled={!wfc || !wfc.complete}
                        style={{
                            backgroundColor: !wfc || !wfc.complete ? '#333' : '#4caf50',
                            color: 'white',
                            padding: '8px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor:
                                !wfc || !wfc.complete ? 'not-allowed' : 'pointer',
                            fontSize: '13px',
                            transition: 'all 0.3s',
                            opacity: !wfc || !wfc.complete ? 0.5 : 1
                        }}
                        title="Export dungeon data as JSON"
                    >
                        Export JSON
                    </button>

                    <button
                        onClick={exportPNG}
                        disabled={!wfc || !wfc.complete}
                        style={{
                            backgroundColor: !wfc || !wfc.complete ? '#333' : '#2196f3',
                            color: 'white',
                            padding: '8px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor:
                                !wfc || !wfc.complete ? 'not-allowed' : 'pointer',
                            fontSize: '13px',
                            transition: 'all 0.3s',
                            opacity: !wfc || !wfc.complete ? 0.5 : 1
                        }}
                        title="Export canvas as PNG image"
                    >
                        Export PNG
                    </button>

                    <button
                        onClick={copyToClipboard}
                        disabled={!wfc || !wfc.complete}
                        style={{
                            backgroundColor: !wfc || !wfc.complete ? '#333' : '#ff9800',
                            color: 'white',
                            padding: '8px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor:
                                !wfc || !wfc.complete ? 'not-allowed' : 'pointer',
                            fontSize: '13px',
                            transition: 'all 0.3s',
                            opacity: !wfc || !wfc.complete ? 0.5 : 1
                        }}
                        title="Copy ASCII representation to clipboard"
                    >
                        Copy ASCII
                    </button>
                </div>
                {(!wfc || !wfc.complete) && (
                    <p
                        style={{
                            fontSize: '11px',
                            color: '#999',
                            margin: '8px 0 0 0',
                            fontStyle: 'italic'
                        }}
                    >
                        Complete generation to enable exports
                    </p>
                )}
            </div>

            {/* small tips for using the UI */}
            <div
                style={{
                    padding: '12px',
                    backgroundColor: 'rgba(66, 135, 245, 0.1)',
                    border: '1px solid rgba(66, 135, 245, 0.3)',
                    borderRadius: '5px',
                    fontSize: '12px',
                    color: '#aaa',
                    lineHeight: '1.6'
                }}
            >
                <strong style={{ color: '#4caf50' }}>Tips:</strong>
                <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
                    <li>Use <strong>Step mode</strong> to see each collapse slowly</li>
                    <li>Try <strong>different grid sizes</strong> to change layout</li>
                    <li>Export dungeons if you like a particular result</li>
                </ul>
            </div>

            {/* footer text at the bottom */}
            <div
                style={{
                    marginTop: 'auto',
                    paddingTop: '15px',
                    borderTop: '1px solid #333',
                    fontSize: '0.75em',
                    color: '#666',
                    textAlign: 'center'
                }}
            >
                WFC Dungeon Generator v1.0
                <br />
                <span style={{ fontSize: '0.9em' }}>
                    Teaching Tool for Game AI
                </span>
            </div>
        </div>
    );
};
