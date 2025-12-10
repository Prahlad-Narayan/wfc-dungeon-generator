import React, { useEffect, useRef, useState } from 'react';
import { WFC, Cell } from '../core/wfc';
import { TILE_TYPES } from '../core/constants';

interface GridCanvasProps {
    wfc: WFC;
    generation: number; // redraw trigger
    activeCell: Cell | null; // which cell is being processed
}

export const GridCanvas: React.FC<GridCanvasProps> = ({ wfc, generation, activeCell }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [showEntropy, setShowEntropy] = useState(false);
    const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null);

    // tracks mouse hover over cells
    const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const size = Math.min(canvas.width, canvas.height);
        const cellSize = size / wfc.width;
        const offsetX = (canvas.width - size) / 2;
        const offsetY = (canvas.height - size) / 2;

        const gridX = Math.floor((mouseX - offsetX) / cellSize);
        const gridY = Math.floor((mouseY - offsetY) / cellSize);

        if (gridX >= 0 && gridX < wfc.width && gridY >= 0 && gridY < wfc.height) {
            setHoveredCell({ x: gridX, y: gridY });
        } else {
            setHoveredCell(null);
        }
    };

    // clear tooltip when pointer leaves canvas
    const handleMouseLeave = () => {
        setHoveredCell(null);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // set up drawing sizes
        const size = Math.min(canvas.width, canvas.height);
        const cellSize = size / wfc.width;

        // fill background
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // center the grid
        const offsetX = (canvas.width - size) / 2;
        const offsetY = (canvas.height - size) / 2;

        ctx.save();
        ctx.translate(offsetX, offsetY);

        // draw each cell
        for (let x = 0; x < wfc.width; x++) {
            for (let y = 0; y < wfc.height; y++) {
                const cell = wfc.getCell(x, y);
                if (!cell) continue;

                const cx = x * cellSize;
                const cy = y * cellSize;

                // entropy display mode (heatmap)
                if (!cell.collapsed && showEntropy) {
                    const maxEntropy = 5;
                    const normalized = cell.entropy / maxEntropy;
                    const hue = 240 * (1 - normalized);

                    ctx.fillStyle = `hsl(${hue}, 80%, 50%)`;
                    ctx.fillRect(cx, cy, cellSize, cellSize);

                    ctx.fillStyle = '#fff';
                    ctx.font = `${cellSize * 0.4}px monospace`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(cell.entropy.toString(), cx + cellSize / 2, cy + cellSize / 2);
                }
                // normal collapsed tile
                else if (cell.collapsed && cell.finalType) {
                    ctx.fillStyle = TILE_TYPES[cell.finalType].color;
                    ctx.fillRect(cx, cy, cellSize, cellSize);
                }
                // uncollapsed tile gradient
                else {
                    const e = cell.entropy;
                    if (e === 5) ctx.fillStyle = '#1a1a2e';
                    else if (e === 4) ctx.fillStyle = '#16213e';
                    else if (e === 3) ctx.fillStyle = '#0f3460';
                    else if (e === 2) ctx.fillStyle = '#0a4d68';
                    else ctx.fillStyle = '#088395';

                    ctx.fillRect(cx, cy, cellSize, cellSize);
                }

                // grid outline
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
                ctx.lineWidth = 1;
                ctx.strokeRect(cx, cy, cellSize, cellSize);

                // highlight active cell
                if (activeCell && activeCell.x === x && activeCell.y === y) {
                    ctx.strokeStyle = '#00ff00';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(cx + 2, cy + 2, cellSize - 4, cellSize - 4);

                    ctx.strokeStyle = 'rgba(0, 255, 0, 0.3)';
                    ctx.lineWidth = 6;
                    ctx.strokeRect(cx - 1, cy - 1, cellSize + 2, cellSize + 2);
                }

                // highlight hovered cell
                if (hoveredCell && hoveredCell.x === x && hoveredCell.y === y) {
                    ctx.strokeStyle = '#ffff00';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(cx + 1, cy + 1, cellSize - 2, cellSize - 2);
                }
            }
        }

        ctx.restore();

        // draw tooltip with cell info
        if (hoveredCell) {
            const cell = wfc.getCell(hoveredCell.x, hoveredCell.y);
            if (cell) {
                const tooltipX = offsetX + (hoveredCell.x + 1) * cellSize + 10;
                const tooltipY = offsetY + hoveredCell.y * cellSize;

                ctx.fillStyle = 'rgba(0, 0, 0, 0.9)';
                ctx.fillRect(tooltipX, tooltipY, 200, 80);

                ctx.strokeStyle = '#ffff00';
                ctx.lineWidth = 2;
                ctx.strokeRect(tooltipX, tooltipY, 200, 80);

                ctx.fillStyle = '#fff';
                ctx.font = '12px monospace';

                const lines = [
                    `Position: (${cell.x}, ${cell.y})`,
                    `Status: ${cell.collapsed ? 'Collapsed' : 'Uncollapsed'}`,
                    `Entropy: ${cell.entropy}`,
                    `Type: ${cell.finalType || 'Unknown'}`
                ];

                lines.forEach((line, i) => {
                    ctx.fillText(line, tooltipX + 10, tooltipY + 10 + i * 18);
                });
            }
        }

    }, [wfc, generation, activeCell, showEntropy, hoveredCell]);

    return (
        <div className="canvas-container" style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        }}>
            {/* toggle for showing entropy */}
            <div style={{
                display: 'flex',
                gap: '10px',
                padding: '10px',
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '5px'
            }}>
                <button
                    onClick={() => setShowEntropy(!showEntropy)}
                    style={{
                        padding: '8px 16px',
                        background: showEntropy ? '#4caf50' : '#666',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        transition: 'all 0.3s'
                    }}
                >
                    {showEntropy ? 'Hide Entropy' : 'Show Entropy'}
                </button>

                {showEntropy && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        fontSize: '12px',
                        color: '#aaa'
                    }}>
                        <span>Entropy Scale:</span>
                        <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                            <div style={{
                                width: '20px',
                                height: '20px',
                                background: 'hsl(240, 80%, 50%)',
                                border: '1px solid white'
                            }} />
                            <span>Low (1-2)</span>

                            <div style={{
                                width: '20px',
                                height: '20px',
                                background: 'hsl(120, 80%, 50%)',
                                border: '1px solid white',
                                marginLeft: '10px'
                            }} />
                            <span>Medium (3)</span>

                            <div style={{
                                width: '20px',
                                height: '20px',
                                background: 'hsl(0, 80%, 50%)',
                                border: '1px solid white',
                                marginLeft: '10px'
                            }} />
                            <span>High (4-5)</span>
                        </div>
                    </div>
                )}
            </div>

            {/* extra info shown only in entropy mode */}
            {showEntropy && (
                <div style={{
                    padding: '15px',
                    background: 'rgba(66, 135, 245, 0.1)',
                    border: '1px solid rgba(66, 135, 245, 0.3)',
                    borderRadius: '5px',
                    fontSize: '13px',
                    color: '#ccc',
                    lineHeight: '1.6'
                }}>
                    <strong style={{ color: '#4caf50' }}>Understanding Entropy:</strong>
                    <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
                        <li>Blue = low entropy</li>
                        <li>Red = high entropy</li>
                        <li>Lower entropy collapses first</li>
                        <li>Hover to see details</li>
                    </ul>
                </div>
            )}

            {/* the drawing canvas */}
            <canvas
                ref={canvasRef}
                width={800}
                height={800}
                style={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    aspectRatio: '1/1',
                    cursor: 'crosshair'
                }}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
            />
        </div>
    );
};
