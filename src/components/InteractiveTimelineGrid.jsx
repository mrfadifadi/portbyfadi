import React, { useRef, useEffect } from "react";

const InteractiveTimelineGrid = ({
    className = "",
    resolution = 20,
    fadeFactor = 0.95,
    style,
    ...props
}) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let grid;
        let cols = 0;
        let rows = 0;
        let width = 0;
        let height = 0;

        const mouse = { x: -1000, y: -1000, prevX: -1000, prevY: -1000, active: false };

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;

            cols = Math.ceil(width / resolution);
            rows = Math.ceil(height / resolution);
            grid = new Float32Array(cols * rows).fill(0);
        };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        const update = () => {
            if (mouse.active) {
                const dx = mouse.x - mouse.prevX;
                const dy = mouse.y - mouse.prevY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const steps = Math.ceil(dist / (resolution / 2));

                for (let s = 0; s <= steps; s++) {
                    const t = steps > 0 ? s / steps : 0;
                    const x = mouse.prevX + dx * t;
                    const y = mouse.prevY + dy * t;

                    const col = Math.floor(x / resolution);
                    const row = Math.floor(y / resolution);

                    const radius = 1;
                    for (let i = -radius; i <= radius; i++) {
                        for (let j = -radius; j <= radius; j++) {
                            const c = col + i;
                            const r = row + j;
                            if (c >= 0 && c < cols && r >= 0 && r < rows) {
                                const idx = c + r * cols;
                                const d = Math.sqrt(i * i + j * j);
                                if (d <= radius) {
                                    grid[idx] = Math.min(1.0, grid[idx] + 0.8 * (1 - d / radius));
                                }
                            }
                        }
                    }
                }
            }

            mouse.prevX = mouse.x;
            mouse.prevY = mouse.y;

            // Clear the canvas to make it a transparent overlay
            ctx.clearRect(0, 0, width, height);

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const idx = c + r * cols;
                    let intensity = grid[idx];

                    grid[idx] *= fadeFactor;

                    const x = c * resolution;
                    const y = r * resolution;

                    if (intensity > 0.01) {
                        // Math calculation tweak to ensure it shrinks away completely
                        const baseHeight = resolution * 0.2;
                        const dynamicHeight = resolution * 1.8 * intensity;
                        const tickHeight = Math.max(0, baseHeight * intensity + dynamicHeight); // Scales the base height too so it disappears when intensity nears 0

                        ctx.fillStyle = `rgba(24, 24, 27, ${intensity})`; // Pure Black for monochrome design

                        ctx.beginPath();
                        ctx.roundRect(
                            x + resolution / 2 - 1.5,
                            y + resolution / 2 - tickHeight / 2,
                            3,
                            tickHeight,
                            2
                        );
                        ctx.fill();
                    }
                }
            }

            // Check if mouse is actually moving to fade out the pause icon when still
            const isActuallyMoving = (Math.abs(mouse.x - mouse.prevX) > 0.1 || Math.abs(mouse.y - mouse.prevY) > 0.1);
            if (isActuallyMoving) {
                mouse.idleTime = 0;
            } else {
                mouse.idleTime = (mouse.idleTime || 0) + 1;
            }

            if (mouse.active && mouse.idleTime < 60) {
                // Fade out the cursor if it's getting idle
                const cursorOpacity = Math.max(0, 1 - (mouse.idleTime / 60));
                ctx.fillStyle = `rgba(24, 24, 27, ${cursorOpacity})`; // Dark cursor fading

                ctx.beginPath();
                ctx.roundRect(mouse.x - 6, mouse.y - 8, 4, 16, 2);
                ctx.fill();

                ctx.beginPath();
                ctx.roundRect(mouse.x + 2, mouse.y - 8, 4, 16, 2);
                ctx.fill();
            }

            requestAnimationFrame(update);
        };

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseleave", handleMouseLeave);

        resize();
        update();

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [resolution, fadeFactor]);

    return (
        <div
            ref={containerRef}
            className={`interactive-timeline ${className}`}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                overflow: 'hidden',
                pointerEvents: 'none',
                ...style
            }}
            {...props}
        >
            <canvas ref={canvasRef} style={{ display: 'block', width: '100vw', height: '100vh' }} />
        </div>
    );
};

export default InteractiveTimelineGrid;
