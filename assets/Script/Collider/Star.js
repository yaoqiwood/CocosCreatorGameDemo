

cc.Class({
    extends: cc.Component,

    properties: {
        Score:cc.Label,
        HP:cc.Label
    },

    onLoad:function(){
        this.ScoreNum=0;
        //this.Score=this.Score.getComponent('Star');
        //cc.log(this.Score.string);
        this.MaxMoveSpeed=30;
        
        this.schedule(function(){
            if (floorMoveSpeed<=this.MaxMoveSpeed){     //速度加快
                floorMoveSpeed+=5;
            }
        },30);

    },

    addScore:function(){
        this.ScoreNum+=1;
        this.Score.string='Score:'+this.ScoreNum.toString();
        
    }

    
});
