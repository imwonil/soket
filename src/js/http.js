(function(e,t) {

console.log(e,"amsep")

})(window)
	
	var TYPE = "VCAT";
	var TYPE2 = "NICEVCAT";
	var FS = '\x1C';
	var H7 = '\x07';
	var sendbuf;
	var iFlag = '0';
	 
	const nowTime = moment().format('yy-MM-DD hh:mm')
	
	var log = document.getElementById("log");

	
	function handleClick(myRadio)
	{        
		 
		//alert(myRadio.value);			
		if(myRadio.value == 'credit') //신용승인
		{
			sendbuf = "NICEVCAT" + H7 + "0200" + FS + "10" + FS + "C" + FS + form.money.value + FS + form.tax.value + FS + form.bongsa.value + FS + form.halbu.value + FS + "" + FS + "" + FS + "" + FS + "" + FS + FS + FS + "" + FS + FS + FS + FS + ""+ FS + H7;						
		}
		
		else if(myRadio.value == 'credit_cancel') //신용취소
		{
			sendbuf = "NICEVCAT" + H7 + "0420" + FS + "10" + FS + "C" + FS + form.money.value + FS + form.tax.value + FS + form.bongsa.value + FS + form.halbu.value + FS + form.agreenum.value + FS + form.agreedate.value + FS + form.catid.value + FS + FS + FS + FS + form.myunse.value + FS + FS + FS + FS + "" + FS + H7;
		}
		
		
		form.SendData.value = sendbuf;		
		console.log( form.catid.value , form.myunse.value,"219")	
					
	}	

  

	
 var TYPE = "VCAT";
 var TYPE2 = "NICEVCAT";
 var FS = '\x1C';
 var H7 = '\x07';
 var sendbuf;
 var iFlag = '0';
		function reqVCAT_HTTP(myRadio) //VCAT 클릭 이벤트 함수  함수 
		{ 	
			var sendMsg;	
			var RecvData;
			
			form.RecvData.value = "";
			sendMsg = form.SendData.value;	
		    
				
			if(sendMsg.length == 0)
				alert("거래 유형을 선택해주세요");
			else{				
				if(sendMsg == "REQ_STOP")
				{	

					sendbuf = make_send_data(sendMsg);	
							
					
					$.ajax
						({ url         : "http://127.10.0.1:9189"    
						 , type        : "POST"
						 , dataType    : "text"
						 //, timeout     : $("#vanpReqTimeOut").val()
						 , data        : encodeURI(sendbuf)
						 , success     : function(data) {							
							form.RecvData.value = data;	
							
						 
						 }
					});			
					 
				}
				else 
				{		
					//요청 시 중복방지로직을 필수로 처리해주세요. 
					if(iFlag == '0')
					{

						
						sendbuf = make_send_data(sendMsg);
						iFlag = '1';
						
						$.ajax
							({ url         : "http://127.0.0.1:9188"    
							 , type        : "POST"
							 , dataType    : "text"				 
							 , data        : encodeURI(sendbuf)
							 , success     : function(data) {							
								form.RecvData.value = data;							
								iFlag = '0';
								
								
							 }
							 , error       : function(request, status, error) {
								if(sendMsg == "RESTART" || sendMsg == "NVCATSHUTDOWN")
								{
									//응답 받지 않아서 예외 처리
								}
								else
									alert('AJAX 통신 실패! NVCAT 실행 여부 확인!');
								iFlag = '0';
							 }
						});		
					}
					else	
						alert('버튼 중복 클릭');				
				}
			}			
				 			
		}			
		
		
		function make_send_data(senddata) {
			var m_sendmsg;
			var m_totlen;
			var m_bodylen;

			m_bodylen = senddata.NCbyteLength();
			m_totlen = 12 + m_bodylen;

			return NCpad(m_totlen,4) + "VCAT    " + NCpad(m_bodylen,4) + senddata;
			
		}

		String.prototype.NCbyteLength = function(){
			var l=0;
			
			for(var idx = 0; idx < this.length; idx++){
				var c = escape(this.charAt(idx));

				if(c.length == 1) l++;
				else if(c.indexOf("%u") != -1) l += 3;
				else if(c.indexOf("%") != -1) l += c.length/3; //JDK20210427 : UTF-8기준. EUC-KR은 /2로 수정 필요.
			}
			
			return l;
		};

		
		function NCpad(n,width)
		{
			n = n + '';
			return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
		}

			
