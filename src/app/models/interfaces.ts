interface Address {
    street: string;
    streetNo: number;
    postalCode: number;
    city: string;
    country: string;
}

export interface ContactPerson {
    firstName: string;
    lastName: string;
    email: string;
    id: number;
    address: Address;
}

export interface GroupedContactPersons {
    [char: string]: ContactPerson[];
}
