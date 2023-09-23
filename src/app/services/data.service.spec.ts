import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService],
    });
    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to the correct URL on getDailyConsumptionData', () => {
    const date = '2023-09-14'; // The date parameter for the function call

    // Call the function
    service.getDailyConsumptionData(date).subscribe();

    // Expect that there is exactly one HTTP request made to the specified URL
    const req = httpTestingController.expectOne(`${environment.apiUrl}/day-consumption-dashboard?day=${date}`);

    // Check that the HTTP request method is GET
    expect(req.request.method).toBe('GET');
  });
});
