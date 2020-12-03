import { readFileSync } from "fs";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  const descent1 = countTrees(input, 3, 1);
  console.log("Answer of part one is " + descent1);
  const descent2 = countTrees(input, 5, 1);
  const descent3 = countTrees(input, 1, 1);
  const descent4 = countTrees(input, 7, 1);
  const descent5 = countTrees(input, 1, 2);
  console.log("Answer of part two is " + descent1*descent2*descent3*descent4*descent5);
}


function countTrees(slope: string[], xStep: number, yStep: number){
  let currentXcoord: number = 0;
  let treeCount: number = 0;

  for(let y = 0; y < slope.length; y+=yStep){

    let currentYslope = slope[y];
    while(currentXcoord >= currentYslope.length){
      currentYslope += slope[y];
    }

    if(currentYslope[currentXcoord] === '#'){
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