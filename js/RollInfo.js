/**
 * 创建可以滚动显示的信息条目。首先设置配置项，然后初始化RollInfo即可。
 * 本模块使用JQuery中部分方法，必须先引入JQuery文件。本模块实例数据源格
 * 式已确定，只对英雄榜有效。 可根据数据源格式，自行扩展要展示的信息。
 * 例如：var config={
 * 					"data":[],		//设置数据源,数组类型
 * 					"itemCount":"5",//设置可以显示的信息条目数量
 * 					"frequency":1,	//设置滚动速度 不小于0的整数
 * 				"type":"" //设置要展示的动态类型，"hero"展示英雄榜
 * 					}
 * 		 RollInfo.Create(config);
 *
 * author xwliu@iflytek.com
 * version 0.2
 */

var RollInfo = {
	Create: function(data) {
		rollInfo.checkData(data);
		rollInfo.clearRefresh();
		rollInfo.initList();
		rollInfo.createRollInfo();
		rollInfo.bindEvent();
	}
}

var rollInfo = (function() {
			var rollInfo = {
				rollNode: $("#smoothRoll"),
				rollList: '',
				listHeight: '',
				index: '',
				lastPosition: '',
				config: '',
				length: '',
				checkData: function(data) {
					this.config = data;
					this.length = this.config && this.config.data &&
						this.config.data.constructor.prototype == Array.prototype && this.config.data.length;
					if (!this.length) {
						this.rollNode.css("text-align", "center").html("<p>暂无数据或数据格式错误</p>");
						return true;
					}
				},
				/**
				 * 清除当前刷新动作
				 */
				clearRefresh: function() {
					if (this.index && this.index != 0) {
						clearInterval(this.index);
					}
					if (!this.lastPosition) {
						this.lastPosition = 0;
					}
				},
				/**
				 * 处理字符串
				 * @param str
				 * @returns {string}
				 * @private
				 */
				_processStr: function(str) {
					var afterStr = str.substring(0, 4);
					return afterStr;
				},
				/**
				 * 创建单个信息条目
				 * @param {Object} item
				 */
				_createItem: function(item) {
					var html = '<li>';
					//可以扩展展示不同类型信息条目
					switch (this.config.type) {
						case "hero":
							html += this._processStr(item.account) + "同学完成" + item.paperCount + "套" + item.subject + "期末冲刺包练习，正确率" + Math.round(item.accuracy) + "%";
							html += "，获得" + item.phoneCharge + "元话费";
							break;
						default:
							html += "type类型参数配置出错";
							break;
					}
					html += '</li>';
					return html;
				},
				/**
				 * 创建信息列表
				 */
				_createList: function() {
					var html = '';
					for (var j = 0; j < this.length; j++) {
						html += this._createItem(this.config.data[j]);
					}
					return html;
				},
				/**
				 *
				 * 移除创建的信息列表
				 */
				_removeList: function() {
					var list = $(this.rollNode).find("li");
					for (var i = 0; i < this.length; i++) {
						$(list[i]).remove();
					}
				},
				/**
				 * 初始化显示列表
				 */
				initList: function() {
					if (!$($(this.rollNode).find("p")).length) {
						this.rollNode.html('<ul></ul>');
						this.rollList = $(this.rollNode).find("ul");
						this.rollNode.height(10);
						$(this.rollList).append(this._createList());
						$(this.rollList).append(this._createList());
						var itemHeight = $($(this.rollList).find("li")[0]).outerHeight(true);
						this.rollNode.height(this.config.itemCount * itemHeight);
						this.listHeight = this.length * itemHeight;
					}
				},
				/**
				 * 滚动数据展示
				 */
				createRollInfo: function() {
					var _this = this;
					if (this.config.frequency <= 0) {
						return false;
					}
					_this.index = setInterval(function() {
						$(_this.rollList).css({
							"top": -_this.lastPosition
						});
						_this.lastPosition++;
						if (_this.lastPosition >= _this.listHeight) {
							_this._removeList();
							$(_this.rollList).append(_this._createList());
							_this.lastPosition = 0;
						}
					}, 100 / this.config.frequency);
				},
				/**
				 * 绑定鼠标滑过事件
				 */
				bindEvent: function() {
					var _this = this;
					_this.rollNode.on("mouseover", function() {
						_this.clearRefresh();
					});
					_this.rollNode.on("mouseout", function() {
						_this.createRollInfo();
					})
				}
			};

			return rollInfo;
})();
