var Rx   = require("rx");
var http = require("http");
var util = require("util");

function Server() {
    http.Server.call(this);

    this.requests = Rx.Node
        .fromEvent(this, "request")
        .map(function(args) {
            return { request: args[0], response: args[1] };
        });

    this.closes = Rx.Node
        .fromEvent(this, "close")
        .map(function(args) {
            return true;
        });

    this.checkContinues = Rx.Node
        .fromEvent(this, "checkContinue")
        .map(function(args) {
            return { request: args[0], response: args[1] };
        });

    this.connects = Rx.Node
        .fromEvent(this, "connect")
        .map(function(args) {
            return { request: args[0], socket: args[1], head: args[2] };
        });

    this.upgrades = Rx.Node
        .fromEvent(this, "upgrade")
        .map(function(args) {
            return { request: args[0], socket: args[1], head: args[2] };
        });

    this.clientErrors = Rx.Node
        .fromEvent(this, "clientError")
        .map(function(args) {
            return { exception: args[0], socket: args[1] };
        });
}

util.inherits(Server, http.Server);

module.exports = Server;
