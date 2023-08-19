import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

class MeteorApi {
    private baseURL:string = 'http://localhost:3001/meteors';
    private instance: AxiosInstance = Axios.create({ 
        baseURL: this.baseURL,
        timeout: 1000
    });

    public init(){}  
    
    public get(url: string, config?: AxiosRequestConfig): Promise<any> {
        return this.instance.get(url, config);
    }
}
const meteorApi = new MeteorApi();
export default meteorApi;