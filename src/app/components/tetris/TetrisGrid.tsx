import { useEffect, useRef, useCallback } from 'react';

const GRID_SIZE = 20;
const FALL_SPEED = 1 / 0.3; // rows per second (equivalent to 1 row every 300ms)

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

function drawShapeOutline(
  ctx: CanvasRenderingContext2D,
  shape: number[][],
  ox: number,
  oy: number,
  size: number,
  fillColor: string,
  strokeColor: string
) {
  const sRows = shape.length;
  const sCols = shape[0].length;
  const has = (r: number, c: number) =>
    r >= 0 && r < sRows && c >= 0 && c < sCols && shape[r][c] === 1;

  // Fill cells
  ctx.fillStyle = fillColor;
  for (let r = 0; r < sRows; r++) {
    for (let c = 0; c < sCols; c++) {
      if (shape[r][c]) {
        ctx.fillRect(ox + c * size, oy + r * size, size, size);
      }
    }
  }

  // Stroke all edges exactly once: always draw top & left; draw right/bottom only if no neighbor
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  for (let r = 0; r < sRows; r++) {
    for (let c = 0; c < sCols; c++) {
      if (!shape[r][c]) continue;
      const x = ox + c * size;
      const y = oy + r * size;
      // Always draw top edge
      ctx.moveTo(x, y);
      ctx.lineTo(x + size, y);
      // Always draw left edge
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + size);
      // Right edge only if no right neighbor
      if (!has(r, c + 1)) {
        ctx.moveTo(x + size, y);
        ctx.lineTo(x + size, y + size);
      }
      // Bottom edge only if no bottom neighbor
      if (!has(r + 1, c)) {
        ctx.moveTo(x, y + size);
        ctx.lineTo(x + size, y + size);
      }
    }
  }
  ctx.stroke();
}

function drawPlacedCells(
  ctx: CanvasRenderingContext2D,
  placed: PlacedCell[],
  maxCols: number,
  maxRows: number,
  size: number,
  fillColor: string,
  strokeColor: string
) {
  const set = new Set<string>();
  placed.forEach((c) => set.add(`${c.col},${c.row}`));

  // Fill cells
  ctx.fillStyle = fillColor;
  placed.forEach((cell) => {
    if (cell.row < maxRows && cell.col < maxCols) {
      ctx.fillRect(cell.col * size, cell.row * size, size, size);
    }
  });

  // Stroke all edges exactly once: always draw top & left; draw right/bottom only if no neighbor
  ctx.strokeStyle = strokeColor;
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  placed.forEach((cell) => {
    if (cell.row >= maxRows || cell.col >= maxCols) return;
    const x = cell.col * size;
    const y = cell.row * size;
    // Always draw top edge
    ctx.moveTo(x, y);
    ctx.lineTo(x + size, y);
    // Always draw left edge
    ctx.moveTo(x, y);
    ctx.lineTo(x, y + size);
    // Right edge only if no right neighbor
    if (!set.has(`${cell.col + 1},${cell.row}`)) {
      ctx.moveTo(x + size, y);
      ctx.lineTo(x + size, y + size);
    }
    // Bottom edge only if no bottom neighbor
    if (!set.has(`${cell.col},${cell.row + 1}`)) {
      ctx.moveTo(x, y + size);
      ctx.lineTo(x + size, y + size);
    }
  });
  ctx.stroke();
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
    const rows = Math.ceil(window.innerHeight / GRID_SIZE) - 2;
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
    const { cols } = gridDimsRef.current;
    const rowCounts = new Map<number, number>();
    placed.forEach((cell) => {
      rowCounts.set(cell.row, (rowCounts.get(cell.row) || 0) + 1);
    });

    const fullRows = [...rowCounts.entries()]
      .filter(([_, count]) => count >= cols)
      .map(([row]) => row)
      .sort((a, b) => a - b);

    if (fullRows.length > 0) {
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
    canvas.height = window.innerHeight;

    const dims = getGridDims();
    gridDimsRef.current = dims;
    const { cols, rows } = dims;

    const isDark = document.documentElement.classList.contains('dark');
    const blockColor = isDark ? 'rgba(255,255,255,0.35)' : 'rgba(0,0,0,0.25)';
    const blockFill = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)';

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw placed cells
    drawPlacedCells(ctx, placedRef.current, cols, rows, GRID_SIZE, blockFill, blockColor);

    // Update and draw falling block
    const block = blockRef.current;
    if (block) {
      // Continuous smooth vertical falling
      const prevGridRow = Math.floor(block.row);
      const nextRow = block.row + FALL_SPEED * dt;
      const newGridRow = Math.floor(nextRow);

      if (newGridRow > prevGridRow) {
        // We just crossed into a new integer row — check collision
        if (checkCollisionAt(block.shape, block.col, newGridRow)) {
          // Can't enter this row — snap to previous and place
          block.row = prevGridRow;
          placeBlock(block);
          blockRef.current = null;
          spawnBlock();
        } else if (checkCollisionAt(block.shape, block.col, newGridRow + 1)) {
          // Next row below collides — this is the landing row
          block.row = newGridRow;
          placeBlock(block);
          blockRef.current = null;
          spawnBlock();
        } else {
          block.row = nextRow;
        }
      } else {
        // Still within the same grid row — just advance smoothly
        block.row = nextRow;
      }

      // Draw at current position (col is instant, row is smooth)
      if (blockRef.current) {
        drawShapeOutline(ctx, block.shape, block.col * GRID_SIZE, block.row * GRID_SIZE, GRID_SIZE, blockFill, blockColor);
      }
    } else {
      spawnBlock();
    }

    animFrameRef.current = requestAnimationFrame(render);
  }, [getGridDims, checkCollisionAt, placeBlock, spawnBlock]);

  useEffect(() => {
    gridDimsRef.current = getGridDims();
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

    // Click — rotate block (only within hero section)
    const handleClick = (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        return;
      }

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