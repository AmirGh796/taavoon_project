export const EmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const UrlPattern = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
export const PersianCharactersPattern = /^[\u0621-\u0628\u062A-\u063A\u0641-\u0642\u0644-\u0648\u064E-\u0651-\u0655-\u067E-\u0686-\u0698-\u06A9-\u06AF-\u06BE-\u06CC-\u060C-\u061B-\u061F-\u0640-\u066A-\u066B-\u066C\s]+$/;
export const MobilePattern = /^9|0\d{10}$/;
export const MobilePattern2 = /^0\d{10}$/;
export const IsNumericInString = /^(?:-?\d+)?$/;

export const imageFormats = ["jpg", "png", "jpeg"];

//export const MobileOrEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;
