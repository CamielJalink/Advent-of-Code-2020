export class Cube{
  neighbors: Cube[] = [];
  x: number;
  y: number;
  z: number;
  state: string;

  constructor(x: number, y: number, z:number, state: string){
    this.x = x;
    this.y = y;
    this.z = z;
    this.state = state;
  }
}


// All initial cubes have z-0
export function createInitialCubes(input: string[], map: Cube[]){
  for(let y = 0; y < input.length; y++){
    for(let x = 0; x < input[y].length; x++){
      map.push(new Cube(x, y, 0, input[y][x]))
    }
  }
}



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