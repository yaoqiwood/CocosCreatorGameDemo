
cc.Class({
    extends: cc.Component,

    properties: {
        accel:25,
        //猪脚
        m_Player:{
            default:null,
            type:cc.Node
        },
        //怪物
        monsterOne:cc.Node,
    /*    //显示框
        ScoreDisplay:cc.Label,
        //星星
        star:{
            default:null,
            type:cc.Node
        },          */
        //spawnStar:cc.Node,
        normal:true,
        speed:cc.v2(0,0),
        maxSpeed:cc.v2(250,2000),
        gravity:-1000,
        jumpSpeed:600,
        collisionX:0,
        collisionY:0,
        direction:0,
        jumping:false,
        jumpCount:0,
        drag:1000,
        prePosition:cc.v2(0,0),
        //platform:cc.Node
    },

    onLoad:function(){
      //  this.prePosition.x=this.m_Player.x;
       // this.prePosition.y=this.node.y;
       // cc.log(this.prePosition);
       // cc.log(this.Count.string);
     //   this.CountUI=this.ScoreDisplay.getComponent('Star');    //分数
      //  this.newStar=this.star.getComponent('Generator');

        var manager=cc.director.getCollisionManager();
        manager.enabled=true;
       // manager.enabledDebugDraw=true;
        this.m_Player=this.node.getComponent(cc.Animation);

        cc.eventManager.addListener({
            event:cc.EventListener.KEYBOARD,
            onKeyPressed:this.onKeyPressed.bind(this),
            onKeyReleased:this.onKeyReleased.bind(this)
        },this.node);
        this.m_Player.play('HeroRun');

        //击打怪物判定
        this.slash=false;

    },

    onKeyPressed:function(KeyCode,event){
        var animateName=this.m_Player.currentClip.name;
       // cc.log(animateName);
        switch(KeyCode){
            case cc.KEY.d:
                this.direction=1;                       //方向向右
                break;
            case cc.KEY.a:
                this.direction=-1;
                break;
            case cc.KEY.j:
                if (!(animateName=='HeroSlash')) {
                    this.m_Player.play("HeroSlash");
                    this.slash=true;
                    if(!this.jumping){
                        this.scheduleOnce(function(){
                        this.m_Player.play('HeroRun');
                    },0.5);}
                    
                    //播放完成动画后关闭攻击碰撞
                    this.scheduleOnce(function(){
                        this.slash=false;
                    },0.4);

                }
                break;
            case cc.KEY.k:
                if (!this.jumping){
                    this.jumping=true;
                    this.speed.y=this.jumpSpeed;
                    this.m_Player.play("HeroJump");
                }
                break;
        }
    },
    
    onKeyReleased:function(KeyCode,event){
        switch (KeyCode){
            case cc.KEY.d:
                if (this.direction==1){
                    this.direction=0;
                }
                break;
            case cc.KEY.a:
                if (this.direction==-1){
                    this.direction=0;
                }
                break;
        }
    },

    collisionGoldEnter:function(other,self){

        other.node.removeFromParent();
        this.CountUI.addScore();
    //    cc.log(this.CountUI);
     /*   this.Score+=1;
        this.Count.string='Score:'+this.Score.toString();
        cc.log('nimabi');
    */
       // this.CountComponent.addScore();
        
    },

    collisionPlatformEnter:function(other,self){
        //初始化各个形状
        var otherAABB=other.world.aabb;
        var otherPreAABB=other.world.preAabb.clone();

        var selfAABB=self.world.aabb;
        var selfPreAABB=self.world.preAabb.clone();
        cc.log(otherAABB.x);

        selfPreAABB.x=selfAABB.x;
        otherPreAABB.x=otherAABB.x;
        //检查x碰撞
        if (cc.Intersection.rectRect(selfPreAABB,otherPreAABB)){      //测试矩形与矩形之间是否香蕉，返回值为布尔值
            if (this.speed.x<0 && (selfPreAABB.xMax>otherPreAABB.xMax)){
                this.node.x=otherPreAABB.xMax+selfPreAABB.width/2;
                this.collisionX=-1;                         //最右
            }else if (this.speed.x>0 && selfPreAABB.xMin<otherPreAABB.xMin){
                this.node.x=otherPreAABB.xMin-selfPreAABB.width/2;
                this.collisionX=1;    
             //   cc.log('wocao');
                //最左
            }
            this.speed.x=0;   //0
            other.touchingX=true;
            return;
        }

        //检查y碰撞
        selfPreAABB.y=selfAABB.y;
        otherPreAABB.y=otherAABB.y;
        cc.log(otherAABB.y);
        if (cc.Intersection.rectRect(selfPreAABB,otherPreAABB)){

            if (this.speed.y<0 && selfPreAABB.yMax>otherPreAABB.yMax){
                this.jumping=false;
                this.node.y=otherPreAABB.yMax;
                this.m_Player.play('HeroRun');
                this.collisionY=-1;                 //最上
            }else if (this.speed.y >0 && selfPreAABB.yMin<otherPreAABB.yMin){
                this.node.y=otherPreAABB.yMin-selfPreAABB.height;
                this.collisionY=1;                  //最下
               // cc.log("nimabibi");

            }
            this.speed.y=0;
            other.touchingY=true;

        }
    },

    collisionMonsterEnter:function(other,self){
        cc.log('c1ollider enemy');
        var action=cc.moveBy(0.2,cc.p(-150,0));
        this.node.runAction(action);
        this.node.color=cc.Color.RED;
      //  this.collisionY=1;
        this.scheduleOnce(function() {
            this.node.color=cc.Color.WHITE;
        //    this.collisionY=0;
        }, 3);
    },

    collisionMonsterSlash:function(other,self){
        var action=cc.moveBy(0.2,cc.p(150,0));
        this.monsterOne.runAction(action);
    //    this.other.runAction(action);

        this.monsterOne.color=cc.Color.RED;
        this.scheduleOnce(function(){
            other.node.removeFromParent();
        },0.3);
    },

    onCollisionEnter:function(other,self){
        
        //cc.log(other.node.group);
        if(other.tag==1){
            this.collisionGoldEnter(other,self);
        }else if (other.tag==0){
            this.collisionPlatformEnter(other,self);
        }else if (other.node.group=='Enemy'){
            if (this.slash){
                if (other.tag==12) this.collisionMonsterSlash(other,self);
            }else if (other.tag==12) this.collisionMonsterEnter(other,self);
            
        }


        /*else{
            cc.log('on collision enter');
            this.node.color=cc.Color.GREEN;
            this.normal=false;
            this.speed.y=0;
            this.m_Player.play('HeroRun');
            this.jumping=false;
        }
        */
    },



    onCollisionExit:function(other,self){
       // this.node.color=cc.color.WHITE;
      /*  if(other.tag==1){
            this.newStar.newStar();
        }*/
        /*
        else{
            this.normal=true;
            this.m_Player.play('HeroJump');
            this.jumping=true;
            this.node.color=cc.Color.WHITE;
        }
       // this.m_Player.play('HeroJump');
        */
        if (other.tag==0){
            cc.log(this.speed.y);
            if (other.touchingX){
                this.collisionX=0;
                other.touchingX=false;
            }
            if (other.touchingY){
                this.collisionY=0;
                other.touchingY=false;
                this.jumping=true;
            }
        }
    },
    
        
    update:function(dt){
        //重力相关
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
        
        

       // cc.log(this.speed.y);

        /*if (this.node.x>=0 ||this.node.x<=960){
            this.node.x += this.speed.x * dt;
        }else if (this.node.x)*/

        if(this.node.x<0) this.node.x=0;
        if(this.node.x>960)this.node.x=960
        //   cc.log('ab'+this.node.width);
        //↑表示左右的边框不可被穿过
        
        if (Math.abs(this.collisionX)>0) this.speed.x=0; //0
        //if (Math.abs(this.collisionY)>0) this.speed.y=0;
        
        


        this.node.x += this.speed.x * dt;
        this.node.y += this.speed.y * dt;

   }
        
    

});
