const user = {
    name: 'MyName',
    lastName: 'MySurname',
    password: 'G123#rw9Kwsx',
    get fullName() {
        return `${this.name} ${this.lastName}`;
    },
};
export default user;
