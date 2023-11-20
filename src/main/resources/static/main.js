let point = [0, 0, 0, 0]
let context;
let bgcolor = "#00ff00";
let strokecolor = "#ff0000";
let overlay;
let draggable = false;
let strokewidth = 1;
let s = 0
let shapes = [];

function press(ev) {
    ev.preventDefault();
    draggable = true
    point[0] = ev.clientX
    point[1] = ev.clientY
    overlay = document.createElement("div");
    overlay.id = "overlay"
    overlay.height = 0
    overlay.width = 0
    overlay.style.position = 'absolute'
    overlay.style.background = 'rgba(255,0,0,.3)'
    overlay.style.top = point[1]
    overlay.style.left = point[0]
    document.getElementById('container').appendChild(overlay)
}

function drag(ev) {
    let overlay = document.getElementById('overlay');
    if (!!draggable) {
        overlay.style.height = ev.clientY - point[1]
        overlay.style.width = ev.clientX - point[0]
    }
}

function createE(p) {
    let canvas = document.createElement("canvas");
    let button = document.createElement("button");
    let box = document.createElement("div");
    let container = document.getElementById('container');

    button.id = "btn-shape-" + shapes.length
    button.innerText = 'X'
    button.style.position = 'absolute'
    button.style.top = 0
    button.style.right = 0

    let h = p[3] - p[1]
    let w = p[2] - p[0]

    box.id = "box-shape-" + shapes.length
    box.classList.add('shape')
    box.style.position = 'absolute'
    box.height = Math.min(h, w)
    box.width = Math.min(h, w)
    box.style.top = p[1]
    box.style.left = p[0]

    canvas.id = "shape-" + shapes.length
    canvas.height = Math.min(h, w)
    canvas.width = Math.min(h, w)


    box.appendChild(canvas)
    box.appendChild(button)

    context = canvas.getContext("2d")
    if (s === 0) {
        circle(canvas.width, canvas.height)
    } else if (s === 1) {
        square(canvas.width, canvas.height)
    } else if (s === 2) {
        elipsis(canvas.width, canvas.height)
    } else if (s === 3) {
        triangle(canvas.width, canvas.height)
    } else if (s === 4) {
        hexagon(canvas.width, canvas.height)
    } else if (s === 5) {
        diamond(canvas.width, canvas.height)
    }

    button.onclick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        e.stopImmediatePropagation()
        container.removeChild(box)
        shapes = shapes.splice(shapes.length - 1, 1)
    }

    container.appendChild(box)
    shapes.push(box)

    console.log(shapes)
}

circle = (width, height) => {
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.lineWidth = strokewidth;
    context.lineJoin = context.lineCap = 'round';
    context.setLineDash([0, 0]);
    context.globalAlpha = 1.0;
    context.arc(Math.min(width, height) / 2, Math.min(width, height) / 2, Math.abs((Math.min(width, height) / 2) - 5), 0, 2 * Math.PI, false);
    context.fillStyle = bgcolor;
    context.fill();
    context.strokeStyle = strokecolor;
    context.stroke();

}
triangle = (width, height) => {

    context.clearRect(0, 0, width, height);
    context.fillStyle = bgcolor;
    context.beginPath();
    context.lineJoin = context.lineCap = 'round';
    context.globalAlpha = 1.0;
    context.moveTo(width / 2, 2);
    context.lineTo(0, height - 2);
    context.lineTo(width, height - 2);
    context.lineTo(width / 2, 2);
    context.closePath();
    context.fill();
    context.strokeStyle = strokecolor;
    context.lineWidth = strokewidth;
    context.stroke();
}
elipsis = (width, height) => {
    let angleInRadians;

    if (point) {
        const dx = point[2] - point[0];
        const dy = point[3] - point[1];
        angleInRadians = Math.atan2(dy, dx);
        const angleInDegrees = angleInRadians * (180 / Math.PI);

        console.log(angleInDegrees);
    }


    context.beginPath();
    context.ellipse(width, height, width / 2, height / 2, Math.PI / 4, 0, angleInRadians);
    context.stroke();
    context.beginPath();
    // context.setLineDash([5, 5]);
    // context.moveTo(0, 200);
    // context.lineTo(200, 0);
    context.stroke();

}
square = (width, height) => {
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.fillStyle = bgcolor;
    context.lineJoin = context.lineCap = 'round';
    context.globalAlpha = 1.0;
    context.moveTo(0, 0);
    context.lineTo(0, height);
    context.lineTo(width, height);
    context.lineTo(width, 0);
    context.closePath();
    context.fill();
    context.strokeStyle = strokecolor;
    context.lineWidth = strokewidth;
    context.stroke();
}
hexagon = (width, height) => {
    var centerX = width / 2;
    var centerY = height / 2;
    var radius = Math.min(width, height) / 2;

    // Draw hexagon
    context.beginPath();
    context.fillStyle = bgcolor;
    for (var i = 0; i < 6; i++) {
        var angle = 2 * Math.PI * i / 6;
        var x = centerX + radius * Math.cos(angle);
        var y = centerY + radius * Math.sin(angle);
        if (i === 0) {
            context.moveTo(x, y);
        } else {
            context.lineTo(x, y);
        }
    }

    context.strokeStyle = strokecolor;
    context.lineWidth = strokewidth;
    context.closePath();
    context.stroke();
}
diamond = (width, height) => {
    var centerX = width / 2;
    var centerY = height / 2;
    var radius = Math.min(width, height) / 2;

    // Draw hexagon
    context.beginPath();
    context.fillStyle = bgcolor;
    context.strokeStyle = strokecolor;
    context.lineWidth = strokewidth;
    context.moveTo(centerX, centerY - radius);
    context.lineTo(centerX + radius, centerY);
    context.lineTo(centerX, centerY + radius);
    context.lineTo(centerX - radius, centerY);
    context.closePath();
    context.stroke();
}

function drop(ev) {
    ev.preventDefault();
    point[2] = ev.clientX
    point[3] = ev.clientY
    draggable = false
    let overlay = document.getElementById('overlay');
    let containr = document.getElementById('container');
    containr.removeChild(overlay)

    let h = point[3] - point[1]
    let w = point[2] - point[0]
    if (!(h === w && w < 10))
        createE(point)
}