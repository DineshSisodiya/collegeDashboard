
// var data  = [
//                 {
//                    /* 
//                       - adding vertical line on specific data point
//                       - add this block wherever you want to add vertical line
//                    */
//                     // "vline": Boolean ( true| false ),
//                     // "label": <string>,
//                     // "linePosition" : <number 0 to 1>,
//                     // "color": <hex color code>,
//                     // "thickness": <number>,
//                     // "alpha": <number 0 to 100>,
//                     // "labelVAlign": "middle",
//                     // "labelHAlign": "left" |"right",
//                     // "dashed":"1", 
//                     // "dashLen":"4",
//                     // "dashGap":"2"
//                 },
//                 {
//                     "label": "Mon",
//                     "value": "15123",

                    
//                         - to customize specific anchor point uncomment
//                           attributes written below and paste on every
//                           objects in data array on which customization 
//                           is desired 
                    

//                     // "anchorRadius": "17",
//                     // "anchorHoverRadius": "18",
//                     // "displayValue" :<string>,
//                     // "tooltext" :<string>,
//                     // "anchorImageUrl":"",
//                 },
//                 {
//                     "label": "Tue",
//                     "value": "14233",
//                 },
//                 {
//                     "label": "Wed",
//                     "value": "23507",
//                 },
//                 {
//                     "label": "Thu",
//                     "value": "9110",
//                 },
//                 {
//                     "label": "Fri",
//                     "value": "15529",
//                 },
//                 {
//                     "label": "Sat",
//                     "value": "20803", 
//                 },
//                 {
//                     "label": "Sun",
//                     "value": "19202",
//                 },
//    ];

/*
    - define the trendLines object for drawing any trendline
    - this is optional
*/
// var trendLines = [
//                 {
//                     "startValue": "18500",
//                     "dashed" : "0",
//                     "endValue": "18500",
//                     "color": "#1aaf5d",
//                     "displayValue": "Average{br}weekly{br}footfall",
//                     "valueOnRight" : "1",
//                     "thickness" : "2"
//                 }
//     ];
/*
    - define the options in options object
        i.e. width,height and other design options
    - renderAt is required key in options object
*/


//initialize chart
var admitoChart = new Chart();

$("input[name='chartInit']").change(function(){
    /* FI section */
    var opObjFiLine={
        id:"fiLineChart",
        caption:"Interested",
        subCaption:"users",
        xName:"Days",
        yName:"Count"
    }
    lineChartDrawer(opObjFiLine,dataSet.fi.lineChart);

    var opObjFiPie={
        id:"fiPieChart",
        caption:"Follower Insight",
        subCaption:"users",
        xName:"Days",
        yName:"Count"
    }
    pieChartDrawer(opObjFiPie,dataSet.fi.pieChart);

    /* EI section */
    var opObjEiLine={
        id:"eiLineChart",
        caption:"Follower Insight",
        subCaption:"users",
        xName:"Days",
        yName:"Count"
    }
    lineChartDrawer(opObjEiLine,dataSet.ei.lineChart);
/* avg response time will be defined later*/
    // var opObjEiBar={
    //     id:"eiBarChart",
    //     caption:"Response Time",
    //     subCaption:"across Admito",
    //     xName:"Days",
    //     yName:"Count"
    // }
    // barChartDrawer(opObjEiBar,dataSet.ei.barChart);
/* avg response time will be defined later*/
});


$("input[name='reDrawChart']").change(function(){
    // console.log(Gtype);
    var opObj=null;
    var caption='';
    var subCaption='';
    if(Gtype[0]=='fi') {
        switch(Gtype[1]) {
            case 0:
                caption='Interested';
                subCaption='Users';
                break;
            case 1:
                caption='Ready to Engage';
                subCaption='Users';
                break;
            case 2:
                caption='Not yet Ready';
                subCaption='Users';
                break;
            case 3:
                caption='Revoked';
                subCaption='Users';
                break;
            default:
               console.log('Wrong option passed in Follower Insights');
               break;
        }
        opObj={
            id:"fiLineChart",
            caption:caption,
            subCaption:subCaption,
            xName:"Days",
            yName:"Count"
        }
    }
    else if(Gtype[0]=='ei') {
        switch(Gtype[1]) {
            case 0:
                caption='Queries asked';
                subCaption='by Users';
                break;
            case 1:
                caption='Total Bookmarks';
                subCaption='by Users';
                break;
            case 2:
                caption='Average Response Time';
                // subCaption='';
                break;
            default:
                console.log('Wrong option passed in Engagement Insights');
                break;
        }
        opObj={
            id:"eiLineChart",
            caption:caption,
            subCaption:subCaption,
            xName:"Days",
            yName:"Count"
        }
    }
    lineChartDrawer(opObj,dataSet);
});

function lineChartDrawer(opObj,data) {
    var options = {
            "renderAt":opObj.id, 
            "caption":opObj.caption,
            "subCaption":opObj.subCaption,
            "xAxisName":opObj.xName,
            "yAxisName":opObj.yName,
            "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000,#1aaf5d,#f45b00",
            "theme": "fint",
    }
    
    admitoChart.drawChart(admitoChart.chartType.line,data,options);
}
function pieChartDrawer(opsObj,data) { 
    var options = {
            "renderAt":opsObj.id, 
            "caption":opsObj.caption,
            "subCaption":opsObj.subCaption,
            "xAxisName":opsObj.xName,
            "yAxisName":opsObj.yName,
            "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000,#1aaf5d,#f45b00",
            "theme": "fint",
    }
    admitoChart.drawChart(admitoChart.chartType.pie2d,data,options);
}

function barChartDrawer(opObj,data) {
    var options = {
            "renderAt":opObj.id, 
            "caption":opObj.caption,
            "subCaption":opObj.subCaption,
            "xAxisName":opObj.xName,
            "yAxisName":opObj.yName,
            "paletteColors": "#0075c2,#1aaf5d,#f2c500,#f45b00,#8e0000,#1aaf5d,#f45b00",
            "theme": "fint",
    }
    admitoChart.drawChart(admitoChart.chartType.column2d,data,options);
}


// var trendLines = [
//                 {
//                     "startValue": "18500",
//                     "dashed" : "0",
//                     "endValue": "18500",
//                     "color": "#1aaf5d",
//                     "displayValue": "Average{br}weekly{br}footfall",
//                     "valueOnRight" : "1",
//                     "thickness" : "2"
//                 }
//     ];


