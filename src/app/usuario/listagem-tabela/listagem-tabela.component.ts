import { Component, OnInit} from '@angular/core';
import {Usuario} from '../../shared/modelo/usuario';
import {UsuarioService} from '../../shared/services/usuario.service';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem-tabela',
  templateUrl: './listagem-tabela.component.html',
  styleUrls: ['./listagem-tabela.component.css']
})
export class ListagemTabelaComponent {
  dataSource!: MatTableDataSource<Usuario>;
  mostrarColunas = ['nome', 'cpf', 'idade', 'acoes'];   

  constructor(private usuarioService: UsuarioService,private roteador: Router) {
  }

  ngOnInit(): void {
    this.usuarioService.listar().subscribe(
      usuarios => this.dataSource = new MatTableDataSource(usuarios)
    );
  }

  filtrar(texto: string): void {
    this.dataSource.filter = texto.trim().toLowerCase();
  }

  editar(id: number): void {
    console.log(id)
    this.roteador.navigate(['editausuario', id])
  }

  apagar(id: number): void {
    console.log(id);
    this.usuarioService.apagar(id).subscribe(
      apagado => {
        const indx = this.dataSource.data.findIndex(usuario => usuario.id === id);
        if (indx > -1) {
          this.dataSource.data.splice(indx, 1);
          this.dataSource = new MatTableDataSource<Usuario>(this.dataSource.data);
        }
      }
    );
  }
}
