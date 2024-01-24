import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user.interface';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgFor, NgIf } from '@angular/common';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ FormsModule, HttpClientModule, ReactiveFormsModule, NgIf, NgFor, NgbModalModule, EditUserModalComponent ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  users: User[] = [];
  currentPage = 1;
  usersPerPage = 5;

  isModalVisible = false;
  currentUser: User | null = null;

  flagCrearUsuario: boolean = false;
  userForm: FormGroup;


  constructor(private userService: UserService, private modalService: NgbModal) {
    this.userForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      location: new FormControl(''),
      hobby: new FormControl('')
    });
  }
  

  ngOnInit(): void {
    this.loadUsers();
  }

  // Descargar y descaragar más usuarios
  loadUsers(): void {
    this.userService.getUsers(this.currentPage, this.usersPerPage)
      .subscribe(users => {
        this.users = users;
      });
  }

  loadMore(): void {
    this.currentPage++;
    this.userService.getUsers(this.currentPage, this.usersPerPage)
      .subscribe(newUsers => {
        this.users = [...this.users, ...newUsers];
      });
  }

  // CREAR USUARIO
  mostrarFormularioCrear(): void {
    this.flagCrearUsuario = true;
  }

  crearUsuario(): void {
    this.userService.addUser(this.userForm.value).subscribe(
      (response) => {
        console.log('Usuario creado:', response);
        alert('Usuario creado con éxito.');
        // Aquí restableces el formulario
        this.userForm.reset();
        this.flagCrearUsuario = false;
      },
      (error) => {
        console.error('Error al crear usuario:', error);
      }
    );
  }
  
  cancelarCreacion(): void {
    this.flagCrearUsuario = false; // Ocultar formulario sin enviar
  }


  // Editar usuario

  openEditModal(user: User): void {
    //this.currentUser = user;
    const modalRef = this.modalService.open(EditUserModalComponent);
    modalRef.componentInstance.user = user;

    modalRef.componentInstance.userUpdated.subscribe((updatedUser: User) => {
      // Este método se ejecutará cuando se emita el evento desde el modal
      this.handleUserUpdate(updatedUser);
    });
  }

  handleUserUpdate(updatedUser: User): void {
    // Aquí puedes manejar la actualización del usuario en tu lista o cualquier otra lógica necesaria
    console.log('Usuario actualizado en HomeComponent:', updatedUser);
  }


  // Borrar usuario
  deleteUser(id: number | undefined): void {
    if (id === undefined) return;
    this.userService.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
  }

}
