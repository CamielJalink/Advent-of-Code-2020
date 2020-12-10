"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var node_1 = __importDefault(require("./node"));
function advent() {
    var stringInput = fs_1.readFileSync("input.txt", "utf-8");
    var input = stringInput.split("\r\n");
    findAllConverterCombinations(input);
}
function findAllConverterCombinations(input) {
    var numInput = input.map(function (stringVoltage) { return Number(stringVoltage); });
    var sortedInput = numInput.sort(function (a, b) {
        if (a < b) {
            return -1;
        }
        else if (b < a) {
            return 1;
        }
        else {
            return 0;
        }
    });
    var maxAdapterVoltage = 0;
    sortedInput.forEach(function (adapterVoltage) {
        if (adapterVoltage > maxAdapterVoltage) {
            maxAdapterVoltage = adapterVoltage;
        }
    });
    sortedInput.unshift(0); // The 0-adapter from the outlet
    sortedInput.push(maxAdapterVoltage + 3); // Add phone's adapter, which is 3 + the highest, to the list
    var nodes = createNodes(sortedInput);
    findAllArrangements(nodes);
}
function createNodes(sortedInput) {
    var nodes = [];
    for (var i = 0; i < sortedInput.length; i++) {
        var children = [];
        if (sortedInput[i + 1] !== undefined && (sortedInput[i + 1] - sortedInput[i] < 4)) {
            children.push(sortedInput[i + 1]);
        }
        if (sortedInput[i + 2] !== undefined && (sortedInput[i + 2] - sortedInput[i] < 4)) {
            children.push(sortedInput[i + 2]);
        }
        if (sortedInput[i + 3] !== undefined && (sortedInput[i + 3] - sortedInput[i] < 4)) {
            children.push(sortedInput[i + 3]);
        }
        nodes.push(new node_1.default(sortedInput[i], children));
    }
    nodes.forEach(function (node) {
        var childrenNodes = [];
        node.children.forEach(function (childNodeName) {
            nodes.forEach(function (findNode) {
                if (findNode.name === childNodeName) {
                    childrenNodes.push(findNode);
                }
            });
        });
        node.childrenNodes = childrenNodes;
    });
    return nodes;
}
function findAllArrangements(nodes) {
    nodes.reverse();
    nodes.forEach(function (node) {
        node.determineNumChildrenPaths();
    });
    var lastNode = nodes.pop();
    console.log(lastNode);
    // Nu heb ik dus een array, met de laatste node eerst. 
    // Nu alleen nog maar de regels hebben:
    // ALs ik geen kind heb. Tel mij als 1.
    // Als ik 1 kind heb, vertak ik niet opnieuw. Ik heb dan dus 1 x aantal paden van m'n kinderen.
    // Als ik 2 kinderen heb. Ben ik aantal paden van kind 1 + aantal paden van kind 2
    // Als ik 3 kinderen heb, ben ik aantal paden van kind 1 + aantal paden van kind 2 + aantal paden van kind 3.
}
advent();
