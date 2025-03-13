export interface ICustomer {
    id?:            number | null;
    firstname:      string;
    lastname:       string;
    email:          string;
    password:       string;
    phone:          string;
    street_address: string;
    postal_code:    string;
    city:           string;
    country:        string;
    created_at?:    string;
}

export type CustomerUpdate = Pick<ICustomer, 'firstname' | 'lastname' | 'email' | 'password' | 'phone' | 'street_address' | 'postal_code' | 'city' | 'country' >;