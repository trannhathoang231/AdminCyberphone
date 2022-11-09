class SpService {
  getListSp() {
    return axios({
      method: "get",
      url: "https://62a2fc9e21232ff9b2151283.mockapi.io/Products_Capstone",
    });
  }
  addSpAPI(food) {
    return axios({
      method: "post",
      url: "https://62a2fc9e21232ff9b2151283.mockapi.io/Products_Capstone",
      data: food,
    });
  }
  getSpDetail(id) {
    return axios({
      method: "get",
      url: `https://62a2fc9e21232ff9b2151283.mockapi.io/Products_Capstone/${id} `,
    });
  }
  updateSpAPI(id, food) {
    return axios({
      method: "put",
      url: `https://62a2fc9e21232ff9b2151283.mockapi.io/Products_Capstone/${id} `,
      data: food,
    });
  }
  deleteSp(id) {
    return axios({
      method: "delete",
      url: `https://62a2fc9e21232ff9b2151283.mockapi.io/Products_Capstone/${id} `,
    });
  }
}
export default SpService;
