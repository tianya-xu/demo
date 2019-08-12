//块模式降低全局污染
(function(){             //内容菜单栏
	var Menubar =function(){
		this.el =document.querySelector('#sidebar ul'); //querySelector() 方法返回文档中匹配指定 CSS 选择器的一个元素。
	    this.state = 'allClosed';  //所有状态关闭  有一个菜单项内容被打开，状态就更新为hasOpened
		this.el.addEventListener('click',function(e){
			e.stopPropagation();                                     //阻止向上传播
		});                                                         //阻止事件冒泡	
	    
		var self=this; 
		this.currentOpenedMenuContent=null;
		this.menuList = document.querySelectorAll('#sidebar ul > li');
		for(var i=0;i<this.menuList.length;i++){
			this.menuList[i].addEventListener('click',function(e){
				var menuContentEl=document.getElementById(e.currentTarget.id+'-content');  //菜单内容项的id值 currentTarget 事件属性返回其监听器触发事件的节点，即当前处理该事件的元素、文档或窗口。
				/* console.log(menuContentEl); */             //currentTarget点击事件发生时当前的element元素
				if(self.state=='allClosed'){
					console.log('打开'+menuContentEl.id);
					menuContentEl.style.top='0';
					menuContentEl.style.left='-85px';
					menuContentEl.className='nav-content';
					menuContentEl.classList.add('menuContentEl-move-right');    //为元素添加class   
					self.state='hasopened';
					self.currentOpenedMenuContent =menuContentEl;
				}else{
					console.log('关闭'+self.currentOpenedMenuContent.id);
					self.currentOpenedMenuContent.className='nav-content';
					self.currentOpenedMenuContent.style.top='0';
					self.currentOpenedMenuContent.style.left='35px';  //上次动画的终止位置
					self.currentOpenedMenuContent.classList.add('menuContentEl-move-left');
			    	console.log('打开'+menuContentEl.id);
					menuContentEl.className='nav-content';
					menuContentEl.style.top='250px';
					menuContentEl.style.left='35px';
					menuContentEl.classList.add('menuContentEl-move-up');
					self.state='hasopened';
					self.currentOpenedMenuContent =menuContentEl;
				}
			});
		}
		this.menuContentList=document.querySelectorAll('.nav-content > div.nav-con-close');
		for(i=0;i<this.menuContentList.length;i++){
			this.menuContentList[i].addEventListener('click',function(e){
				var menuContent = e.currentTarget.parentNode;
				 menuContent.className='nav-content';
				 menuContent.style.top='0';
				 menuContent.style.left='35px';
				 menuContent.classList.add('meauContentEl-move-left');
				 that.state='allClosed';
			});
			
		}
	};
	var Sidebar=function(eid,closebarid){
	   this.state='opened';//状态
	   this.el=document.getElementById(eid||'sidebar');   //代表sidebar的el
	   this.closebarel=document.getElementById(closebarid||'closebar');    //关闭按钮
	   var self=this;
	   this.menubar = new Menubar();  //将meaubar作为属性传进，在生成sidebar同时也生成了一个meaubar，把它作为sidebar的一个属性
	   this.el.addEventListener('click',function(event){
		   if(event.target !== self.el){     //不等于本身时响应了菜单项或者关闭项
			   self.triggerSwitch();
		   }
	   });   //关闭按钮的事件响应函数 click事件的回调函数event
	};
	/* sidebar关闭函数 */
	Sidebar.prototype.close=function(){
		console.log('关闭sidebar');
		this.el.className='sidebar-move-left';
		this.closebarel.className='closebar-move-right';
		this.state='closed';
		
		
		this.el.style.left=0+'px';
		this.closebarel.style.left=0+'px';
		
	};
	Sidebar.prototype.open=function(){
		console.log('打开sidebar');
		this.el.style.left = '-120px';
		this.el.className='sidebar-move-right';
		this.closebarel.style.left='160px';
		this.closebarel.className='closebar-move-left';
		this.state='opened';

	};     //两个行为
	Sidebar.prototype.triggerSwitch=function(){
		if(this.state=='opened'){
			this.close();
		}else{
			this.open();
		}
	};          //变量值为函数对象建议用分号
	var sidebar =new Sidebar();
	
	
})();