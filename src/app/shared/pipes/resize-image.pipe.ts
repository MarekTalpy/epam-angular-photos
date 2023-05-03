import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'resizeImage',
})
export class ResizeImagePipe implements PipeTransform {
  transform(imageUri: string, width = 350, height = 350) {
    let imageChunks = imageUri.split('/');
    imageChunks[imageChunks.length - 1] = String(height);
    imageChunks[imageChunks.length - 2] = String(width);
    const formattedUri = imageChunks.join('/');

    return formattedUri;
  }
}
