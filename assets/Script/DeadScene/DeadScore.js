

cc.Class({
    extends: cc.Component,

    properties: {
        Score:cc.Label,
        DeadScore:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start:function () {
        this.DeadScore.string=this.Score.string;
    },

    update:function(dt){
   //     this.DeadScore.string=this.Score.string;
    }
});
