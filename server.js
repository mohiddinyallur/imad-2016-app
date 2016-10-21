var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
canvas = null
c = null
w = window.innerWidth
h = window.innerHeight

max_size = 15
min_size = 15
block_density = 30
block_number = null
rate = 0.5
close = 200
force_power = 5

blocks = null
mouse_position = [-close,-close];

class Block
	constructor: ()->
		@x = Math.random() * w
		@y = Math.random() * h

		@vx = 0
		@vy = Math.random() * 0.5

		@width = Math.random() * max_size
		@height = Math.random() * max_size

		@speed = (@width * @height) * rate

		@text = Math.random().toString(36).substr(2,5)[0]

	update: ()->
		@x += @vx*@speed
		@y += @vy*@speed
		if @x>w or @x<0 then @vx=-@vx
		if @y>h
			@y = -10
			@x = Math.random()*w

init = ()->
	block_number = (w*h) / Math.pow(block_density, 2)

	c.fillStyle = 'snow'
	c.strokeStyle = '#ff0063'
	c.lineWidth = 10
	c.font = "12px Comic Sans MS"

	blocks = []
	for i in [0...block_number]
		blocks.push new Block	

draw = ()->
	c.clearRect 0,0,w,h

	for o in blocks
		distance = Math.pow((Math.pow o.x- mouse_position[0], 2) + (Math.pow o.y- mouse_position[1], 2),0.5)
		if distance <= close
			if o.x > mouse_position[0] then o.x = o.x+force_power else o.x = o.x-force_power
			if o.y > mouse_position[1] then o.y = o.y+force_power else o.y = o.y-force_power

		c.fillStyle = "hsl("+o.x%360+",50%,50%)"
		c.fillText(o.text,o.x,o.y);
		o.update()

	window.requestAnimFrame draw
	

window.onload = ()->
	canvas = document.getElementById 'c'
	canvas.width = w
	canvas.height = h
	c = canvas.getContext '2d'

	init()
	draw()

	canvas.addEventListener 'mousemove',(e)->
		mouse_position = [e.clientX, e.clientY]
	canvas.addEventListener 'mouseout',(e)->
		mouse_position = [-close, -close]

window.onresize = ()->
	w = this.innerWidth
	h = this.innerHeight
	canvas.width = w
	canvas.height = h
	init()

window.requestAnimFrame = (callback)->
	window.setTimeout callback, 1000/60

