const { graphql, buildSchema } = require('graphql');
const { moduleSchema, moduleQuery,moduleName,modulesNames } = require('../schemas_and_queries/SQController')(buildSchema);
//const {modulesSchema, modulesQuery} = require('../schemas_and_queries/books')(buildSchema);
const connection = require('../dbcon.js');


module.exports = {
    all: (req, res) => {
    let mod=req.params.module;
    console.log(mod,moduleName(req.params.module));
    connection.query('SELECT * from '+moduleName(req.params.module), async (err, rows) => {
        if (!err) {
            let jsonrows={};
            jsonrows[mod]=rows;
            const response = await graphql(moduleSchema(mod), moduleQuery(mod),jsonrows);
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(
                {
                    'result' : 'success',
                    'data': response.data
                })
            );
        } else {
            res.status(400).send(err);
        }
    });
    },
    create: (req, res, next) => {
        let response;
        let keys=[];
        let values=[];
        let fields=[];
        let noerr;
         for(var key in req.body) {
             if(req.body.hasOwnProperty(key)){
                 //do something with e.g. req.body[key]
                 keys.push(key);
                 values.push(req.body[key]);
                 fields.push('?');
                 if(
                        typeof key !== 'undefined'
                            && typeof req.body[key] !== 'undefined'             
                    )
                    noerr=true;
                else{
                    noerr=false;
                    break;
                }
            }
        }
        if (noerr) {
            connection.query('INSERT INTO '+req.params.module+' ('+String(keys)+') VALUES ('+String(fields)+')',
                values,
                (err, result) => {
                    handleSuccessOrErrorMessage(req.params.module,err, result, res);
                });

        } else {
            response = {
                'result' : 'error',
                'msg' : 'Please fill required details'
            };
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        }
    },
    get: (req, res) => {
        let mod=req.params.module;
        console.log(mod,moduleName(req.params.module));
    connection.query('SELECT * from '+moduleName(req.params.module)+' where id = ?', [req.params.id], async (err, rows) => {
            let jsonrows={};
            jsonrows[mod]=rows[0];
            const response = await graphql(moduleSchema(mod), moduleQuery(mod),jsonrows);
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(
            {
                'result' : 'success',
                'data': response.data
            })
        );
    })
    },
    update: (req, res) => {
        let response;
        let keys=[];
        let values=[];
        let noerr;
        const id = req.params.id;
         for(var key in req.body) {
             if(req.body.hasOwnProperty(key)){
                 //do something with e.g. req.body[key]
                 keys.push(key+' = ? ');
                 values.push(req.body[key]);
                 if(
                        typeof key !== 'undefined'
                            && typeof req.body[key] !== 'undefined'             
                    )
                    noerr=true;
                else{
                    noerr=false;
                    break;
                }
            }
        }
        values.push(id);
        if (noerr ) {
            connection.query('UPDATE '+moduleName(req.params.module)+' SET '+keys+' WHERE id = ?',
                //[name, isbn, id],
                values,
                function(err, result) {
                    handleSuccessOrErrorMessage(req.params.module,err, result, res);
                });
        } else {
            response = {'result' : name, 'msg' : 'Please fill required information','module':req.params.module};
            res.setHeader('Content-Type', 'application/json');
            res.send(200, JSON.stringify(response));
        }
    },

    destroy: (req, res) => {
        connection.query('DELETE FROM '+moduleName(req.params.module)+' WHERE id = ?', [req.params.id],(err,result) => {
            handleSuccessOrErrorMessage(req.params.module,err, result, res);
        });
    }
};

function handleSuccessOrErrorMessage(module,err, result, res) {
    if (!err){
        let response;
        if (result.affectedRows != 0) {
            response = {'result' : 'success'};
        } else {
            response = {'msg' : 'No Result Found','module':module};
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(response));
    } else {
        console.log(err);
        res.status(400).send(module,':(module-controller):',err.message);
    }
}
