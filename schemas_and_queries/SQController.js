const modules=require('./SQModulesConf');
        
module.exports  = (buildSchema) => {
  return {
    getSchemaString:function(module){
        return modules[module].Schema;
    },
    getQueryString:function(module){
        return modules[module].Query;
    },
    moduleSchema:function(module){
        return buildSchema(modules[module].Schema);
    },
    moduleQuery:function(module){
        return modules[module].Query;
    },
    moduleName:function(module){
        return modules[module].modulename;
    },
    modulesNames:function(){
       return modules.getObjectKeys();
    },
    mainModulesNames:function(){
       let k= modules.getObjectKeys();
       let mk=[];
       for(var i=0;i<k.length;i++){
           if(modules[k[i]].parentmodule===1)
                mk.push(modules[k[i]]);
       }
        return mk;
    }
  };  
};