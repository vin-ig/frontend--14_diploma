import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ModalService} from "../../services/modal.service";
import {ModalTypeEnum} from "../../../../types/modal-type.enum";
import {StaticData} from "../../../views/main/static-data";
import {RequestType} from "../../../../types/request.type";
import {DefaultResponseType} from "../../../../types/default-response.type";
import {HttpErrorResponse} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
    modalType: ModalTypeEnum | null = null
    modalTypes = ModalTypeEnum

    services = StaticData.services

    modalForm = this.fb.group({
        name: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        category: [null as string | null],
    })

    get name() {
        return this.modalForm.get('name')
    }

    get phone() {
        return this.modalForm.get('phone')
    }

    get category() {
        return this.modalForm.get('category')
    }

    constructor(
        private fb: FormBuilder,
        private modalService: ModalService,
        private _snackBar: MatSnackBar,
    ) {
        this.updateValidation()
    }

    ngOnInit(): void {
        this.modalService.modalType$.subscribe((result: {
            modalType: ModalTypeEnum | null,
            serviceName?: string
        }) => {
            this.modalType = result.modalType
            if (result.serviceName) {
                this.category?.setValue(result.serviceName)
            }
            this.updateValidation()
        })
    }

    submitContactForm(): void {
        let type = null
        if (this.modalType === ModalTypeEnum.order) {
            type = 'order'
        } else if (this.modalType === ModalTypeEnum.consult) {
            type = 'consultation'
        }

        if (!type || !this.name?.value || !this.phone?.value) {
            return
        }

        let payload: RequestType = {
            type: type,
            name: this.name?.value,
            phone: this.phone?.value,
        }
        if (this.modalType === ModalTypeEnum.order && this.category?.value) {
            payload.service = this.category?.value
        }

        this.modalService.sendRequest(payload).subscribe({
            next: (result: DefaultResponseType) => {
                if (result.error) {
                    this._snackBar.open('Ошибка отправки запроса. Попробуйте позднее', 'Закрыть')
                    throw new Error((result as DefaultResponseType).message)
                }
                this.modalService.show(ModalTypeEnum.success)
            },
            error: (errorResponse: HttpErrorResponse) => {
                if (errorResponse.error && errorResponse.error.message) {
                    console.log(errorResponse.error.message)
                } else {
                    console.log('Ошибка поиска пользователя')
                }
                this._snackBar.open('Ошибка отправки запроса. Попробуйте позднее', 'Закрыть')
            }
        })
    }

    closeModal(): void {
        this.modalType = null
        this.modalForm.reset()
    }

    updateValidation() {
        if (this.modalType === ModalTypeEnum.order) {
            this.category?.setValidators(Validators.required)
        } else {
            this.category?.removeValidators(Validators.required)
            this.category?.setValue(null)
        }
        this.category?.updateValueAndValidity()
    }
}
