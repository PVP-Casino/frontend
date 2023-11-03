import Swal from 'sweetalert2';
import { ethers } from 'ethers';

const swalBackground = '#343544';
const swalColor = 'white';

export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: swalBackground,
  color: swalColor,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});
