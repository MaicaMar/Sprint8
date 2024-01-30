// edit-user-modal.component.ts

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal, NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../services/user.service';
import { User } from '../../../interfaces/user.interface';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-user-modal',
  standalone: true,
  imports: [ FormsModule, NgbModalModule ],
  templateUrl: './edit-user-modal.component.html',
  styleUrl: './edit-user-modal.component.css'
})
export class EditUserModalComponent {
  @Input() user: User = <User>{};
  @Output() userUpdated = new EventEmitter<User>();

  constructor(public activeModal: NgbActiveModal, private userService: UserService, private modaLService: NgbModal) {}

  editUser(): void {
    if (!this.user) {
      console.error('Usuario no válido');
      return;
    }

    this.userService.updateUser(this.user).subscribe({
      next: (updatedUser) => {
        console.log('Usuario actualizado:', updatedUser);
        this.userUpdated.emit(updatedUser); // Emite el evento de usuario actualizado
        this.activeModal.close();
      },
      error: (error) => {
        console.error('Error al actualizar el usuario:', error);
      }
    });
  }

}
