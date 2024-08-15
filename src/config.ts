export const API = "http://127.0.0.1:8000/api";
export const GMAPKEY = "AIzaSyCzcvmKLAUO3TdD78Pc8Z0sYpJmntfnLc0";

export const productImagesMap = (title: string) => {
    switch (title) {
        case 'yksiot': return 'product-1.png';
        case 'kaksiot': return 'product-2.png';
        case 'kolmiot': return 'product-3.png';
        case 'neliot': return 'product-4.png';
        case 'suuremmat': return 'product-5.png';
        default: return  'product-1.png'
    }
};
