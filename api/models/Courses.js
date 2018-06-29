/**
 * Courses.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {


    c_name: {
      type: "string",
      required: true,
    },

    student: {
      model: 'user'
    }
   
  },

};

