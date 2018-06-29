/**
 * CoursesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
   
    add: async function(req, res){
        // res.view('add');
        var createdUser = await Courses.create({c_name:'Discrete Logic' , student: 1}).fetch();

        //sails.log('Finn\'s id is:', createdUser.id);
        return res.json(createdUser);
    },
};

