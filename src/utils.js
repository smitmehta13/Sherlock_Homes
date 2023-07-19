//
//method to convert basr64 image to image file
export const base64ToFile = (base64, filename) => {
    let arr = base64.split(',');
    let mime = arr[0].match(/:(.*?);/)[1];
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    
    // eslint-disable-next-line no-plusplus
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, { type: mime });
    }

//vice versa
export const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
    }
    