/**
 * User.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    user_name: {
      type: "string",
      required: true,
    },
    user_email: {
      type: "string",
      required: true,
      unique: true,
    },
    user_password: {
      type: "string",
      required: true,
    },
    courses: {
      collection: 'courses',
      via: 'student'
    }
  },

};

