//create box class using parent base class
class Box extends baseClass {

    constructor(x,y,width,height){

        //create body for box
        super(x,y,width,height);
        //add image to box
        this.image=loadImage("sprites/wood1.png");

    }

}





