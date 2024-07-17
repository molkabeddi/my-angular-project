import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  content?: string;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getPublicContent().subscribe(
      data => {
        this.content = data; // Ensure data is a string or can be displayed directly
      },
      err => {
        // Check if err.error is valid JSON before parsing
        try {
          const errorResponse = JSON.parse(err.error);
          this.content = errorResponse.message || 'An error occurred';
        } catch {
          this.content = 'An error occurred';
        }
      }
    );
  }
}
