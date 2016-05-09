var Rx   = require("rx");
var http = require("http");
var util = require("util");

function Server() {
    http.Server.call(this);

    this.requests = Rx.Observable
        .fromEvent(this, "request", function() {
            return { request: arguments[0], response: arguments[1] };
        });

    this.closes = Rx.Observable
        .fromEvent(this, "close", function() {
            return true;
        });

    this.checkContinues = Rx.Observable
        .fromEvent(this, "checkContinue", function() {
            return { request: arguments[0], response: arguments[1] };
        });

    this.connects = Rx.Observable
        .fromEvent(this, "connect", function() {
            return { request: arguments[0], socket: arguments[1], head: arguments[2] };
        });

    this.upgrades = Rx.Observable
        .fromEvent(this, "upgrade", function() {
            return { request: arguments[0], socket: arguments[1], head: arguments[2] };
        });

    this.clientErrors = Rx.Observable
        .fromEvent(this, "clientError", function() {
            return { exception: arguments[0], socket: arguments[1] };
        });
}

util.inherits(Server, http.Server);

module.exports = Server;
