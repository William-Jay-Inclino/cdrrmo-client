import { config } from "../../config";

class ImageService {
  private endpoint = '/image/';
  private service = 'ImageService: ';

  async uploadImage(file: File, previousFilename?: string): Promise<{ filename: string }> {
    console.log(this.service + 'uploadImage()', file);

    try {
      const formData = new FormData();
      formData.append('image', file);

      // Append previousFilename as a query parameter
      const queryParams = previousFilename ? `?previousFilename=${encodeURIComponent(previousFilename)}` : '';

      const response = await config.api.post(`${this.endpoint}${queryParams}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log({ response });
      if (response.status === 201) {
        return response.data;
      }
      console.error('Error: ', response);

      return response.data;
    } catch (error) {
      console.error(error);
    }

    return { filename: '' };
  }
}

export const imageService = new ImageService();
