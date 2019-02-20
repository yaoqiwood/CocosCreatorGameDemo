
cc.Class({
    extends: cc.Component,

    properties: {
        Star:[cc.Prefab],
        //PlatformOri:cc.Node,
        Platform:[cc.Prefab],
        Monster:[cc.Prefab],
        Hero:cc.Node,
        Groundy:120,
        MonsterMove:cc.Node
    },



    start:function(){
        this.MonsterMoveSwitch=false;
        this.newStar();         //生成新的星星 
        cc.log(this.Platform[0]);
        this.switch=false;
        this.PlatformY;         //用于记录新生成的平台的y信息
        this.getPosition=cc.p(0,0);
    },

    //自动生成平台
    newPlatform:function(){
        var newPlatformTemp=cc.instantiate(this.Platform[0]);
        this.node.addChild(newPlatformTemp);
        newPlatformTemp.setPosition(this.getPlatformPosition());
        this.switch=true;
        this.PlatformY=newPlatformTemp.y;
        cc.log('abc'+this.PlatformY);
    },

    getPlatformPosition:function(){
        cc.log(this.Platform[0].data.width);
        var randx=cc.random0To1()*this.Hero.width*0.3+this.Platform[0].data.width;
        var randy=cc.random0To1()*(100+(this.Hero.height*0.3)/2);
        this.getPosition=cc.p(randx,randy);
        cc.log('abc+'+randx,randy);
        //在适当的地方生成y轴坐标
        return cc.p(randx,randy);
        //cc.log(randx,randy); 

    },
    //自动生成星星
    newStar:function(){
        var newStarTemp=cc.instantiate(this.Star[0]);   
        this.node.addChild(newStarTemp);
        newStarTemp.setPosition(this.getStarPosition());
        cc.log(this.getStarPosition());
    },

    getStarPosition:function(){
        var randx=10+cc.random0To1()*this.Platform[0].data.width+this.Platform[0].data.width;
        var randy=cc.random0To1()*200+300;
       // cc.log('abc'+this.getPlatformPosition().y);
        return cc.p(randx,randy);
    },

    //自动生成怪物一只

    newMonster:function(){
        this.MonsterMoveSwitch=true;   
        var newMonsterTemp=cc.instantiate(this.Monster[0]);
        this.MonsterMove.addChild(newMonsterTemp);
        newMonsterTemp.setPosition(this.getMonsterPosition());
       
    },

    getMonsterPosition:function(){
        var randx=10+cc.random0To1()*this.Platform[0].data.width+this.Platform[0].data.width;
        var randy=100+this.getPosition.y*2;
        cc.log('abc+'+randx,randy);
        return cc.p(randx,randy);
    },

    update:function(){
      //  cc.log(this.MonsterMove.children[0].position.x);

    }

});
