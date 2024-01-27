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

  flagMostrarUsuario: boolean = false;
  // userIdToDisplay: FormControl;
  displayedUser: User | null = null; // Variable para almacenar la información del usuario


  constructor(private userService: UserService, private modalService: NgbModal) {
    this.userForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      email: new FormControl(''),
      phone: new FormControl(''),
      location: new FormControl(''),
      userIdToDisplay: new FormControl('') // Inicializa aquí
    });
  }


  ngOnInit(): void {
    this.loadUsers();
  }

  // DESCARGAR Y DESCARGAR MÁS USUARIOS
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


  //BUSCAR Y MOSTRAR UN USUARIO CONCRETO INGRESANDO SU ID
  mostrarFormularioBuscarId() {
    this.flagMostrarUsuario = true;
  }

  showUserById(): void {
    if (!this.userForm) {
      console.error('El formulario no está inicializado.');
      return;
    }
  
    const userIdControl = this.userForm.get('userIdToDisplay');
  
    if (!userIdControl) {
      console.error('No se encontró el control userIdToDisplay en el formulario.');
      return;
    }
  
    const id = userIdControl.value;
  
    if (id === null || id === '') return;
  
    this.userService.getUserById(id).subscribe(
      (user: User) => {
        this.displayedUser = user;
        this.flagMostrarUsuario = true;
      },
      (error) => {
        console.error('Error al obtener usuario por ID:', error);
        alert('Error al obtener usuario por ID.');
      }
    );
  }
  
  cerrarUsuarioMostrado() {
    this.flagMostrarUsuario = false;
  }
  



  // EDITAR USUARIO (BOTÓN 'EDIT' DE LA COLUMNA ACTIONS DEL LISTADO)

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


  // BORRAR USUARIO (BOTÓN 'DELETE' DE LA COLUMNA ACTIONS DEL LISTADO)
  deleteUser(id: number | undefined): void {
    if (id === undefined) return;
    this.userService.deleteUser(id).subscribe(() => {
      alert('Usuario eliminado con éxito.');
      // Restablecer la página actual a 1 y recargar los usuarios
      this.currentPage = 1;
      this.loadUsers();
    }, (error) => {
      console.error('Error al eliminar usuario:', error);
    });
  }

}
