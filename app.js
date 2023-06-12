var data =  require("./fakeData");
var express = require('express');
var bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
var app = express();

app.use(
  cookieSession({
    name: 'session',
    user: {},
    keys: ['your-secret-key'],
    maxAge: 24 * 60 * 60 * 1000, // Tempo de expiração do cookie (opcional)
  })
);

var teste1 = require("./teste1");
var teste2 = require("./teste2");
var teste3 = require("./teste3");
var teste4 = require("./teste4");
var teste5 = require("./teste5");

var CheckPermissions = require("./middleware");
var CheckPermissionsInstance = new CheckPermissions();

app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded());

app.use(bodyParser.json());                        
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.send(`get user/ </br>
  get users/ </br>
  post users/ </br>
  delete users/ </br>
  put users/ </br>
  `);
});

app.post("/login", (req, res) => {
  /*----------- this method,
  as well as the entire application architecture,
  must be optimized for a real application. ----------*/
  const { name, password } = req.body;
  const user = data.find(elem => elem.name === name);
  if (user) {
    req.session = {
        user
    };
    res.sendStatus(200);
  } else
    return res.status(404).send('User not registered.');
});

app.get("/user/:id", teste1.getUser);
app.get("/users", teste1.getUsers);
app.post("/users", teste2.storeUser)
app.delete("/users/:id", CheckPermissionsInstance.destroyUser, teste3.destroyUser)
app.put("/users/:id", CheckPermissionsInstance.updateUser, teste4.updateUser)
app.get("/users/access", teste5.userReads);


const port = 3000;
app.listen(port, function(){
  console.log('Express server listening on port ' + port);
});