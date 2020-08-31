//获取背景
var main = document.getElementById("main");
//获取所有图片容器
var hit_img = document.querySelectorAll(".hit_img")
//获取进度条
var progress = document.querySelector(".progress")
//获取分数div
var scoreItem = document.querySelector(".allScore")
//向上计时器
var upTimer = null;
//向下计时器
var downTimer_ = null;
//初始图片索引-1；
var imgNum = -1;
//图片样式，hit_img1为歪风，hit_img为正气，歪风出现概率为80%；
var img_class = ['hit_img1', 'hit_img2','hit_img','hit_img3', 'hit_img4']
//判断是否击打
var isHit = false;
//分数
var score = 0;
//rand代表歪风或者正气出现洞口,rand1代表出现的是歪风还是正气
var rand=0,rand1=0;
function random_() {
	rand = parseInt(Math.random() * 9)
	rand1 = parseInt(Math.random() * 5)
}
var classname = null;
//为每个图片添加点击事件
function click_() {
	for(var i = 0; i < hit_img.length; i++) {
		hit_img[i].onclick = function() {
			isHit = true;
			//保存本次点击的图片的class名，用来判断点击的是歪风还是正气
			classname = this.className;
			//进入判断
			judge();
		}
	}
}
//判断
var hah = 0;//防止重复击打，加两次判断；
function judge() {
	hah++;
	if(hah == 1) {
		if(isHit) {
			{	//当点击之后，让图片索引变为9，出现被打动画
				imgNum = 9;
				if(classname == 'hit_img1') {
					score += 10;
				}
				if(classname == 'hit_img2') {
					score += 10;
				}
				if(classname == 'hit_img3') {
					score += 10;
				}
				if(classname == 'hit_img4') {
					score += 10;
				}
				if(classname == 'hit_img') {
					score -= 10;
				}
				scoreItem.innerHTML = score + '分'
				isHit = false;
				down();//点击之后开始往下
			}
		}
	}
}
//向上
function up() {
	var h_num = 6;
	upTimer = setInterval(function() {
		imgNum++;
		if(imgNum < h_num) {
			hit_img[rand].style.display = 'block';
			hit_img[rand].className = img_class[rand1]
			hit_img[rand].style.backgroundPosition = -imgNum * 108 + 'px 0';
		} else {
			clearInterval(upTimer);
			//歪风或正气出洞口之后，停留一段时间在下去。
			upTimeout = setTimeout(function() {
				down();
			}, 500)
		}
	}, 50)
}

//向下
function down() {
	downTimer_ = setInterval(function() {
		imgNum--;
		if(imgNum > -1) {
			hit_img[rand].style.backgroundPosition = -imgNum * 108 + 'px 0';
		} else {
			hah = 0;
			hit_img[rand].style.display = 'none'
			downTimer = setTimeout(function() {
				imgNum = 0;
				clearTimer();
				random_();
				progressTimer();
				up();
			}, 100);
		}
	}, 50)
}
//清楚所有定时器
function clearTimer() {
	var timer = setInterval(function() {}, 1);
	for(var i = 0; i < timer; i++) {
		clearInterval(i);
	}
}
//时间条
var progress_time = progress.offsetWidth;
var scoring=document.querySelector(".scoring")
function progressTimer() {
	setInterval(function() {
		//progress_time--;
		progress_time=progress_time-1.1;
		progress.style.width = progress_time + 'px';
				//console.log(progress.style.width);
		if(progress_time <= 0) {
			clearTimer();
			gameReStart.style.display = 'block';
			{if(score >= 80) {
			scoring.innerHTML='总分:'+score+'分'+'，挑战成功';}
			else{scoring.innerHTML='总分:'+score+'分'+'，挑战失败';}}
		}
	}, 100)
}
//界面
var start_btn = document.querySelector(".start_btn");
var gameStart = document.querySelector(".start");
var Restart_btn = document.querySelector(".restart_btn");
var gameReStart = document.querySelector(".restart");
start_btn.onclick = start;
Restart_btn.onclick = restart;
//开始游戏
function start() {
	gameStart.style.display = 'none'
	up();
	click_();
	random_();
	progressTimer();
}
//重新开始
function restart() {
//	history.go('0');
	gameReStart.style.display = 'none';
	for(var i=0;i<hit_img.length;i++){
		hit_img[i].style.display='none'
	}
	up();
	click_();
	random_();
	progress_time=222;
	progressTimer();
	score=0;
	scoreItem.innerHTML =  '0分';
	scoring.innerHTML='总分:'+score+'分'
}
//	var game_over=document.querySelector(".close")
//	game_over.onclick=function(){
//		window.close()
//	}

