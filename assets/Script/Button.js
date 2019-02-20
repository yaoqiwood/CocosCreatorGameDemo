

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    

    ReLoad:function(){
        cc.log('load?');
        floorMoveSpeed=3;
        cc.director.loadScene('GameScene_2');
    }    
    // update (dt) {},
});
