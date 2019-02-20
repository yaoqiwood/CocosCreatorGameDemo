

cc.Class({
    extends: cc.Component,

    properties: {
       starGroup:cc.Node
    },



    update:function (dt) {
        this.node.x-=floorMoveSpeed;
    },
});
