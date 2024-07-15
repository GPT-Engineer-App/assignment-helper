import { useRef, useEffect } from "react";

export const Flowchart = ({ tasks }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const padding = 20;
    const boxHeight = 40;
    const boxWidth = 150;
    const arrowSize = 10;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    tasks.forEach((task, index) => {
      const x = padding;
      const y = index * (boxHeight + padding * 2) + padding;

      // Draw task box
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(x, y, boxWidth, boxHeight);
      ctx.strokeRect(x, y, boxWidth, boxHeight);

      // Draw task title
      ctx.fillStyle = "#000";
      ctx.font = "12px Arial";
      ctx.fillText(task.title, x + 5, y + 25);

      // Draw steps
      task.steps.forEach((step, stepIndex) => {
        const stepX = x + boxWidth + padding;
        const stepY = y + stepIndex * (boxHeight + padding);

        // Draw step box
        ctx.fillStyle = "#e0e0e0";
        ctx.fillRect(stepX, stepY, boxWidth, boxHeight);
        ctx.strokeRect(stepX, stepY, boxWidth, boxHeight);

        // Draw step text
        ctx.fillStyle = "#000";
        ctx.fillText(step, stepX + 5, stepY + 25);

        // Draw arrow
        ctx.beginPath();
        ctx.moveTo(x + boxWidth, y + boxHeight / 2);
        ctx.lineTo(stepX, stepY + boxHeight / 2);
        ctx.stroke();

        // Draw arrowhead
        ctx.beginPath();
        ctx.moveTo(stepX, stepY + boxHeight / 2);
        ctx.lineTo(stepX - arrowSize, stepY + boxHeight / 2 - arrowSize / 2);
        ctx.lineTo(stepX - arrowSize, stepY + boxHeight / 2 + arrowSize / 2);
        ctx.closePath();
        ctx.fill();
      });
    });
  }, [tasks]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};