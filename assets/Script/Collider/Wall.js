
cc.Class({
    extends: cc.Component,

    properties: {
            Platform:cc.Node,
        },

      

    // onLoad () {},
    start:function () {     
        var Manager=cc.director.getCollisionManager();
        Manager.enabled=true;
        this.Platform=this.Platform.getComponent('Generator');
        this.Switch=true;
      //  cc.log(this.Platform);
    },   

    onCollisionEnter:function(other,self){
        cc.log(other.node.group);
        if (other.node.group=='Platform'){
            if (this.Switch==true){
                this.Platform.newPlatform();
                this.Platform.newStar();    //生成新的星星 
                this.Platform.newMonster(); //怪物
            }
        }
        this.Switch=false;

    },

    onCollisionExit:function(other,self){
        cc.log('collision exit');
        if (other.node.group=='Platform') this.Switch=true;
        cc.log(this.Switch);
    }

   
});
