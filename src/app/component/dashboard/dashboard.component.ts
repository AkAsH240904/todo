import { Component, OnInit } from '@angular/core';
import { Task } from '../../model/task';
import { CrudService } from '../../service/crud.service';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit{
  taskObj : Task=new  Task();
  taskArr : Task[]=[];
  addTaskValue : string='';
console: any;
  constructor(private crudService : CrudService){
    
  }
  ngOnInit(): void {
    this.taskObj = new Task();
    this.taskArr=[];
    this.getAllTask();
  }
  addTask(){
    this.taskObj.task_name=this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe((res)=>{
      this.ngOnInit();
      this.addTaskValue='';
    },err=>{
      alert(err);
    })
    console.log(this.taskArr)
  }
  getAllTask(){
    this.crudService.getAllTask().subscribe(res=>{
      this.taskArr.push(res);
    },err=>{
      alert("Unnable to get list of tasks");
    })
  }
  editTask(){
    this.crudService.editTask(this.taskObj).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert("Failed to update task");
    })
  }
  deleteTask(etask : Task){
    this.crudService.deleteTask(etask).subscribe(res=>{
      this.ngOnInit();
    },err=>{
      alert("Failed to delete Task");
    })
  }
}