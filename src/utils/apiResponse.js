
const apiResponse = (statusCode,data=null,message="") => ({
    success:statusCode<400,
    statusCode,
    message,
    data
})