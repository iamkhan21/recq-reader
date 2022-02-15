import type { SweetAlertOptions } from "sweetalert2";

let swal: any;

async function importLibrary() {
  if (!swal) {
    await import("sweetalert2/dist/sweetalert2.min.css");
    swal = (await import("sweetalert2")).default;
  }
}

export async function showAlert(options: SweetAlertOptions) {
  await importLibrary();
  return swal?.fire(options);
}

export interface ToastOptions {
  toastOptions: SweetAlertOptions;
  mixinOptions?: SweetAlertOptions;
}

const defaultMixinOptions: SweetAlertOptions = {
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
};

export async function showToast(options: ToastOptions) {
  await importLibrary();
  const toast = swal?.mixin(options.mixinOptions || defaultMixinOptions);
  return toast.fire(options.toastOptions);
}
