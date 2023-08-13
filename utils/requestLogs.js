const logRequest = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.url}`);
    next(); // Call next() to proceed to the next middleware or route handler
}

export {
    logRequest
}