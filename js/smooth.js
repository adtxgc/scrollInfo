var oriData=[	{"account":"刘洋","subject":"语文","paperCount":"2","accuracy":"91","phoneCharge":"5"},
			{"account":"刘晓明","subject":"英语","paperCount":"3","accuracy":"94","phoneCharge":"10"},
			{"account":"张三","subject":"数学","paperCount":"2","accuracy":"95","phoneCharge":"5"},
			{"account":"李四","subject":"物理","paperCount":"1","accuracy":"94","phoneCharge":"15"},
			{"account":"郑成功","subject":"语文","paperCount":"2","accuracy":"95","phoneCharge":"5"},
			{"account":"张小杰","subject":"英语","paperCount":"3","accuracy":"89","phoneCharge":"10"},
			{"account":"曹小雷","subject":"语文","paperCount":"2","accuracy":"90","phoneCharge":"5"},
			{"account":"余嘉锡","subject":"物理","paperCount":"1","accuracy":"95","phoneCharge":"15"}];

$(function(){
	var config={
	"data":oriData,
	"itemCount":5,
	"type":"hero",
	"frequency":3,
	};
	RollInfo.Create(config);
	
})
