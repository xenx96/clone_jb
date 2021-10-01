

function globalSuccessMsg(msgKey){
//	toastr.success(Liferay.Language.get(msgKey), {timeout : 3000});
	liferayNotificationCall('info','success', msgKey);
}

function globalErrorMsg(msgKey){
//	toastr.error(Liferay.Language.get(msgKey), {timeout : 3000});
	liferayNotificationCall('danger','warning',msgKey);
}

function liferayNotificationCall(type, title, msgKey){
	var type = type;
	var title = title;
	var msgKey = msgKey;
	
	var liferayNotification = $('body').find('#alertContainer');
	if(liferayNotification.length > 0){
		liferayNotification.remove();
	}
	
	AUI().use('liferay-notification', function(A) {
		new Liferay.Notification({
			closeable: true,
			delay: {
				hide: 3000,
				show: 0
			},
			duration: 500,
			message: Liferay.Language.get(msgKey),
			render: true,
			title: Liferay.Language.get(title),
			type: type
		}).render('body');
	});
}

function bStart(){
	var type = 'square', // square, cube, cubegird
		html = '',
		overlayCSS = null,
		css = {
			border : '0',
			backgroundColor: 'transparent',
			color: 'inherit'
		};
	
	switch (type) {
	case 'square':
		html  = '<div class="square-spinner">';
		for(var i = 1; i <= 5; i++) {
			html += '<div class="rect' + i + '"></div>';
		} 
		html += '</div>';
		
		overlayCSS = {
			backgroundColor: '#fff',
			opacity: .85 
		};
		break;
		
	case 'cube':
		html  = '<div class="cube-spinner">';
		for(var i = 1; i <= 2; i++) {
			html += '<div class="cube' + i + '"></div>';
		} 
		html += '</div>';
		
		overlayCSS = {
				backgroundColor: '#fff',
				opacity: .85 
		};
		break;
		
	case 'cubegrid':
		html  = '<div class="cube-grid">';
		for(var i = 1; i <= 9; i++) {
			html += '<div class="cube cube' + i + '"></div>';
		} 
		html += '</div>';
		
		overlayCSS = {
				backgroundColor: '#fff',
				opacity: .85 
		};
		break;
		
	default:
		html = '<image src="/o/OSPDynamicInclude/images/loding.gif" style="width: 250px;height: 250px;" />';
		css = {
			border: 'none', 
			padding: '15px', 
			backgroundColor: '#f8f9fa', 
			'-webkit-border-radius': '10px', 
			'-moz-border-radius': '10px', 
			opacity: .5, 
			color: '#fff',
			top:'30%'
		};
		break;
	}
	
	$.blockUI({
		message: html,
		css: css, 
		overlayCSS: $.extend(true, {
			'-webkit-backdrop-filter': 'saturate(180%) blur(20px)',
			'backdrop-filter': 'saturate(180%) blur(20px)'
		}, overlayCSS)
	});
}

function bEnd(){
	setTimeout(function() {
		$.unblockUI();
		//왜 안지워지는 것이냐..
		$(document).find('.blockUI').fadeOut('normal', function() {
			$(this).remove(); 
		});
	}, 750);
}

/**
 * 공백없애기
 * str -> 공백을 제거할 Parameter
 * retrun 공백이 제거된 Parameter
 */
function spaceDelete(str){
	var sDstr = str.replace(/\s/g,'');
	return sDstr;
}

/**
 * 공백수정
 * str -> 공백을 변환할 Parameter
 * changeStr -> 공백을 변환할 문자
 * retrun 공백이 제거된 Parameter
 */
function spaceChange(str,changeStr){
	var sDstr = str.replace(/\s/g,changeStr);
	return sDstr;
}


/**
 *문자열이 null 일 경우 ""반환
 *
 */
function nullToStr(str){
	if(str==null||typeof str === "undefined"){
		return "";
	}else{
		return str;
	}
}

/**
 *문자열이 null 일 경우 ""반환
 *
 */
function nullToLong(long){
	if(long==null||typeof long =="undefined"){
		return 0;
	}else{
		return long;
	}
}

/**
 * 문자열 자르기
 * @param str 긴 문자열
 * @param limit 문자 길이
 * @returns {String}
 */
