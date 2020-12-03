import { readFileSync } from "fs";

function advent() {
  const stringInput: string = readFileSync("input.txt", "utf-8");
  const input: string[] = stringInput.split("\r\n");
  console.log(countTrees(input));
}


function countTrees(slope: string[]){
  const xStep: number = 3;
  let currentXcoord: number = 0;
  let treeCount: number = 0;

  for(let y = 0; y < slope.length; y++){

    let currentYslope = slope[y];
    while(currentXcoord >= currentYslope.length){
      currentYslope += slope[y];
    }

    if(currentYslope[currentXcoord] === '#'){
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