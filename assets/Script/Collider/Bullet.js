

cc.Class({
    extends: cc.Component,

    properties: {
        Bullet:cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onCollisionEnter:function(other,self){
        self.Toward=this.Toward;
        this.Bullet.destroy();
    },

    start:function () {
        this.Speed=1000;
        this.Toward=BulletToward;
        BulletToward=='left' ? this.Speed*=-1 : this.Speed=Math.abs(this.Speed);
    },

    update:function(dt){
        this.Bullet.x+=this.Speed*dt;
       // cc.log(this.Speed);
    }
});
