"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    console.log(countTrees(input));
    var test = "aaa";
    console.log(test[5]);
}
function countTrees(slope) {
    var xStep = 3;
    var currentXcoord = 0;
    var treeCount = 0;
    for (var y = 0; y < slope.length; y++) {
        var currentYslope = slope[y];
        while (currentXcoord >= currentYslope.length) {
            currentYslope += slope[y];
        }
        if (currentYslope[currentXcoord] === '#') {
            console.log("found a tree on line ", y);
            treeCount++;
        }
        currentXcoord += xStep;
    }
    return treeCount;
}
// Het aantal lijnen naar beneden is de lengte van de array ([0,1,2] = lengte 3, en dat is wat ik wil weten)
// Ik weet hoeveel characters breed 1 zo'n regel is.
// Als mijn x-coordinaat hoger is dan die breedte, kopieer dan nog eens die breedte erin, etc. 
// Ik wil weten of ik op de volgende lijn een beetje bij het juiste cijfertje kan. 
// Als de x-coordinaat van mijn volgende regel
advent();
