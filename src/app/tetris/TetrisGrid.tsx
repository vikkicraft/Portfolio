import { useEffect, useRef, useCallback } from 'react';

const GRID_SIZE = 20;
const FALL_SPEED = 1 / 0.3; // rows per second (equivalent to 1 row every 300ms)
const LOCK_DELAY = 0.5; // seconds the player can still slide after landing

const TETROMINOS = [
  { shape: [[1, 1, 1, 1]] },
  { shape: [[1, 1], [1, 1]] },
  { shape: [[0, 1, 0], [1, 1, 1]] },
  { shape: [[0, 1, 1], [1, 1, 0]] },
  { shape: [[1, 1, 0], [0, 1, 1]] },
  { shape: [[1, 0, 0], [1, 1, 1]] },
  { shape: [[0, 0, 1], [1, 1, 1]] },
];

interface FallingBlock {
  col: number;
  row: number; // fractional for smooth vertical motion
  shape: number[][];
  lockTimer?: number; // countdown before block is permanently placed
  landed?: boolean; // true when block has touched down but not yet locked
}

interface PlacedCell {
  col: number;
  row: number;
}

function rotateShape(shape: number[][]): number[][] {
  const rows = shape.length;
  const cols = shape[0].length;
  const rotated: number[][] = [];
  for (let c = 0; c < cols; c++) {
    const newRow: number[] = [];
    for (let r = rows - 1; r >= 0; r--) {
      newRow.push(shape[r][c]);
    }
    rotated.push(newRow);
  }
  return rotated;
}

/** Draw a single 3D beveled cell */
function draw3DCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  isDark: boolean
) {
  const bevel = Math.max(2, size * 0.15); // bevel thickness
  const inset = 1; // tiny gap inside

  // Base fill
  ctx.fillStyle = isDark ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.07)';
  ctx.fillRect(x, y, size, size);

  // Top bevel (highlight)
  ctx.fillStyle = isDark ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.5)';
  ctx.beginPath();
  ctx.moveTo(x + inset, y + inset);
  ctx.lineTo(x + size - inset, y + inset);
  ctx.lineTo(x + size - bevel, y + bevel);
  ctx.lineTo(x + bevel, y + bevel);
  ctx.closePath();
  ctx.fill();

  // Left bevel (highlight)
  ctx.fillStyle = isDark ? 'rgba(255,255,255,0.13)' : 'rgba(255,255,255,0.35)';
  ctx.beginPath();
  ctx.moveTo(x + inset, y + inset);
  ctx.lineTo(x + bevel, y + bevel);
  ctx.lineTo(x + bevel, y + size - bevel);
  ctx.lineTo(x + inset, y + size - inset);
  ctx.closePath();
  ctx.fill();

  // Bottom bevel (shadow)
  ctx.fillStyle = isDark ? 'rgba(0,0,0,0.25)' : 'rgba(0,0,0,0.12)';
  ctx.beginPath();
  ctx.moveTo(x + inset, y + size - inset);
  ctx.lineTo(x + bevel, y + size - bevel);
  ctx.lineTo(x + size - bevel, y + size - bevel);
  ctx.lineTo(x + size - inset, y + size - inset);
  ctx.closePath();
  ctx.fill();

  // Right bevel (shadow)
  ctx.fillStyle = isDark ? 'rgba(0,0,0,0.20)' : 'rgba(0,0,0,0.08)';
  ctx.beginPath();
  ctx.moveTo(x + size - inset, y + inset);
  ctx.lineTo(x + size - inset, y + size - inset);
  ctx.lineTo(x + size - bevel, y + size - bevel);
  ctx.lineTo(x + size - bevel, y + bevel);
  ctx.closePath();
  ctx.fill();

  // Inner face (slightly brighter center)
  ctx.fillStyle = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.03)';
  ctx.fillRect(x + bevel, y + bevel, size - bevel * 2, size - bevel * 2);

  // Outer border
  ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.20)' : 'rgba(0,0,0,0.12)';
  ctx.lineWidth = 0.5;
  ctx.strokeRect(x + 0.25, y + 0.25, size - 0.5, size - 0.5);
}

