module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(34);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 6:
/***/ (function(module) {

module.exports = eval("require")("@actions/core");


/***/ }),

/***/ 34:
/***/ (function(module, __unusedexports, __webpack_require__) {

const aws = __webpack_require__(932);
const core = __webpack_require__(6);

async function descaleService(ecs, {cluster, service}){
    const response = await ecs.updateService({
        service,
        cluster,
        "desiredCount": 0,
    }).promise();
    core.info(`Service ${service} is scaled to 0 in cluster ${cluster}`);
    return response;
}

async function deleteService(ecs, {cluster, service}){
    const descaleResponse = await descaleService(ecs, {cluster, service});
    const response = await ecs.deleteService({
        service,
        cluster
    }).promise();
    return response;
}

async function run(){
    try{
        const ecs = new aws.ECS({
            customUserAgent: 'amazon-ecs-deploy-task-definition-for-github-actions'
        });
        const cluster = core.getInput("ecs-cluster-name");
        const serviceName = core.getInput("ecs-service-name");
        await deleteService(ecs, {
            cluster,
            service: serviceName
        });
        core.info(`Service ${service} is deleted in cluster ${cluster}`);
    }  catch(error){
        core.setFailed(error);
        core.info(error);
    }
}

module.exports = run;

/* istanbul ignore next */
if (require.main === require.cache[eval('__filename')]) {
    run();
}

/***/ }),

/***/ 932:
/***/ (function(module) {

module.exports = eval("require")("aws-sdk");


/***/ })

/******/ });