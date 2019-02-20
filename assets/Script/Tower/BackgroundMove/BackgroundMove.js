

cc.Class({
    extends: cc.Component,

    properties: {
        Background:[cc.Node]
    },


    start:function () {
        
    },

    update:function(){
        for (var i=0;i<2;i++){
            if (this.Background[i].y==-1280){
                this.Background[i].y=1280;
            }

         //   this.Background[i].y-=1;
        }
    }

});
