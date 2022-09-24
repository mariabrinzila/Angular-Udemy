export class LoggingService {
    // Service <=> for when we have duplicate code (a good way to outsource the code)
    // Just a normal TypeScript class, it doesn't need a decorator
    // Not used by just being imported in the Component we want to use it in, creating an object and calling the methods / properties (we shouldn't instantiate it on our own)
    // A service is used with dependency injection (the dependency injector injects an instance of this class automatically)
    
    logStatusChange(status: string) {
        console.log('A server status changed, the new status is: ' + status);
    }
}