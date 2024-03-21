// creditCardInterfaces.ts

// Interfața inițială cu 5 câmpuri
export interface CredCard {
    title: string;
    number: string;
    cvc: string;
    cardholderName: string;
    expirationDate: string;
}

// Interfața extinsă cu încă 2 câmpuri
export interface ExtendedCreditCard extends CredCard {
    cardType: string;
    issuingBank: string;
}
