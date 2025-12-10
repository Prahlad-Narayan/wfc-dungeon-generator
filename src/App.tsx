import React, { useState, useEffect, useRef } from 'react';
import { Layout } from './components/Layout.tsx';
import { ControlPanel } from './components/ControlPanel.tsx';
import { InfoPanel } from './components/InfoPanel.tsx';
import { GridCanvas } from './components/GridCanvas.tsx';
import { WFC } from './core/wfc.ts';
import { Starter } from './starter/Starter.tsx';
import { LandingOverlay } from './components/LandingOverlay.tsx';

const App: React.FC = () => {
  // switch between full app and starter view
  const [mode, setMode] = useState<'APP' | 'STARTER'>('APP');

  // main UI state
  const [gridSize, setGridSize] = useState(20);
  const [speed, setSpeed] = useState(100); // delay in ms
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [status, setStatus] = useState('Ready');
  const [showLanding, setShowLanding] = useState(true);

  // keep a single WFC instance around
  const wfcRef = useRef<WFC>(new WFC(gridSize, gridSize));

  // recreate WFC when grid size changes
  useEffect(() => {
    if (isRunning) return; // don't reset in the middle of a run
    const wfc = new WFC(gridSize, gridSize);
    wfc.initializeSpecialCells();
    wfcRef.current = wfc;
    setGeneration(g => g + 1);
    setStatus('Ready - Click Generate or Step to begin');
  }, [gridSize]); // only depends on grid size

  // auto-step loop when running
  useEffect(() => {
    if (!isRunning) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const loop = () => {
      const wfc = wfcRef.current;

      const success = wfc.step();

      setGeneration(g => g + 1); // force canvas re-render

      if (!success) {
        setIsRunning(false);
        if (wfc.failed) {
          setStatus(`Failed - Contradiction detected after ${wfc.stepCount} steps`);
        } else {
          setStatus(`Complete! Generated in ${wfc.stepCount} steps`);
        }
        return;
      }

      // show short message about the last step
      if (wfc.lastCollapsed) {
        setStatus(
          `Step ${wfc.stepCount}: Cell (${wfc.lastCollapsed.x}, ${wfc.lastCollapsed.y}) ` +
          `Entropy: ${wfc.lastCollapsed.entropy} → Collapsed to ${wfc.lastCollapsed.finalType || 'tile'}`
        );
      } else {
        setStatus(`Finding lowest entropy cell...`);
      }

      // schedule next step
      timeoutId = setTimeout(loop, speed);
    };

    loop();

    return () => clearTimeout(timeoutId);
  }, [isRunning, speed]);

  // button handlers
  const handleGenerate = () => {
    if (isRunning) return;

    // if done/failed, ask user to reset first
    if (wfcRef.current.complete || wfcRef.current.failed) {
      setStatus('Already complete. Click Reset to generate a new dungeon.');
      return;
    }

    setIsRunning(true);
    setStatus('Starting generation...');
  };

  const handleStep = () => {
    if (isRunning) return;
    const wfc = wfcRef.current;

    if (wfc.complete || wfc.failed) {
      setStatus('Generation already complete. Click Reset to start over.');
      return;
    }

    const success = wfc.step();
    setGeneration(g => g + 1);

    if (!success) {
      if (wfc.failed) {
        setStatus(`Failed - Contradiction at step ${wfc.stepCount}`);
      } else {
        setStatus(`Complete! Generated in ${wfc.stepCount} steps`);
      }
    } else {
      // simple per-step debug message
      if (wfc.lastCollapsed) {
        const cell = wfc.lastCollapsed;
        setStatus(
          `Step ${wfc.stepCount}: Cell (${cell.x}, ${cell.y}) | ` +
          `Entropy: ${cell.entropy} → ${cell.finalType} | ` +
          `Propagating to neighbors...`
        );
      } else {
        setStatus(`Step ${wfc.stepCount}: Searching for lowest entropy cell...`);
      }
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    const wfc = new WFC(gridSize, gridSize);
    wfc.initializeSpecialCells();
    wfcRef.current = wfc;
    setGeneration(g => g + 1);
    setStatus('Reset complete - Ready to generate');
  };

  const handleCloseLanding = () => {
    setShowLanding(false);
    localStorage.setItem('wfc-tutorial-seen', 'true');
  };

  // compute stats for the right panel
  const getStats = () => {
    const wfc = wfcRef.current;
    let collapsed = 0;
    let totalEntropy = 0;
    let count = 0;

    // O(N²) scan is fine for small grids
    for (let x = 0; x < wfc.width; x++) {
      for (let y = 0; y < wfc.height; y++) {
        const cell = wfc.grid[x][y];
        if (cell.collapsed) {
          collapsed++;
        } else {
          totalEntropy += cell.entropy;
          count++;
        }
      }
    }

    const avgEntropy = count === 0 ? 0 : totalEntropy / count;

    return {
      collapsed,
      total: wfc.width * wfc.height,
      avgEntropy: avgEntropy.toFixed(2),
      stepCount: wfc.stepCount,
      propagationCount: wfc.propagationCount,
      contradictionCount: wfc.contradictionCount
    };
  };

  const stats = getStats();

  // show the teaching template instead of full app
  if (mode === 'STARTER') {
    return (
      <div>
        <div style={{
          position: 'fixed',
          top: 10,
          right: 10,
          zIndex: 999
        }}>
          <button
            onClick={() => setMode('APP')}
            style={{
              background: '#4caf50',
              color: 'white',
              padding: '10px 20px',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
            }}
          >
            ← View Finished App
          </button>
        </div>
        <Starter />
      </div>
    );
  }

  return (
    <>
      {/* button to switch to starter view */}
      <div style={{
        position: 'fixed',
        top: 10,
        right: 10,
        zIndex: 999
      }}>
        <button
          onClick={() => setMode('STARTER')}
          style={{
            fontSize: '12px',
            padding: '8px 16px',
            background: 'rgba(255, 255, 255, 0.1)',
            color: '#ccc',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.color = '#fff';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            e.currentTarget.style.color = '#ccc';
          }}
        >
          Switch to Starter Template →
        </button>
      </div>
      {showLanding && <LandingOverlay onClose={handleCloseLanding} />}
      <Layout
        left={
          <ControlPanel
            onGenerate={handleGenerate}
            onStep={handleStep}
            onReset={handleReset}
            speed={speed}
            setSpeed={setSpeed}
            gridSize={gridSize}
            setGridSize={setGridSize}
            isRunning={isRunning}
            wfc={wfcRef.current}
          />
        }
        center={
          <GridCanvas
            wfc={wfcRef.current}
            generation={generation}
            activeCell={wfcRef.current.lastCollapsed}
          />
        }
        right={
          <InfoPanel
            status={status}
            totalCells={stats.total}
            collapsedCount={stats.collapsed}
            averageEntropy={parseFloat(stats.avgEntropy)}
            activeCell={wfcRef.current.lastCollapsed}
            stepCount={stats.stepCount}
            propagationCount={stats.propagationCount}
            contradictionCount={stats.contradictionCount}
            isComplete={wfcRef.current.complete}
            isFailed={wfcRef.current.failed}
          />
        }
      />
    </>
  );
};

export default App;
