export default class Node{
  name: number; 
  children: number[] = [];
  childrenNodes: Node[] = [];
  numChildrenPaths: number = 0; 

  constructor(name: number, children: number[]){
    this.name = name;
    this.children = children;
  }
  
  determineNumChildrenPaths(){
    if(this.childrenNodes.length === 0){
      this.numChildrenPaths = 1;
    } 
    else{
      this.childrenNodes.forEach((child: Node) => {
        this.numChildrenPaths += child.numChildrenPaths;
      })
    }
  }
}