function drawShapeOutline(
  ctx: CanvasRenderingContext2D,
  shape: number[][],
  ox: number,
  oy: number,
  size: number,
  _fillColor: string,
  _strokeColor: string,
  isDark: boolean,
  yOffset: number = 0
) {
  const sRows = shape.length;
  const sCols = shape[0].length;

  for (let r = 0; r < sRows; r++) {
    for (let c = 0; c < sCols; c++) {
      if (shape[r][c]) {
        draw3DCell(ctx, ox + c * size, oy + r * size + yOffset, size, isDark);
      }
    }
  }
}

function drawPlacedCells(
  ctx: CanvasRenderingContext2D,
  placed: PlacedCell[],
  maxCols: number,
  maxRows: number,
  size: number,
  _fillColor: string,
  _strokeColor: string,
  isDark: boolean,
  yOffset: number = 0
) {
  placed.forEach((cell) => {
    if (cell.row < maxRows && cell.col < maxCols) {
      draw3DCell(ctx, cell.col * size, cell.row * size + yOffset, size, isDark);
    }
  });
}

export function TetrisGrid({ paused = false }: { paused?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blockRef = useRef<FallingBlock | null>(null);
  const placedRef = useRef<PlacedCell[]>([]);
  const mouseXRef = useRef<number | null>(null);
  const gridDimsRef = useRef({ cols: 0, rows: 0 });
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const pausedRef = useRef<boolean>(paused);
  const gameOverRef = useRef<boolean>(false);
  const gameOverTimerRef = useRef<number>(0);
  const prevRowsRef = useRef<number>(0);

  const NAVBAR_ROWS = 4;
  const NAVBAR_HEIGHT = 64; // pixels to ignore at top
  const BOTTOM_OFFSET = 30; // pixels reserved at bottom for controls/divider
  const GAME_OVER_DELAY = 0.6; // seconds before clearing

  // Keep pausedRef in sync with prop
  useEffect(() => {
    const wasPaused = pausedRef.current;
    pausedRef.current = paused;
    // Reset lastTime when unpausing to prevent large dt jump
    if (wasPaused && !paused) {
      lastTimeRef.current = 0;
    }
  }, [paused]);

  const getGridDims = useCallback(() => {
    const cols = Math.ceil(window.innerWidth / GRID_SIZE);
    const rows = Math.ceil((window.innerHeight - BOTTOM_OFFSET) / GRID_SIZE) - 2;
    return { cols, rows };
  }, []);

  const checkCollisionAt = useCallback(
    (shape: number[][], col: number, gridRow: number): boolean => {
      const { cols, rows } = gridDimsRef.current;
      const placed = placedRef.current;

      for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
          if (shape[r][c]) {
            const newRow = gridRow + r;
            const newCol = col + c;
            if (newRow >= rows) return true;
            if (newCol < 0 || newCol >= cols) return true;
            if (placed.some((cell) => cell.row === newRow && cell.col === newCol)) return true;
          }
        }
      }
      return false;
    },
    []
  );

  const placeBlock = useCallback((block: FallingBlock) => {
    const snapRow = Math.floor(block.row);
    const placedSet = new Set<string>(
      placedRef.current.map((cell) => `${cell.col},${cell.row}`)
    );
    const newCells: PlacedCell[] = [];
    block.shape.forEach((row, r) => {
      row.forEach((cell, c) => {
        if (cell) {
          const key = `${block.col + c},${snapRow + r}`;
          if (!placedSet.has(key)) {
            newCells.push({ row: snapRow + r, col: block.col + c });
            placedSet.add(key);
          }
        }
      });
    });
    let placed = [...placedRef.current, ...newCells];

    // Line clear: find full rows and remove them
    const { cols, rows } = gridDimsRef.current;
    const rowCounts = new Map<number, number>();
    placed.forEach((cell) => {
      rowCounts.set(cell.row, (rowCounts.get(cell.row) || 0) + 1);
    });

    const fullRows = [...rowCounts.entries()]
      .filter(([_, count]) => count >= cols)
      .map(([row]) => row)
      .sort((a, b) => a - b);

    if (fullRows.length > 0) {
      // Line cleared
      // Remove cells in full rows
      placed = placed.filter((cell) => !fullRows.includes(cell.row));
      // Shift cells above each cleared row down
      fullRows.forEach((clearedRow) => {
        placed.forEach((cell) => {
          if (cell.row < clearedRow) {
            cell.row += 1;
          }
        });
      });
    }

    placedRef.current = placed;

    // Game over check: if any placed cell is in the navbar zone
    const touchesNavbar = placed.some((cell) => cell.row < NAVBAR_ROWS);
    if (touchesNavbar && !gameOverRef.current) {
      gameOverRef.current = true;
      gameOverTimerRef.current = GAME_OVER_DELAY;
    }
  }, []);

  const spawnBlock = useCallback(() => {
    const { cols } = gridDimsRef.current;
    if (cols <= 0) return;
    const tetromino = TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)];
    const shape = tetromino.shape.map((r) => [...r]);
    const blockWidth = shape[0].length;
    const maxCol = Math.max(0, cols - blockWidth);
    const startCol = Math.floor(Math.random() * (maxCol + 1));
    blockRef.current = { col: startCol, row: 0, shape };
  }, []);

  const clampCol = useCallback((col: number, shape: number[][]) => {
    const { cols } = gridDimsRef.current;
    const blockWidth = shape[0].length;
    return Math.max(0, Math.min(col, cols - blockWidth));
  }, []);

  const render = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Calculate delta time (capped to avoid large jumps)
    const dt = lastTimeRef.current ? Math.min((timestamp - lastTimeRef.current) / 1000, 0.1) : 0.016;
    lastTimeRef.current = timestamp;

    // Skip updates when hero is not in view or paused
    if (!isVisibleRef.current || pausedRef.current) {
      animFrameRef.current = requestAnimationFrame(render);
      return;
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - BOTTOM_OFFSET;

    const dims = getGridDims();
    const { cols, rows } = dims;

    // Anchor floor to bottom: shift placed cells & falling block when rows change
    const oldRows = prevRowsRef.current;
    if (oldRows > 0 && rows !== oldRows) {
      const shift = rows - oldRows;
      placedRef.current.forEach((cell) => {
        cell.row += shift;
      });
      // Remove cells that shifted above the grid
      placedRef.current = placedRef.current.filter((cell) => cell.row >= 0);
      const block = blockRef.current;
      if (block) {
        block.row += shift;
        if (block.row < 0) {
          blockRef.current = null;
        }
      }
    }
    prevRowsRef.current = rows;
    gridDimsRef.current = dims;

    // Calculate yOffset to anchor the grid floor to the bottom of the canvas
    const yOffset = canvas.height - rows * GRID_SIZE;

    const isDark = document.documentElement.classList.contains('dark');
    const blockColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)';
    const blockFill = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Handle game over state
    if (gameOverRef.current) {
      gameOverTimerRef.current -= dt;

      // Flash effect: alternate between red-tinted and normal
      const flashPhase = Math.floor(gameOverTimerRef.current * 8) % 2 === 0;
      const goFill = flashPhase
        ? (isDark ? 'rgba(239,68,68,0.15)' : 'rgba(239,68,68,0.12)')
        : blockFill;
      const goStroke = flashPhase
        ? (isDark ? 'rgba(239,68,68,0.5)' : 'rgba(239,68,68,0.4)')
        : blockColor;

      drawPlacedCells(ctx, placedRef.current, cols, rows, GRID_SIZE, goFill, goStroke, isDark, yOffset);

      if (gameOverTimerRef.current <= 0) {
        // Clear everything and restart
        placedRef.current = [];
        blockRef.current = null;
        gameOverRef.current = false;
        gameOverTimerRef.current = 0;
        spawnBlock();
      }

      animFrameRef.current = requestAnimationFrame(render);
      return;
    }

    // Draw placed cells
    drawPlacedCells(ctx, placedRef.current, cols, rows, GRID_SIZE, blockFill, blockColor, isDark, yOffset);

    // Update and draw falling block
    const block = blockRef.current;
    if (block) {
      if (block.landed) {
        // Block has touched down — count down lock timer while player can still slide
        block.lockTimer = (block.lockTimer ?? 0) - dt;

        // Check if block can still fall (e.g. player slid it over a gap)
        const gridRow = Math.floor(block.row);
        if (!checkCollisionAt(block.shape, block.col, gridRow + 1)) {
          // Gap below — resume falling, cancel lock
          block.landed = false;
          block.lockTimer = undefined;
          block.row = gridRow + 0.01; // nudge past integer to resume smooth fall
        } else if (block.lockTimer! <= 0) {
          // Timer expired — permanently place the block
          placeBlock(block);
          blockRef.current = null;
          spawnBlock();
        }
        // Otherwise keep drawing at current position (player can still slide)
      } else {
        // Continuous smooth vertical falling
        const prevGridRow = Math.floor(block.row);
        const nextRow = block.row + FALL_SPEED * dt;
        const newGridRow = Math.floor(nextRow);

        if (newGridRow > prevGridRow) {
          // We just crossed into a new integer row — check collision
          if (checkCollisionAt(block.shape, block.col, newGridRow)) {
            // Can't enter this row — snap to previous and start lock delay
            block.row = prevGridRow;
            block.landed = true;
            block.lockTimer = LOCK_DELAY;
          } else if (checkCollisionAt(block.shape, block.col, newGridRow + 1)) {
            // Next row below collides — this is the landing row, start lock delay
            block.row = newGridRow;
            block.landed = true;
            block.lockTimer = LOCK_DELAY;
          } else {
            block.row = nextRow;
          }
        } else {
          // Still within the same grid row — just advance smoothly
          block.row = nextRow;
        }
      }

      // Draw at current position (col is instant, row is smooth)
      if (blockRef.current) {
        drawShapeOutline(ctx, block.shape, block.col * GRID_SIZE, block.row * GRID_SIZE, GRID_SIZE, blockFill, blockColor, isDark, yOffset);
      }
    } else {
      spawnBlock();
    }

    animFrameRef.current = requestAnimationFrame(render);
  }, [getGridDims, checkCollisionAt, placeBlock, spawnBlock]);

  useEffect(() => {
    gridDimsRef.current = getGridDims();
    prevRowsRef.current = gridDimsRef.current.rows;
    spawnBlock();

    // Start render loop (no setInterval — all motion is frame-driven)
    animFrameRef.current = requestAnimationFrame(render);

    // IntersectionObserver to pause when hero is out of view
    const canvas = canvasRef.current;
    let observer: IntersectionObserver | null = null;
    if (canvas) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            lastTimeRef.current = 0; // Reset to prevent large dt jump
          }
        },
        { threshold: 0 }
      );
      observer.observe(canvas);
    }

    // Mouse move — block follows cursor horizontally (instant)
    const handleMouseMove = (e: MouseEvent) => {
      mouseXRef.current = e.clientX;
      const block = blockRef.current;
      if (!block) return;

      const blockWidth = block.shape[0].length;
      const targetCol = Math.floor(e.clientX / GRID_SIZE) - Math.floor(blockWidth / 2);
      const clamped = clampCol(targetCol, block.shape);

      if (clamped !== block.col) {
        const diff = clamped - block.col;
        const step = diff > 0 ? 1 : -1;
        let newCol = block.col;
        const gridRow = Math.floor(block.row);
        for (let i = 0; i < Math.abs(diff); i++) {
          const testCol = newCol + step;
          const testBlock: FallingBlock = { col: testCol, row: block.row, shape: block.shape };
          if (!checkCollisionAt(block.shape, testCol, gridRow)) {
            newCol = testCol;
          } else {
            break;
          }
        }
        block.col = newCol;
      }
    };

    // Click/Touch — rotate block (only within hero section and outside navbar)
    const handleClick = (e: MouseEvent) => {
      // Ignore if synthetic click from touch (we handle rotation in touchEnd for better gesture detection)
      if ((e as any).__synthetic) {
        const block = blockRef.current;
        if (!block) return;
        const rotated = rotateShape(block.shape);
        const newCol = clampCol(block.col, rotated);
        if (!checkCollisionAt(rotated, newCol, Math.floor(block.row))) {
          block.shape = rotated;
          block.col = newCol;
        }
        return;
      }

      const clientX = e.clientX;
      const clientY = e.clientY;

      // Ignore if on or inside the navbar
      const target = e.target as HTMLElement;
      if (target?.closest('nav')) return;
      if (clientY < NAVBAR_HEIGHT) return;

      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (clientX < rect.left || clientX > rect.right || clientY < rect.top || clientY > rect.bottom) return;

      const block = blockRef.current;
      if (!block) return;

      const rotated = rotateShape(block.shape);
      const newCol = clampCol(block.col, rotated);
      const gridRow = Math.floor(block.row);

      if (!checkCollisionAt(rotated, newCol, gridRow)) {
        block.shape = rotated;
        block.col = newCol;
      }
    };

    const handleResize = () => {
      gridDimsRef.current = getGridDims();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('click', handleClick);
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      if (observer) observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
    };
  }, [render, getGridDims, spawnBlock, checkCollisionAt, placeBlock, clampCol]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}