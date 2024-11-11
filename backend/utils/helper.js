module.exports.returnJsonResponse = function returnJsonResponse(msg, status, data=undefined) {
    return {msg : msg , status : status , data : data}
}