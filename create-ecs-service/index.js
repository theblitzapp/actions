const core = require('@actions/core');
const github = require('@actions/github');


async function createService(ecs, {
    cluster,
    serviceName,
    taskDefinition,    
    ...rest
}){
    const params = {
        serviceName, 
        taskDefinition,       
        cluster,
        ...rest
    }
    const response = await ecs.createService(params).promise();
    const {service} = response;
    core.info(`Service ${serviceName} is created in cluster ${cluster} with status ${service.status}`);
    return service;
}

async function run(){
    const ecs = new aws.ECS({
        customUserAgent: 'amazon-ecs-deploy-task-definition-for-github-actions'
    });
    const cluster = core.getInput("cluster");
    const serviceName = core.getInput("serviceName");
    const taskDefinition = core.getInput("taskDefinition");
    
    try{
      await createService(ecs,{
        cluster,
        serviceName,
        taskDefinition,
        desiredCount: 1,
        "deploymentConfiguration": { 
            "maximumPercent": 200,
            "minimumHealthyPercent": 50
         },
    });   
    }catch(error){
      core.setFailed(error)
    }
}

module.exports = run;

/* istanbul ignore next */
if (require.main === module) {
  run();
}