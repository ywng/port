/**
 * Stock
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

attributes: {

    code: {
      type: 'integer',
      required: true,
      unique: true
    },
    name: {
      type: 'string'
    },
    description:{
      type: 'string'
    },
    linkBloomberg: {
      type: 'string'
    },
    linkOther: {
      type: 'string'
    }

  }

  

};
