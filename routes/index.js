const express = require('express');
const router = express.Router();
//router.use(express.basicAuth('testUser', 'testPass'));
const v1modController = require('../controllers/module-controller');
const notFoundController = require('../controllers/not-found-controller');

module.exports = function(app){

  router.get('/versions', function(req,res,next){
    res.status(200).send({versions:[{v1:1},{v2:2}]});
});

router.get('/v1/module/:module', v1modController.all);
router.post('/v1/module/:module', v1modController.create);
router.get('/v1/module/:module/:id', v1modController.get);
router.put('/v1/module/:module/:id', v1modController.update);
router.delete('/v1/module/:module/:id', v1modController.destroy);

 router.get('*', notFoundController.show);




return router;
}