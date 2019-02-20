

cc.Class({
    extends: cc.Component,

    properties: {
        floor:cc.Node,
    },



    start:function() {
        cc.log(floorMoveSpeed);
    },

    update:function(dt){
        this.node.x-=floorMoveSpeed;
    }

});
