import axios from "axios";

export default new (class CallApi {
  async postApi(ip: string, headers: object, json: object) {
    return axios.post(ip, json, {
      headers: headers,
    });
  }
})();
