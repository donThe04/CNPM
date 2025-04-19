import { Component, AfterViewInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  responseMessage: any; // Biến lưu trữ thông báo phản hồi
  data: any; // Biến lưu trữ dữ liệu từ API

  ngAfterViewInit() { }

  constructor(
    private dashboardService: DashboardService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {
    this.ngxService.start(); // Bắt đầu loader khi khởi tạo component
    this.dashboardData(); // Gọi hàm lấy dữ liệu dashboard
  }

  // Hàm lấy dữ liệu từ API
  dashboardData() {
    this.dashboardService.getDetails().subscribe(
      (response: any) => {
        this.ngxService.stop(); // Dừng loader khi nhận được phản hồi
        console.log(response); // Kiểm tra cấu trúc của response
        this.data = response; // Gán dữ liệu từ API vào biến data
      },
      (error: any) => {
        this.ngxService.stop(); // Dừng loader khi có lỗi
        console.log(error); // Ghi lỗi vào console
        if (error.error?.message) {
          this.responseMessage = error.error?.message; // Lấy thông báo lỗi từ API
        } else {
          this.responseMessage = GlobalConstants.genericError; // Thông báo lỗi mặc định
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error); // Hiển thị thông báo lỗi
      }
    );
  }
}
