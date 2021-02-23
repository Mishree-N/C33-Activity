//use base parent class to create bird class
class Bird extends baseClass{

    constructor(x,y){

        //create body for bird
        super(x,y,50,50);
        //add bird image to bird
        this.image=loadImage("sprites/bird.png");

        //load trajectory smoke image
        this.image1=loadImage("sprites/smoke.png");
        //trajectory array
        this.trajectory=[];

    }

    display(){

        //link display to base class display
        super.display();

        //when bird is in correct position, (to avoid too much trajectory)
        if (this.body.velocity.x>10 && this.body.position.x>200){

            //story bird body positions to make trajectory path
            var position = [this.body.position.x, this.body.position.y];

            //add position to trajectory array
            this.trajectory.push (position);

        }

        //for loop to display all smokes for trajectory
        for (var i = 0; i<this.trajectory.length; i++){

            //image to display trajectories using for loops's i varibale which is the row number
            image(this.image1, this.trajectory[i][0], this.trajectory[i][1]);

        }


    }

}



