import React from 'react';

// simple 3-column layout for the app
export const Layout: React.FC<{
    left: React.ReactNode;
    center: React.ReactNode;
    right: React.ReactNode;
}> = ({ left, center, right }) => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '30% 50% 20%',
            height: '100vh',
            width: '100vw'
        }}>
            {/* left panel (controls / info) */}
            <div style={{ height: '100%', overflow: 'hidden' }}>{left}</div>
            {/* middle panel (main canvas) */}
            <div style={{ height: '100%', overflow: 'hidden' }}>{center}</div>
            {/* right panel (extra info) */}
            <div style={{ height: '100%', overflow: 'hidden' }}>{right}</div>
        </div>
    );
};
