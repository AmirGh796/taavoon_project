export function checkFormats(file: any, formatSelection: string[]): boolean {
  let templateImage = file.target.files[0];
  let formats = templateImage.name.split(".");
  let lastImageFormat = formats[formats.length - 1].toLowerCase();
  for (let index = 0; index < formatSelection.length; index++) {
    if (lastImageFormat === formatSelection[index]) {
      return true;
    }
  }
  return false;
}

export function moneySeparator(value: string): string {
  value += "";
  let x = value.split(".");
  let y = x[0];
  let z = x.length > 1 ? "." + x[1] : "";
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(y)) y = y.replace(rgx, "$1" + "," + "$2");
  return y + z;
}

export function validationImageSize(image: File, size: number): boolean {
  if (image.size <= size) {
    return true;
  }
  return false;
}

export function generateRandomId(): number {
  let date = new Date();
  return -(
    Math.floor(Math.random() * 1000 + 1) +
    date.getSeconds() +
    date.getMinutes() +
    date.getHours()
  );
}
