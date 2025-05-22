import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrl: './editar-actor.component.css',
})
export class EditarActorComponent implements OnInit {
  constructor(private activedRoute: ActivatedRoute) {}
  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      alert(params['id']);
    });
  }
}
