/*

 @author : Dinesh Kumar Sisodiya
 @email : erdscs@gmail.com
 
 Require : Fusion charts lib(FusionCharts XT Trial Version) // https://www.fusioncharts.com
 Functions : drawChart()
 Features : draw charts easily by using less code

*/


// definition of constructor for chart
function Chart() {

    this.chartType = {
                "line":"line",
                "bar":"bar2d",
                "bar2d":"bar2d",
                "bar3d":"bar3d",
                "pie":"pie2d",
                "pie2d":"pie2d",
                "pie3d":"pie3d",
                "column":"column2d",
                "column2d":"column2d",
                "column3d":"column3d",
                "angulargauge":"angulargauge",
                "gauge":"angulargauge",
                "msLine":"msLine",
                "msBar":"msBar2d",
                "msBar2d":"msBar2d",
                "msColumn":"msColumn2d",
                "msColumn2d":"msColumn2d",
                "stackedColumn":"stackedColumn2d",
                "stackedColumn2d":"stackedColumn2d",
                "ms2yAxis":"mscombidy2d",
                "msCombiDY":"mscombidy2d",
                "circular":"circular",
    },

    this.drawChart = function(chType,data,options) {
        var chType = chType.toLowerCase(); //if string is passed ignoring case senstivity

    if(chType=='circular') {

        if(document.getElementById(options.renderAt)){
             var animOn=(options.animate==null?1:options.animate==0?0:1);
             var renderOnElem = document.getElementById(options.renderAt); 
             renderOnElem.setAttribute("style",'margin:5px auto;font-family: segoe ui;color: #292929;font-weight: 700;text-transform: capitalize;width:'+(options.width==null?150:options.width)+'px;');
             
             var caption=(options.caption==null?"":'<div class="captionText" style="text-align:center;margin:1px auto;color:'+(options.captionColor==null?"#292929;":options.captionColor+';')+'">'+options.caption+'</div>');
             var subCaption=(options.subCaption==null?"":'<div class="captionText" style="font-weight:lighter;text-align:center;margin-top:1px;margin-bottom:6px;color:'+(options.subCaptionColor==null?"#292929;":options.subCaptionColor+';')+'">'+options.subCaption+'</div>');
             var svgCircle = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"' + 
                             'id="'+options.renderAt+'"><path class="stroke-out" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"' +
                             'fill="'+(options.bgColor==null?"#ccc":options.bgColor)+'" stroke="'+(options.strokeOutColor==null?"#eee":options.strokeOutColor)+'" stroke-width="'+(options.strokeOutWidth==null?"2.5":options.strokeOutWidth)+'"></path>'+
                             '<path class="stroke-in" stroke-dasharray="'+(data==null?"0":data)+', 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"' +
                             'fill="none" stroke="'+(options.strokeInColor==null?"#ff9f00":options.strokeInColor)+'" stroke-width="'+(options.strokeInWidth==null?"2.5":options.strokeInWidth)+'" stroke-linecap="'+(options.strokeType==null?"butt":options.strokeType)+'"' +
                             'style="'+(animOn==1?"animation: fillProgress 1s ease-out forwards;":"animation:none")+'"></path>' +
                             '<text x="18" y="20.35" class="data-value" fill="'+(options.textColor==null?"#444":options.textColor)+'" style="font-weight: lighter;font-family:'+ (options.textFontName==null?"segoe ui":options.textFontName) +';'+ (animOn==1?"animation: loadText 1s ease-in forwards;":"opacity:1;animation:none")+'">'+data+'%</text></svg>';

             renderOnElem.innerHTML=svgCircle + caption + subCaption;
        }
        else {
            console.error('Please specify renderAt key correctly');
        }

    } else {

        var multiSeries=false;
        FusionCharts.ready(function () {
             function divLineCosmetic() {
                     return '"divlineAlpha" : "'+(options.divlineAlpha==null?"100":options.divlineAlpha)+'",' +
                            '"divlineColor" : "'+(options.divlineColor==null?"#999999":options.divlineColor)+'",' +
                            '"divlineThickness" : "'+(options.divlineThickness==null?"1":options.divlineThickness)+'",' +
                            '"divLineIsDashed" : "'+(options.divLineIsDashed==null?"1":options.divLineIsDashed)+'",' +
                            '"divLineDashLen" : "'+(options.divLineDashLen==null?"3":options.divLineDashLen)+'",' +
                            '"divLineGapLen" : "'+(options.divLineGapLen==null?"1":options.divLineGapLen)+'",' +
                            '"numVDivLines": "'+(options.numVDivLines==null?"0":options.numVDivLines)+'",' +
                            '"vDivLineColor": "'+(options.vDivLineColor==null?"#99ccff":options.vDivLineColor)+'",' +
                            '"vDivLineThickness": "'+(options.vDivLineThickness==null?"1":options.vDivLineThickness)+'",' +
                            '"vDivLineAlpha": "'+(options.vDivLineAlpha==null?"90":options.vDivLineAlpha)+'",' +
                            '"vDivLineIsDashed": "'+(options.vDivLineIsDashed==null?"1":options.vDivLineIsDashed)+'",';
            }

            function axisLineCosmetic() {
                     return '"showXAxisLine" : "'+(options.showXAxisLine==null?"1":options.showXAxisLine)+'",' +
                            '"xAxisLineThickness" : "'+(options.xAxisLineThickness==null?"1":options.xAxisLineThickness)+'",' +
                            '"xAxisLineColor" : "'+(options.xAxisLineColor==null?"#999999":options.xAxisLineColor)+'",' +
                            '"xAxisLineThickness" : "'+(options.xAxisLineThickness==null?"1":options.xAxisLineColor)+'",' +
                            '"showAlternateHGridColor" : "'+(options.showAlternateHGridColor==null?"0":options.showAlternateHGridColor)+'",' +
                            '"alternateHGridAlpha": "'+(options.alternateHGridAlpha==null?"100":options.alternateHGridAlpha)+'",' +
                            '"showYAxisLine" : "'+(options.showYAxisLine==null?"0":options.showYAxisLine)+'",' +
                            '"yAxisLineThickness" : "'+(options.yAxisLineThickness==null?"1":options.yAxisLineThickness)+'",' +
                            '"yAxisLineColor" : "'+(options.yAxisLineColor==null?"#999999":options.yAxisLineColor)+'",' +
                            '"yAxisLineThickness" : "'+(options.yAxisLineThickness==null?"1":options.yAxisLineColor)+'",';
            }

            function alternateGrid() {
                 return '"showAlternateVGridColor" : "'+(options.showAlternateVGridColor==null?"0":options.showAlternateVGridColor)+'",' +
                        '"alternateVGridAlpha": "'+(options.alternateVGridAlpha==null?"100":options.alternateVGridAlpha)+'",';
            }

            function gredientFill() {
                 return '"usePlotGradientColor": "'+(options.usePlotGradientColor==null?"0":options.usePlotGradientColor)+'",' +
                        '"plotGradientColor": "'+(options.plotGradientColor==null?"1":options.plotGradientColor)+'",' +
                        '"plotFillRatio": "'+(options.plotFillRatio==null?"30 : 70":options.plotFillRatio)+'",' +
                        '"plotFillAngle": "'+(options.plotFillAngle==null?"270":options.plotFillAngle)+'",';
            }

            function anchorCosmetic() {
                     return '"drawAnchors" : "'+(options.drawAnchors==null?"1":options.drawAnchors)+'",' +
                            '"anchorAlpha": "'+(options.anchorAlpha==null?"100":options.anchorAlpha)+'",' +
                            '"anchorRadius": "'+(options.anchorRadius==null?"3":options.anchorRadius)+'",' +
                            '"anchorHoverRadius": "'+(options.anchorHoverRadius==null?"5":options.anchorHoverRadius)+'",' +
                            '"anchorBorderColor": "'+(options.anchorBorderColor==null?"#0075c2":options.anchorBorderColor)+'",' +
                            '"anchorSides": "'+(options.anchorSides==null?"1":options.anchorSides)+'",' +
                            '"anchorBgColor": "'+(options.anchorBgColor==null?"#ffffff":options.anchorBgColor)+'",' +
                            '"anchorBorderHoverColor": "'+(options.anchorBorderHoverColor==null?"#0075a0":options.anchorBorderHoverColor)+'",' +
                            '"anchorBgHoverColor": "'+(options.anchorBgHoverColor==null?"#ffffff":options.anchorBgHoverColor)+'",' +
                            '"anchorBorderThickness": "'+(options.anchorBorderThickness==null?"1":options.anchorBorderThickness)+'",' +
                            '"anchorBorderHoverThickness" : "'+(options.anchorBorderHoverThickness==null?"1":options.anchorBorderHoverThickness)+'",';
            }

            function tooltipCosmetic() {
                    return  '"plottooltext": "<span id=\'label\'>$label</span>{br}<div id=\'value\'>$dataValue</div>",';
            }

            function legendCosmetic() {
                return '"showBorder": "'+(options.showBorder==null?"0":options.showBorder)+'",'
                     + '"showLegend": "'+(options.showLegend==null?"1":options.showLegend)+'",'
                     + '"showPercentValues": "'+(options.showPercentValues==null?"1":options.showPercentValues)+'",'
                     + '"showPercentInToolTip": "'+(options.showPercentInToolTip==null?"0":options.showPercentInToolTip)+'",'
                     + '"legendPosition" : "'+(options.legendPosition==null?"bottom":options.legendPosition)+'",'
                     + '"legendCaption" : "'+(options.legendCaption==null?"Legends":options.legendCaption)+'",'
                     + '"legendScrollBgColor": "'+(options.legendScrollBgColor==null?"#cccccc":options.legendScrollBgColor)+'",'
                     + '"legendScrollBarColor": "'+(options.legendScrollBarColor==null?"#999999":options.legendScrollBarColor)+'",'
                     + '"legendItemFontSize": "10",'
                     + '"legendItemFontColor": "#666666",';
            }

            function axisNames() {
                return '"xAxisName": "'+(options.xAxisName==null?"":options.xAxisName)+'",' +
                       '"yAxisName": "'+(options.yAxisName==null?"":options.yAxisName)+'",';
            }


            var tempDSChart = '{' +
                            '"caption": "'+(options.caption==null?"":options.caption)+'",' +  
                            '"subCaption": "'+(options.subCaption==null?"":options.subCaption)+'",' +
                            '"showLegend": "'+(options.showLegend==null?"1":options.showLegend)+'",' +
                            '"theme": "'+(options.theme==null?"fint":options.theme)+'",' +
                            '"numberPrefix": "'+(options.numberPrefix==null?"":options.numberPrefix)+'",' +
                            '"numbersuffix": "'+(options.numbersuffix==null?"":options.numbersuffix)+'",' + 
                            '"canvasPadding": "'+(options.canvasPadding==null?10:options.canvasPadding)+'",' +
                            '"paletteColors" : "'+(options.paletteColors==null?"#0075c2":options.paletteColors)+'",' +
                            '"baseFontColor" : "'+(options.baseFontColor==null?"#333333":options.baseFontColor)+'",' +
                            '"baseFont" : "'+(options.baseFont==null?"Helvetica Neue, Arial":options.baseFont)+'",' +
                            '"captionFontSize" : "'+(options.captionFontSize==null?"14":options.captionFontSize)+'",' +
                            '"subcaptionFontSize" : "'+(options.subCaptionFontSize==null?"14":options.subCaptionFontSize)+'",' +
                            '"subcaptionFontBold" : "'+(options.captionFontSize==null?"0":options.captionFontSize)+'",' +
                            '"showBorder" : "'+(options.showBorder==null?"0":options.showBorder)+'",' +
                            '"bgColor" : "'+(options.bgColor==null?"#ffffff":options.bgColor)+'",' +
                            '"showShadow" : "'+(options.showShadow==null?"0":options.showShadow)+'",' +
                            '"canvasBgColor" : "'+(options.canvasBgColor==null?"#ffffff":options.canvasBgColor)+'",' +
                            '"canvasBorderAlpha" : "'+(options.canvasBorderAlpha==null?"0":options.canvasBorderAlpha)+'",'+
                            '"valueFontSize": "'+(options.valueFontSize==null?"13":options.valueFontSize)+'",'+
                            '"chartBottomMargin": "10",'+
                            '"chartTopMargin": "10",'+
                            '"chartLeftMargin": "10",'+
                            '"chartRightMargin": "10",'+
                            '"formatnumberscale": "'+(options.formatNumberScale==null?"1":options.formatNumberScale)+'",';
            
            switch(chType) {
                case 'line':
                    tempDSChart+='"lineThickness" : "'+(options.lineThickness==null?"2":options.lineThickness) +'",'
                            + '"valueFontColor": "'+(options.valueFontColor==null?"#555555":options.valueFontColor)+'",'
                            + '"showValues": "'+(options.showValues==null?1:options.showValues)+'",'
                            + axisNames()
                            + divLineCosmetic()
                            + axisLineCosmetic()
                            + alternateGrid()
                            + anchorCosmetic()
                            + tooltipCosmetic();
                    break;
                case 'column2d':
                    tempDSChart+='"lineThickness" : "'+(options.lineThickness==null?"2":options.lineThickness) +'",'
                            + axisNames()
                            + divLineCosmetic()
                            + axisLineCosmetic()
                            + alternateGrid()
                            + tooltipCosmetic()
                            + '"placevaluesInside": "1",'
                            + '"rotatevalues": "'+ (options.rotateValues==null?"1":options.rotateValues) +'",'
                            + '"valueFontColor": "'+(options.valueFontColor==null?"#000000":options.valueFontColor)+'",'
                            + '"showValues": "'+(options.showValues==null?1:options.showValues)+'",';
                        
                    break;
                case 'column3d':
                    tempDSChart+='"lineThickness" : "'+(options.lineThickness==null?"2":options.lineThickness) +'",'
                            + '"showValues": "'+(options.showValues==null?0:options.showValues)+'",'
                            + axisNames()
                            + divLineCosmetic()
                            + axisLineCosmetic()
                            + alternateGrid()
                            + tooltipCosmetic()
                            + '"placevaluesInside": "1",'
                            + '"rotatevalues": '+ (options.rotateValues==null?"1":options.rotateValues) +',';
                    break;
                case 'bar2d':
                    tempDSChart+='"lineThickness" : "'+(options.lineThickness==null?"2":options.lineThickness)+'",'
                            + '"showValues": "'+(options.showValues==null?1:options.showValues)+'",'
                            + axisNames()
                            + axisLineCosmetic()
                            + alternateGrid()
                            + tooltipCosmetic() 
                            + gredientFill()
                            + '"valueFontColor": "'+(options.valueFontColor==null?"#000000":options.valueFontColor)+'",';
                    break;
                case 'bar3d':
                    tempDSChart+='"lineThickness" : "'+(options.lineThickness==null?"2":options.lineThickness)+'",'
                            + '"showValues": "'+(options.showValues==null?"0":options.showValues)+'",'
                            + axisNames()
                            + axisLineCosmetic()
                            + alternateGrid()
                            + tooltipCosmetic() 
                            + gredientFill();
                    break;
                case 'pie2d':
                    tempDSChart+='"lineThickness" : "'+(options.lineThickness==null?"2":options.lineThickness)+'",'
                            + '"showValues": "'+(options.showValues==null?"1":options.showValues)+'",'
                            + tooltipCosmetic()
                            + legendCosmetic()
                            + '"valueFontColor": "'+(options.valueFontColor==null?"#333333":options.valueFontColor)+'",'
                            + '"pieRadius": "'+(options.pieRadius==null?undefined:options.pieRadius)+'",';
                    break;
                case 'pie3d':
                    tempDSChart+='"lineThickness" : "'+(options.lineThickness==null?"2":options.lineThickness)+'",'
                            + '"showValues": "'+(options.showValues==null?1:options.showValues)+'",'
                            + tooltipCosmetic()
                            + legendCosmetic()
                            + '"valueFontColor": "'+(options.valueFontColor==null?"#333333":options.valueFontColor)+'",';
                    break;
                case 'angulargauge':
                    tempDSChart+= '"lowerLimit": "'+(options.lowerLimit==null?"0":options.lowerLimit)+'",'
                                + '"upperLimit": "'+(options.upperLimit==null?"undefined":options.upperLimit)+'",'
                                + '"showValue": "'+(options.showValues==null?"0":options.showValues)+'",' 
                                + '"valueBelowPivot": "1",';
                    break;
                case 'msline':
                    tempDSChart+='"drawCrossLine": "'+(options.drawCrossLine==null?"1":options.drawCrossLine)+'",'
                               + '"crossLineColor":"'+(options.crossLineColor==null?"#0d0d0d":options.crossLineColor)+'",'
                               + '"crossLineAlpha":"'+(options.crossLineAlpha==null?"90":options.crossLineAlpha)+'",'
                               + '"showValues": "'+(options.showValues==null?0:options.showValues)+'",'
                               + axisNames()
                               + axisLineCosmetic()
                               + legendCosmetic() 
                               + alternateGrid()
                               + divLineCosmetic();
                    multiSeries=true;

                    break;
                case 'mscolumn2d':
                    tempDSChart +='"placevaluesInside": "0",'
                                + '"showValues": "'+(options.showValues==null?"1":options.showValues)+'",'
                                + '"rotatevalues": "1",'
                                + '"valueFontColor": "'+(options.valueFontColor==null?"#000000":options.valueFontColor)+'",'
                                + axisNames()
                                + axisLineCosmetic()
                                + legendCosmetic() 
                                + alternateGrid()
                                + divLineCosmetic();
                    multiSeries=true;
                    
                    break;
                case 'stackedcolumn2d':
                    tempDSChart +='"placevaluesInside": "1",'
                                + '"showValues": "'+(options.showValues==null?0:options.showValues)+'",'
                                + '"valueFontColor": "'+(options.valueFontColor==null?"#000000":options.valueFontColor)+'",'
                                + axisNames()
                                + axisLineCosmetic()
                                + legendCosmetic() 
                                + alternateGrid()
                                + divLineCosmetic();
                    multiSeries=true;
                    break;
                case "msbar2d":
                    tempDSChart +='"placevaluesInside": "1",'
                                + '"showValues": "'+(options.showValues==null?1:options.showValues)+'",'
                                + '"valueFontColor": "'+(options.valueFontColor==null?"#000000":options.valueFontColor)+'",'
                                + axisNames()
                                + axisLineCosmetic()
                                + legendCosmetic() 
                                + alternateGrid()
                                + divLineCosmetic();
                    multiSeries=true;
                    break;

            }

            tempDSChart=tempDSChart.slice(0,-1);

            tempDSChart += '}'; // completing chart obj

            var DSChartObj = JSON.parse(tempDSChart);
            
            var dataSource=null;

            //check if chart contains multi series
            if (multiSeries) {
                dataSource = {
                        "chart": DSChartObj,
                        "categories": [{
                            "category":data[0].category,
                        }],
                        "dataset":data[0].series,
                        "trendlines": options.trendLines,
                } 

            } else {

                if(chType=='angulargauge') {

                    var dialValues=data[data.length-1];
                    
                    if(Array.isArray(dialValues))
                        data.pop(); //remove last element if it is dailValue array
                    else 
                        dialValues=0;

                    dataSource = {
                        "chart": DSChartObj,
                        "colorRange": {
                            "color": data
                        },
                        "dials": {
                            "dial": dialValues,
                        },
                        "trendPoints": {
                            "point": options.trendPoints,
                        }
                    }  

                }
                else if (chType=='pie2d'||chType=='pie3d') {
                    dataSource = {
                        "chart": DSChartObj,
                        "data": data,
                    }            
                } else {
                    var trendLines =  [
                        {
                             "line":  options.trendLines
                        } 
                    ];
                    dataSource = {
                        "chart": DSChartObj,
                        "data": data,
                        "trendlines": trendLines,
                    } 
                }
            }

                       var fsnChart = new FusionCharts({
                            type: chType==null?window.console.error('Error : Chart Type not Defined'):chType,
                            renderAt: options.renderAt==null?"":options.renderAt,
                            width: options.width,
                            height: options.height,
                            dataFormat: 'json',
                            dataSource: dataSource,
                       });

                    // rendering the chart
                    fsnChart.render();    
        });
    } //else ended

    }        
}

/*
    - Define the data array , using this chart will be drawn
    - Data is required
    - For customize specific anchor properties describe in the data array related to that point
    - To draw vertical line on any value add required key-values in data array.
*/
