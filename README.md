# Wave Function Collapse Dungeon Generator

An interactive web-based educational tool for learning and exploring Wave Function Collapse (WFC) procedural generation in game development.

![WFC Dungeon Generator](https://via.placeholder.com/800x400/1a1a2e/4caf50?text=WFC+Dungeon+Generator)

##  Live Demo

**[Try it here](https://yourusername.github.io/wfc-dungeon-generator)** *(Deploy to GitHub Pages and update this link)*

##  What is Wave Function Collapse?

Wave Function Collapse is a constraint-based procedural generation algorithm that creates coherent patterns from local rules. Inspired by quantum mechanics, WFC generates content that is both random and structured—perfect for creating infinite unique game levels while maintaining quality and playability.

### Games Using WFC
- **Bad North** - Island terrain generation
- **Townscaper** - Building placement and city generation
- **Caves of Qud** - Procedural world creation

##  Features

### Core Functionality
-  **Real-time WFC Generation** - Watch dungeons generate with adjustable speed
-  **Entropy Visualization** - See the algorithm's decision-making process
-  **Step-by-Step Mode** - Advance one tile at a time for deep understanding
-  **Live Statistics** - Track steps, propagations, and entropy in real-time
-  **Export Options** - Save as JSON, PNG, or ASCII text

### Educational Features
-  **Interactive Entropy Heatmap** - Blue (low entropy) to red (high entropy) visualization
-  **Algorithm Transparency** - See exactly which cells collapse and why
-  **Built-in Tutorial** - Comprehensive learning materials included
-  **Practice Exercises** - Beginner to expert level challenges
-  **Starter Template** - Implement the algorithm yourself

##  Quick Start

### Run Locally

```bash
# Clone the repository
git clone https://github.com/yourusername/wfc-dungeon-generator.git
cd wfc-dungeon-generator

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

### Try the Starter Template

Want to implement WFC yourself? Use the starter template with guided TODOs:

```typescript
// src/starter/Starter.tsx
function calculateEntropy(cell: Cell): number {
    // TODO: Your implementation here
    // HINT: Entropy = number of possible tile options
}
```

##  Learning Objectives

By using this tool, you will:

1. **Understand** constraint satisfaction and entropy in procedural generation
2. **Implement** the complete WFC algorithm (observe, collapse, propagate)
3. **Design** effective adjacency rules for different generation styles
4. **Debug** common issues like contradictions and infinite loops
5. **Apply** WFC to your own game development projects

## Documentation

### Tutorial Document
Comprehensive 12-page tutorial covering:
- Theoretical foundations (entropy, constraint propagation)
- Algorithm walkthrough with step-by-step examples
- Implementation guide with code samples
- Practice exercises with solutions

 **[Download Tutorial PDF](docs/WFC_Tutorial_Complete.pdf)**

### Pedagogical Report
Academic analysis of the teaching approach:
- Teaching philosophy and target audience
- Concept deep dive (mathematical foundations)
- Implementation analysis (architecture, performance)
- Assessment strategy and learning challenges

 **[Download Pedagogical Report](docs/Pedagogical_Report.pdf)**

##  Technology Stack

- **TypeScript** - Type-safe implementation
- **React** - Component-based UI
- **Vite** - Fast build tool and dev server
- **HTML5 Canvas** - Efficient grid rendering
- **CSS3** - Modern styling with animations

##  Project Structure

```
wfc-dungeon-generator/
├── src/
│   ├── core/
│   │   ├── wfc.ts           # WFC algorithm implementation
│   │   └── constants.ts     # Tile types and adjacency rules
│   ├── components/
│   │   ├── GridCanvas.tsx   # Grid visualization
│   │   ├── ControlPanel.tsx # User controls
│   │   └── InfoPanel.tsx    # Statistics display
│   ├── starter/
│   │   └── Starter.tsx      # Student template with TODOs
│   └── App.tsx              # Main application
├── docs/
│   ├── tutorial.pdf         # Complete tutorial
│   └── pedagogical-report.pdf
├── examples/
│   ├── screenshots/         # Tool screenshots
│   └── sample-dungeons/     # Example exports
└── README.md
```

##  Usage Examples

### Basic Generation
```typescript
// Create WFC instance
const wfc = new WFC(20, 20);

// Place start/end tiles
wfc.initializeSpecialCells();

// Generate dungeon
while (wfc.step()) {
    // Process each step
}

// Export result
const dungeonData = wfc.exportJSON();
```

### Custom Adjacency Rules
```typescript
// Create maze-like dungeons
export const ADJACENCY = {
    WALL: ['WALL', 'CORRIDOR'],     // Dense walls
    FLOOR: ['FLOOR', 'CORRIDOR'],   // Open spaces
    CORRIDOR: ['WALL', 'FLOOR']     // Narrow paths
};
```

### Modify Tile Weights
```typescript
// More open dungeons
FLOOR: { weight: 70 },    // Very common
WALL: { weight: 20 },     // Less common
CORRIDOR: { weight: 10 }  // Rare connections
```

##  Practice Exercises

### Beginner: Modify Weights
Change FLOOR weight from 45 to 70. Observe how dungeon density changes.

### Intermediate: Add New Tile Type
Create a TREASURE tile that only appears next to FLOOR tiles.

### Advanced: Maze Generation
Modify adjacency rules to create maze-like dungeons with narrow passages.

### Expert: Implement Backtracking
Handle contradictions by saving/restoring state instead of failing.

**[View Complete Exercises](docs/exercises.md)**

## Performance

| Grid Size | Generation Time | Typical Steps |
|-----------|----------------|---------------|
| 10×10     | ~50ms          | 100           |
| 20×20     | ~200ms         | 400           |
| 30×30     | ~500ms         | 900           |

*Tested on Chrome 120, MacBook Pro M1*

##  Contributing

This is an educational project created for academic purposes. However, suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

##  Academic Context

This project was created as the final assignment for:
- **Course**: CSYE 7105 - High-Performance Parallel Machine Learning and AI
- **Institution**: Northeastern University
- **Semester**: Fall 2024
- **Focus**: Teaching AI techniques through interactive implementation

##  Citation

If you use this tool in academic work, please cite:

```bibtex
@software{wfc_dungeon_generator_2024,
  author = {Prahlad Narayan},
  title = {Wave Function Collapse Dungeon Generator: An Interactive Educational Tool},
  year = {2024},
  publisher = {GitHub},
  url = {https://github.com/yourusername/wfc-dungeon-generator}
}
```

##  Further Reading

### Papers
- Gumin, M. (2016). *Wave Function Collapse Algorithm*
- Shannon, C.E. (1948). *A Mathematical Theory of Communication*

### Books
- Shaker, N., Togelius, J., & Nelson, M.J. (2016). *Procedural Content Generation in Games*

### Talks
- Oskar Stålberg - *WFC in Bad North* (GDC 2019)
- Oskar Stålberg - *Townscaper and Constraint-Based Generation* (GDC 2021)

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

##  Acknowledgments

- **Maxim Gumin** - Original WFC algorithm creator
- **Oskar Stålberg** - WFC applications in Bad North and Townscaper
- **Northeastern University** - Academic support and resources
- **Open Source Community** - React, TypeScript, and Vite tools

##  Contact

**Prahlad Narayan**
- GitHub: https://github.com/Prahlad-Narayan


---

**⭐ Star this repository if you found it helpful for learning WFC!**

Made with ❤️ for game developers and computer science students.