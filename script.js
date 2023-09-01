const canvas = document.querySelector(".canvas")
const ctx = canvas.getContext("2d")
const input = document.querySelector(".input")

const size = Math.min(innerHeight, innerWidth)
let pointCountOnEachAxis = 8
canvas.width = size
canvas.height = size

const canvasMultiplier = 1

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
    // canvas x and y:
    this.canvasX = x * canvasMultiplier + canvas.width / 2
    this.canvasY = -y * canvasMultiplier + canvas.height / 2
  }
  lineTo = nextPoint => {
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(this.canvasX, this.canvasY)
    ctx.lineTo(nextPoint.canvasX, nextPoint.canvasY)
    ctx.stroke()
  }

  draw = () => {
    ctx.beginPath()
    ctx.arc(this.canvasX, this.canvasY, 5, 0, 2 * Math.PI)
    ctx.fill()
  }
}
// xMultiplier and yMultiplier = [-1, 0, 1]

const createPointsOnSidesOfAxis = (xMultiplier, yMultiplier) =>
  Array(pointCountOnEachAxis)
    .fill("")
    .map(
      (_, i) =>
        new Point(
          xMultiplier * (i + 1) * (size / (2 * pointCountOnEachAxis)),
          yMultiplier * (i + 1) * (size / (2 * pointCountOnEachAxis))
        )
    )

const center = new Point(0, 0)

const drawCurveStitching = () => {
  // draw the X and Y axes
  new Point(-size / 2, 0).lineTo(new Point(size / 2, 0))
  new Point(0, -size / 2).lineTo(new Point(0, size / 2))

  // making the points on the axes
  const negativeXPoints = createPointsOnSidesOfAxis(-1, 0)
  const positiveXPoints = createPointsOnSidesOfAxis(1, 0)
  const negativeYPoints = createPointsOnSidesOfAxis(0, -1)
  const positiveYPoints = createPointsOnSidesOfAxis(0, 1)

  // drawing the lines
  for (let i = 0; i < pointCountOnEachAxis; i++) {
    positiveYPoints[i].lineTo(negativeXPoints[negativeXPoints.length - i - 1])
    positiveYPoints[i].lineTo(positiveXPoints[negativeXPoints.length - i - 1])
    negativeYPoints[i].lineTo(positiveXPoints[negativeXPoints.length - i - 1])
    negativeYPoints[i].lineTo(negativeXPoints[negativeXPoints.length - i - 1])
  }
}

input.addEventListener("change", e => {
  ctx.clearRect(0, 0, size, size)
  pointCountOnEachAxis = parseInt(e.target.value)
  drawCurveStitching()
})

// Initial draw
input.value = pointCountOnEachAxis
drawCurveStitching(pointCountOnEachAxis)
