
function loadLoginForm () {
    var loginHtml = `
        <h3>Please login or Register to acess your account and much more!!</h3>
        <input type="text" id="username" placeholder="username" />
        <input type="password" id="password" placeholder="password" />
        <br/><br/>
        <input type="submit" id="login_btn" value="Login" />
        <input type="submit" id="register_btn" value="Register" />
        `;
    document.getElementById('login_area').innerHTML = loginHtml;
    
    // Submit username/password to login
    var submit = document.getElementById('login_btn');
    submit.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  submit.value = 'Sucess!';
              } else if (request.status === 403) {
                  submit.value = 'Invalid credentials. Please try again?';
              } else if (request.status === 500) {
                  alert('oops!!! Something went wrong on the server');
                  submit.value = 'Login';
              } else {
                  alert('oops!!Something went wrong on the server');
                  submit.value = 'Login';
              }
              loadLogin();
          }  
          // Not done yet
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/login', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        submit.value = 'Logging in...';
        
    };
    
    var register = document.getElementById('register_btn');
    register.onclick = function () {
        // Create a request object
        var request = new XMLHttpRequest();
        
        // Capture the response and store it in a variable
        request.onreadystatechange = function () {
          if (request.readyState === XMLHttpRequest.DONE) {
              // Take some action
              if (request.status === 200) {
                  alert('User created successfully , you can login now');
                  register.value = 'Registered!';
              } else {
                  alert('Could not register the user');
                  register.value = 'Register';
              }
          }
        };
        
        // Make the request
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        console.log(username);
        console.log(password);
        request.open('POST', '/create-user', true);
        request.setRequestHeader('Content-Type', 'application/json');
        request.send(JSON.stringify({username: username, password: password}));  
        register.value = 'Registering...';
    
    };
}

function loadLoggedInUser (username) {
    var loginArea = document.getElementById('login_area');
    loginArea.innerHTML = `
        <h3> welcome <i>${username}</i></h3>
        <a href="/logout">Logout</a>
    `;
}

function loadLogin () {
    // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                loadLoggedInUser(this.responseText);
            } else {
                loadLoginForm();
            }
        }
    };
    
    request.open('GET', '/check-login', true);
    request.send(null);
}

function loadArticles () {
        // Check if the user is already logged in
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            var articles = document.getElementById('articles');
            if (request.status === 200) {
                var content = '<ul>';
                var articleData = JSON.parse(this.responseText);
                for (var i=0; i< articleData.length; i++) {
                    content += `<li>
                    <a href="/articles/${articleData[i].title}">${articleData[i].heading}</a>
                    (${articleData[i].date.split('T')[0]})</li>`;
                }
                content += "</ul>"
                articles.innerHTML = content;
            } else {
                articles.innerHTML('Oops! Could not load all articles!')
            }
        }
    };
    
    request.open('GET', '/get-articles', true);
    request.send(null);
}


// The first thing to do is to check if the user is logged in!
loadLogin();

// Now this is something that we could have directly done on the server-side using templating too!
loadArticles();


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Circle = function Circle(x, y, radius) {
  _classCallCheck(this, Circle);

  this.position = { 'x': x, 'y': y };
  this.radius = radius;
};

var Experience = function () {
  function Experience(container) {
    var _this = this;

    _classCallCheck(this, Experience);

    console.clear();

    this.canvas = document.createElement('canvas');
    container.appendChild(this.canvas);
    this.context = this.canvas.getContext('2d');

    var fps = 30;
    this.fpsInterval = 1000 / fps;
    this.then = Date.now();

    this.resize();

    this.circles = [];
    var circlesNumber = 400;
    this.lineWidth = 0.3;
    var failsNumber = 0;

    var i = 0;
    while (i < circlesNumber) {
      var x = Math.random() * this.canvas.width;
      var y = Math.random() * this.canvas.height;
      var radius = Math.random() * 30 + 1;
      var newCircle = new Circle(x, y, radius);
      this.circles.push(newCircle);
      i++;

      for (var _iterator = this.circles, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var circle = _ref;

        if (circle != newCircle) {
          var distanceX = circle.position.x - x;
          var distanceY = circle.position.y - y;
          var distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

          if (distance < circle.radius + radius) {
            this.circles.pop();
            failsNumber++;
            i--;
          }
        }
      }

      if (failsNumber > 1000) {
        return;
      }
    }

    var gui = new dat.GUI();
    var lineWidthGUI = gui.add(this, 'lineWidth', 0.2, 20).name('Line width').step(0.2);

    lineWidthGUI.onFinishChange(function (value) {
      _this.resize();
    });

    gui.close();

    this.bind();
    this.loop();
  }

  Experience.prototype.bind = function bind() {
    window.addEventListener('resize', this.resize.bind(this), false);
  };

  Experience.prototype.render = function render() {
    for (var _iterator2 = this.circles, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref2 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref2 = _i2.value;
      }

      var circle = _ref2;

      var startAngle = Math.random() * 90 * Math.PI / 360;
      var endAngle = Math.random() * 360 * Math.PI / 90;

      this.context.save();
      this.context.translate(circle.position.x, circle.position.y);
      this.context.beginPath();
      this.context.moveTo(Math.cos(startAngle) * circle.radius, Math.sin(startAngle) * circle.radius);
      this.context.lineTo(Math.cos(endAngle) * circle.radius, Math.sin(endAngle) * circle.radius);
      this.context.lineWidth = this.lineWidth;
      this.context.strokeStyle = getRandomColor();
      this.context.stroke();
      this.context.closePath();
      this.context.restore();
    }
  };

  Experience.prototype.loop = function loop() {
    this.raf = window.requestAnimationFrame(this.loop.bind(this));

    var now = Date.now();
    var delta = now - this.then;

    if (delta > this.fpsInterval) {
      //this.context.clearRect( 0, 0, this.canvas.width, this.canvas.height )
      this.render();
      this.then = now;
    }
  };

  Experience.prototype.resize = function resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.screen = {
      'center': { 'x': this.canvas.width / 1, 'y': this.canvas.height / 1 },
      'hypotenuse': Math.sqrt(this.canvas.width / 2 * this.canvas.width  / 2 + this.canvas.height / 2 * this.canvas.height / 2)
    };

    this.reset();
  };

  Experience.prototype.reset = function reset() {
    window.cancelAnimationFrame(this.raf);
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.loop();
  };

  return Experience;
}();

var getRandomColor = function getRandomColor() {
  var value = Math.floor(Math.random() * 6 );
  return '#' + value.toString(16) + value.toString(16)+ value.toString(16);
};

var container = document.getElementById('canvas');
var experience = new Experience(container);