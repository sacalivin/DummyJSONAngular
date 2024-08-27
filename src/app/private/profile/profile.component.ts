import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { Observable, tap } from 'rxjs';
import { LocalStorageService } from '../../persistent/base/local-storage.service';
import { User } from '../../auth/models/user';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { allowedExtentions, standardFileSize } from '../../core/constants/generalContants';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit, AfterViewInit {
  profileService$!: Observable<User>;
  defaultSelectedMonitoringProduct: any;
  documentTypes: DocumentType[] = [];
  idDocumentPreview = '';
  errorInputClass = 'error-input';
  defaultInputClass = 'default-input';

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {
    this.profileService$ = this.profileService.currentUser();
    
  }
  ngAfterViewInit(): void {
    this.profileService$.subscribe({
      next: (value:any) => {
        this.profileFormGroup.patchValue({
          firstName: value.firstName,
          middleName: value.maidenName,
          lastName: value.lastName,
          documentNumber: value.documentNumber,
          documentType: value.documentType,
          email: value.email,
          gender: value.gender,
          cellPhoneNumber: value.phone,
        });
      },
      error(err) {},
    });
  }

  ngOnInit(): void {
    
  }

  profileFormGroup = new FormGroup(
    {
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*(\\s)*$'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]*(\\s)*$'),
      ]),
      middleName: new FormControl('', [
        Validators.pattern('^[a-zA-Z]*(\\s)*$'),
      ]),
      email: new FormControl('', [
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
      ]),
      cellPhoneNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^(07\\d{8}||01\\d{8}||\\+254\\d{9})$'),
      ]),
      documentNumber: new FormControl('', [Validators.required]),
      documentType: new FormControl('', [Validators.required]),
      countryOfBirth: new FormControl(''),
      gender: new FormControl(''),
     
      idDocument: new FormControl(null),
    },
    {
      validators: [
      ],
    }
  );

  get firstName() {
    return this.profileFormGroup.get('firstName');
  }
  get middleName() {
    return this.profileFormGroup.get('middleName');
  }
  get lastName() {
    return this.profileFormGroup.get('lastName');
  }
  get email() {
    return this.profileFormGroup.get('email');
  }
  get cellPhoneNumber() {
    return this.profileFormGroup.get('cellPhoneNumber');
  }

  get veryfyEmail() {
    return this.profileFormGroup.get('verifyEmail');
  }
  get documentNumber() {
    return this.profileFormGroup.get('documentNumber');
  }
  get monitoringProduct() {
    return this.profileFormGroup.get('monitoringProduct');
  }

  onFileSelected = (event: any) => {
    console.log(this.profileFormGroup);
    if (event.target.files > 1) {
      alert('A maximum of 1 files are allowed');

      return;
    }

    let filesize: number = +(event.target.files[0].size / 1024 / 1024).toFixed(
      4
    ); // MB

    let fileExtension: string = event.target.files[0].name.split('.').pop();

    if (!allowedExtentions.includes(fileExtension.toLocaleLowerCase())) {
      Swal.fire({
        text:
          'Please upload in the format of JPG, PNG and PDF (max ' +
          standardFileSize +
          '2 MBs)',
        width: 300,
        customClass: {},
        cancelButtonColor: '#3ab3e5',
        confirmButtonColor: '#3ab3e5',
      });
      // event.target.files[0] = null;
      // event.preventDefault();
      return;
    }
    //alert(filesize)
    if (filesize > standardFileSize) {
      Swal.fire({
        text: 'Sorry, file should be less than 2 MB',
        width: 300,
        customClass: {},
        cancelButtonColor: '#3ab3e5',
        confirmButtonColor: '#3ab3e5',
      });

      return;
    }

    if (event.target.files.length > 0) {
      const selectedFiles = event.target.files;
      this.profileFormGroup.patchValue({
        idDocument: event.target.files[0],
      });
      //reader.readAsText(event.target.files[0]);
      //reader.re
      if (selectedFiles) {
        const file: File | null = selectedFiles.item(0);

        if (file) {
          this.idDocumentPreview = '';

          const reader = new FileReader();

          reader.onload = (e: any) => {
            console.log(e.target.result);
            this.idDocumentPreview = e.target.result;
          };

          reader.readAsDataURL(file);
        }
      }
    }
  };

  submit() {
    // save email to session
    this.localStorageService.dataSave('UserEmail', <any>this.email?.value);

    Swal.fire({
      html: 'Please wait...',
      width: 300,
      customClass: {},

      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    console.log(this.profileFormGroup);

    let formData = new FormData();
    formData.append('firstName', <any>this.profileFormGroup.value.firstName);
    formData.append('middleName', <any>this.profileFormGroup.value.middleName);
    formData.append('lastName', <any>this.profileFormGroup.value.lastName);

    formData.append(
      'documentType',
      <any>this.profileFormGroup.value.documentType
    );
    
    formData.append(
      'documentNumber',
      <any>this.profileFormGroup.value.documentNumber
    );
    formData.append('email', <any>this.profileFormGroup.value.email);
    formData.append(
      'phoneNumber',
      <any>this.profileFormGroup.value.cellPhoneNumber
    );
  
    /*
    formData.append(
      'country',
      <any>this.IndivitualCreditReportFormGroup.value.countryOfBirth
    );*/
    formData.append('gender', <any>this.profileFormGroup.value.gender);

    formData.append('document', <any>this.profileFormGroup.value.idDocument);

    this.profileService
      .update(formData)
      .pipe(
       
      )
      .subscribe({
        next:(value) =>{
          Swal.close();
        },
        error(err) {
          Swal.fire({
            text: 'Request unsuccessful, please retry',
            width: 300,
            customClass: {},
            cancelButtonColor: '#3ab3e5',
            confirmButtonColor: '#3ab3e5',
          });
        },
      });
  }
}


