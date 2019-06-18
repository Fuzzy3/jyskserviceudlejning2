export class DeviceWidth {
    constructor(private widthSize: WidthSize) {}

    setWidthSize(newSize: WidthSize) {
        this.widthSize = newSize;
    }

    getWidthSize(): WidthSize {
        return this.widthSize;
    }

    // tslint:disable-next-line:member-ordering
    public static default(): DeviceWidth {
        return new DeviceWidth(WidthSize.Laptop);
    }
}

export enum WidthSize {
    Mobile, Tablet, Laptop, Desktop

    /*
    Mobile  320-767
    Tablet  768-991
    Laptop  992-1200
    Desktop 1200+
    */
}


