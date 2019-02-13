// import { environment } from './environments/environment.dev';
import { environment } from '../../environments/environment.dev';
export const dataConfig = {
    "path": "",
    "simulate": true,
    "serviceHttpUrl": environment.service,
    "applicationHttpUrl": environment.application,
    "httpUrl": "",
    "data": {
         //案例
         "getAppClassList": {
            "url": "/hlms/api/facilitator/dictionary/appClassList",
            "simulate": true,
            "method": "get",
            "httpUrlType": "applicationHttpUrl",
            "description": "查询所有应用分类",
            "simulateUrl": "./../../mock-data/getAppClassList.json"
        },
        "getIdentifyingCode": {
            "url": "/hlms/api/facilitator/register/getIdentifyingCode",
            "simulate": true,
            "method": "post",
            "httpUrlType": "applicationHttpUrl",
            "description": "获取手机验证码",
            "simulateUrl": "./../../mock-data/getIdentifyingCode.json"
        },
        "projectEdit": {
            "url": "/hlms/api/budget/project",
            "simulate": true,
            "method": "put",
            "httpUrlType": "applicationHttpUrl",
            "description": "编辑预算项目",
            "simulateUrl": "./../../mock-data/projectUpdate.json"
        },
        "projectDelate": {
            "url": "/hlms/api/budget/project/list",
            "simulate": true,
            "method": "delete",
            "httpUrlType": "applicationHttpUrl",
            "description": "批量删除预算项目",
            "simulateUrl": "./../../mock-data/projectUpdate.json"
        },
        "getBudgetTree": {
            "url": "/hlms/api/budget/project/tree/",
            "simulate": true,
            "method": "getUrl",
            "httpUrlType": "budgetHttpUrl",
            "description": "查询预算项目树",
            "simulateUrl": "./../../mock-data/getBudgetTree.json"
        },
        "getBudgetOrganizationList": {
            "url": "/hlms/api/budget/account/list",
            "simulate": true,
            "method": "post",
            "httpUrlType": "budgetHttpUrl",
            "description": "列表数据获取",
            "simulateUrl": "./../../mock-data/getBudgetOrganizationList.json"
        },
        "selfleveldelete": {
            "url": "/hlms/api/alarm/selflevel/delete",
            "simulate": true,
            "method": "post",
            "httpUrlType": "budgetHttpUrl",
            "description": "批量删除",
            "simulateUrl": "./../../mock-data/selfleveldelete.json"
        },

        //正式对接接口如下
    }

};


