/// <reference path="hello.ts" />


class Greeter {
    greeting: string;
    
    constructor(message: string) {
        this.greeting = message;
    }

    greet() {
        return "Hola, " + this.greeting;
    }
}
