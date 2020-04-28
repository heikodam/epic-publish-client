import {updateObject, checkValidity} from './utility';


test("Should create new object of an old object and a newer object ", () => {
    const oldObject = {name: "Siegfried", age: 97};
    const newObject = {age: 98, car: "Rolls Royce"}

    const expectedObject = {name: "Siegfried", age: 98, car: "Rolls Royce"}
    const updatedObject = updateObject(oldObject, newObject);

    expect(updatedObject).toMatchObject(expectedObject);
})