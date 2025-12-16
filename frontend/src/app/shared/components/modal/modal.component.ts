import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ModalService} from "../../services/modal.service";
import {ModalTypeEnum} from "../../../../types/modal-type.enum";

@Component({
    selector: 'modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
    modalType: ModalTypeEnum | null = null
    modalTypes = ModalTypeEnum

    modalForm = this.fb.group({
        name: ['', [Validators.required]],
        phone: ['', [Validators.required]],
        category: ['', ],
    })

    get name() {return this.modalForm.get('name')}
    get phone() {return this.modalForm.get('phone')}
    get category() {return this.modalForm.get('category')}

    constructor(
        private fb: FormBuilder,
        private modalService: ModalService,
    ) {
    }

    ngOnInit(): void {
        this.modalService.modalType$.subscribe((result: ModalTypeEnum | null) => {
            this.modalType = result
        })
    }

    submitContactForm(): void {
        this.modalType = ModalTypeEnum.success
    }

    closeModal(): void {
        this.modalType = null
        this.modalForm.reset()
    }
}