function cutStr(str,limit){
	var tmpStr = str;
	var byte_count = 0;
	var len = str.length;
	var dot = "";

	for(var i=0; i<len; i++){
		byte_count += getByte(str.charAt(i));
		if(byte_count == limit-1){
			if(getByte(str.charAt(i+1)) == 2){
				tmpStr = str.substring(0,i+1);
				dot = "...";
			}else {
				if(i+2 != len) dot = "...";
				tmpStr = str.substring(0,i+2);
			}
			break;
		}else if(byte_count == limit){
			if(i+1 != len) dot = "...";
				tmpStr = str.substring(0,i+1);
			break;
		}
	}
	return tmpStr+dot;
}


/**
* 항목 문자열 체크
* item - 항목 ID
* itemName - 항목명
* minLen - 최소Byte
* maxLen - 최대Byte
*/
function checkValue(item, itemName, minLen, maxLen){
	var check = true;
	var itemVal = item.value;
	var itemByte = getByte(itemVal);

	if( minLen!=0 ){	// 최소Byte 체크
		if( isEmpty(itemVal) ){
			alert("'"+itemName+"' 항목을 입력하세요.");
			check = false;
		} else if( itemByte<minLen ){
			alert("'"+itemName+"' 항목은 최소 "+minLen+" Byte (현재 "+itemByte+" Byte) 이상이어야 합니다.");
			check = false;
		}
	}

	if( check && maxLen!=0 ){	// 최대Byte 체크
		if( itemByte>maxLen ){
			alert("'"+itemName+"' 항목은 최대 "+maxLen+" Byte (현재 "+itemByte+" Byte) 이내이여야 합니다.");
			check = false;
		}
	}


	if( check ) {
		return true;
	} else {
		item.focus();
		return false;
	}
}

/**
* 문자열 길이 구하기
*/
function getByte(str) {
	var len = str.length;
	for (var i = 0; i < str.length; i++)
		if (str.charCodeAt(i) > 127 ) len++;
	return len;
}

/**
* 문자열 공백 제거 후 공백문자 인지 아닌지 확인
*/
function isEmpty(str) {
	var str = removeSpace(str);
	if( str.length==0 ) return true;
	else return false;
}

/**
* 문자열 공백제거
*/
function removeSpace(str) {
	return str.replace(/\s/gi, "" );
}


/**
* 양쪽 공백 제거 trim()
*/
function strTrim(str) {
	return str.replace(/(^\s*)|(\s*$)/gi, "");
}


/*
 * 대상 문자가 undefined, null , "null" 일 경우 "" 반환
 */
function strNull(str){
	if(str==null || str==undefined || str=="null"){
		str = "";
	}
	return str;
}

/*
 * 문자열 개인정보 보호 * 문자 치환
 * 4글자에 * 한개씩 추가
 * (ex. AA -> A*, AAAA -> A**A, AAAAAA -> AA**AA, AAAAAAAA -> AAA***AA)
 */
function privateTextConverter(privateText) {
	var replaceText = privateText;
	if(typeof privateText == 'string' || privateText instanceof String) {
		if(privateText.length > 1) {
			var reminder = -1;
			var quotient2 = parseInt(replaceText.length / 2);
			var quotient4 = parseInt(replaceText.length / 4);
			
			if(privateText.length > 2) {
				reminder += parseInt(replaceText.length % 2);
			} else {
				reminder = 0;
			}
			for(var i = 0; i < (quotient4 + 1); i++) {
				replaceText = replaceText.replaceAt(parseInt(quotient2 + i + reminder), "*");
			}
			return replaceText;
		}else {
			return privateText;
		}
	}
}

/*
 * 문자열 개인정보 보호 * 문자 치환2
 * 2의 배수로 증가
 * (ex. AA -> A*, AAAA -> AA**, AAAAAA -> AA****, AAAAAAAA -> AAA*****)
 */
function privateTextConverter2(privateText) {
	var replaceText = privateText;
	var power = 0;
	if(typeof privateText == 'string' || privateText instanceof String) {
		if(privateText.length > 1) {
			power++;
			for (var textLength = privateText.length; textLength > 2; textLength /= 2) {
				power++;
			}
			for (var i = power; i < privateText.length; i++) {
				replaceText = replaceText.replaceAt(i, "*");
			}
			return replaceText;
		}else {
			return privateText;
		}
	}
}

/*
 * E-mail 개인정보 보호 * 문자 치환 (@ 이전 문자열만 치환)
 */
