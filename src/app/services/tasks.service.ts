import { Injectable } from '@angular/core';
import {
  Action,
  AngularFirestore,
  AngularFirestoreCollection,
  DocumentChangeAction,
  DocumentReference,
  DocumentSnapshot,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private taskCollection: AngularFirestoreCollection<Task>;

  constructor(private db: AngularFirestore) {
    this.taskCollection = this.db.collection<Task>('tasks');
  }

  /**
   * GET ALL TASKS
   */
  getAllTasks(): Observable<DocumentChangeAction<Task>[]> {
    return this.taskCollection.snapshotChanges();
  }

  /**
   * GET TASK BY ID
   * @param taskId
   */
  getTask(taskId: string): Observable<Action<DocumentSnapshot<Task>>> {
    return this.taskCollection.doc<Task>(taskId).snapshotChanges();
  }

  /**
   * CREATE NEW TASK
   * @param newTask
   */
  createTask(newTask: Task): Promise<DocumentReference> {
    return this.taskCollection.add(newTask);
  }

  /**
   * UPDATE SELECTED TASK
   * @param data
   * @param docId
   */
  updateTask(data: Task, docId: string): Promise<void> {
    return this.taskCollection.doc<Task>(docId).update(data);
  }

  /**
   * DELETE TASK
   * @param docId
   */
  deleteTask(docId: string): Promise<void> {
    return this.taskCollection.doc<Task>(docId).delete();
  }
}
