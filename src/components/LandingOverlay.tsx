import React, { useState } from 'react';

interface LandingOverlayProps {
    onClose: () => void;
}

export const LandingOverlay: React.FC<LandingOverlayProps> = ({ onClose }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        // first slide: basic intro
        {
            title: "Wave Function Collapse Dungeon Generator",
            content: (
                <div>
                    <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '20px' }}>
                        Welcome! This interactive tool teaches you <strong>Wave Function Collapse</strong>,
                        a powerful algorithm used in modern games for procedural content generation.
                    </p>
                    <div style={{
                        padding: '20px',
                        backgroundColor: 'rgba(66, 135, 245, 0.1)',
                        borderRadius: '8px',
                        marginBottom: '20px'
                    }}>
                        <h3 style={{ color: '#4caf50', marginTop: 0 }}>Used In:</h3>
                        <ul style={{ fontSize: '16px', lineHeight: '2' }}>
                            <li> <strong>Bad North</strong> - Island generation</li>
                            <li> <strong>Townscaper</strong> - Building placement</li>
                            <li> <strong>Caves of Qud</strong> - World generation</li>
                        </ul>
                    </div>
                    <p style={{ fontSize: '16px', fontStyle: 'italic', color: '#aaa' }}>
                        Click "Next" to learn how it works
                    </p>
                </div>
            )
        },

        // second slide: explain steps
        {
            title: "How Wave Function Collapse Works",
            content: (
                <div>
                    <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '25px' }}>
                        WFC generates dungeons through three simple steps, repeated until complete:
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{
                            padding: '20px',
                            backgroundColor: 'rgba(33, 150, 243, 0.1)',
                            borderLeft: '4px solid #2196f3',
                            borderRadius: '4px'
                        }}>
                            <h3 style={{ color: '#2196f3', margin: '0 0 10px 0' }}>
                                1. OBSERVE
                            </h3>
                            <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6' }}>
                                Find the cell with <strong>lowest entropy</strong> (fewest possible tiles).
                                This is the most constrained cell - like finding the easiest move in Sudoku.
                            </p>
                        </div>

                        <div style={{
                            padding: '20px',
                            backgroundColor: 'rgba(156, 39, 176, 0.1)',
                            borderLeft: '4px solid #9c27b0',
                            borderRadius: '4px'
                        }}>
                            <h3 style={{ color: '#9c27b0', margin: '0 0 10px 0' }}>
                                2. COLLAPSE
                            </h3>
                            <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6' }}>
                                Choose one specific tile type for that cell (FLOOR, WALL, or CORRIDOR).
                                Uses weighted random selection for better-looking dungeons.
                            </p>
                        </div>

                        <div style={{
                            padding: '20px',
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            borderLeft: '4px solid #4caf50',
                            borderRadius: '4px'
                        }}>
                            <h3 style={{ color: '#4caf50', margin: '0 0 10px 0' }}>
                                3. PROPAGATE
                            </h3>
                            <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6' }}>
                                Update all neighboring cells based on <strong>adjacency rules</strong>.
                                Remove incompatible options - this creates the "wave" of constraints!
                            </p>
                        </div>
                    </div>

                    <div style={{
                        marginTop: '25px',
                        padding: '15px',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 193, 7, 0.3)'
                    }}>
                        <p style={{ margin: 0, fontSize: '14px', color: '#ffc107' }}>
                            <strong>Key Insight:</strong> Local rules (which tiles can touch) create
                            global coherent patterns. That's the magic of WFC!
                        </p>
                    </div>
                </div>
            )
        },

        // third slide: entropy concept
        {
            title: "Understanding Entropy",
            content: (
                <div>
                    <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '20px' }}>
                        <strong>Entropy</strong> measures uncertainty - how many options a cell has left.
                    </p>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr 1fr',
                        gap: '15px',
                        marginBottom: '25px'
                    }}>
                        <div style={{
                            padding: '20px',
                            backgroundColor: '#1a237e',
                            borderRadius: '8px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '32px', marginBottom: '10px' }}></div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f44336' }}>5</div>
                            <div style={{ fontSize: '14px', color: '#aaa', marginTop: '5px' }}>High Entropy</div>
                            <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                                Many options<br />Uncertain
                            </div>
                        </div>

                        <div style={{
                            padding: '20px',
                            backgroundColor: '#1a237e',
                            borderRadius: '8px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '32px', marginBottom: '10px' }}></div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ffeb3b' }}>3</div>
                            <div style={{ fontSize: '14px', color: '#aaa', marginTop: '5px' }}>Medium Entropy</div>
                            <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                                Some options<br />Deciding
                            </div>
                        </div>

                        <div style={{
                            padding: '20px',
                            backgroundColor: '#1a237e',
                            borderRadius: '8px',
                            textAlign: 'center'
                        }}>
                            <div style={{ fontSize: '32px', marginBottom: '10px' }}></div>
                            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2196f3' }}>1</div>
                            <div style={{ fontSize: '14px', color: '#aaa', marginTop: '5px' }}>Low Entropy</div>
                            <div style={{ fontSize: '12px', color: '#666', marginTop: '8px' }}>
                                One option<br />Constrained
                            </div>
                        </div>
                    </div>

                    <div style={{
                        padding: '20px',
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        borderRadius: '8px',
                        border: '1px solid rgba(33, 150, 243, 0.3)'
                    }}>
                        <h3 style={{ color: '#2196f3', marginTop: 0 }}>Why Collapse Lowest Entropy First?</h3>
                        <p style={{ fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                            Cells with fewer options are more constrained. By collapsing them first,
                            we make decisions where we have fewer valid choices, reducing the chance of
                            contradictions later. It's like solving Sudoku - fill in the cells where you're
                            most certain first!
                        </p>
                    </div>
                </div>
            )
        },

        // fourth slide: feature overview
        {
            title: "Interactive Features",
            content: (
                <div>
                    <p style={{ fontSize: '16px', lineHeight: '1.8', marginBottom: '25px' }}>
                        This tool has powerful features to help you learn WFC:
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{
                            padding: '18px',
                            backgroundColor: 'rgba(33, 150, 243, 0.1)',
                            borderRadius: '8px',
                            display: 'flex',
                            gap: '15px',
                            alignItems: 'flex-start'
                        }}>
                            <div style={{ fontSize: '32px', minWidth: '40px' }}></div>
                            <div>
                                <h3 style={{ color: '#2196f3', margin: '0 0 8px 0', fontSize: '18px' }}>
                                    Generate Auto
                                </h3>
                                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                                    Watch dungeons generate automatically. Adjust speed with the slider to
                                    see the algorithm in action - from instant to slow-motion.
                                </p>
                            </div>
                        </div>

                        <div style={{
                            padding: '18px',
                            backgroundColor: 'rgba(156, 39, 176, 0.1)',
                            borderRadius: '8px',
                            display: 'flex',
                            gap: '15px',
                            alignItems: 'flex-start'
                        }}>
                            <div style={{ fontSize: '32px', minWidth: '40px' }}></div>
                            <div>
                                <h3 style={{ color: '#9c27b0', margin: '0 0 8px 0', fontSize: '18px' }}>
                                    Step-by-Step Mode
                                </h3>
                                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                                    Advance one tile at a time. Perfect for understanding exactly how
                                    the algorithm makes decisions. See which cell collapses and why!
                                </p>
                            </div>
                        </div>

                        <div style={{
                            padding: '18px',
                            backgroundColor: 'rgba(255, 152, 0, 0.1)',
                            borderRadius: '8px',
                            display: 'flex',
                            gap: '15px',
                            alignItems: 'flex-start'
                        }}>
                            <div style={{ fontSize: '32px', minWidth: '40px' }}></div>
                            <div>
                                <h3 style={{ color: '#ff9800', margin: '0 0 8px 0', fontSize: '18px' }}>
                                    Entropy Visualization
                                </h3>
                                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                                    Click "Show Entropy" to see uncertainty as a heatmap. Blue = low
                                    (about to collapse), Red = high (many options). Watch entropy decrease!
                                </p>
                            </div>
                        </div>

                        <div style={{
                            padding: '18px',
                            backgroundColor: 'rgba(76, 175, 80, 0.1)',
                            borderRadius: '8px',
                            display: 'flex',
                            gap: '15px',
                            alignItems: 'flex-start'
                        }}>
                            <div style={{ fontSize: '32px', minWidth: '40px' }}></div>
                            <div>
                                <h3 style={{ color: '#4caf50', margin: '0 0 8px 0', fontSize: '18px' }}>
                                    Export Options
                                </h3>
                                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                                    Save dungeons as JSON (data), PNG (image), or ASCII (text).
                                    Perfect for sharing, analyzing, or using in your own projects!
                                </p>
                            </div>
                        </div>

                        <div style={{
                            padding: '18px',
                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                            borderRadius: '8px',
                            display: 'flex',
                            gap: '15px',
                            alignItems: 'flex-start'
                        }}>
                            <div style={{ fontSize: '32px', minWidth: '40px' }}></div>
                            <div>
                                <h3 style={{ color: '#f44336', margin: '0 0 8px 0', fontSize: '18px' }}>
                                    Live Statistics
                                </h3>
                                <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.6' }}>
                                    Track steps, propagations, and average entropy in real-time.
                                    Understand the algorithm's efficiency and behavior.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        },

        // fifth slide: how to begin
        {
            title: "Ready to Start!",
            content: (
                <div>
                    <p style={{ fontSize: '18px', lineHeight: '1.8', marginBottom: '30px' }}>
                        Here's how to get the most out of this tool:
                    </p>

                    <div style={{
                        padding: '25px',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        borderRadius: '8px',
                        marginBottom: '25px'
                    }}>
                        <h3 style={{ color: '#4caf50', marginTop: 0 }}> Learning Path:</h3>
                        <ol style={{ fontSize: '16px', lineHeight: '2', paddingLeft: '20px' }}>
                            <li>Click <strong>"Generate Auto"</strong> to see it work</li>
                            <li>Try <strong>"Step Mode"</strong> to understand each decision</li>
                            <li>Enable <strong>"Show Entropy"</strong> to visualize the algorithm</li>
                            <li>Experiment with different <strong>grid sizes</strong></li>
                            <li>Switch to <strong>"Starter Template"</strong> to implement it yourself!</li>
                        </ol>
                    </div>

                    <div style={{
                        padding: '20px',
                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                        borderRadius: '8px',
                        marginBottom: '25px'
                    }}>
                        <h3 style={{ color: '#2196f3', marginTop: 0 }}> Pro Tips:</h3>
                        <ul style={{ fontSize: '15px', lineHeight: '1.8', paddingLeft: '20px', margin: 0 }}>
                            <li>Use <strong>slow speed</strong> with entropy ON for best learning</li>
                            <li>Watch the status panel - it explains each step</li>
                            <li>Generate 5-10 dungeons to see pattern variety</li>
                            <li>Compare different grid sizes (10×10 vs 30×30)</li>
                        </ul>
                    </div>

                    <div style={{
                        padding: '20px',
                        backgroundColor: 'rgba(255, 193, 7, 0.1)',
                        borderRadius: '8px',
                        border: '2px solid rgba(255, 193, 7, 0.5)',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ color: '#ffc107', marginTop: 0, fontSize: '20px' }}>
                            Ready to Generate Your First Dungeon?
                        </h3>
                        <p style={{ fontSize: '15px', margin: '10px 0 0 0', color: '#ccc' }}>
                            Click "Start Exploring" to begin!
                        </p>
                    </div>
                </div>
            )
        }
    ];

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(currentSlide + 1);
        } else {
            onClose();
        }
    };

    const handlePrevious = () => {
        if (currentSlide > 0) {
            setCurrentSlide(currentSlide - 1);
        }
    };

    const handleSkip = () => {
        onClose();
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10000,
            padding: '20px',
            backdropFilter: 'blur(5px)'
        }}>
            <div style={{
                backgroundColor: '#1a1a2e',
                borderRadius: '12px',
                maxWidth: '800px',
                width: '100%',
                maxHeight: '90vh',
                overflow: 'auto',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
                {/* header bar and progress dots */}
                <div style={{
                    padding: '30px 40px 20px 40px',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                    <h1 style={{
                        margin: 0,
                        fontSize: '28px',
                        color: '#fff',
                        fontWeight: 'bold'
                    }}>
                        {slides[currentSlide].title}
                    </h1>
                    <div style={{
                        marginTop: '15px',
                        display: 'flex',
                        gap: '8px'
                    }}>
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                style={{
                                    flex: 1,
                                    height: '4px',
                                    backgroundColor: index <= currentSlide ? '#4caf50' : 'rgba(255, 255, 255, 0.2)',
                                    borderRadius: '2px',
                                    transition: 'background-color 0.3s'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* main slide content */}
                <div style={{
                    padding: '40px',
                    minHeight: '400px',
                    color: '#ddd'
                }}>
                    {slides[currentSlide].content}
                </div>

                {/* bottom navigation buttons */}
                <div style={{
                    padding: '20px 40px 30px 40px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <button
                        onClick={handleSkip}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: 'transparent',
                            border: '1px solid rgba(255, 255, 255, 0.3)',
                            color: '#aaa',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '14px',
                            transition: 'all 0.3s'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                            e.currentTarget.style.color = '#fff';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#aaa';
                        }}
                    >
                        Skip Tutorial
                    </button>

                    <div style={{ display: 'flex', gap: '10px' }}>
                        {currentSlide > 0 && (
                            <button
                                onClick={handlePrevious}
                                style={{
                                    padding: '12px 30px',
                                    backgroundColor: '#2d2d2d',
                                    border: 'none',
                                    color: '#fff',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '15px',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.backgroundColor = '#3d3d3d';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.backgroundColor = '#2d2d2d';
                                }}
                            >
                                ← Previous
                            </button>
                        )}

                        <button
                            onClick={handleNext}
                            style={{
                                padding: '12px 30px',
                                backgroundColor: currentSlide === slides.length - 1 ? '#4caf50' : '#2196f3',
                                border: 'none',
                                color: '#fff',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '15px',
                                fontWeight: 'bold',
                                transition: 'all 0.3s'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = currentSlide === slides.length - 1 ? '#66bb6a' : '#42a5f5';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = currentSlide === slides.length - 1 ? '#4caf50' : '#2196f3';
                            }}
                        >
                            {currentSlide === slides.length - 1 ? 'Start Exploring' : 'Next'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
