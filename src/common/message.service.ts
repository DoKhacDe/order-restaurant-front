// @ts-ignore
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster({});

export const messageError = (value: string|Array<string>) => {
    if(Array.isArray(value)){
      value = value.join('<br>');
    }
    toaster.error(value,{
      position: 'top-right',
      duration:3000
    })
}
export const messageSuccess = (value: string|Array<string>) => {
    if(Array.isArray(value)){
      value = value.join('<br>');
    }
    toaster.success(value,{
      position: 'top-right',
      duration:3000
    })
}