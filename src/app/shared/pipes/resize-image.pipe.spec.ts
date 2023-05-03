import { ResizeImagePipe } from './resize-image.pipe';

describe('ResizeImagePipe', () => {
  it('should return properly formatted image uri (with correct sizes at the end)', () => {
    const resizeImagePipe = new ResizeImagePipe();
    const imageUri = 'https://picsum.photos/12345/100/200';
    const newWidth = 300;
    const newHeight = 400;
    const expected = 'https://picsum.photos/12345/300/400';

    const result = resizeImagePipe.transform(imageUri, newWidth, newHeight);

    expect(result).toBe(expected);
  });

  it('should return properly formatted image uri (with default sizes at the end)', () => {
    const resizeImagePipe = new ResizeImagePipe();
    const imageUri = 'https://picsum.photos/12345/100/200';
    const expected = 'https://picsum.photos/12345/350/350';

    const result = resizeImagePipe.transform(imageUri);

    expect(result).toBe(expected);
  });
});
