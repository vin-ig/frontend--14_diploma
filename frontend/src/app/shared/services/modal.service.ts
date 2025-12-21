import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ModalTypeEnum} from "../../../types/modal-type.enum";
import {RequestType} from "../../../types/request.type";
import {DefaultResponseType} from "../../../types/default-response.type";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
})
export class ModalService {
    modalType$: Subject<{modalType: ModalTypeEnum | null, serviceName?: string}> = new Subject<{modalType: ModalTypeEnum | null, serviceName?: string}>();

    constructor(private http: HttpClient) {
    }

    show(modalType: ModalTypeEnum | null, serviceName?: string) {
        this.modalType$.next({modalType, serviceName});
    }

    sendRequest(payload: RequestType): Observable<DefaultResponseType> {
        return this.http.post<DefaultResponseType>(environment.api + 'requests', payload);
    }
}
