import React from 'react';
import { Cell } from '../core/wfc';

interface InfoPanelProps {
    status: string;
    totalCells: number;
    collapsedCount: number;
    averageEntropy: number;
    activeCell: Cell | null;
    stepCount?: number;
    propagationCount?: number;
    contradictionCount?: number;
    isComplete?: boolean;
    isFailed?: boolean;
}

export const InfoPanel: React.FC<InfoPanelProps> = ({
    status,
    totalCells,
    collapsedCount,
    averageEntropy,
    activeCell,
    stepCount = 0,
    propagationCount = 0,
    contradictionCount = 0,
    isComplete = false,
    isFailed = false
}) => {
    const progressPercent = (collapsedCount / totalCells) * 100;

    // picks color based on current run state
    const getStatusColor = () => {
        if (isFailed) return '#f44336';
        if (isComplete) return '#4caf50';
        if (collapsedCount > 0) return '#2196f3';
        return '#fff';
    };

    return (
        <div className="panel" style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            height: '100%',
            overflow: 'auto'
        }}>
            <h2 style={{ margin: 0 }}>Info</h2>

            {/* shows the main status text */}
            <div style={{
                padding: '15px',
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderRadius: '5px',
                border: `2px solid ${getStatusColor()}`,
                transition: 'border-color 0.3s'
            }}>
                <label style={{
                    fontSize: '12px',
                    color: '#999',
                    textTransform: 'uppercase',
                    fontWeight: 'bold'
                }}>
                    Status
                </label>
                <div style={{
                    color: getStatusColor(),
                    fontWeight: 'bold',
                    marginTop: '8px',
                    fontSize: '14px',
                    lineHeight: '1.4'
                }}>
                    {status}
                </div>

                {/* shows which cell is being processed */}
                {activeCell && !isComplete && !isFailed && (
                    <div style={{
                        fontSize: '12px',
                        color: '#64b5f6',
                        marginTop: '8px',
                        padding: '5px',
                        backgroundColor: 'rgba(100, 181, 246, 0.1)',
                        borderRadius: '3px'
                    }}>
                        Processing: ({activeCell.x}, {activeCell.y})
                    </div>
                )}
            </div>

            {/* shows progress bar and percentage */}
            <div style={{
                padding: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '5px'
            }}>
                <label style={{
                    fontSize: '12px',
                    color: '#999',
                    textTransform: 'uppercase',
                    fontWeight: 'bold'
                }}>
                    Progress
                </label>
                <div style={{
                    fontSize: '24px',
                    fontWeight: 'bold',
                    marginTop: '8px',
                    color: progressPercent === 100 ? '#4caf50' : '#fff'
                }}>
                    {collapsedCount} / {totalCells}
                </div>
                <div style={{
                    fontSize: '14px',
                    color: '#999',
                    marginTop: '4px'
                }}>
                    {progressPercent.toFixed(1)}% Complete
                </div>

                {/* progress bar visual */}
                <div style={{
                    width: '100%',
                    height: '8px',
                    background: '#333',
                    marginTop: '10px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    border: '1px solid #444'
                }}>
                    <div style={{
                        width: `${progressPercent}%`,
                        height: '100%',
                        background: progressPercent === 100
                            ? 'linear-gradient(90deg, #4caf50, #8bc34a)'
                            : 'linear-gradient(90deg, #2196f3, #64b5f6)',
                        transition: 'width 0.3s ease',
                        boxShadow: progressPercent > 0 ? '0 0 10px rgba(33, 150, 243, 0.5)' : 'none'
                    }} />
                </div>
            </div>

            {/* shows stats like entropy, steps, propagations */}
            <div style={{
                padding: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '5px'
            }}>
                <h3 style={{
                    margin: '0 0 15px 0',
                    fontSize: '14px',
                    color: '#ccc',
                    textTransform: 'uppercase'
                }}>
                    Statistics
                </h3>

                <div style={{ display: 'grid', gap: '12px' }}>
                    {/* step count */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        borderRadius: '3px'
                    }}>
                        <span style={{ fontSize: '13px', color: '#aaa' }}>
                            Steps:
                        </span>
                        <span style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#64b5f6'
                        }}>
                            {stepCount}
                        </span>
                    </div>

                    {/* average entropy */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        borderRadius: '3px'
                    }}>
                        <span style={{ fontSize: '13px', color: '#aaa' }}>
                            Avg Entropy:
                        </span>
                        <span style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: averageEntropy > 3 ? '#ff9800'
                                : averageEntropy > 1 ? '#ffeb3b'
                                    : '#4caf50'
                        }}>
                            {averageEntropy.toFixed(2)}
                        </span>
                    </div>

                    {/* propagation counter */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        borderRadius: '3px'
                    }}>
                        <span style={{ fontSize: '13px', color: '#aaa' }}>
                            Propagations:
                        </span>
                        <span style={{
                            fontSize: '16px',
                            fontWeight: 'bold',
                            color: '#9c27b0'
                        }}>
                            {propagationCount}
                        </span>
                    </div>

                    {/* contradiction count */}
                    {contradictionCount > 0 && (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '8px',
                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                            borderRadius: '3px',
                            border: '1px solid rgba(244, 67, 54, 0.3)'
                        }}>
                            <span style={{ fontSize: '13px', color: '#f44336' }}>
                                Contradictions:
                            </span>
                            <span style={{
                                fontSize: '16px',
                                fontWeight: 'bold',
                                color: '#f44336'
                            }}>
                                {contradictionCount}
                            </span>
                        </div>
                    )}
                </div>
            </div>

            {/* shows tile legend for the user */}
            <div style={{
                padding: '15px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                borderRadius: '5px'
            }}>
                <h3 style={{
                    margin: '0 0 12px 0',
                    fontSize: '14px',
                    color: '#ccc',
                    textTransform: 'uppercase'
                }}>
                    Legend
                </h3>

                <div style={{ display: 'grid', gap: '10px', fontSize: '13px' }}>
                    {/* floor tile */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '6px',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        borderRadius: '3px'
                    }}>
                        <div style={{
                            width: 16,
                            height: 16,
                            background: 'var(--tile-floor, #e0d0b0)',
                            borderRadius: '2px',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}></div>
                        <span style={{ color: '#ddd' }}>Floor</span>
                    </div>

                    {/* wall tile */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '6px',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        borderRadius: '3px'
                    }}>
                        <div style={{
                            width: 16,
                            height: 16,
                            background: 'var(--tile-wall, #2d2d2d)',
                            borderRadius: '2px',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}></div>
                        <span style={{ color: '#ddd' }}>Wall</span>
                    </div>

                    {/* corridor tile */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '6px',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        borderRadius: '3px'
                    }}>
                        <div style={{
                            width: 16,
                            height: 16,
                            background: 'var(--tile-corridor, #808080)',
                            borderRadius: '2px',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}></div>
                        <span style={{ color: '#ddd' }}>Corridor</span>
                    </div>

                    {/* start tile */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '6px',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        borderRadius: '3px',
                        border: '1px solid rgba(76, 175, 80, 0.3)'
                    }}>
                        <div style={{
                            width: 16,
                            height: 16,
                            background: 'var(--tile-start, #4caf50)',
                            borderRadius: '2px',
                            border: '1px solid rgba(255,255,255,0.3)'
                        }}></div>
                        <span style={{ color: '#4caf50', fontWeight: 'bold' }}>Start</span>
                    </div>

                    {/* end tile */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '6px',
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        borderRadius: '3px',
                        border: '1px solid rgba(244, 67, 54, 0.3)'
                    }}>
                        <div style={{
                            width: 16,
                            height: 16,
                            background: 'var(--tile-end, #f44336)',
                            borderRadius: '2px',
                            border: '1px solid rgba(255,255,255,0.3)'
                        }}></div>
                        <span style={{ color: '#f44336', fontWeight: 'bold' }}>End</span>
                    </div>
                </div>
            </div>

            {/* quick explanation for students */}
            {!isComplete && !isFailed && collapsedCount > 0 && (
                <div style={{
                    padding: '12px',
                    backgroundColor: 'rgba(66, 135, 245, 0.1)',
                    border: '1px solid rgba(66, 135, 245, 0.3)',
                    borderRadius: '5px',
                    fontSize: '12px',
                    color: '#aaa',
                    lineHeight: '1.6'
                }}>
                    <strong style={{ color: '#64b5f6' }}>What's Happening:</strong>
                    <ul style={{ margin: '5px 0 0 0', paddingLeft: '20px' }}>
                        <li>WFC picks lowest entropy cell</li>
                        <li>Collapses it to a tile</li>
                        <li>Updates neighbors afterward</li>
                    </ul>
                </div>
            )}

            {/* success display */}
            {isComplete && (
                <div style={{
                    padding: '15px',
                    backgroundColor: 'rgba(76, 175, 80, 0.1)',
                    border: '2px solid rgba(76, 175, 80, 0.5)',
                    borderRadius: '5px',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}></div>
                    <div style={{ fontSize: '14px', color: '#4caf50', fontWeight: 'bold' }}>
                        Generation Complete!
                    </div>
                    <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>
                        Use export buttons to save
                    </div>
                </div>
            )}

            {/* failure display */}
            {isFailed && (
                <div style={{
                    padding: '15px',
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                    border: '2px solid rgba(244, 67, 54, 0.5)',
                    borderRadius: '5px',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '32px', marginBottom: '8px' }}></div>
                    <div style={{ fontSize: '14px', color: '#f44336', fontWeight: 'bold' }}>
                        Contradiction Detected
                    </div>
                    <div style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>
                        No valid tiles for a cell. Click Reset to try again.
                    </div>
                </div>
            )}
        </div>
    );
};
