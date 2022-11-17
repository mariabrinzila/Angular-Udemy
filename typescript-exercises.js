var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Primitive types: number, string, boolean
var age, gpa = 9.8;
age = 12;
var userName;
userName = 'Maria';
var isInstructor = false;
// More complex types: arrays, objects
var hobbies;
hobbies = ['Sports', 'Cooking'];
var personObject = {
    name: 'Max',
    age: 28
};
var people;
var person;
person = {
    name: 'Maria',
    age: 22
};
person = {
    isEmployee: true
};
// Type inference
// If you set a variable's value right after declaring it, typescript will infer its type from the value
var course = 'React - The complete guide'; // course = 12 <=> error 
// Union types (allow more than one type)
// There can be as many types as needed
var courseUnion;
courseUnion = 12;
var fullName = ['Maria', 'Brinzila'];
fullName = 'Ana-Maria';
var personAlias, peopleAlias;
personAlias = {
    name: 'Maria',
    age: 22
};
// Function types, parameters 
function add(a, b) {
    // The return type is infered (number)
    return a + b;
}
function addNumbersString(a, b) {
    // The return type can be any type
    return a + b;
}
function printFunction(value) {
    // The return type is void
    console.log(value);
}
// Generic functions 
function insertAtBeginning(array, value) {
    // Copy array in newArray with value at the beginning
    var newArray = __spreadArray([value], array, true);
    return newArray;
}
var demoArray = [1, 2, 3];
var newArray = insertAtBeginning(demoArray, -1); // newArray = [-1, 1, 2, 3], newArrays' type is infered to be any[], not number[]
function insertAtBeginningGeneric(array, value) {
    // array has elements of type T, value is of type T and so the return type will be T[]
    var newArray = __spreadArray([value], array, true);
    return newArray;
}
var demoArrayGeneric = [1, 2, 3];
var newArrayGeneric = insertAtBeginningGeneric(demoArray, -1); // newArrayGeneric's type is infered to be number[]
var stringArray = insertAtBeginningGeneric(['a', 'b', 'c'], 'd'); // stringArray's type is infered to be string[]
// Classes
var Student = /** @class */ (function () {
    // Only one constructor
    function Student(first, last, age, courses) {
        this.hasScholarship = false;
        this.firstName = first;
        this.lastName = last;
        this.age = age;
        this.courses = courses;
    }
    Student.prototype.enroll = function (courseName) {
        this.courses.push(courseName);
    };
    Student.prototype.listCourses = function () {
        return this.courses.slice();
    };
    return Student;
}());
var Parent = /** @class */ (function () {
    function Parent(firstName, lastName, age, children) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.children = children;
    }
    Parent.prototype.haveChild = function (childName) {
        this.children.push(childName);
    };
    Parent.prototype.getOlder = function () {
        this.age += 1;
    };
    return Parent;
}());
var student = new Student('Maria', 'Brinzila', 22, ['Angular']);
student.hasScholarship = true;
student.enroll('React'); // student.courses = [Angular, React]
student.listCourses(); // Angular, React (student.courses <=> error)
var Instructor = /** @class */ (function () {
    function Instructor() {
    }
    Instructor.prototype.greet = function () {
        console.log('Hi!!');
    };
    return Instructor;
}());
var human;
human = {
    name: 'Maria',
    age: 22,
    greet: function () {
        console.log('Hello!');
    }
}; // same can be done with a type defintion (type Human = { ... })
