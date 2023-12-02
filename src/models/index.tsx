export interface Period {
    startDate: Date;
    endDate: Date;
}

export interface User {
    username: string;
    email: string;
    pictureUrl: string;
    phoneNumber: string;
    role: string;
}

export interface Status {
    transitionDate: string;
    state: string;
}

export interface Review {
    text: string;
    rating: number;
}

export interface Apartment {
    id: number
    name: string;
    description: string;
    location: string;
    amenities: string;
    pictureUrls: string;
    pricePerNight: number;
    owner: CompactUser;
}

export interface Reservation {
    id: number;
    startDate: string;
    endDate: string;
    numberOfPeople: number;
    price: number;
    status: string;
    client: CompactUser;
    apartment: CompactApartment;
}

export interface CompactUser {
    username: string;
    email: string;
}

export interface CompactApartment {
    id: number;
    name?: string;
}

export interface UserDetails {
    username: string;
    password: string;
}

