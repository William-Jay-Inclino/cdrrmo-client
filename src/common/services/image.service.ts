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

  async getImage(fileName: string){
    console.log(this.service + 'getImage()', fileName)
    try {
      const response = await config.api.get(this.endpoint + 'get-image/' + fileName);
      console.log({response})
      if(response.status === 200){
          return response.data
      }
      console.error('Error: ', response)
    } catch (error) {
      console.error('Error fetching data:', error);
    }

    return null
  } 

}

export const imageService = new ImageService();
