const canvas = document.querySelector(".canvas")
const c = canvas.getContext("2d")
const input = document.querySelector(".input")

const size = 500

canvas.width = size
canvas.height = size

class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
}

const drawLine = (point1, point2) => {
  c.beginPath()
  c.moveTo(point1.x, point1.y)
  c.lineTo(point2.x, point2.y)
  c.stroke()
}

const drawShape = pointsOnEachSide => {
  // Drawing the X Points
  const Xpoints = [...Array(pointsOnEachSide * 2 + 1)].map(
    (_, index) => new Point(index * (size / (pointsOnEachSide * 2)), size / 2)
  )

  // Drawing the Y Points
  const Ypoints = [...Array(pointsOnEachSide * 2 + 1)].map(
    (_, index) => new Point(size / 2, index * (size / (pointsOnEachSide * 2)))
  )

  // Drawing two axes
  drawLine(new Point(0, size / 2), new Point(size, size / 2))
  drawLine(new Point(size / 2, 0), new Point(size / 2, size))

  // drawing the Lines
  Xpoints.forEach((point, index) => {
    if (index < pointsOnEachSide) {
      drawLine(point, Ypoints[pointsOnEachSide + index + 1])
      drawLine(point, Ypoints[pointsOnEachSide - index - 1])
    }
    if (index > pointsOnEachSide) {
      drawLine(point, Ypoints[index - 1 - pointsOnEachSide])
      drawLine(
        point,
        Ypoints[pointsOnEachSide * 2 - (index - 1 - pointsOnEachSide)]
      )
    }
  })
}

input.addEventListener("input", e => {
  const points = e.target.value
  c.clearRect(0, 0, size, size)
  drawShape(parseInt(points))
})

// Initial draw
drawShape(parseInt(input.value))
