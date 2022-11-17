// Compile a Typescript file <=> tsc fileName.ts (will a fileName.js file in return)
// Execute a Typescript file <=> node fileName.js



// Primitive types: number, string, boolean
let age: number, gpa: number = 9.8;
age = 12; 

let userName: string;
userName = 'Maria';

let isInstructor: boolean = false;



// More complex types: arrays, objects
let hobbies: string[];
hobbies = ['Sports', 'Cooking'];

let personObject: {
    name: string,
    age: number
} = {
    name: 'Max',
    age: 28
};

let people: {
    name: string,
    age: number
}[];

let person: any;
person = {
    name: 'Maria',
    age: 22
};

person = {
    isEmployee: true
};



// Type inference
// If you set a variable's value right after declaring it, typescript will infer its type from the value
let course = 'React - The complete guide'; // course = 12 <=> error 



// Union types (allow more than one type)
// There can be as many types as needed
let courseUnion: string | number;
courseUnion = 12;

let fullName: string | string[] = ['Maria', 'Brinzila'];
fullName = 'Ana-Maria';



// Type aliases (defining a more complex type and then using an alias in order to use it somewhere else rather than repeating its definition)
type Person = {
    name: string, 
    age: number
}; 

let personAlias: Person, peopleAlias: Person[];
personAlias = {
    name: 'Maria',
    age: 22
};



// Function types, parameters 
function add(a: number, b: number) {
    // The return type is infered (number)
    return a + b; 
}


function addNumbersString(a, b): number | string {
    // The return type can be any type
    return a + b;
}


function printFunction(value: any) {
    // The return type is void
    console.log(value);
}



// Generic functions 
function insertAtBeginning(array: any[], value: any) {
    // Copy array in newArray with value at the beginning
    const newArray = [value, ...array]; 
    return newArray;
}


function insertAtBeginningGeneric<T>(array: T[], value: T) {
    // array has elements of type T, value is of type T and so the return type will be T[]
    const newArray = [value, ...array]; 
    return newArray;
}


const demoArray = [1, 2, 3];
const newArray = insertAtBeginning(demoArray, -1); // newArray = [-1, 1, 2, 3], newArrays' type is infered to be any[], not number[]

const demoArrayGeneric = [1, 2, 3];
const newArrayGeneric = insertAtBeginningGeneric(demoArray, -1); // newArrayGeneric's type is infered to be number[]

const stringArray = insertAtBeginningGeneric(['a', 'b', 'c'], 'd'); // stringArray's type is infered to be string[]



// Classes
class Student {
    // The properties are by default public (can be accessed anywhere)
    firstName: string;
    lastName: string;
    age: number;

    private courses: string[]; // can only be accessed inside the Student class
    hasScholarship = false;

    // Only one constructor
    constructor(first: string, last: string, age: number, courses: string[]) {
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.courses = courses;
    }


    enroll(courseName: string) {
        this.courses.push(courseName);
    }


    listCourses() {
        return this.courses.slice();
    }
}


class Parent {
    constructor(
        public firstName: string,
        public lastName: string,
        public age: number,
        private children: string[]
    ) {}


    haveChild(childName: string) {
        this.children.push(childName);
    }


    getOlder() {
        this.age += 1;
    }
}


const student = new Student('Maria', 'Brinzila', 22, ['Angular']);
student.hasScholarship = true;

student.enroll('React'); // student.courses = [Angular, React]
student.listCourses(); // Angular, React (student.courses <=> error)



// Interfaces (object type definitions that can be implemented by classes)
interface Human {
    name: string;
    age: number;

    greet: () => void; 
}


class Instructor implements Human {
    // Must take all the features from the interface (just as they're named in the interface)
    name: string;
    age: number;

    greet() {
        console.log('Hi!!');
    }
}


let human: Human;
human = {
    name: 'Maria',
    age: 22,

    greet() {
        console.log('Hello!');
    }
} // same can be done with a type defintion (type Human = { ... })