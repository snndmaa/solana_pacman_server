export default function loadPauseOverlay(ctx) {
  ctx.globalAlpha = 0.7;
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 896, 992);
}
