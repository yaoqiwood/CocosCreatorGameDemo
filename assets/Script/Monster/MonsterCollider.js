

cc.Class({
    extends: cc.Component,

    properties: {
        Monster:cc.Node,
    },

    start:function(){
        this.onEnableCollision();       

        this.GameSceneName=cc.director.getScene().name;
        this.schedule(function(){
            this.LeftOrRight=Math.floor(cc.random0To1()*2);
            cc.log(this.LeftOrRight);
            if (this.LeftOrRight==0){
                var action=cc.moveBy(2,cc.p(159,0));
                this.Monster.runAction(action);
                cc.log('wwww1');
            }else if (this.LeftOrRight==1){
                var action=cc.moveBy(3,cc.p(-200,0));
                this.Monster.runAction(action);
                cc.log('wwww');
            }
            
        },5);

    },

    onEnableCollision:function(){
        var manager=cc.director.getCollisionManager();
        manager.enabled=true;
    },

    onBulletEnter:function(other,self){
      //  cc.log('abc'+other.Toward);
        var action=cc.moveBy(0.2,other.Toward=='right' ? cc.p(120,0):cc.p(-120,0));
        this.node.runAction(action);
        this.node.color=cc.Color.RED;
        this.scheduleOnce(function(){
           this.node.color=cc.Color.WHITE; 
        },3)
    },

    onCollisionEnter:function(other,self){
        if (other.node.group=='Bullet'){
            if (other.tag=='110'){
                this.onBulletEnter(other,self);
            }
        }
    },

    update:function(dt){
        //this.LeftOrRight=0 ? this.Monster.x+=1 : this.Monster.x-=1;
        //this.Monster.x=960 ? this.Monster.x=959 : this.Monster.x=0 ? this.Monster.x=1;
    if (this.GameSceneName=='GameScene_1'){
        if (this.Monster.x==960){
            this.Monster.x=959;
        }else if (this.Monster.x==0){
            this.Monster.x=1;
        
        }
    }else if (this.GameSceneName=='GameScene_2'){
        this.Monster.x-=floorMoveSpeed;
    }

    },
});
