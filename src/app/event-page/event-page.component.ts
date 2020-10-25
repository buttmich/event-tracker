import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Category } from 'src/app/models/category'
import { Event } from 'src/app/models/event'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.css']
})
export class EventPageComponent implements OnInit {
  categories: Category[]
  events: Event[];
  connectedList: any[];
  loading = true;
  icon = "person"
  constructor(private http: HttpService) { }

  ngOnInit(): void {
    this.http.getCategories().subscribe(res => {
      console.log(res);
      this.categories = res;

      this.http.getEvents().subscribe(res => {
        console.log(res);
        this.categories.forEach(category => {
          this.events = res;
          category.events = cloneDeep(this.events.filter(e => e.categoryId === category.id));
        })
        this.loading = false;
      })

    })
  }

  drop(event: CdkDragDrop<Element[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }

}
