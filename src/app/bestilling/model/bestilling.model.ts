import { Produkt } from './produkt.model';

export interface IBestilling {
    [key: string]: Bestilling;
}

export class Bestilling {
    antal: number;
    produkt: Produkt;
}
