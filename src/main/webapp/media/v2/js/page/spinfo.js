define(['require'], function(require) {

    var ACTION = {

        Q_Spinfos_Href: '/list',
        U_Splimit_Href: '/setlimit',

    }
    var spManager = (function () {

        var $spInfos = $('div#spInfos');
        var $infoTotal = $('#infoTotal');
        // =========================================================================
        var currentTimea = new Date();
        var currentTime = currentTimea.getTime();


        $.ajaxSetup({
            data: {rid: Date.now()},
            beforeSend: function () {
            },
            complete: function () {
            }
        });

        var spLimit = (function() {
            var $spInfosBox = $('#infosBox'),
                $limit_value = $('#limit_value'),
                $setup_limit_value = $('#setup_limit_value'),
                $help_limit_value = $('#help_setup_limit_value');

            var __init = function() {
                $setup_limit_value.bind('click', function (e) {
                    $.ajax({
                        url: ACTION.U_Splimit_Href,
                        data: {'limit_value': $limit_value.val()},
                        success: function (data) {
                            data = JSON.parse(data)
                            if(data['Result'] == 'OK') {
                                $help_limit_value.text('设置成功,立即生效!');
                                spInfos.refresh();
                            } else {
                                $help_limit_value.text('设置失败,未生效!');
                            }
                        },
                        error: function (data) {
                            $help_limit_value.text('设置失败,未生效!');

                        }
                    })
                })
            }
            return {
                init : __init
            }
        }());
        var spInfos = (function () {
            var $spInfosBox = $('#infosBox');

            window.operateEvents = {
            };

            var __responseHandler = function (res) {
                return res;
            }

            var $table_config = {
                method: 'get',
                url: ACTION.Q_Spinfos_Href,
                cache: false,
                striped: false,
                pagination: true,
                sidePagination: 'server',
                pageSize: 10,
                pageList: [10, 25, 50, 100, 200],
                search: false,
                showColumns: false,
                showRefresh: true,
                align: "center",
                minimumCountColumns: 2,
                clickToSelect: false,
                responseHandler: __responseHandler,
                columns: [{
                    field: 'mobile',
                    align: "center",
                    title: '手机号',

                }, {
                    field: 'linkid',
                    align: "center",
                    title: '业务唯一标示'
                }, {
                    field: 'callmobile',
                    align: "center",
                    title: '发送到的服务号码',
                }, {
                    field: 'starttime',
                    align: "center",
                    title: '开始时间'
                }, {
                    field: 'endtime',
                    align: "center",
                    title: '结束时间'
                }, {
                    field: 'rectime',
                    align: "center",
                    title: '发送报告时间'
                }, {
                    field: 'minute',
                    align: "center",
                    title: '时长/分'
                }, {
                    field: 'feecode',
                    align: "center",
                    title: '每分钟金额(分)'
                }, {
                    field: 'price',
                    align: "center",
                    title: '金额(元)'
                }, {
                    field: 'starttime_limit',
                    align: "center",
                    title: '开始时间(扣量后)'
                }, {
                    field: 'endtime_limit',
                    align: "center",
                    title: '结束时间(扣量后)'
                }, {
                    field: 'minute_limit',
                    align: "center",
                    title: '时长/分(扣量后)'
                }, {
                    field: 'price_limit',
                    align: "center",
                    title: '金额(元)(扣量后)'
                }, {
                    field: 'limit_value',
                    align: "center",
                    title: '扣量(百分比)'
                }

                ]
            }

            var __accountsLoad = function () {
                $spInfosBox.bootstrapTable('destroy');
                $spInfosBox.bootstrapTable($table_config);
            }
            var __accountsRefresh = function () {
                $spInfosBox.bootstrapTable('refresh');
            }
            var __init = function () {

                __accountsLoad()
            }

            return {
                init: __init,
                load: __accountsLoad,
                refresh: __accountsRefresh
            }

        }());

        var __init = function(){
            spLimit.init();
            spInfos.init()
        }
        return {
            init: __init
        };

    }());
    spManager.init();
});