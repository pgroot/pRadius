AmCharts.AmSerialChart=AmCharts.Class({inherits:AmCharts.AmRectangularChart,construct:function(a){this.type="serial";AmCharts.AmSerialChart.base.construct.call(this,a);this.cname="AmSerialChart";this.theme=a;this.createEvents("changed");this.columnSpacing=5;this.columnSpacing3D=0;this.columnWidth=0.8;this.updateScrollbar=!0;var b=new AmCharts.CategoryAxis(a);b.chart=this;this.categoryAxis=b;this.zoomOutOnDataUpdate=!0;this.mouseWheelScrollEnabled=this.rotate=this.skipZoom=!1;this.minSelectedTime=
    0;AmCharts.applyTheme(this,a,this.cname)},initChart:function(){AmCharts.AmSerialChart.base.initChart.call(this);this.updateCategoryAxis(this.categoryAxis,this.rotate,"categoryAxis");this.dataChanged&&(this.updateData(),this.dataChanged=!1,this.dispatchDataUpdated=!0);var a=this.chartCursor;a&&a.updateData();var a=this.countColumns(),b=this.graphs,c;for(c=0;c<b.length;c++)b[c].columnCount=a;this.updateScrollbar=!0;this.drawChart();this.autoMargins&&!this.marginsUpdated&&(this.marginsUpdated=!0,this.measureMargins());
    this.mouseWheelScrollEnabled&&this.addMouseWheel()},handleWheelReal:function(a,b){if(!this.wheelBusy){var c=this.categoryAxis,d=c.parseDates,c=c.minDuration(),e=1;b&&(e=-1);0>a?d?this.endTime<this.lastTime&&this.zoomToDates(new Date(this.startTime+e*c),new Date(this.endTime+1*c)):this.end<this.chartData.length-1&&this.zoomToIndexes(this.start+e,this.end+1):d?this.startTime>this.firstTime&&this.zoomToDates(new Date(this.startTime-e*c),new Date(this.endTime-1*c)):0<this.start&&this.zoomToIndexes(this.start-
e,this.end-1)}},validateData:function(a){this.marginsUpdated=!1;this.zoomOutOnDataUpdate&&!a&&(this.endTime=this.end=this.startTime=this.start=NaN);AmCharts.AmSerialChart.base.validateData.call(this)},drawChart:function(){AmCharts.AmSerialChart.base.drawChart.call(this);var a=this.chartData;if(AmCharts.ifArray(a)){var b=this.chartScrollbar;b&&b.draw();if(0<this.realWidth&&0<this.realHeight){var a=a.length-1,c,b=this.categoryAxis;if(b.parseDates&&!b.equalSpacing){if(b=this.startTime,c=this.endTime,
    isNaN(b)||isNaN(c))b=this.firstTime,c=this.lastTime}else if(b=this.start,c=this.end,isNaN(b)||isNaN(c))b=0,c=a;this.endTime=this.startTime=this.end=this.start=void 0;this.zoom(b,c)}}else this.cleanChart();this.dispDUpd();this.chartCreated=!0},cleanChart:function(){AmCharts.callMethod("destroy",[this.valueAxes,this.graphs,this.categoryAxis,this.chartScrollbar,this.chartCursor])},updateCategoryAxis:function(a,b,c){a.chart=this;a.id=c;a.rotate=b;a.axisRenderer=AmCharts.RecAxis;a.guideFillRenderer=AmCharts.RecFill;
    a.axisItemRenderer=AmCharts.RecItem;a.setOrientation(!this.rotate);a.x=this.marginLeftReal;a.y=this.marginTopReal;a.dx=this.dx;a.dy=this.dy;a.width=this.plotAreaWidth-1;a.height=this.plotAreaHeight-1;a.viW=this.plotAreaWidth-1;a.viH=this.plotAreaHeight-1;a.viX=this.marginLeftReal;a.viY=this.marginTopReal;a.marginsChanged=!0},updateValueAxes:function(){AmCharts.AmSerialChart.base.updateValueAxes.call(this);var a=this.valueAxes,b;for(b=0;b<a.length;b++){var c=a[b],d=this.rotate;c.rotate=d;c.setOrientation(d);
    d=this.categoryAxis;if(!d.startOnAxis||d.parseDates)c.expandMinMax=!0}},updateData:function(){this.parseData();var a=this.graphs,b,c=this.chartData;for(b=0;b<a.length;b++)a[b].data=c;0<c.length&&(this.firstTime=this.getStartTime(c[0].time),this.lastTime=this.getEndTime(c[c.length-1].time))},getStartTime:function(a){var b=this.categoryAxis;return AmCharts.resetDateToMin(new Date(a),b.minPeriod,1,b.firstDayOfWeek).getTime()},getEndTime:function(a){var b=AmCharts.extractPeriod(this.categoryAxis.minPeriod);
    return AmCharts.changeDate(new Date(a),b.period,b.count,!0).getTime()-1},updateMargins:function(){AmCharts.AmSerialChart.base.updateMargins.call(this);var a=this.chartScrollbar;a&&(this.getScrollbarPosition(a,this.rotate,this.categoryAxis.position),this.adjustMargins(a,this.rotate))},updateScrollbars:function(){AmCharts.AmSerialChart.base.updateScrollbars.call(this);this.updateChartScrollbar(this.chartScrollbar,this.rotate)},zoom:function(a,b){var c=this.categoryAxis;c.parseDates&&!c.equalSpacing?
    this.timeZoom(a,b):this.indexZoom(a,b);this.updateLegendValues()},timeZoom:function(a,b){var c=this.maxSelectedTime;isNaN(c)||(b!=this.endTime&&b-a>c&&(a=b-c,this.updateScrollbar=!0),a!=this.startTime&&b-a>c&&(b=a+c,this.updateScrollbar=!0));var d=this.minSelectedTime;if(0<d&&b-a<d){var e=Math.round(a+(b-a)/2),d=Math.round(d/2);a=e-d;b=e+d}var g=this.chartData,e=this.categoryAxis;if(AmCharts.ifArray(g)&&(a!=this.startTime||b!=this.endTime)){var k=e.minDuration(),d=this.firstTime,n=this.lastTime;a||
(a=d,isNaN(c)||(a=n-c));b||(b=n);a>n&&(a=n);b<d&&(b=d);a<d&&(a=d);b>n&&(b=n);b<a&&(b=a+k);b-a<k/5&&(b<n?b=a+k/5:a=b-k/5);this.startTime=a;this.endTime=b;c=g.length-1;k=this.getClosestIndex(g,"time",a,!0,0,c);g=this.getClosestIndex(g,"time",b,!1,k,c);e.timeZoom(a,b);e.zoom(k,g);this.start=AmCharts.fitToBounds(k,0,c);this.end=AmCharts.fitToBounds(g,0,c);this.zoomAxesAndGraphs();this.zoomScrollbar();a!=d||b!=n?this.showZB(!0):this.showZB(!1);this.updateColumnsDepth();this.dispatchTimeZoomEvent()}},indexZoom:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       b){var c=this.maxSelectedSeries;isNaN(c)||(b!=this.end&&b-a>c&&(a=b-c,this.updateScrollbar=!0),a!=this.start&&b-a>c&&(b=a+c,this.updateScrollbar=!0));if(a!=this.start||b!=this.end){var d=this.chartData.length-1;isNaN(a)&&(a=0,isNaN(c)||(a=d-c));isNaN(b)&&(b=d);b<a&&(b=a);b>d&&(b=d);a>d&&(a=d-1);0>a&&(a=0);this.start=a;this.end=b;this.categoryAxis.zoom(a,b);this.zoomAxesAndGraphs();this.zoomScrollbar();0!==a||b!=this.chartData.length-1?this.showZB(!0):this.showZB(!1);this.updateColumnsDepth();this.dispatchIndexZoomEvent()}},
    updateGraphs:function(){AmCharts.AmSerialChart.base.updateGraphs.call(this);var a=this.graphs,b;for(b=0;b<a.length;b++){var c=a[b];c.columnWidthReal=this.columnWidth;c.categoryAxis=this.categoryAxis;AmCharts.isString(c.fillToGraph)&&(c.fillToGraph=this.getGraphById(c.fillToGraph))}},updateColumnsDepth:function(){var a,b=this.graphs,c;AmCharts.remove(this.columnsSet);this.columnsArray=[];for(a=0;a<b.length;a++){c=b[a];var d=c.columnsArray;if(d){var e;for(e=0;e<d.length;e++)this.columnsArray.push(d[e])}}this.columnsArray.sort(this.compareDepth);
        if(0<this.columnsArray.length){b=this.container.set();this.columnSet.push(b);for(a=0;a<this.columnsArray.length;a++)b.push(this.columnsArray[a].column.set);c&&b.translate(c.x,c.y);this.columnsSet=b}},compareDepth:function(a,b){return a.depth>b.depth?1:-1},zoomScrollbar:function(){var a=this.chartScrollbar,b=this.categoryAxis;a&&this.updateScrollbar&&(b.parseDates&&!b.equalSpacing?a.timeZoom(this.startTime,this.endTime):a.zoom(this.start,this.end),this.updateScrollbar=!0)},updateTrendLines:function(){var a=
        this.trendLines,b;for(b=0;b<a.length;b++){var c=a[b],c=AmCharts.processObject(c,AmCharts.TrendLine,this.theme);a[b]=c;c.chart=this;AmCharts.isString(c.valueAxis)&&(c.valueAxis=this.getValueAxisById(c.valueAxis));c.valueAxis||(c.valueAxis=this.valueAxes[0]);c.categoryAxis=this.categoryAxis}},zoomAxesAndGraphs:function(){if(!this.scrollbarOnly){var a=this.valueAxes,b;for(b=0;b<a.length;b++)a[b].zoom(this.start,this.end);a=this.graphs;for(b=0;b<a.length;b++)a[b].zoom(this.start,this.end);this.zoomTrendLines();
        (b=this.chartCursor)&&b.zoom(this.start,this.end,this.startTime,this.endTime)}},countColumns:function(){var a=0,b=this.valueAxes.length,c=this.graphs.length,d,e,g=!1,k,n;for(n=0;n<b;n++){e=this.valueAxes[n];var l=e.stackType;if("100%"==l||"regular"==l)for(g=!1,k=0;k<c;k++)d=this.graphs[k],d.hidden||d.valueAxis!=e||"column"!=d.type||(!g&&d.stackable&&(a++,g=!0),!d.stackable&&d.clustered&&a++,d.columnIndex=a-1,d.clustered||(d.columnIndex=0));if("none"==l||"3d"==l)for(k=0;k<c;k++)d=this.graphs[k],!d.hidden&&
    d.valueAxis==e&&"column"==d.type&&d.clustered&&(d.columnIndex=a,a++);if("3d"==l){for(n=0;n<c;n++)d=this.graphs[n],d.depthCount=a;a=1}}return a},parseData:function(){AmCharts.AmSerialChart.base.parseData.call(this);this.parseSerialData()},getCategoryIndexByValue:function(a){var b=this.chartData,c,d;for(d=0;d<b.length;d++)b[d].category==a&&(c=d);return c},handleCursorChange:function(a){this.updateLegendValues(a.index)},handleCursorZoom:function(a){this.updateScrollbar=!0;this.zoom(a.start,a.end)},handleScrollbarZoom:function(a){this.updateScrollbar=
        !1;this.zoom(a.start,a.end)},dispatchTimeZoomEvent:function(){if(this.prevStartTime!=this.startTime||this.prevEndTime!=this.endTime){var a={type:"zoomed"};a.startDate=new Date(this.startTime);a.endDate=new Date(this.endTime);a.startIndex=this.start;a.endIndex=this.end;this.startIndex=this.start;this.endIndex=this.end;this.startDate=a.startDate;this.endDate=a.endDate;this.prevStartTime=this.startTime;this.prevEndTime=this.endTime;var b=this.categoryAxis,c=AmCharts.extractPeriod(b.minPeriod).period,
        b=b.dateFormatsObject[c];a.startValue=AmCharts.formatDate(a.startDate,b);a.endValue=AmCharts.formatDate(a.endDate,b);a.chart=this;a.target=this;this.fire(a.type,a)}},dispatchIndexZoomEvent:function(){if(this.prevStartIndex!=this.start||this.prevEndIndex!=this.end){this.startIndex=this.start;this.endIndex=this.end;var a=this.chartData;if(AmCharts.ifArray(a)&&!isNaN(this.start)&&!isNaN(this.end)){var b={chart:this,target:this,type:"zoomed"};b.startIndex=this.start;b.endIndex=this.end;b.startValue=a[this.start].category;
        b.endValue=a[this.end].category;this.categoryAxis.parseDates&&(this.startTime=a[this.start].time,this.endTime=a[this.end].time,b.startDate=new Date(this.startTime),b.endDate=new Date(this.endTime));this.prevStartIndex=this.start;this.prevEndIndex=this.end;this.fire(b.type,b)}}},updateLegendValues:function(a){var b=this.graphs,c;for(c=0;c<b.length;c++){var d=b[c];isNaN(a)?d.currentDataItem=void 0:d.currentDataItem=this.chartData[a].axes[d.valueAxis.id].graphs[d.id]}this.legend&&this.legend.updateValues()},
    getClosestIndex:function(a,b,c,d,e,g){0>e&&(e=0);g>a.length-1&&(g=a.length-1);var k=e+Math.round((g-e)/2),n=a[k][b];if(1>=g-e){if(d)return e;d=a[g][b];return Math.abs(a[e][b]-c)<Math.abs(d-c)?e:g}return c==n?k:c<n?this.getClosestIndex(a,b,c,d,e,k):this.getClosestIndex(a,b,c,d,k,g)},zoomToIndexes:function(a,b){this.updateScrollbar=!0;var c=this.chartData;if(c){var d=c.length;0<d&&(0>a&&(a=0),b>d-1&&(b=d-1),d=this.categoryAxis,d.parseDates&&!d.equalSpacing?this.zoom(c[a].time,this.getEndTime(c[b].time)):
        this.zoom(a,b))}},zoomToDates:function(a,b){this.updateScrollbar=!0;var c=this.chartData;if(this.categoryAxis.equalSpacing){var d=this.getClosestIndex(c,"time",a.getTime(),!0,0,c.length),c=this.getClosestIndex(c,"time",b.getTime(),!1,0,c.length);this.zoom(d,c)}else this.zoom(a.getTime(),b.getTime())},zoomToCategoryValues:function(a,b){this.updateScrollbar=!0;this.zoom(this.getCategoryIndexByValue(a),this.getCategoryIndexByValue(b))},formatPeriodString:function(a,b){if(b){var c=["value","open","low",
        "high","close"],d="value open low high close average sum count".split(" "),e=b.valueAxis,g=this.chartData,k=b.numberFormatter;k||(k=this.numberFormatter);for(var n=0;n<c.length;n++){for(var l=c[n],h=0,f=0,m,u,p,s,y,w=0,r=0,q,t,v,z,B,A=this.start;A<=this.end;A++){var x=g[A];if(x&&(x=x.axes[e.id].graphs[b.id])){if(x.values){var C=x.values[l];if(!isNaN(C)){isNaN(m)&&(m=C);u=C;if(isNaN(p)||p>C)p=C;if(isNaN(s)||s<C)s=C;h+=C;f++;y=h/f}}if(x.percents&&(x=x.percents[l],!isNaN(x))){isNaN(q)&&(q=x);t=x;if(isNaN(v)||
        v>x)v=x;if(isNaN(z)||z<x)z=x;w+=x;r++;B=w/r}}}w={open:q,close:t,high:z,low:v,average:B,sum:w,count:r};a=AmCharts.formatValue(a,{open:m,close:u,high:s,low:p,average:y,sum:h,count:f},d,k,l+"\\.",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=AmCharts.formatValue(a,w,d,this.percentFormatter,"percents\\."+l+"\\.")}}return a},formatString:function(a,b,c){var d=b.graph;if(-1!=a.indexOf("[[category]]")){var e=b.serialDataItem.category;if(this.categoryAxis.parseDates){var g=this.balloonDateFormat,
        k=this.chartCursor;k&&(g=k.categoryBalloonDateFormat);-1!=a.indexOf("[[category]]")&&(g=AmCharts.formatDate(e,g),-1!=g.indexOf("fff")&&(g=AmCharts.formatMilliseconds(g,e)),e=g)}a=a.replace(/\[\[category\]\]/g,String(e))}d=d.numberFormatter;d||(d=this.numberFormatter);e=b.graph.valueAxis;(g=e.duration)&&!isNaN(b.values.value)&&(e=AmCharts.formatDuration(b.values.value,g,"",e.durationUnits,e.maxInterval,d),a=a.replace(RegExp("\\[\\[value\\]\\]","g"),e));e="value open low high close total".split(" ");
        g=this.percentFormatter;a=AmCharts.formatValue(a,b.percents,e,g,"percents\\.");a=AmCharts.formatValue(a,b.values,e,d,"",this.usePrefixes,this.prefixesOfSmallNumbers,this.prefixesOfBigNumbers);a=AmCharts.formatValue(a,b.values,["percents"],g);-1!=a.indexOf("[[")&&(a=AmCharts.formatDataContextValue(a,b.dataContext));return a=AmCharts.AmSerialChart.base.formatString.call(this,a,b,c)},addChartScrollbar:function(a){AmCharts.callMethod("destroy",[this.chartScrollbar]);a&&(a.chart=this,this.listenTo(a,"zoomed",
        this.handleScrollbarZoom));this.rotate?void 0===a.width&&(a.width=a.scrollbarHeight):void 0===a.height&&(a.height=a.scrollbarHeight);this.chartScrollbar=a},removeChartScrollbar:function(){AmCharts.callMethod("destroy",[this.chartScrollbar]);this.chartScrollbar=null},handleReleaseOutside:function(a){AmCharts.AmSerialChart.base.handleReleaseOutside.call(this,a);AmCharts.callMethod("handleReleaseOutside",[this.chartScrollbar])}});AmCharts.Cuboid=AmCharts.Class({construct:function(a,b,c,d,e,g,k,n,l,h,f,m,u,p,s){this.set=a.set();this.container=a;this.h=Math.round(c);this.w=Math.round(b);this.dx=d;this.dy=e;this.colors=g;this.alpha=k;this.bwidth=n;this.bcolor=l;this.balpha=h;this.colors=g;this.dashLength=p;this.pattern=s;u?0>b&&0===f&&(f=180):0>c&&270==f&&(f=90);this.gradientRotation=f;0===d&&0===e&&(this.cornerRadius=m);this.draw()},draw:function(){var a=this.set;a.clear();var b=this.container,c=this.w,d=this.h,e=this.dx,g=
    this.dy,k=this.colors,n=this.alpha,l=this.bwidth,h=this.bcolor,f=this.balpha,m=this.gradientRotation,u=this.cornerRadius,p=this.dashLength,s=this.pattern,y=k,w=k;"object"==typeof k&&(y=k[0],w=k[k.length-1]);var r,q,t,v,z,B,A,x,C,D=n;s&&(n=0);if(0<e||0<g)A=w,w=AmCharts.adjustLuminosity(y,-0.2),w=AmCharts.adjustLuminosity(y,-0.2),r=AmCharts.polygon(b,[0,e,c+e,c,0],[0,g,g,0,0],w,n,1,h,0,m),0<f&&(C=AmCharts.line(b,[0,e,c+e],[0,g,g],h,f,l,p)),q=AmCharts.polygon(b,[0,0,c,c,0],[0,d,d,0,0],w,n,1,h,0,m),q.translate(e,
    g),0<f&&(t=AmCharts.line(b,[e,e],[g,g+d],h,f,l,p)),v=AmCharts.polygon(b,[0,0,e,e,0],[0,d,d+g,g,0],w,n,1,h,0,m),z=AmCharts.polygon(b,[c,c,c+e,c+e,c],[0,d,d+g,g,0],w,n,1,h,0,m),0<f&&(B=AmCharts.line(b,[c,c+e,c+e,c],[0,g,d+g,d],h,f,l,p)),w=AmCharts.adjustLuminosity(A,0.2),A=AmCharts.polygon(b,[0,e,c+e,c,0],[d,d+g,d+g,d,d],w,n,1,h,0,m),0<f&&(x=AmCharts.line(b,[0,e,c+e],[d,d+g,d+g],h,f,l,p));n=D;1>Math.abs(d)&&(d=0);1>Math.abs(c)&&(c=0);b=0===d?AmCharts.line(b,[0,c],[0,0],h,f,l,p):0===c?AmCharts.line(b,
    [0,0],[0,d],h,f,l,p):0<u?AmCharts.rect(b,c,d,k,n,l,h,f,u,m,p):AmCharts.polygon(b,[0,0,c,c,0],[0,d,d,0,0],k,n,l,h,f,m,!1,p);d=0>d?[r,C,q,t,v,z,B,A,x,b]:[A,x,q,t,v,z,r,C,B,b];for(r=0;r<d.length;r++)(q=d[r])&&a.push(q);s&&b.pattern(s)},width:function(a){this.w=a;this.draw()},height:function(a){this.h=a;this.draw()},animateHeight:function(a,b){var c=this;c.easing=b;c.totalFrames=1E3*a/AmCharts.updateRate;c.rh=c.h;c.frame=0;c.height(1);setTimeout(function(){c.updateHeight.call(c)},AmCharts.updateRate)},
    updateHeight:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b&&(b=a.easing(0,a.frame,1,a.rh-1,b),a.height(b),setTimeout(function(){a.updateHeight.call(a)},AmCharts.updateRate))},animateWidth:function(a,b){var c=this;c.easing=b;c.totalFrames=1E3*a/AmCharts.updateRate;c.rw=c.w;c.frame=0;c.width(1);setTimeout(function(){c.updateWidth.call(c)},AmCharts.updateRate)},updateWidth:function(){var a=this;a.frame++;var b=a.totalFrames;a.frame<=b&&(b=a.easing(0,a.frame,1,a.rw-1,b),a.width(b),setTimeout(function(){a.updateWidth.call(a)},
        AmCharts.updateRate))}});AmCharts.CategoryAxis=AmCharts.Class({inherits:AmCharts.AxisBase,construct:function(a){this.cname="CategoryAxis";AmCharts.CategoryAxis.base.construct.call(this,a);this.minPeriod="DD";this.equalSpacing=this.parseDates=!1;this.position="bottom";this.startOnAxis=!1;this.firstDayOfWeek=1;this.gridPosition="middle";this.markPeriodChange=this.boldPeriodBeginning=!0;this.safeDistance=30;this.centerLabelOnFullPeriod=!0;this.periods=[{period:"ss",count:1},{period:"ss",count:5},{period:"ss",count:10},{period:"ss",
    count:30},{period:"mm",count:1},{period:"mm",count:5},{period:"mm",count:10},{period:"mm",count:30},{period:"hh",count:1},{period:"hh",count:3},{period:"hh",count:6},{period:"hh",count:12},{period:"DD",count:1},{period:"DD",count:2},{period:"DD",count:3},{period:"DD",count:4},{period:"DD",count:5},{period:"WW",count:1},{period:"MM",count:1},{period:"MM",count:2},{period:"MM",count:3},{period:"MM",count:6},{period:"YYYY",count:1},{period:"YYYY",count:2},{period:"YYYY",count:5},{period:"YYYY",count:10},
    {period:"YYYY",count:50},{period:"YYYY",count:100}];this.dateFormats=[{period:"fff",format:"JJ:NN:SS"},{period:"ss",format:"JJ:NN:SS"},{period:"mm",format:"JJ:NN"},{period:"hh",format:"JJ:NN"},{period:"DD",format:"MMM DD"},{period:"WW",format:"MMM DD"},{period:"MM",format:"MMM"},{period:"YYYY",format:"YYYY"}];this.nextPeriod={};this.nextPeriod.fff="ss";this.nextPeriod.ss="mm";this.nextPeriod.mm="hh";this.nextPeriod.hh="DD";this.nextPeriod.DD="MM";this.nextPeriod.MM="YYYY";AmCharts.applyTheme(this,
    a,this.cname)},draw:function(){AmCharts.CategoryAxis.base.draw.call(this);this.generateDFObject();var a=this.chart.chartData;this.data=a;if(AmCharts.ifArray(a)){var b,c=this.chart,d=this.start,e=this.labelFrequency,g=0;b=this.end-d+1;var k=this.gridCountR,n=this.showFirstLabel,l=this.showLastLabel,h,f="",m=AmCharts.extractPeriod(this.minPeriod);h=AmCharts.getPeriodDuration(m.period,m.count);var u,p,s,y,w;u=this.rotate;var r=this.firstDayOfWeek,q=this.boldPeriodBeginning,a=AmCharts.resetDateToMin(new Date(a[a.length-
1].time+1.05*h),this.minPeriod,1,r).getTime(),t;this.endTime>a&&(this.endTime=a);t=this.minorGridEnabled;var v,a=this.gridAlpha,z;if(this.parseDates&&!this.equalSpacing){this.timeDifference=this.endTime-this.startTime;d=this.choosePeriod(0);e=d.period;u=d.count;p=AmCharts.getPeriodDuration(e,u);p<h&&(e=m.period,u=m.count,p=h);s=e;"WW"==s&&(s="DD");this.stepWidth=this.getStepWidth(this.timeDifference);var k=Math.ceil(this.timeDifference/p)+5,B=f=AmCharts.resetDateToMin(new Date(this.startTime-p),e,
    u,r).getTime();s==e&&1==u&&this.centerLabelOnFullPeriod&&(y=p*this.stepWidth);this.cellWidth=h*this.stepWidth;b=Math.round(f/p);d=-1;b/2==Math.round(b/2)&&(d=-2,f-=p);var A=c.firstTime,x=0;t&&1<u&&(v=this.chooseMinorFrequency(u),z=AmCharts.getPeriodDuration(e,v));if(0<this.gridCountR)for(b=d;b<=k;b++){m=A+p*(b+Math.floor((B-A)/p))-x;"DD"==e&&(m+=36E5);m=AmCharts.resetDateToMin(new Date(m),e,u,r).getTime();"MM"==e&&(t=(m-f)/p,1.5<=(m-f)/p&&(m=m-(t-1)*p+AmCharts.getPeriodDuration("DD",3),m=AmCharts.resetDateToMin(new Date(m),
    e,1).getTime(),x+=p));h=(m-this.startTime)*this.stepWidth;w=!1;this.nextPeriod[s]&&(w=this.checkPeriodChange(this.nextPeriod[s],1,m,f,s));t=!1;w&&this.markPeriodChange?(f=this.dateFormatsObject[this.nextPeriod[s]],t=!0):f=this.dateFormatsObject[s];q||(t=!1);f=AmCharts.formatDate(new Date(m),f);if(b==d&&!n||b==k&&!l)f=" ";this.labelFunction&&(f=this.labelFunction(f,new Date(m),this).toString());f=new this.axisItemRenderer(this,h,f,!1,y,0,!1,t);this.pushAxisItem(f);f=m;if(!isNaN(v))for(h=1;h<u;h+=v)this.gridAlpha=
    this.minorGridAlpha,t=m+z*h,t=AmCharts.resetDateToMin(new Date(t),e,v,r).getTime(),t=new this.axisItemRenderer(this,(t-this.startTime)*this.stepWidth),this.pushAxisItem(t);this.gridAlpha=a}}else if(!this.parseDates){if(this.cellWidth=this.getStepWidth(b),b<k&&(k=b),g+=this.start,this.stepWidth=this.getStepWidth(b),0<k)for(q=Math.floor(b/k),v=this.chooseMinorFrequency(q),h=g,h/2==Math.round(h/2)&&h--,0>h&&(h=0),k=0,b=h;b<=this.end+2;b++){r=!1;0<=b&&b<this.data.length?(s=this.data[b],f=s.category,r=
    s.forceShow):f="";if(t&&!isNaN(v))if(b/v==Math.round(b/v)||r)b/q==Math.round(b/q)||r||(this.gridAlpha=this.minorGridAlpha,f=void 0);else continue;else if(b/q!=Math.round(b/q)&&!r)continue;h=this.getCoordinate(b-g);r=0;"start"==this.gridPosition&&(h-=this.cellWidth/2,r=this.cellWidth/2);if(b==d&&!n||b==this.end&&!l)f=void 0;Math.round(k/e)!=k/e&&(f=void 0);k++;B=this.cellWidth;u&&(B=NaN);this.labelFunction&&s&&(f=this.labelFunction(f,s,this));f=AmCharts.fixBrakes(f);f=new this.axisItemRenderer(this,
    h,f,!0,B,r,void 0,!1,r);this.pushAxisItem(f);this.gridAlpha=a}}else if(this.parseDates&&this.equalSpacing){g=this.start;this.startTime=this.data[this.start].time;this.endTime=this.data[this.end].time;this.timeDifference=this.endTime-this.startTime;d=this.choosePeriod(0);e=d.period;u=d.count;p=AmCharts.getPeriodDuration(e,u);p<h&&(e=m.period,u=m.count,p=h);s=e;"WW"==s&&(s="DD");this.stepWidth=this.getStepWidth(b);k=Math.ceil(this.timeDifference/p)+1;f=AmCharts.resetDateToMin(new Date(this.startTime-
p),e,u,r).getTime();this.cellWidth=this.getStepWidth(b);b=Math.round(f/p);d=-1;b/2==Math.round(b/2)&&(d=-2,f-=p);h=this.start;h/2==Math.round(h/2)&&h--;0>h&&(h=0);y=this.end+2;y>=this.data.length&&(y=this.data.length);z=!1;z=!n;this.previousPos=-1E3;20<this.labelRotation&&(this.safeDistance=5);p=h;if(this.data[h].time!=AmCharts.resetDateToMin(new Date(this.data[h].time),e,u,r).getTime())for(r=0,A=f,b=h;b<y;b++)m=this.data[b].time,this.checkPeriodChange(e,u,m,A)&&(r++,2<=r&&(p=b,b=y),A=m);t&&1<u&&
(v=this.chooseMinorFrequency(u),AmCharts.getPeriodDuration(e,v));for(b=h;b<y;b++)if(m=this.data[b].time,this.checkPeriodChange(e,u,m,f)&&b>=p){h=this.getCoordinate(b-this.start);w=!1;this.nextPeriod[s]&&(w=this.checkPeriodChange(this.nextPeriod[s],1,m,f,s));t=!1;w&&this.markPeriodChange?(f=this.dateFormatsObject[this.nextPeriod[s]],t=!0):f=this.dateFormatsObject[s];f=AmCharts.formatDate(new Date(m),f);if(b==d&&!n||b==k&&!l)f=" ";z?z=!1:(q||(t=!1),h-this.previousPos>this.safeDistance*Math.cos(this.labelRotation*
Math.PI/180)&&(this.labelFunction&&(f=this.labelFunction(f,new Date(m),this)),f=new this.axisItemRenderer(this,h,f,void 0,void 0,void 0,void 0,t),r=f.graphics(),this.pushAxisItem(f),r=r.getBBox().width,AmCharts.isModern||(r-=h),this.previousPos=h+r));f=m}else isNaN(v)||(this.checkPeriodChange(e,v,m,B)&&(this.gridAlpha=this.minorGridAlpha,h=this.getCoordinate(b-this.start),t=new this.axisItemRenderer(this,h),this.pushAxisItem(t),B=m),this.gridAlpha=a)}for(b=0;b<this.data.length;b++)if(n=this.data[b])l=
    this.parseDates&&!this.equalSpacing?Math.round((n.time-this.startTime)*this.stepWidth+this.cellWidth/2):this.getCoordinate(b-g),n.x[this.id]=l;n=this.guides.length;for(b=0;b<n;b++)l=this.guides[b],q=q=q=a=d=NaN,v=l.above,l.toCategory&&(q=c.getCategoryIndexByValue(l.toCategory),isNaN(q)||(d=this.getCoordinate(q-g),f=new this.axisItemRenderer(this,d,"",!0,NaN,NaN,l),this.pushAxisItem(f,v))),l.category&&(q=c.getCategoryIndexByValue(l.category),isNaN(q)||(a=this.getCoordinate(q-g),q=(d-a)/2,f=new this.axisItemRenderer(this,
    a,l.label,!0,NaN,q,l),this.pushAxisItem(f,v))),l.toDate&&(this.equalSpacing?(q=c.getClosestIndex(this.data,"time",l.toDate.getTime(),!1,0,this.data.length-1),isNaN(q)||(d=this.getCoordinate(q-g))):d=(l.toDate.getTime()-this.startTime)*this.stepWidth,f=new this.axisItemRenderer(this,d,"",!0,NaN,NaN,l),this.pushAxisItem(f,v)),l.date&&(this.equalSpacing?(q=c.getClosestIndex(this.data,"time",l.date.getTime(),!1,0,this.data.length-1),isNaN(q)||(a=this.getCoordinate(q-g))):a=(l.date.getTime()-this.startTime)*
this.stepWidth,q=(d-a)/2,f="H"==this.orientation?new this.axisItemRenderer(this,a,l.label,!1,2*q,NaN,l):new this.axisItemRenderer(this,a,l.label,!1,NaN,q,l),this.pushAxisItem(f,v)),d=new this.guideFillRenderer(this,a,d,l),a=d.graphics(),this.pushAxisItem(d,v),l.graphics=a,a.index=b,l.balloonText&&this.addEventListeners(a,l)}this.axisCreated=!0;c=this.x;g=this.y;this.set.translate(c,g);this.labelsSet.translate(c,g);this.positionTitle();(c=this.axisLine.set)&&c.toFront();c=this.getBBox().height;c>this.previousHeight&&
this.autoWrap&&!this.parseDates&&(this.axisCreated=this.chart.marginsUpdated=!1);this.previousHeight=c},chooseMinorFrequency:function(a){for(var b=10;0<b;b--)if(a/b==Math.round(a/b))return a/b},choosePeriod:function(a){var b=AmCharts.getPeriodDuration(this.periods[a].period,this.periods[a].count),c=Math.ceil(this.timeDifference/b),d=this.periods;return this.timeDifference<b&&0<a?d[a-1]:c<=this.gridCountR?d[a]:a+1<d.length?this.choosePeriod(a+1):d[a]},getStepWidth:function(a){var b;this.startOnAxis?
    (b=this.axisWidth/(a-1),1==a&&(b=this.axisWidth)):b=this.axisWidth/a;return b},getCoordinate:function(a){a*=this.stepWidth;this.startOnAxis||(a+=this.stepWidth/2);return Math.round(a)},timeZoom:function(a,b){this.startTime=a;this.endTime=b},minDuration:function(){var a=AmCharts.extractPeriod(this.minPeriod);return AmCharts.getPeriodDuration(a.period,a.count)},checkPeriodChange:function(a,b,c,d,e){c=new Date(c);var g=new Date(d),k=this.firstDayOfWeek;d=b;"DD"==a&&(b=1);c=AmCharts.resetDateToMin(c,
    a,b,k).getTime();b=AmCharts.resetDateToMin(g,a,b,k).getTime();return"DD"==a&&"hh"!=e&&c-b<=AmCharts.getPeriodDuration(a,d)?!1:c!=b?!0:!1},generateDFObject:function(){this.dateFormatsObject={};var a;for(a=0;a<this.dateFormats.length;a++){var b=this.dateFormats[a];this.dateFormatsObject[b.period]=b.format}},xToIndex:function(a){var b=this.data,c=this.chart,d=c.rotate,e=this.stepWidth;this.parseDates&&!this.equalSpacing?(a=this.startTime+Math.round(a/e)-this.minDuration()/2,c=c.getClosestIndex(b,"time",
    a,!1,this.start,this.end+1)):(this.startOnAxis||(a-=e/2),c=this.start+Math.round(a/e));var c=AmCharts.fitToBounds(c,0,b.length-1),g;b[c]&&(g=b[c].x[this.id]);d?g>this.height+1&&c--:g>this.width+1&&c--;0>g&&c++;return c=AmCharts.fitToBounds(c,0,b.length-1)},dateToCoordinate:function(a){return this.parseDates&&!this.equalSpacing?(a.getTime()-this.startTime)*this.stepWidth:this.parseDates&&this.equalSpacing?(a=this.chart.getClosestIndex(this.data,"time",a.getTime(),!1,0,this.data.length-1),this.getCoordinate(a-
this.start)):NaN},categoryToCoordinate:function(a){return this.chart?(a=this.chart.getCategoryIndexByValue(a),this.getCoordinate(a-this.start)):NaN},coordinateToDate:function(a){return this.equalSpacing?(a=this.xToIndex(a),new Date(this.data[a].time)):new Date(this.startTime+a/this.stepWidth)}});