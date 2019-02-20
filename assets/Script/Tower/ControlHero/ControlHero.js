//做碰撞检测的时候注意猪脚的tag设定为100

cc.Class({
    extends: cc.Component,

    properties: {
        Player:cc.Node,
        maxSpeed:cc.v2(250,2000),
        speed:cc.v2(0,0),
        accel:25,
        gravity:-1000,
        direction:0,
        jumpSpeed:500,

        //子弹射击
        Bullet:{
            default:null,
            type:cc.Node
        }
    },

    start:function() {
        this.repeat=true;    //防止快速打枪

        cc.eventManager.addListener({
            event:cc.EventListener.KEYBOARD,
            onKeyPressed:this.onKeyPressed.bind(this),
            onKeyReleased:this.onKeyReleased.bind(this)
        },this.node)

        this.collisionX=0;
        this.collisionY=0;

        this.jumping=false;        //记录跳跃
        this.toward='right';       //写一个用于记录角色当前朝向位置的变量
        this.touchingNumber=0;

       // this.prePosition=cc.v2();
       // this.PreStep=cc.v2();

        //碰撞开启
        var manager=cc.director.getCollisionManager();
        manager.enabled=true;
        manager.enabledDebugDraw=true;
        //初始化动画组件
        this.Player=this.Player.getComponent(cc.Animation);
        this.Player.play('Idle-Right');
    },

    onKeyPressed:function (KeyCode,event){
        var AnimationName=this.Player.currentClip.name;
        switch(KeyCode){
            case cc.KEY.a:
                this.direction=-1;
                this.toward='left';
                BulletToward='left';
                if (!this.jumping){
                    if (AnimationName!='Run-Left')  this.Player.play('Run-Left');
                }else{
                    this.Player.play('Jump-Left');
                }
                
                break;
            case cc.KEY.d:
                this.direction=1;
                this.toward='right';
                BulletToward='right';
                if (!this.jumping){
                    if (AnimationName!='Run-Right') this.Player.play('Run-Right');
                }else{
                    this.Player.play('Jump-Right');
                }
                break;
            case cc.KEY.j:
                if (this.repeat){
                    this.repeat=false;
                    if (this.toward=='right') this.Player.play('Shoot-Right');
                    if (this.toward=='left')  this.Player.play('Shoot-Left');
                    this.Shoot();
                    this.scheduleOnce(function(){
                        this.repeat=true;
                        cc.log(this.repeat);
                    },0.45);
                }
                break;
            case cc.KEY.k:
                if (!this.jumping){
                    this.jumping=true;
                    this.speed.y=this.jumpSpeed;
                    this.toward=='right' ? this.Player.play('Jump-Right') : this.Player.play('Jump-Left');
                }
                break;
        }
    },

    onKeyReleased:function(KeyCode,event){
        switch(KeyCode){
         /*   case cc.KEY.a:
            case cc.KEY.d:
                this.direction=0;
                break;
                */
            case cc.KEY.d:
                if (this.direction==1){
                    this.direction=0;
                    this.Player.play('Idle-Right');
                }
                break;
            case cc.KEY.a:
                if (this.direction==-1){
                    this.direction=0;
                    this.Player.play('Idle-Left');
                }
                break; 
        }
    },

    //射击——子弹飞出
    Shoot:function(){
        var scene=cc.director.getScene();
        var Loc=cc.v2((this.toward=='right' ? this.node.x+90 :this.node.x ),this.node.y+28);     //22是枪的高度   +90是本身的宽度*0.2后的x
        var bullet=cc.instantiate(this.Bullet);
        bullet.position=Loc;
        bullet.active=true;
        scene.addChild(bullet);
    },

    collisionPlatformEnter:function(other,self){

        //初始化各个形状
        var otherAABB=other.world.aabb;                 //获取aabb（四边形区域）对象
        var otherPreAABB=other.world.preAabb.clone();   //克隆出一个上一次移动区域的对象

        var selfAABB=self.world.aabb;                   //同上，但是这次获取的是自身
        var selfPreAABB=self.world.preAabb.clone();     //同上
      //  cc.log(otherAABB.x);

        selfPreAABB.x=selfAABB.x;
        otherPreAABB.x=otherAABB.x;
        //检查x碰撞
        if (cc.Intersection.rectRect(selfPreAABB,otherPreAABB)){      //测试矩形与矩形之间是否香蕉，返回值为布尔值
            if (this.speed.x<0 && (selfPreAABB.xMax>otherPreAABB.xMax)){
                this.node.x=otherPreAABB.xMax;
                this.collisionX=-1;                         //最右
            }else if (this.speed.x>0 && (selfPreAABB.xMin<otherPreAABB.xMin)){
                this.node.x=otherPreAABB.xMin-selfPreAABB.width;
                this.collisionX=1;    
                //最左
            }
            this.speed.x=0;   
            other.touchingX=true;
            return;
        }

        //检查y碰撞
        selfPreAABB.y=selfAABB.y;
        otherPreAABB.y=otherAABB.y;
        //cc.log(otherAABB.y);
        if (cc.Intersection.rectRect(selfPreAABB,otherPreAABB)){

            if (this.speed.y<0 && (selfPreAABB.yMax>otherPreAABB.yMax)){
                this.node.y=otherPreAABB.yMax;
                if (this.toward=='right')  this.Player.play('Idle-Right');
                if (this.toward=='left')   this.Player.play('Idle-Left');
                this.jumping=false;
                this.collisionY=-1;                 //最上
             //   cc.log('abc1');

            }else if (this.speed.y >0 && (selfPreAABB.yMin<otherPreAABB.yMin)){
                this.node.y=otherPreAABB.yMin-selfPreAABB.height;
              //  this.collisionY=1;                  //最下

            }
           // cc.log('abc');
            this.speed.y=0;
            other.touchingY=true;

        }
    },

    onCollisionMonster:function(other,self){

        var action=cc.moveBy(0.2,cc.p(this.toward=='right' ? -125:125 ,0));
        this.node.runAction(action);
        this.node.color=cc.Color.RED;
        this.scheduleOnce(function(){
            this.node.color=cc.Color.WHITE;
        },2)
    },


    onCollisionEnter:function(other,self){
        cc.log('enter');  
        this.touchingNumber++;
        if (other.tag==0){              //平台tag为0
            this.collisionPlatformEnter(other,self);
        }else if (other.node.group=='Enemy'){
            if (other.tag==12){
                this.onCollisionMonster(other,self);
            }
        }
    },

    onCollisionExit:function (other,self){
        this.touchingNumber--;
        cc.log('exit');
       // if (this.touchingNumber==0){
            if (other.tag==0){
                if (other.touchingY){
                    other.touchingY=false;
                    this.collisionY=0;
                 //   this.jumping=true;
                }
                
            }

            if (other.touchingX){
                other.touchingX=false;
                this.collisionX=0;
                cc.log('yes');
            }
            if (other.tag==12){
                this.collisionY=0;
            }
        //}
    },


    update:function(dt){
        if (this.collisionY==0){
            this.speed.y+=this.gravity*dt;
        }
          //移动相关
        if (this.direction==0){
            this.speed.x=0;
        }
        if (this.direction==1){
            this.speed.x<=this.maxSpeed.x ? this.speed.x+=this.accel : this.speed.x=this.maxSpeed.x;
   
        }else if (this.direction==-1){
            this.speed.x>=-this.maxSpeed.x ? this.speed.x-=this.accel : this.speed.x=-this.maxSpeed.x;
        }

        if (this.speed.x * this.collisionX > 0) {       //防止反方向被平台吸附
            this.speed.x = 0;                           //简单理解 如果被左边碰撞 向右时speed.x为正，则得出负数
        }
        
        this.node.x += this.speed.x * dt;
        this.node.y += this.speed.y * dt;
    }
});