function privateEmailConverter(emailText) {
	var replaceText = emailText;
	if(emailText.indexOf("@") > 0) {
		return privateTextConverter(replaceText.substr(0, replaceText.indexOf("@"))) + emailText.substr(emailText.indexOf("@"), emailText.length);
	}else {
		return privateTextConverter(replaceText);
	}
}

/*
 * E-mail 개인정보 보호 * 문자 치환2 (@ 이전 문자열만 치환)
 */
function privateEmailConverter2(emailText) {
	var replaceText = emailText;
	if(emailText.indexOf("@") > 0) {
		return privateTextConverter2(replaceText.substr(0, replaceText.indexOf("@"))) + emailText.substr(emailText.indexOf("@"), emailText.length);
	}else {
		return privateTextConverter2(replaceText);
	}
}

/*
 * 문자열의 index 번째 글자를 character로 치환해주는 함수
 */
String.prototype.replaceAt=function(index, character) {
	return this.substr(0, index) + character + this.substr(index+character.length);
}

function MM_jumpMenu(targ,selObj,restore){ //v3.0
	eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
	if (restore) selObj.selectedIndex=0;
}
function MM_swapImgRestore() { //v3.0
	var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
	var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
		var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
		if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
	var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
		d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
	if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
	for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
	if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
	var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
		if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

/*
 * Date 형식을 yyyy-mm-dd 로 변경
 */
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}


function onlyNumber(event){
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( (keyID >= 48 && keyID <= 57) || (keyID >= 96 && keyID <= 105) || keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
		return;
	else
		return false;
}

function removeChar(event) {
	event = event || window.event;
	var keyID = (event.which) ? event.which : event.keyCode;
	if ( keyID == 8 || keyID == 46 || keyID == 37 || keyID == 39 ) 
		return;
	else
		event.target.value = event.target.value.replace(/[^0-9]/g, "");
}




/**
 * form 객체 obj 형태로 return
 * 일반적으로 key, value 형태로 담김
 * 배열 형태의 name (ex: name[key])는 {name : [ { key, value}, ... ] 형태로 담김
 * 
 * @param {string} jquery selecot 표현식(select된 객체만 return)
 * @return {object} obj
 */
$.fn.serializeObject = function(selector) {
	var result = {};
	try {
		if (this.prop('tagName') && this.prop('tagName').toLowerCase() === 'form') {
			
			//workflow form data common serialize
			function serializer($form){
				var data = {},
					pushes = {};
				
				function makeObject(root, value) {
					var keys = root.match(/[a-z0-9_]+|(?=\[\])/gi),
						key;
					
					while ((key = keys.pop()) !== undefined) {
						//case : name[]
						if (/^$/.test(key)) {
							var idx = incrementPush(root.replace(/\[\]$/, ''));
							value = transData([], idx, value);
							
						//case : name[n]	
						}else if (/^\d+$/.test(key)) {
							value = transData([], key, value);
							
						//case : name[str]
						}else if (/^[a-z0-9_]+$/i.test(key)) {
							value = transData({}, key, value);
						}
					}
					return value;
				}
				
				function transData(self, key, value) {
					self[key] = value;
					return self;
				}
				
				function incrementPush(key) {
					if (pushes[key] === undefined) {
						pushes[key] = 0;
					}
					return pushes[key]++;
				}
				
				function addKey(key) {
					if (!/^[a-z_][a-z0-9_]*(?:\[(?:\d*|[a-z0-9_]+)\])*$/i.test(key.name)) return this;
					var obj = makeObject(key.name, encode(key));
					return $.extend(true, data, obj), this;
				}
				
				function addKeys(keys) {
					for (var i = 0, len = keys.length; i < len; i++) {
						this.addKey(keys[i]);
					}
					return this;
				}
				
				function encode(key) {
					switch ($('[name="' + key.name + '"]', this).attr('type')) {
					case 'checkbox':
						return key.value === "on" ? true : key.value;
					default:
						return key.value;
					}
				}
				
				function get() {
					return data;
				}
				
				this.addKey = addKey;
				this.addKeys = addKeys;
				this.get = get;
			}
			
			if (strNull(selector) !== '') {
				result = new serializer(this).addKeys(this.find(selector).serializeArray()).get();
			} else {
				result = new serializer(this).addKeys(this.serializeArray()).get();
			}
		}
	} catch (e) {
		console.log('serializeObject function error : %o', e.message);
	}
	return result;
};