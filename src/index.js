var Rx   = require("rx");
var http = require("http");
var util = require("util");

function Server() {
    http.Server.call(this);

    this.requests = Rx.Observable
        .fromEvent(this, "request", function(args) {
            return { request: args[0], response: args[1] };
        });

    this.closes = Rx.Observable
        .fromEvent(this, "close", function(args) {
            return true;
        });

    this.checkContinues = Rx.Observable
        .fromEvent(this, "checkContinue", function(args) {
            return { request: args[0], response: args[1] };
        });

    this.connects = Rx.Observable
        .fromEvent(this, "connect", function(args) {
            return { request: args[0], socket: args[1], head: args[2] };
        });

    this.upgrades = Rx.Observable
        .fromEvent(this, "upgrade", function(args) {
            return { request: args[0], socket: args[1], head: args[2] };
        });

    this.clientErrors = Rx.Observable
        .fromEvent(this, "clientError", function(args) {
            return { exception: args[0], socket: args[1] };
        });
}

util.inherits(Server, http.Server);

module.exports = Server;
