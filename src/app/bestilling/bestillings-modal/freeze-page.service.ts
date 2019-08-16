import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class FreezePageService {

    private readonly isFrozen: Subject<boolean> = new Subject();

    public setFreeze(shouldFreeze: boolean) {
        this.isFrozen.next(shouldFreeze);
    }

    public get freezeChange$(): Observable<boolean> {
        return this.isFrozen.asObservable();
    }

}
