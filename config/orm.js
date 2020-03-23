var connection = require("./conection.js");


function printQuestionMarks(valuesLength){
    var arr = [];
    for(var i = 0; i < valuesLength; i++){
        arr.push('?');
    };
    return arr.toString();
};

function objectToSQL(object){
    var arr = [];

    for (var key in object){
        var value = object[key];

        if(Object.hasOwnProperty.call(object,key)){
            if(typeof value === 'string' && value.indexOf(' ') >= 0){
                value = `'${value}'`;
            };
            
            arr.push(`${key}=${value}`);
        };
    };
    
    return arr.toString();
};



var orm = {
    
    selectAll: (tableInput, callback)=>{
        var queryString = `SELECT * FROM ${tableInput};`;
        connection.query(queryString,function(error,result){
            if(error) throw (error);
            callback(result);
        });
    },
    
    insertOne: (table,columns,values,callback)=>{
        var queryString = `INSERT INTO ${table} (${columns.toString()}) VALUES (${printQuestionMarks(values.length)})`;
        connection.query(queryString,values,(error,result)=>{
            if(error) throw(error);
            callback(result);
        })
    },
    updateOne: (table, objectColumnValues, condition, callback)=>{
        var queryString = `UPDATE ${table} SET ${objectToSQL(objectColumnValues)} WHERE ${condition};`;
        connection.query(queryString,(error,result)=>{
            if(error) throw (error);
            callback(result);
        });
    }
};


  module.exports = orm;
  