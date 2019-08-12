$(document).ready(function(){
	var sub = $('#sub');
	var activeRow     //激活的一级菜单中的行
	var activeMeau    //对于的二级菜单
	var timer
	var mouseinsub=false;
	sub
	.on('mouseenter',function(){
		mouseinsub=ture;
	})
	.on('mouseleave',function(){
		mouseinsub=false;
	})
	$('#test')
	  .on('mouseenter',function(e){
		sub.removeClass('none');
	  })
	  .on('mouseleave',function(e){
	  		sub.addClass('none');
	
	  if(activeRow){
		  activeRow.removeClass('active');
		   activeRow=null
	  }
	  if(activeMeau){
		 activeMeau.addClass('none');
		 activeMeau=null
	  }
   })
   .on('mouseenter','li',function(e){ //给每个列表项绑定事件
	   if(!activeRow){
		   activeRow=$(e.target).addClass('active');      //激活的列表项指向事件的元素
		   activeMeau=$('#'+activeRow.data('id'));
		   activeMeau.removeClass('none');
		   return
		   }
	if(timer){            //事件触发计时器还没有执行--》清掉
		clearTimeout(timer);
	}
	timer = setTimeout(function(){
		if(mouseinsub){
			return
		}
	    activeRow.removeClass('active')        //上一次状态
		activeMeau.addClass('none')
		activeRow = $(e.target)
		activeRow.addClass('active')
		activeMeau=$('#'+activeRow.data('id'));
		activeMeau.removeClass('none');
		timer = null;
	},300)

   })
})
