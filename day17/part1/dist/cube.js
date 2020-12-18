"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Map = exports.Cube = void 0;
var Cube = /** @class */ (function () {
    function Cube(x, y, z, state) {
        this.neighbors = [];
        this.nextState = '';
        this.x = x;
        this.y = y;
        this.z = z;
        this.state = state;
    }
    Cube.prototype.cycleState = function () {
        var activeNeighbors = 0;
        this.neighbors.forEach(function (neighbor) {
            if (neighbor.state === '#') {
                activeNeighbors++;
            }
        });
        if (this.state === '#') {
            if (activeNeighbors < 2 || activeNeighbors > 3) {
                this.nextState = '.';
            }
            else {
                this.nextState = '#';
            }
        }
        else {
            if (activeNeighbors === 3) {
                this.nextState = '#';
            }
            else {
                this.nextState = '.';
            }
        }
    };
    return Cube;
}());
exports.Cube = Cube;
var Map = /** @class */ (function () {
    function Map(input) {
        this.knownMap = [];
        for (var y = 0; y < input.length; y++) {
            for (var x = 0; x < input[y].length; x++) {
                this.knownMap.push(new Cube(x, y, 0, input[y][x]));
            }
        }
        this.populateNeededNeighbors();
    }
    // Find the neighbor cube with these coordinates
    Map.prototype.findCube = function (x, y, z) {
        var neighborCube = new Cube(x, y, z, '.');
        for (var i = 0; i < this.knownMap.length; i++) {
            var cube = this.knownMap[i];
            if (cube.x === x && cube.y === y && cube.z === z) {
                neighborCube = cube;
                break;
            }
        }
        return neighborCube;
    };
    // All our cubes are going to need to check their neighbors. If those neighbors don't exist,
    // create them, both in our knownMap as well as in their neighbors array.
    Map.prototype.populateNeededNeighbors = function () {
        var _this = this;
        var currentlyKnownMap = [];
        this.knownMap.forEach(function (cube) {
            currentlyKnownMap.push(cube);
        });
        currentlyKnownMap.forEach(function (cube) {
            if (cube.neighbors.length !== 26) {
                for (var x = cube.x - 1; x <= cube.x + 1; x++) {
                    for (var y = cube.y - 1; y <= cube.y + 1; y++) {
                        for (var z = cube.z - 1; z <= cube.z + 1; z++) {
                            if (!(x === cube.x && y === cube.y && z === cube.z)) { // you can't be your own neighbor don't be silly
                                var neighbor = _this.findCube(x, y, z);
                                cube.neighbors.push(neighbor);
                                if (!_this.knownMap.includes(neighbor)) {
                                    _this.knownMap.push(neighbor);
                                }
                            }
                        }
                    }
                }
            }
        });
    };
    Map.prototype.cycle = function () {
        this.populateNeededNeighbors();
        this.knownMap.forEach(function (cube) {
            cube.cycleState();
        });
        this.knownMap.forEach(function (cube) {
            cube.state = cube.nextState;
        });
    };
    Map.prototype.countActive = function () {
        var numActiveCubes = 0;
        this.knownMap.forEach(function (cube) {
            if (cube.state === '#') {
                numActiveCubes++;
            }
        });
        return numActiveCubes;
    };
    return Map;
}());
exports.Map = Map;
// Stel ik wil class cube een method geven 'vertel me je volgende staat'. 
// Dan wil ik dat hij al zijn neighbors gaat bekijken en consideren.
// Dan wil ik misschien inbouwen dat hij bedenkt dat 'als er op die plek geen nieuwe cube is', 
// Dat hij daar een nieuwe cube aanmaakt, met state '.', en die toevoegt aan mijn map.
// Dat betekent dat elke cube een by-reference kopie van de map meekrijgt?
// Volgende vraag:
// Hoe gaan mijn cubes elkaar bijhouden? Moet ik telkens alle cubes langs op zoek naar jouw vriendjes?
// Werkt iig beter door alleen je eigen neighbors te bekijken, right?
// Ik kan het toevoegen van neighbors en mapcubes niet in de constructor doen, dan loopt dat eindeloos. 
// Dus het aanvullen van de map moet op een ander moment gebeuren?
// Een method 'Populate Neighbors' die ik aanroep aan het begin van elke beurt?
// Kan method zijn of van buitenaf die class bepaald.
// Of een eigen class Map? 
