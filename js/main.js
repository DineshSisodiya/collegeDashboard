/*
  variable meaning
	ei - engagement insight
	fi - follower insight
	Gtype - type of data to draw graph (i.e. interested,ready...)
	allItems - tells about how much data to fetch ( both fi & ei or specific only )
	dataSet - stores chart data values 
	clgId - id of the college 
*/
	
	var clgId='fmsdelhi';//null

	var Gtype = [0,0];
	var dateFormat = 'dd-mm-yy';

	var date = new Date();
	var dd=date.getDate();
	var mm=date.getMonth()+1;
	var yy=date.getFullYear();
	var toDate = (dd<10?'0'+dd:dd)+'-'+(mm<10?'0'+mm:mm)+'-'+yy;
	var fromDate = (dd<10?'0'+dd:dd)+'-'+(mm-1<10?'0'+(mm-1):mm-1)+'-'+yy;

	// stop mannual entery of date
	$("input[name='from_date']").attr("readonly", "readonly");
	$("input[name='to_date']").attr("readonly", "readonly");

	// initially set period to last one month from today
	$("input[name='from_date']").val(fromDate);
	$("input[name='to_date']").val(toDate);

	$("input[name='from_date']").on('click',function(){
		$("input[name='from_date']").val(null);
	});
	$("input[name='to_date']").on('click',function(){
		$("input[name='to_date']").val(null);
	});

	$("input[name='from_date']").datepicker({
		dateFormat:dateFormat,
		onSelect:function(selected) {
			$("input[name='to_date']").datepicker('option','minDate',selected);
		}
	}).val();
	$("input[name='to_date']").datepicker({
		dateFormat:dateFormat,
		onSelect:function(selected) {
			$("input[name='from_date']").datepicker('option','maxDate',selected);
		}
	}).val();


	// autoload whole data on page load
 	if (fromDate!=''&&toDate!='') {
 			fetchData(Gtype,fromDate,toDate,clgId,true);
 	}

	function fetchData(Gtype,fromDate,toDate,clgId,all=1) {
		var dataString={
				'from':fromDate,
				'to':toDate,
				'Gtype':Gtype, /* if allItems=true then both index will have int values else 0->string, 1->int. */
				'allItems':all, /* 1 - to fetch both fi & ei; 0 - to update single chart*/
				'clgId':clgId
			}

		$.ajax({
			type:'post',
	      	url:'./modules/fetch.php',
	      	dataType: 'json',
	      	data: JSON.stringify(dataString),
	      	contentType: 'application/json; charset=utf-8',
			success:function(res) {
						if(Gtype[0]=='fi'||Gtype[0]=='ei') {
							reDrawChart(res);
						}
						else {
							setAllData(res);
						}
			       }
		});
	}

	var dataSet=null;
	// set data into graph and categories
	function setAllData(res) {
		console.log(res.data);
		$('#interest_num').empty().text(res.data.fi.interested);
		$('#ready_num').empty().text(res.data.fi.ready);
		$('#notReady_num').empty().text(res.data.fi.notReady);
		$('#revoked_num').empty().text(res.data.fi.revoked);
		
		$('#queries_num').empty().text(res.data.ei.queries);
		$('#bookmarks_num').empty().text(res.data.ei.bookmarks);
		$('#avgRespTime').empty().text(res.data.fi.avgRespTime);
		
		dataSet=res.data;
		$("input[name='chartInit']").val(true).triggerHandler('change');
	}

	function reDrawChart(res) {
		dataSet=res.data;
		console.log(dataSet);
		$("input[name='reDrawChart']").val(true).triggerHandler('change');
	}

 	$("input[name='dates_submit_btn']").on('click',function(){
 		fromDate = $("input[name='from_date']").val();
 		toDate = $("input[name='to_date']").val();
 		Gtype[0] = $("select[name='fi_type']").val();
 		Gtype[1] = $("select[name='ei_type']").val();
 		if (fromDate!=''&&toDate!='') {
 			fetchData(Gtype,fromDate,toDate,clgId,1);
 		} else {
 			alert('please enter both Start & End date');
 		}
 	});


 	function updateChart(category,sub_category) {
 		fromDate = $("input[name='from_date']").val();
 		toDate = $("input[name='to_date']").val();
 		if (fromDate!=''&&toDate!='') {
 			Gtype=[category,sub_category];
 			// console.log(Gtype);
 			fetchData(Gtype,fromDate,toDate,clgId,0);
 		} else {
 			alert('please enter both Start & End date');
 		}
 	}


