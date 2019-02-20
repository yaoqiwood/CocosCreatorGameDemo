cc.Class({
    extends: cc.Component,

    properties: {
        BackGroundMove:[cc.Node],
        BackSecMove:[cc.Node],
        WaveMove:[cc.Node],
        WaveMove2:[cc.Node],
        WaveMove3:[cc.Node],
      //  GroundMove:[cc.Node]
    },

    onLoad:function(){
        var BackGround1=this.getComponent('Scene').BackGroundMove[0];
        var BackGround2=this.getComponent('Scene').BackGroundMove[1];
        //-----------------------背景2分割线-----------------------//

        var BackSec1=this.getComponent('Scene').BackSecMove[0];
        var BackSec2=this.getComponent('Scene').BackSecMove[1];
        //-----------------------海浪分割线-----------------------//

        var WaveSec1=this.getComponent('Scene').WaveMove[0];
        var WaveSec2=this.getComponent('Scene').WaveMove[1];

        //---------------------海浪2分界线------------------------//
        var WaveSec3=this.getComponent('Scene').WaveMove2[0];
        var WaveSec4=this.getComponent('Scene').WaveMove2[1];
        //--------------------海浪3分界线--------------------------//

        var WaveSec5=this.getComponent('Scene').WaveMove3[0];
        var WaveSec6=this.getComponent('Scene').WaveMove3[1];

        //--------------------地板分界线--------------------------//
     //   var GroundMoveA=this.getComponent('Scene').GroundMove[0];
      //  var GroundMoveB=this.getComponent('Scene').GroundMove[1];

        this.schedule(function(){
           // cc.log(BackGround1.x,BackGround2.x);
            if (BackGround1.x<=-950){               //边界的负值  画卷在最左边完全隐藏后重新出现的判断
                BackGround1.x=957;
            }else{
                if(BackGround2.x<=-950){
                    BackGround2.x=957;
                }
            }
            BackGround1.x-=BackMoveSpeed;
            BackGround2.x-=BackMoveSpeed;

        //-----------------------背景2分割线-----------------------//

            if (BackSec1.x<=-1100){
                BackSec1.x=1500;
            }else{
                if(BackSec2.x<=-1100){
                    BackSec2.x=2400;
                }
            }
            BackSec1.x-=BackSecMoveS;
            BackSec2.x-=BackSecMoveS;

        //-----------------------海浪分割线-----------------------//

            if (WaveSec1.x<=-955){
                WaveSec1.x=955;
            }else{
                if(WaveSec2.x<=-955){
                    WaveSec2.x=955;
                }
            }
            WaveSec1.x-=WaveMoveSpeed;
            WaveSec2.x-=WaveMoveSpeed;

        //---------------------海浪2分界线------------------------//

            if (WaveSec3.x<=-955){
                WaveSec3.x=955;
            }else{
                if(WaveSec4.x<=-955){
                    WaveSec4.x=955;
                }
            }
            WaveSec3.x-=WaveMoveSpeed2;
            WaveSec4.x-=WaveMoveSpeed2;

        //--------------------海浪3分界线--------------------------//

            if (WaveSec5.x<=-955){
                WaveSec5.x=955;
            }else{
                if(WaveSec6.x<=-955){
                    WaveSec6.x=955;
                }
            }
            WaveSec5.x-=WaveMoveSpeed2;
            WaveSec6.x-=WaveMoveSpeed2;

        //--------------------地板分界线--------------------------//

         /*   if (GroundMoveA.x<=-1030){
                GroundMoveA.x=1020;
            }else{
                if(GroundMoveB.x<=-1030){
                    GroundMoveB.x=1020;
                }
            }
        GroundMoveA.x-=GroundMSpeed;
        GroundMoveB.x-=GroundMSpeed;
*/
        },0.01);



    },


});
