export const getImageSizes = (imageUrl: string) => new Promise<{ width: number, height: number }>((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve({
        width: image.width,
        height: image.height
    });

    image.onerror = reject;
    image.src = imageUrl;
})