/**
 * ArticlesController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
// var jwt= require('jsonwebtoken');
// var SECRET = 'shhhhhhared-secret'
var Promise = require('bluebird');
module.exports = {
	list: async function(req, res){
        // Articles.find({}).exec(function(err, articles){
        //     if(err){
        //         res.send(500, {error: 'Database Error'});
        //     }
        //     res.view('list', {articles:articles});
        // });
        var userRecord = await Courses.find({
            student: req.body.student,
          });
          if(!userRecord) {
            return res.json({error : 'User not found'})
            }
        return res.json(userRecord);
        
    },
    fnLogin: async function (req, res) {

        // Look up by the email address.
        // (note that we lowercase it to ensure the lookup is always case-insensitive,
        // regardless of which database we're using)

        var userRecord = await User.findOne({
          user_email: req.body.user_email,
        });
        
        // If there was no matching user, respond thru the "badCombo" exit.
        if(!userRecord) {
            return res.json({error : 'User not found'})
        }
    
        // If the password doesn't match, then also exit thru "badCombo".
        // await sails.helpers.passwords.checkPassword(inputs.password, userRecord.password)
        // .intercept('incorrect', 'badCombo');
        // if(req.body.password != userRecord.user_password){
        //    return res.json({error : 'User password is incorrect'});
        // }
        const process = async()=>{
            var fnResult = await bbService.checkPassword(req.body.password, userRecord.user_password);
            console.log(fnResult)
            if(!fnResult)
            {
               return {error: 'error'};
            }
            else if(fnResult != true){
                return fnResult;
            }
            else if(fnResult == true){
                return{
                    user:userRecord,
                    token: jwToken.issue({
                        user: userRecord.id
                      }, '1d') //generate the token and send it in the response
                };
            }
        }
        process().then(res.ok)
        .catch(err=>util.errorResponse(err,res));

        // bbService.checkPassword(req.body.password, userRecord.user_password).then(function(result) { 
        //    if(result != true){
        //        res.json(result);
        //    } 
        //    else if(result == true){
        //     return res.json({
        //         user:userRecord,
        //         token: jwToken.issue({
        //             user: userRecord.id
        //           }, '1d') //generate the token and send it in the response
        //     });
        //    }
        // });
        // Passwords.checkPassword({

        //     passwordAttempt: req.body.password,
            
        //     encryptedPassword: userRecord.user_password,
            
        //     }).exec({
            
        //     // An unexpected error occurred.
            
        //     error: function (err) {
        //         return res.json({error : 'User password error'});
             
            
        //     },
            
        //     // Password attempt does not match already-encrypted version
            
        //     incorrect: function () {
            
        //         return res.json({error : 'User password is incorrect'});
             
            
            
        //     },
            
        //     // OK.
            
        //     success: function () {
        //         return res.json({
        //             user:userRecord,
        //             token: jwToken.issue({
        //                 user: userRecord.id
        //               }, '1d') //generate the token and send it in the response
        //         });
             
            
        //     },
            
        //     });
        // If "Remember Me" was enabled, then keep the session alive for
        // a longer amount of time.  (This causes an updated "Set Cookie"
        // response header to be sent as the result of this request -- thus
        // we must be dealing with a traditional HTTP request in order for
        // this to work.)
    
        // Modify the active session instance.
        // this.req.session.userId = userRecord.id;
        
        // Send success response (this is where the session actually gets persisted)
        // return res.json({success : userRecord[0].user_name +' logged in'});
        //var token = jwt.sign(userRecord, SECRET, { expiresIn: 18000 }); // 60*5 minutes
        //const token = jwToken.issue(userRecord.id);
      
    
      },
    add: function(req, res){
        // res.view('add');
        User.create({ 	createdAt : '' , updatedAt : '', id: 2 ,  user_name : 'malik' , user_email: 'malik@gmail.com' , user_password: 'malik'}).exec(function(err1, res1){
            return res.json({ok: 'success'});
        });
    },
    signUp: function(req , res){
        const process = async()=>{
           // return "okf"
            var fnResult = await bbService.encryptPassword(req.body.user_password);
            if(!fnResult)
            {
               return {error: 'error'};
            }
            else
            {
                User.create({user_name : req.body.user_name , user_email: req.body.user_email , user_password: fnResult}).exec(function(err1, res1){
                    return {ok: 'data inserted sccessfully'};
                });
            }
        }

        process().then(res.ok)
        .catch(err=>util.errorResponse(err,res));

        // varbbService.encryptPassword(req.body.user_password)
        // .then(function(result) { 
        //     if(!result){
        //         res.json('encryption error');
        //     } 
        //     else{
        //         User.create({user_name : req.body.user_name , user_email: req.body.user_email , user_password: result}).exec(function(err1, res1){
        //             return res.json({ok: 'success'});
        //         });
        //     //  return res.json({
        //     //      user:userRecord,
        //     //      token: jwToken.issue({
        //     //          user: userRecord.id
        //     //        }, '1d') //generate the token and send it in the response
        //     //  });
        //     }
        //  });
       
    },
    viewUser: function(req, res) {
    //     User.find().populate('user').exec(function(e, r){
    //     return res.json({user: r});
    // });
    return res.json("test ok");
},
    TestFunction: async  function(req, res) {
        // res.send('hello');
        var usersNamedFinn = await User.find({id:1});
        res.json(usersNamedFinn)
    },
    create:function(req, res){
        var title = req.body.title;
        var body = req.body.body;

        Articles.create({title:title, body:body}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/articles/list');
        });
    },
    delete: function(req, res){
        Articles.destroy({id:req.params.id}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/articles/list');
        });

        return false;
    },
    edit: function(req, res){
        Articles.findOne({id:req.params.id}).exec(function(err, article){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.view('edit', {article:article});
        });
    },
    update: function(req, res){
        var title = req.body.title;
        var body = req.body.body;

        Articles.update({id: req.params.id},{title:title, body:body}).exec(function(err){
            if(err){
                res.send(500, {error: 'Database Error'});
            }

            res.redirect('/articles/list');
        });

        return false;
    }
};
