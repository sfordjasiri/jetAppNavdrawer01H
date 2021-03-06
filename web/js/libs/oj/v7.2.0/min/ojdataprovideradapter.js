/**
 * @license
 * Copyright (c) 2014, 2019, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
define(["ojs/ojcore","jquery","ojs/ojdataprovideradapter-base"],function(t,e,n){"use strict";var a=function(e){function n(t){var a=e.call(this,t)||this;return a.tableDataSource=t,a.FetchByKeysResults=function(){return function(t,e,a){this._parent=t,this.fetchParameters=e,this.results=a,this[n._FETCHPARAMETERS]=e,this[n._RESULTS]=a}}(),a.ContainsKeysResults=function(){return function(t,e,a){this._parent=t,this.containsParameters=e,this.results=a,this[n._CONTAINSPARAMETERS]=e,this[n._RESULTS]=a}}(),a.Item=function(){return function(t,e,a){this._parent=t,this.metadata=e,this.data=a,this[n._METADATA]=e,this[n._DATA]=a}}(),a.FetchByOffsetResults=function(){return function(t,e,a,r){this._parent=t,this.fetchParameters=e,this.results=a,this.done=r,this[n._FETCHPARAMETERS]=e,this[n._RESULTS]=a,this[n._DONE]=r}}(),a.FetchListParameters=function(){return function(t,e,a){this._parent=t,this.size=e,this.sortCriteria=a,this[n._SIZE]=e,this[n._SORTCRITERIA]=a}}(),a._addTableDataSourceEventListeners(),a[n._OFFSET]=0,a._ignoreDataSourceEvents=new Array,a}return __extends(n,e),n.prototype.destroy=function(){this._removeTableDataSourceEventListeners()},n.prototype.containsKeys=function(t){var e=this,a=[];return t[n._KEYS].forEach(function(t){a.push(e.tableDataSource.get(t))}),Promise.all(a).then(function(a){var r=new Set;return a.map(function(t){null!=t&&r.add(t[n._KEY])}),Promise.resolve(new e.ContainsKeysResults(e,t,r))})},n.prototype.fetchByKeys=function(t){var e=this,a=[];return t[n._KEYS].forEach(function(t){a.push(e.tableDataSource.get(t))}),Promise.all(a).then(function(a){var r=new Map;return a.map(function(t){var a=t[n._KEY],i=t[n._DATA];r.set(a,new e.Item(e,new e.ItemMetadata(e,a),i))}),Promise.resolve(new e.FetchByKeysResults(e,t,r))})},n.prototype.fetchByOffset=function(t){var e=this,a=null!=t?t[n._SIZE]:-1,r=null!=t?t[n._SORTCRITERIA]:null,i=null!=t&&t[n._OFFSET]>0?t[n._OFFSET]:0,s=new this.FetchListParameters(this,a,r);return this._startIndex=0,this._getFetchFunc(s,i)(s,!0).then(function(a){var r=a[n._VALUE],i=a[n._DONE],s=r[n._DATA],o=r[n._METADATA].map(function(t){return t[n._KEY]}),u=new Array;return s.map(function(t,n){u.push(new e.Item(e,new e.ItemMetadata(e,o[n]),s[n]))}),new e.FetchByOffsetResults(e,t,u,i)})},n.prototype.fetchFirst=function(t){return this._isPagingModelTableDataSource()||(this._startIndex=0),new this.AsyncIterable(new this.AsyncIterator(this._getFetchFunc(t),t))},n.prototype.getCapability=function(t){return t==n._SORT&&"full"==this.tableDataSource.getCapability(t)?{attributes:"multiple"}:"fetchByKeys"==t?{implementation:"lookup"}:"fetchByOffset"==t?{implementation:"lookup"}:null},n.prototype.getTotalSize=function(){return Promise.resolve(this.tableDataSource.totalSize())},n.prototype.isEmpty=function(){return this.tableDataSource.totalSize()>0?"no":"yes"},n.prototype.getPage=function(){return this._isPagingModelTableDataSource()?this.tableDataSource.getPage():-1},n.prototype.setPage=function(t,e){return this._isPagingModelTableDataSource()?this.tableDataSource.setPage(t,e):Promise.reject(null)},n.prototype.getStartItemIndex=function(){return this._isPagingModelTableDataSource()?this.tableDataSource.getStartItemIndex():-1},n.prototype.getEndItemIndex=function(){return this._isPagingModelTableDataSource()?this.tableDataSource.getEndItemIndex():-1},n.prototype.getPageCount=function(){return this._isPagingModelTableDataSource()?this.tableDataSource.getPageCount():-1},n.prototype.totalSize=function(){return this._isPagingModelTableDataSource()?this.tableDataSource.totalSize():-1},n.prototype.totalSizeConfidence=function(){return this._isPagingModelTableDataSource()?this.tableDataSource.totalSizeConfidence():null},n.prototype._getFetchFunc=function(t,e){var a=this;if(null!=t&&null!=t[n._SORTCRITERIA]){var r=t[n._SORTCRITERIA][0][n._ATTRIBUTE],i=t[n._SORTCRITERIA][0][n._DIRECTION];return this._ignoreSortEvent=!0,this._isPagingModelTableDataSource()||(this._startIndex=0),function(t,r){return function(i,s){if(s){var o={};return o[n._KEY]=t,o[n._DIRECTION]=r,a[n._OFFSET]=0,a.tableDataSource.sort(o).then(function(){return a._ignoreSortEvent=!1,a._getTableDataSourceFetch(i,e)(i)})}return a._getTableDataSourceFetch(i,e)(i)}}(r,i)}return this._getTableDataSourceFetch(t,e)},n.prototype._getTableDataSourceFetch=function(t,e){var a=this;return function(t,r){var i={};if(e=e>0?e:0,null!=a._startIndex&&(i[n._STARTINDEX]=a._startIndex+e),i[n._PAGESIZE]=null!=t&&t[n._SIZE]>0?t[n._SIZE]:null,!a._isPagingModelTableDataSource()&&t[n._SILENT]&&(i[n._SILENT]=t[n._SILENT]),null!=a.tableDataSource[n._SORTCRITERIA]&&null==t[n._SORTCRITERIA]){t[n._SORTCRITERIA]=[];var s=new a.SortCriterion(a,a.tableDataSource[n._SORTCRITERIA][n._KEY],a.tableDataSource[n._SORTCRITERIA][n._DIRECTION]);t[n._SORTCRITERIA].push(s)}return i[n._FETCHTYPE]=t[n._FETCHTYPE],a._isFetching=!0,new Promise(function(e,r){a._fetchResolveFunc=e,a._fetchRejectFunc=r,a._fetchParams=t,a._requestEventTriggered||(a._isPagingModelTableDataSource()||i[n._SILENT]||a._ignoreDataSourceEvents.push(!0),a.tableDataSource.fetch(i).then(function(r){if(a._isPagingModelTableDataSource()||i[n._SILENT]||a._ignoreDataSourceEvents.pop(),null!==r){a._isFetching=!1,void 0===r&&((r={})[n._KEYS]=[],r[n._DATA]=[]);var s=[];null!=r[n._KEYS]&&(s=r[n._KEYS].map(function(t){return new a.ItemMetadata(a,t)})),null==a._startIndex&&(a._startIndex=0);var o=!1;a._startIndex=a._startIndex+r[n._DATA].length,"actual"==a.tableDataSource.totalSizeConfidence()&&a.tableDataSource.totalSize()>0&&a._startIndex>=a.tableDataSource.totalSize()?o=!0:i[n._PAGESIZE]>0&&r[n._DATA].length<i[n._PAGESIZE]?o=!0:0==r[n._DATA].length&&(o=!0),a._fetchResolveFunc=null,a._fetchParams=null,e(new a.AsyncIteratorResult(a,new a.FetchListResult(a,t,r[n._DATA],s),o))}},function(t){a._isPagingModelTableDataSource()||i[n._SILENT]||a._ignoreDataSourceEvents.pop(),r(t)}))})}},n.prototype._handleSync=function(e){var a=this;if(!(a._ignoreDataSourceEvents.length>0)){if(a._startIndex=null,e[n._STARTINDEX]>0&&(a._startIndex=e[n._STARTINDEX],a[n._OFFSET]=a._startIndex),a._fetchResolveFunc&&null!=e[n._KEYS]){a._isFetching=!1;var r=e[n._KEYS].map(function(t){return new a.ItemMetadata(a,t)}),i=!1;"actual"==a.tableDataSource.totalSizeConfidence()&&a.tableDataSource.totalSize()>0&&a._startIndex>=a.tableDataSource.totalSize()&&(i=!0),a._fetchResolveFunc(new a.AsyncIteratorResult(a,new a.FetchListResult(a,a._fetchParams,e[n._DATA],r),i)),a._fetchResolveFunc=null,a._fetchParams=null}else a._requestEventTriggered||a.dispatchEvent(new t.DataProviderRefreshEvent);a._requestEventTriggered=!1}},n.prototype._handleAdd=function(e){var a=this,r=e[n._KEYS].map(function(t){return new a.ItemMetadata(a,t)}),i=new Set;e[n._KEYS].map(function(t){i.add(t)});var s=new a.DataProviderAddOperationEventDetail(a,i,null,null,null,r,e[n._DATA],e[n._INDEXES]),o=new a.DataProviderMutationEventDetail(a,s,null,null);a.dispatchEvent(new t.DataProviderMutationEvent(o))},n.prototype._handleRemove=function(e){var a=this,r=e[n._KEYS].map(function(t){return new a.ItemMetadata(a,t)}),i=new Set;e[n._KEYS].map(function(t){i.add(t)});var s=new a.DataProviderOperationEventDetail(a,i,r,e[n._DATA],e[n._INDEXES]),o=new a.DataProviderMutationEventDetail(a,null,s,null);a.dispatchEvent(new t.DataProviderMutationEvent(o))},n.prototype._handleReset=function(e){this._requestEventTriggered||this._isPagingModelTableDataSource()||(this._startIndex=0,this.dispatchEvent(new t.DataProviderRefreshEvent))},n.prototype._handleSort=function(e){this._ignoreSortEvent||(this._startIndex=null,this.dispatchEvent(new t.DataProviderRefreshEvent))},n.prototype._handleChange=function(e){var a=this,r=e[n._KEYS].map(function(t){return new a.ItemMetadata(a,t)}),i=new Set;e[n._KEYS].map(function(t){i.add(t)});var s=new a.DataProviderOperationEventDetail(a,i,r,e[n._DATA],e[n._INDEXES]),o=new a.DataProviderMutationEventDetail(a,null,null,s);a.dispatchEvent(new t.DataProviderMutationEvent(o))},n.prototype._handleRefresh=function(e){this._isFetching||this._requestEventTriggered||(null!=e[n._OFFSET]?this._startIndex=e[n._OFFSET]:this._startIndex=null,this.dispatchEvent(new t.DataProviderRefreshEvent)),this._requestEventTriggered=!1},n.prototype._handleRequest=function(e){this._ignoreDataSourceEvents.length>0||void 0!==t.Model&&e instanceof t.Model||this._isFetching||(e[n._STARTINDEX]>0&&0==this.getStartItemIndex()&&(this._startIndex=e[n._STARTINDEX]),this._requestEventTriggered=!0,this.dispatchEvent(new t.DataProviderRefreshEvent))},n.prototype._handleError=function(t){this._fetchRejectFunc&&this._fetchRejectFunc(t),this._isFetching=!1,this._requestEventTriggered=!1},n.prototype._handlePage=function(e){this._isFetching=!1,this._requestEventTriggered=!1;var n={};n.detail=e,this.dispatchEvent(new t.GenericEvent(t.PagingModel.EventType.PAGE,n))},n.prototype._addTableDataSourceEventListeners=function(){this.removeAllListeners(),this.addListener("sync",this._handleSync),this.addListener("add",this._handleAdd),this.addListener("remove",this._handleRemove),this.addListener("reset",this._handleReset),this.addListener("sort",this._handleSort),this.addListener("change",this._handleChange),this.addListener("refresh",this._handleRefresh),this.addListener("request",this._handleRequest),this.addListener("error",this._handleError),this.addListener("page",this._handlePage)},n.prototype._removeTableDataSourceEventListeners=function(){this.removeListener("sync"),this.removeListener("add"),this.removeListener("remove"),this.removeListener("reset"),this.removeListener("sort"),this.removeListener("change"),this.removeListener("refresh"),this.removeListener("request"),this.removeListener("error"),this.removeListener("page")},n.prototype._isPagingModelTableDataSource=function(){return null!=this.tableDataSource.getStartItemIndex},n._STARTINDEX="startIndex",n._SILENT="silent",n._SORTCRITERIA="sortCriteria",n._PAGESIZE="pageSize",n._OFFSET="offset",n._SIZE="size",n._CONTAINSPARAMETERS="containsParameters",n._RESULTS="results",n._FETCHTYPE="fetchType",n}(n);t.EventTargetMixin.applyMixin(a),t.TableDataSourceAdapter=a,t.TableDataSourceAdapter=a});