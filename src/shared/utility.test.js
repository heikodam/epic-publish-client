import {updateObject, checkValidity} from './utility';


test("Should create new object of an old object and a newer object ", () => {
    const oldObject = {name: "Siegfried", age: 97};
    const newObject = {age: 98, car: "Rolls Royce"}

    const expectedObject = {name: "Siegfried", age: 98, car: "Rolls Royce"}
    const updatedObject = updateObject(oldObject, newObject);

    expect(updatedObject).toMatchObject(expectedObject);
})

test("Should validate a user input value", () => {
    
    // With no rules should always be valid
    expect(checkValidity("a")).toBeTruthy();

    // Check required
    expect(checkValidity("", {required: true}).isValid).toBeFalsy()

    // Check min Length
    expect(checkValidity("asdf", {minLength: 5}).isValid).toBeFalsy()

    // Check max Length
    expect(checkValidity("asdfgh", {maxLength: 5}).isValid).toBeFalsy()

    // Check is Email
    expect(checkValidity("asdf", {isEmail: true}).isValid).toBeFalsy()

    // Check is Numeric
    expect(checkValidity("asdf", {isNumeric: true}).isValid).toBeFalsy()
})