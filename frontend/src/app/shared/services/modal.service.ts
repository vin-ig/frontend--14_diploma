import {Injectable} from '@angular/core';
import {Subject} from "rxjs";
import {ModalTypeEnum} from "../../../types/modal-type.enum";

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    modalType$: Subject<ModalTypeEnum | null> = new Subject<ModalTypeEnum | null>()

    constructor() {
    }

    show(modalType: ModalTypeEnum | null) {
        this.modalType$.next(modalType)
    }
}
