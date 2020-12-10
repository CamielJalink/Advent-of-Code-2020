import { readFileSync } from "fs";
import Node from "./node";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");

  findAllConverterCombinations(input);
}


function findAllConverterCombinations(input: string[]){
  const numInput = input.map((stringVoltage) => Number(stringVoltage));
  const sortedInput = numInput.sort((a, b) => {
    if(a < b){
      return -1;
    } else if(b < a){
      return 1;
    } else{
      return 0;
    }
  });

  let maxAdapterVoltage: number = 0;
  sortedInput.forEach((adapterVoltage) => {
    if(adapterVoltage > maxAdapterVoltage){
      maxAdapterVoltage = adapterVoltage;
    }
  })
  sortedInput.unshift(0); // The 0-adapter from the outlet
  sortedInput.push(maxAdapterVoltage + 3); // Add phone's adapter, which is 3 + the highest, to the list

  let nodes: Node[] = createNodes(sortedInput);
  findAllArrangements(nodes);
}


function createNodes(sortedInput: number[]){
  let nodes: Node[] = [];

  for(let i = 0; i < sortedInput.length; i++){
    let children: number[] = [];
    if(sortedInput[i+1] !== undefined && (sortedInput[i+1] - sortedInput[i] < 4)){
      children.push(sortedInput[i+1]);
    }
    if (sortedInput[i + 2] !== undefined && (sortedInput[i + 2] - sortedInput[i] < 4)) {
      children.push(sortedInput[i + 2]);
    }
    if (sortedInput[i + 3] !== undefined && (sortedInput[i + 3] - sortedInput[i] < 4)) {
      children.push(sortedInput[i + 3]);
    }
    nodes.push(new Node(sortedInput[i], children))
  }

  nodes.forEach((node: Node) => {
    let childrenNodes: Node[] = [];
    node.children.forEach((childNodeName: number) => {
      nodes.forEach((findNode: Node) => {
        if(findNode.name === childNodeName){
          childrenNodes.push(findNode);
        }
      })
    })
    node.childrenNodes = childrenNodes;
  })

  return nodes;
}


function findAllArrangements(nodes: Node[]){
  nodes.reverse();

  nodes.forEach((node: Node) => {
    node.determineNumChildrenPaths();
  })

  let lastNode = nodes.pop();
  console.log(lastNode);

  // Nu heb ik dus een array, met de laatste node eerst. 

  // Nu alleen nog maar de regels hebben:

  // ALs ik geen kind heb. Tel mij als 1.

  // Als ik 1 kind heb, vertak ik niet opnieuw. Ik heb dan dus 1 x aantal paden van m'n kinderen.

  // Als ik 2 kinderen heb. Ben ik aantal paden van kind 1 + aantal paden van kind 2

  // Als ik 3 kinderen heb, ben ik aantal paden van kind 1 + aantal paden van kind 2 + aantal paden van kind 3.
}

advent();