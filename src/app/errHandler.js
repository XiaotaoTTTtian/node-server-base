module.exports = (err, ctx) => {
    let status = 500
    switch (err.code) {
        case '10001':
            status = 400;
            break;
        case '1002':
            status = 409;
            break;
    
        default:
            break;
    }
    ctx.status = status
    ctx.body = err
}