import {Component, OnInit} from '@angular/core';
import {ModalService} from "../../services/modal.service";
import {ModalTypeEnum} from "../../../../types/modal-type.enum";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    constructor(private modalService: ModalService) {
    }

    ngOnInit(): void {
    }

    getFreeConsult() {
        this.modalService.show(ModalTypeEnum.consult)
    }
}
