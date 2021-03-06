const createError = require('http-errors');
const express = require('express');
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const serverless = require('serverless-http');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const attendancesRouter = require('./routes/attendances');
const employeesRouter = require('./routes/employees');
const attendancesByEmployeeRouter = require("./routes/attendancesByEmployee");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/attendances', attendancesRouter);
app.use('/employees', employeesRouter);
app.use('/employees/:employeeId/attendances', attendancesByEmployeeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    // res.render('error');
    res.json(err);
});

module.exports = app;
// module.exports.handler = serverless(app);