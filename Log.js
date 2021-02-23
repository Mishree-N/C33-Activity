//create log class using base class
class Log extends baseClass {

    constructor (x,y,height,angle){

        //create body
        super(x,y,20,height,angle);
        //add image
        this.image=loadImage("sprites/wood2.png");
        //set angle for log body
        Matter.Body.setAngle (this.body, angle);

    }

}






